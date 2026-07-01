import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCustomOrderDto {
  @IsString()
  @MaxLength(120)
  customerName: string;

  @IsEmail()
  customerEmail: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  customerPhone?: string;

  @IsOptional()
  @IsString()
  @MaxLength(60)
  instagramHandle?: string;

  @IsString()
  @MaxLength(2000)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(5_000_000)
  referenceImageUrl?: string;
}
