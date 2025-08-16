import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description:
      'El campo es requerido. Debe ser un email valido con un maximo de 50 caracteres',
    example: 'tester@mail.com',
  })
  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'El campo es requerido. La contraseña debe contener una letra minuscula, una mayuscula, un numero y un caracter especial, con un minimo de 8 caracteres y un maximo de 20',
    example: 'Strong#Pass1!',
  })
  @IsNotEmpty({ message: 'La contraseña es requira.' })
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña debe tener al menos una minuscula, una mayuscula y un caracter especial (!@#$%^&*).',
    },
  )
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no debe exceder los 20 caracteres.',
  })
  password: string;
}
