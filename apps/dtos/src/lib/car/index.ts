import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


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
  model?: string | null;

  @IsNotEmpty()
  @IsUUID()
  manufacturerId?: string | null;

  @IsNotEmpty()
  mileage?: string | null;

  @IsNotEmpty()
  registrationYear?: number | null;

  @IsNotEmpty()
  manufactureYear?: number | null;
}



