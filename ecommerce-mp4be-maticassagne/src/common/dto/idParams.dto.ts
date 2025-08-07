import { IsUUID } from 'class-validator';

export class ParamsWithIdDto {
  @IsUUID(4, {
    message: 'El id ingresado no es valido, debe ser del tipo UUID (v4)',
  })
  id: string;
}
