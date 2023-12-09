import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Booking } from "../../booking/entities/booking.entity";

@Entity()
export class Customer {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;

    @Column({
        nullable: true
    })
    dateOfBirth?: Date;
    
    @Column({
        nullable: true
    })
    nationality?: string;

    @Column({
        nullable: true
    })
    licenceNo: string;

    @OneToMany(_ => Booking, booking => booking.customer, )
    bookings: Booking

}