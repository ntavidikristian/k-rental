import { BookingPeriod, BookingStatus } from "@k-rental/dtos";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../car/entities/car.entity";
import { Customer } from "../../customer/entity/customer.entity";
import { BookingAgent } from "../../auth/entities/booking-agent.entity";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(_ => Car, car => car.bookings, { eager: true })
    car: Car;

    @ManyToOne(_ => Customer, customer => customer.bookings, { eager: true })
    customer: Customer;

    @ManyToOne(() => BookingAgent, agent => agent.bookings, { eager: true })
    agent: BookingAgent;


    @Column({
        type: 'jsonb',
        transformer: {
            from: val => JSON.parse(val),
            to: val => JSON.stringify(val)
        }
    })
    periods: BookingPeriod[];

    @Column({
        type:'enum',
        enum: BookingStatus,
        default: BookingStatus.Pending,
    })
    status: BookingStatus;
    // completedPeriods?: BookingPeriod[];
    @Column({
        nullable: true
    })
    cancelationReason?: string;
}
