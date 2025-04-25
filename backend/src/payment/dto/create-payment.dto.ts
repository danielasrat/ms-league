import { IsEmail } from 'class-validator';

export class CreatePaymentDto {
  amount: string;

  @IsEmail()
  email: string;
  name: string;
}
