import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service.js'

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
}
