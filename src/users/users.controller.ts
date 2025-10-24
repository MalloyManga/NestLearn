import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { UsersService } from './users.service.js'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get(':id')
    getUser(@Param('id') userId: bigint) {
        console.log(userId)
        return userId
    }

    @Get()
    getAll(@Query('role') role: string) {
        console.log(role)
        return role
    }

    @Post()
    createUser(@Body() createUser: string) {
        // string 仅仅用于测试
        console.log(createUser)
        return createUser
    }
    // findOne(@Param('id') id: string) {
    //     console.log('Path Parameter id:', id) // 将会打印 '123'
    //     // 注意：从 URL 中获取的参数默认都是字符串
    //     return `This action returns user #${id}`
    // }
}
