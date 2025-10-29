// prisma.module.ts
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service.js'

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService] // 导出需要被其他模块使用的
})
export class PrismaModule {}
