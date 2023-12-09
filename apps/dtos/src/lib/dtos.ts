export class UserCredentials{
  email: string;
  password: string;
}

export class CreateCarManufacturerDto{
  name: string;
}
export class CreateCarDto{
  model: string;
  manufacturerId: string;
  mileage: string;
  registrationYear: number;
  manufactureYear?: number;
}

export interface BookingPeriod {
  start: Date;
  end: Date;
}
export interface CreateBookingDto{
  clientId: string;
  carId: string;
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
  
  name: string;

  dateOfBirth?: Date;
    
  nationality?: string;

  licenceNo: string;
}