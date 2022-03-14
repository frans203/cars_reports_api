import {
  IsString,
  IsNumber,
  Max,
  Min,
  IsLatitude,
  IsLongitude,
  IsEnum,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Min(1930)
  @Max(2050)
  year: number;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(10000000)
  price: number;

  @IsEnum(['metric', 'imperial'])
  mensuration: string;
}
