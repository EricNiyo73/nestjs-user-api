import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  isAlphanumeric,
  IsNotEmpty,
  maxLength,
} from 'class-validator';
export class CreateUserDTO {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}
