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