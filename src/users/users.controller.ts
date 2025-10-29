import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post
} from '@nestjs/common'
import { UsersService } from './users.service.js'
import { CreateUserDto } from './dto/create-user.dto.js'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id') // localhost:3000/users/:id
    async getUser(@Param('id', ParseIntPipe) userId: bigint) {
        const userInfo = await this.usersService.getUser(BigInt(userId))

        return userInfo
    }

    @Post('create')
    async createUser(@Body() newUserInfo: CreateUserDto) {
        return await this.usersService.createUser(newUserInfo)
    }
}
