import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(
    private readonly userRepository: UserRepository
  ) {}


  async create(
    createUserDto: CreateUserDto
    ): Promise<User> 
    {
      const { password, ...userData } = createUserDto
      
      return await this.userRepository.createUser({
        data: {
          ...userData,
          password: bcrypt.hashSync(password, 10)
        }
      });
    
    }

  async findByUsername( username: string ): Promise<User> {

    return this.userRepository.findyByUsername({
      where: {
        email: username
      }
    })
  }

  async findOne( id: string ): Promise<User> {
    return this.userRepository.findOne({
      where: {
        id
      }
    })
  }

}
