import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../../booking/entities/booking.entity";
import { CarManufacturer } from "./car-manufacturer.entity";

@Entity()
export class Car{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    model: string;

    @Column()
    mileage: string;
    
    @Column()
    registrationYear: number;

    @Column()
    manufactureYear: number;

    @OneToMany(_ => Booking, booking => booking.car)
    bookings?: Booking[]

    @ManyToOne(_ => CarManufacturer, manufacturer => manufacturer.cars, { eager: true })
    manufacturer: CarManufacturer
}

