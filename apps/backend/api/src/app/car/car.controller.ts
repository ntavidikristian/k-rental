import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Car } from "./entities/car.entity";
import { CarService } from "./car.service";
import { CreateCarDto, CreateCarManufacturerDto } from "@k-rental/dtos";
import { CarManufacturer } from "./entities/car-manufacturer.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller('car')
export class CarController{

    constructor(
        private carService: CarService
    ){}

    @Get()
    @UseGuards(AuthGuard())
    async getCars(): Promise<Car[]>{
        return await this.carService.getCars();
    }

    @Post()
    async createCar(
        @Body() carDto: CreateCarDto
    ): Promise<Car>{
        return await this.carService.createCar(carDto);
    }

    @Get('/manufacturer')
    async getManufacturers(): Promise<CarManufacturer[]>{
        return await this.carService.getManufacturers();
    }

    @Post('/manufacturer')
    async createManufacturer(
        @Body() manufacturerDto: CreateCarManufacturerDto
    ): Promise<CarManufacturer>{
        return await this.carService.createManufacturer(manufacturerDto);
    }
}