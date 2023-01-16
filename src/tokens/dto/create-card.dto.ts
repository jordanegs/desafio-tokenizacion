import { IsNotEmpty, IsNumber, IsString, Validate } from 'class-validator';

import {
  EmailValidation,
  LengthValidation,
  LuhnValidation,
  MinMaxValidation,
  MinMaxYearValidation,
} from '../validations';

export class CreateCardDto {
  @Validate(LuhnValidation)
  @Validate(LengthValidation, [13, 16])
  @IsNumber(
    {},
    { message: (args) => `${args.property} debe ser de tipo numérico` },
  )
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  card_number: number;

  @Validate(LengthValidation, [3, 4])
  @IsNumber(
    {},
    { message: (args) => `${args.property} debe ser de tipo numérico` },
  )
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  cvv: number;

  @Validate(EmailValidation)
  @Validate(LengthValidation, [5, 100])
  @IsString({ message: (args) => `${args.property} debe ser de tipo cadena` })
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  email: string;

  @Validate(MinMaxValidation, [1, 12])
  @Validate(LengthValidation, [1, 2])
  @IsString({ message: (args) => `${args.property} debe ser de tipo cadena` })
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  expiration_month: string;

  @Validate(MinMaxYearValidation)
  @Validate(LengthValidation, [4, 4])
  @IsString({ message: (args) => `${args.property} debe ser de tipo cadena` })
  @IsNotEmpty({ message: (args) => `${args.property} es necesario` })
  expiration_year: string;
}
