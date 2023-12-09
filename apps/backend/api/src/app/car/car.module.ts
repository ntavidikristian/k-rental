import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { CarController } from "./car.controller";
import { CarService } from "./car.service";
import { CarManufacturer } from "./entities/car-manufacturer.entity";
import { BookingModule } from "../booking/booking.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Car, CarManufacturer]),
        AuthModule
    ],
    controllers: [
        CarController
    ],
    providers: [
        CarService
    ],
    exports: [
        CarService,
    ]
})
export class CarModule{}