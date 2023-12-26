import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Customer } from "./entity/customer.entity";
import { CustomerService } from "./customer.service";
import { CreateCustomerDto } from "@k-rental/dtos";
import { AuthGuard } from "@nestjs/passport";

@Controller('customer')
@UseGuards(AuthGuard())
export class CustomerController{

    constructor(
        private customerService: CustomerService
    ){}

    @Get()
    async getCustomers(): Promise<Customer[]>{
        return await this.customerService.getCustomers();
    }

    @Post()
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer>{
        return this.customerService.createCustomer(createCustomerDto);
    }
}