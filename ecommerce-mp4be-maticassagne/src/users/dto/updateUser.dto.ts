import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Debe ser un string entre 3 y 50 caracteres',
    example: 'Tester User 2',
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres.' })
  name?: string;

  @ApiProperty({
    description:
      'La contraseña debe contener una letra minuscula, una mayuscula, un numero y un caracter especial, con un minimo de 8 caracteres y un maximo de 20',
    example: 'Strong#Pass1!',
  })
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

  @ApiProperty({
    description: 'Debe ser un numero.',
    example: '12345678',
  })
  @IsOptional()
  @IsNumber()
  phone?: number;

  @ApiProperty({
    description: 'Debe ser un string entre 5 y 20 caracteres',
    example: 'Test Country',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El país no debe exceder los 20 caracteres.' })
  country?: string;

  @ApiProperty({
    description: 'Debe ser un string entre 3 y 80 caracteres.',
    example: 'Test street',
  })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'La direccion debe tener al menos 3 caracteres.' })
  @MaxLength(80, {
    message: 'La direccion no puede exceder los 80 caracteres.',
  })
  address?: string;

  @ApiProperty({
    description: 'Debe ser un string entre 5 y 20 caracteres,',
    example: 'Test City',
  })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no puede exceder los 20 caracteres.' })
  city?: string;
}
