import {
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres.' })
  name?: string;

  @IsOptional()
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
  password?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El país no debe exceder los 20 caracteres.' })
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La direccion debe tener al menos 3 caracteres.' })
  @MaxLength(80, {
    message: 'La direccion no puede exceder los 80 caracteres.',
  })
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no puede exceder los 20 caracteres.' })
  city?: string;
}
