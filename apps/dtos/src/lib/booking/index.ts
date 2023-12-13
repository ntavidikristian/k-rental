import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";


export enum BookingStatus {
  // booking is registered but not confirmed
  Pending = 'pending',
  // booking is verified but not active
  Verified = 'verified',
  // booking is active but not at this time
  OnGoing = 'ongoing',
  // booking is active
  Active = 'active',
  // booking is completed
  Completed = 'completed',
  // booking is canceled
  Canceled = 'canceled',
}
export class BookingPeriod {

  @Type(() => Date)
  @IsDate()
  start!: Date;

  @Type(() => Date)
  @IsDate()
  end!: Date;
}



export class BookingFilter{

  @IsString()
  @IsOptional()
  clientName?: string;

  @IsString()
  @IsOptional()
  carModel?: string;

  @Type(() => BookingPeriod)
  @IsOptional()
  @ValidateNested({ each: true })
  period?: BookingPeriod;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus
}

export class CreateBookingDto {
  @IsNotEmpty({ message: 'client is required' })
  clientId!: string;
  @IsNotEmpty({ message: 'car is required' })
  carId!: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => BookingPeriod)
  periods!: BookingPeriod[];
}

export class CustomerFilter{
  
  @IsString()
  name?: string;

  @IsString()
  licenceNo?: string
}

export class CreateCustomerDto {

  @IsNotEmpty()
  name!: string;

  @IsDate()
  dateOfBirth?: Date;

  nationality?: string;

  @IsNotEmpty()
  licenceNo!: string;
}