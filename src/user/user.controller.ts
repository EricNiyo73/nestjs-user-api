import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiCreatedResponse({ type: User, description: 'you can post a user' })
  @Post('create')
  public async createUser(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  //get all users
  @ApiOkResponse({ type: User, isArray: true })
  @ApiQuery({ name: 'firstName', required: false })
  @Get('all')
  public async getUsers(
    @Query('firstName') firstName: string,
  ): Promise<User[]> {
    return await this.userService.getUsers(firstName);
  }

  //get one user
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: User })
  @Get('/:userId')
  public async getUser(@Param('userId') userId: number) {
    return await this.userService.getUser(userId);
  }

  @ApiNotFoundResponse()
  @Patch('/edit/:userId')
  public async editUser(
    @Body() createUserDto: CreateUserDTO,
    @Param('userId') userId: number,
  ): Promise<User> {
    return await this.userService.editUser(userId, createUserDto);
  }

  @ApiOkResponse({ type: User, description: 'You can delete one user' })
  @Delete('/delete/:userId')
  public async deleteUser(@Param('userId') userId: number) {
    return await this.userService.deleteUser(userId);
  }
}
