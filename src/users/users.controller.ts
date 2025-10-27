import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { UsersService } from './users.service.js'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id') // localhost:3000/users/:id
    async getUser(@Param('id', ParseIntPipe) userId: bigint) {
        const userInfo = await this.usersService.getUser(BigInt(userId))

        return userInfo
    }
}
