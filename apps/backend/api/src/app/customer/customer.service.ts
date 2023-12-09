import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./entity/customer.entity";
import { Repository } from "typeorm";
import { CreateCustomerDto } from "@k-rental/dtos";

@Injectable()
export class CustomerService{


    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ){}

    async getCustomerById(id: string , params?: { silent?: boolean }): Promise<Customer>{
        const { silent } = params ?? {};

        const customer = await this.customerRepository.findOne({
            where: {
                id
            }
        })

        if(!customer && !silent){
            throw new NotFoundException();
        }

        return customer;
    }

    async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer>{
        const { licenceNo, name, dateOfBirth, nationality } = createCustomerDto;
        

        const customer = await this.customerRepository.create({
            dateOfBirth,
            licenceNo,
            name,
            nationality
        })


        return await this.customerRepository.save(customer);
    }

    async getCustomers(): Promise<Customer[]>{
        return await this.customerRepository.find();
    }

}