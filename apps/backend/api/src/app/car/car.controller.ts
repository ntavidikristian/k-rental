import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Car } from "./entities/car.entity";
import { CarService } from "./car.service";
import { CarFilter, CreateCarDto, CreateCarManufacturerDto } from "@k-rental/dtos";
import { CarManufacturer } from "./entities/car-manufacturer.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller('car')
@UseGuards(AuthGuard())
export class CarController{

    constructor(
        private carService: CarService
    ){}

    @Get()
    async getCars(@Query() carFilter: CarFilter): Promise<Car[]>{
        return await this.carService.getCars(carFilter);
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