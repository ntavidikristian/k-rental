import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDate, IsEmail, IsNotEmpty, ValidateNested } from 'class-validator';
export class UserCredentials{

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class CreateCarManufacturerDto{

  @IsNotEmpty()
  name: string;
}
export class CreateCarDto{

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  manufacturerId: string;

  @IsNotEmpty()
  mileage: string;

  @IsNotEmpty()
  registrationYear: number;

  @IsNotEmpty()
  manufactureYear?: number;
}

export class BookingPeriod {

  @Type(() => Date)
  @IsDate()
  start: Date;

  @Type(() => Date)
  @IsDate()
  end: Date;
}
export class CreateBookingDto{
  @IsNotEmpty({message: 'client is required'})
  clientId: string;
  @IsNotEmpty({message: 'car is required'})
  carId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => BookingPeriod)
  periods: BookingPeriod[];
}

export enum BookingStatus{
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

export class CreateCustomerDto {
  
  @IsNotEmpty()
  name: string;

  @IsDate()
  dateOfBirth?: Date;

  nationality?: string;

  @IsNotEmpty()
  licenceNo: string;
}