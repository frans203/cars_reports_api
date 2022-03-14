import { Expose, Transform } from 'class-transformer';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  lat: number;

  @Expose()
  lng: number;

  @Expose()
  year: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  approved: Boolean;

  @Expose()
  @Transform(({ obj }) => obj.user.id)
  userId: number;
}
