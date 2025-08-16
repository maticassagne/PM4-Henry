import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword.decorator';
import { Order } from 'src/orders/entities/orders.entity';

export class CreateUserDto {
  @ApiHideProperty()
  id: string;
  @ApiHideProperty()
  orders: Order[];

  /**
   *  El campo es requerido.
   *  Debe ser un string entre 3 y 50 caracteres.
   * @example 'Test User'
   */
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres.' })
  name: string;

  /**
   *  El campo es requerido.
   *  Debe ser un email valido con un maximo de 50 caracteres.
   * @example 'tester@mail.com'
   */
  @IsNotEmpty({ message: 'El email es requerido.' })
  @MaxLength(50, { message: 'El email no puede exceder los 50 caracteres.' })
  @IsEmail()
  email: string;

  /**
   *  El campo es requerido.
   *  La password debe contener una letra minuscula, una mayuscula, un numero y un caracter especial.
   *  Debe tener entre 8 y 20 caracteres.
   * @example 'Strong#Pass1!'
   */
  @IsNotEmpty({ message: 'La contraseña es requira.' })
  @Matches(/(?=.*[a-z])/, {
    message: 'La contraseña debe contener al menos una letra minúscula (a-z).',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'La contraseña debe contener al menos una letra mayúscula (A-Z).',
  })
  @Matches(/(?=.*\d)/, {
    message: 'La contraseña debe contener al menos un número (0-9).',
  })
  @Matches(/(?=.*[!@#$%^&*])/, {
    message:
      'La contraseña debe contener al menos un caracter especial (!@#$%^&*).',
  })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
  @MaxLength(20, {
    message: 'La contraseña no debe exceder los 20 caracteres.',
  })
  password: string;

  /**
   *  El campo es requerido.
   *  Debe ser igual al password.
   * @example 'Strong#Pass1!'
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   *  El campo es requerido.
   *  Debe ser un numero.
   * @example '12345678'
   */
  @IsNotEmpty({ message: 'El telefono es requerido.' })
  @IsNumber()
  phone: number;

  /**
   *  Debe ser un string entre 5 y 20 caracteres.
   * @example 'Test Country'
   */
  @IsString()
  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El país no debe exceder los 20 caracteres.' })
  country?: string;

  /**
   *  Debe ser un string entre 3 y 80 caracteres.
   * @example 'Test street'
   */
  @IsString()
  @MinLength(3, { message: 'La direccion debe tener al menos 3 caracteres.' })
  @MaxLength(80, {
    message: 'La direccion no puede exceder los 80 caracteres.',
  })
  address?: string;

  /**
   *  Debe ser un string entre 5 y 20 caracteres.
   * @example 'Test City'
   */
  @IsString()
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no puede exceder los 20 caracteres.' })
  city?: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;
}
