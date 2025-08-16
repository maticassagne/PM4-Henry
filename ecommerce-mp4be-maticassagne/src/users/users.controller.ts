import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ParamsWithIdDto } from 'src/common/dto/idParams.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ERoles } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(ERoles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUsers(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit)
      return this.usersService.getUsers(Number(page), Number(limit));
    return this.usersService.getUsers(1, 5);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getUserById(@Param() { id }: ParamsWithIdDto) {
    return this.usersService.getUserById(id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles(ERoles.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
