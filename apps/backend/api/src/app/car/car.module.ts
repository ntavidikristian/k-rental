import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { CarManufacturer } from "./entities/car-manufacturer.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Car, CarManufacturer])
    ],
    controllers: [
        CarController
    ],
    providers: [
        CarService
    ]
})
export class CarModule{}