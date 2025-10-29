// server.js
// 从 @nestjs/core 导入 NestFactory，这是用来创建 Nest 应用实例的工厂类。
// 你可以把它想象成 Express 里的 const express = require('express')
import { NestFactory } from '@nestjs/core'
// 导入根模块 AppModule。
// 在 Nest 中，应用是由模块组织的, AppModule 是所有其他模块的根，类似于 Vue/Nuxt 应用中的根组件或根实例
import { AppModule } from './app.module.js'
import { ValidationPipe } from '@nestjs/common'

// This is a well-known workaround for JSON serialization for BigInt
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
;(BigInt.prototype as any).toJSON = function () {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return this.toString() // 这里 this 指向自动包装时 那个临时创建的BigInt对象
}

// 使用 async/await 是因为创建和启动应用的过程是异步的。
async function bootstrap() {
    // NestFactory.create() 会创建一个 Nest 应用实例。
    // 传入的 AppModule 告诉 Nest 应用的根模块是哪个。
    // 这一步类似于 const app = express(); 创建了一个 Express 应用实例。
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    // 启动 HTTP 服务器，监听指定端口。
    // process.env.PORT ?? 3000 的写法表示优先使用环境变量中的 PORT，如果没有则使用 3000。
    // 这和 Express 中的 app.listen(3000, () => console.log('Server running')) 功能完全一样。
    await app.listen(process.env.PORT ?? 3000)
}

// 调用 bootstrap 函数，启动应用。
await bootstrap() // 这里一开始报错 加上await 之后发现是commonjs 故在package里添加新的字段
