import { BookingPeriod, BookingStatus, CreateBookingDto } from "@k-rental/dtos";
import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarService } from "../car/car.service";
import { Booking } from "./entities/booking.entity";
import { BookingAgent } from "../auth/entities/booking-agent.entity";
import { CustomerService } from "../customer/customer.service";

@Injectable()
export class BookingService{
    
    constructor(
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,

        private carService: CarService,

        private customerService: CustomerService
    ){}


    private periodIsValid(bookingPeriod: BookingPeriod): boolean{

        if(!bookingPeriod){
            return false;
        }
        const { end, start } = bookingPeriod;

        if(!start || !end){
            return false;
        }

        return start.getTime() < end.getTime();
    }

    private async getOverlappingBookingsInPeriods(periods: BookingPeriod[]): Promise<Booking[]>{

        if(!periods?.length){
            return [];
        }

        if(periods.some(period => !this.periodIsValid(period))){
            console.log('invalid period')
            // todo possible throw ?
            return [];
        }

        const minStartDate = new Date(Math.max(...periods.map(x => x.start.getTime())));
        const maxEndDate = new Date(Math.max(...periods.map(x => x.end.getTime())));

        let query = await this.bookingRepository.createQueryBuilder('booking');
        query
            .where(`id IN 
                (
                    SELECT b.id as id
                    FROM booking b, jsonb_array_elements(b.periods) period
                    WHERE NOT(
                        ((period::jsonb->>'end')::timestamp <= :minStartDate)
                        OR 
                        ((period::jsonb->>'start')::timestamp >= :maxEndDate)
                    )
                )`
                , {minStartDate: minStartDate.toJSON(), maxEndDate: maxEndDate.toJSON() }
            )
        return (await query.getMany()).filter(
            booking =>{
                return booking.periods.some(({end, start}) => {
                    const periodStart = new Date(start);
                    const periodEnd = new Date(end);
    
                    return periods.some(period => {
                        return !(period.end.getTime() <= periodStart.getTime() || period.start.getTime() >= periodEnd.getTime())
                    })
                });
            }
        );
    }
    
    async createBooking(createBookingDto: CreateBookingDto, agent: BookingAgent): Promise<Booking>{
        const { carId, clientId, periods } = createBookingDto;

        const car = await this.carService.getCarById(carId, { silent: true });
        if(!car){
            throw new BadRequestException('No such car');
        }


        const customer = await this.customerService.getCustomerById(clientId, { silent: true });
        if(!customer){
            throw new BadRequestException('No such client');
        }


        
        const possibleBookingsConflictingBookings = await this.getOverlappingBookingsInPeriods(periods);

        if(possibleBookingsConflictingBookings?.length){
            throw new BadRequestException('Booking times conflict');
        }
        
        const booking = await this.bookingRepository.create({
            car,
            status: BookingStatus.Pending,
            customer,
            agent,
            periods
        })


        await this.bookingRepository.save(booking);
        return booking;
    }

    async getBookings(): Promise<Booking[]>{
        return await this.bookingRepository.find();
    }


}