import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @MaxLength(50)
  @IsEmail()
  email: string;

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
