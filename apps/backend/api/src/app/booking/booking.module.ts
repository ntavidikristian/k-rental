import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarModule } from "../car/car.module";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { Booking } from "./entities/booking.entity";
import { CustomerModule } from "../customer/customer.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports : [
        TypeOrmModule.forFeature([ Booking ]),
        CarModule,
        CustomerModule,
        AuthModule
    ],
    controllers: [BookingController],
    providers: [BookingService]
})
export class BookingModule {


}