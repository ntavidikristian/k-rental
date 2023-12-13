import { Body, Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { Booking } from "./entities/booking.entity";
import { BookingService } from "./booking.service";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { User } from "../auth/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { BookingFilter, CreateBookingDto } from "@k-rental/dtos";

@Controller('booking')
export class BookingController{

    constructor(
        private bookingService: BookingService
    ){}

    @UseGuards(AuthGuard())
    @Post()
    async createBooking(@Body() request: CreateBookingDto, @GetUser() user: User): Promise<Booking>{
        return await this.bookingService.createBooking(request, user.agent);
    }

    @Get()
    async getBookings(@Query() filter: BookingFilter): Promise<Booking[]>{
        return await this.bookingService.getBookings(filter);
    }

}