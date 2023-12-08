import { CreateCarDto, CreateCarManufacturerDto } from "@k-rental/dtos";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Car } from "./entities/car.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CarManufacturer } from "./entities/car-manufacturer.entity";

@Injectable()
export class CarService{

    constructor(
        @InjectRepository(CarManufacturer)
        private manufacturerRepository: Repository<CarManufacturer>,
        @InjectRepository(Car)
        private carRepository: Repository<Car>
    ){

    }

    async getCarManufacturerById(id: string, params?: {silent?: boolean}): Promise<CarManufacturer>{

        const { silent } = params ?? {};
        const manuFacturer = await this.manufacturerRepository.findOne({
            where: {
                id
            }
        })

        if(!manuFacturer && !silent){
            throw new NotFoundException();
        }

        return manuFacturer;
    }

    async getManufacturers(): Promise<CarManufacturer[]>{
        return this.manufacturerRepository.find()
    }

    async createManufacturer(createManufacturerDto: CreateCarManufacturerDto): Promise<CarManufacturer>{
        const { name } = createManufacturerDto;

        const manufacturer = await this.manufacturerRepository.create({
            name
        })
        return await this.manufacturerRepository.save(manufacturer);
    }

    async createCar(createCarDto: CreateCarDto): Promise<Car>{
        const { manufacturerId, mileage, model, registrationYear, manufactureYear } = createCarDto;

        const manufacturer = await this.getCarManufacturerById(manufacturerId, {silent: true});

        if(!manufactureYear){
            throw new BadRequestException('Manufacturer not found');
        }

        const car = await this.carRepository.create({
            manufacturer,
            manufactureYear,
            mileage,
            model,
            registrationYear
        })

        

        console.log({
            car,
            manufacturer
        })
        await this.carRepository.save(car);

        return car;
    }

    async getCars(): Promise<Car[]>{
        return this.carRepository.find();
    }



}