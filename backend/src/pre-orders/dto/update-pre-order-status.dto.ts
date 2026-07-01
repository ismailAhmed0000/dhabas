import { IsIn, IsString } from 'class-validator';

export class UpdatePreOrderStatusDto {
  @IsString()
  @IsIn(['pending', 'confirmed', 'cancelled', 'fulfilled'])
  status: 'pending' | 'confirmed' | 'cancelled' | 'fulfilled';
}
