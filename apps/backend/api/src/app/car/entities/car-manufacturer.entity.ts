import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./car.entity";

@Entity()
export class CarManufacturer{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @OneToMany(_ => Car, car => car.manufacturer)
    cars: Car
}