import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(_ => CarManufacturer, manufacturer => manufacturer.cars, { eager: true })
    manufacturer: CarManufacturer
}

