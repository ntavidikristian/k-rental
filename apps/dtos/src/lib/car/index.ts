import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CarManufacturerFilter{
  @IsString()
  @IsOptional()
  name?: string;
}

export class CreateCarManufacturerDto {
  @IsNotEmpty()
  name!: string;
}

export class CarFilter {
  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  manufacturer?: string;
}

export class CreateCarDto {

  @IsNotEmpty()
  model!: string;

  @IsNotEmpty()
  manufacturerId!: string;

  @IsNotEmpty()
  mileage!: string;

  @IsNotEmpty()
  registrationYear!: number;

  @IsNotEmpty()
  manufactureYear?: number;
}



