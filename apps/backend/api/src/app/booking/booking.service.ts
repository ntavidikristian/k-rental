import { BookingStatus, CreateBookingDto } from "@k-rental/dtos";
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


        // todo check here that there is no other active booking
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