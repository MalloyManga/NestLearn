import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service.js'
import { CreateUserDto } from './dto/create-user.dto.js'

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async getUser(id: bigint) {
        const userInfo = await this.prisma.users.findUnique({
            where: {
                id
            }
        })
        if (!userInfo) {
            throw new Error('foo') // Error handle? to be added...
        }
        return userInfo
    }

    async createUser(creatUser: CreateUserDto) {
        const newUser = await this.prisma.users.create({
            data: {
                name: creatUser.name,
                email: creatUser.email
            }
        })
        return newUser
    }
}
