import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDTO): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  public async getUsers(firstName?: string): Promise<User[]> {
    if (firstName) {
      return this.userRepository.find({ where: { firstName } });
    }
    return await this.userRepository.find();
  }

  public async getUser(userId: number): Promise<User> {
    //chech in database
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  public async editUser(
    userId: number,
    createUserDto: CreateUserDTO,
  ): Promise<User> {
    //find user if exists
    const editedUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!editedUser) {
      throw new NotFoundException('User not found');
    }
    const result = await this.userRepository.update(
      { id: userId },
      createUserDto,
    );
    console.log(result);
    return editedUser;
  }

  public async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete(userId);
  }
}
