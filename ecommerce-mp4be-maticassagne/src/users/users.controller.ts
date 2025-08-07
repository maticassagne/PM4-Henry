import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ParamsWithIdDto } from 'src/common/dto/idParams.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.usersService.getUsers(Number(page), Number(limit));
    return this.usersService.getUsers(1, 5);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUserById(@Param() { id }: ParamsWithIdDto) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.usersService.addUser(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(@Param() { id }: ParamsWithIdDto, @Body() user: UpdateUserDto) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUser(@Param() { id }: ParamsWithIdDto) {
    return this.usersService.deleteUser(id);
  }
}
