import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class UserRepository {
  
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async createUser( params: {
    data: Prisma.UserCreateInput
  } ): Promise<User> {
    const { data } = params
    return await this.prisma.user.create({
      data
    })
  }

  async findyByUsername( params: {
    where: Prisma.UserWhereUniqueInput
  }) {

    const { where } = params

    return await this.prisma.user.findUnique({
      where
    })
  }

  async findOne( params: {
    where: Prisma.UserWhereUniqueInput
  }) {

    const { where } = params

    return await this.prisma.user.findUnique({
      where,
      select: {
        email: true,
        fullName: true,
        id: true,
        isActive: true,
        roles: true,
      }
    })
  }
  

}