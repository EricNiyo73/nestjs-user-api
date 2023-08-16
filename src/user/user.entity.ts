import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @IsNotEmpty()
  @ApiProperty()
  @Column()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @Column()
  address: string;
}
