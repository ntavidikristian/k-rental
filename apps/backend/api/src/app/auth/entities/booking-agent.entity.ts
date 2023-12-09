import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Booking } from "../../booking/entities/booking.entity";

@Entity()
export class BookingAgent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        nullable: true
    })
    name?: string;

    @Column({
        nullable: true
    })
    address?: string;

    @Column({
        nullable: true
    })
    telephoneNumber?: string;

    @OneToMany(() => Booking, booking => booking.agent)
    bookings: Booking[]
}