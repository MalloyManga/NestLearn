// app.js 在这里进行中间件的组装 以及 引入各种路由
// @Module 是一个装饰器，它为 AppModule 类附加了元数据，告诉 Nest 这个类是一个模块。
// 这非常像 Vue 组件中的 <script> 部分，你在那里定义 props, data, methods 等。
import { Module } from '@nestjs/common'
// 导入这个模块需要管理的控制器。
import { AppController } from './app.controller.js'
// 导入这个模块需要管理的服务（提供者）。
import { AppService } from './app.service.js'
import { UsersModule } from './users/users.module.js'

@Module({
    // imports: 用来导入其他模块。如果你的应用变大了，比如有了一个 UserModule，你就会在这里写 [UserModule]。
    // 这类似于在 Express 的主文件中 app.use('/users', userRoutes)。
    imports: [UsersModule],
    // controllers: 声明这个模块有哪些控制器（处理路由和请求）。
    // Nest 会自动根据控制器里的装饰器（@Get, @Post 等）来设置路由。
    // 这类似于在 Express 中 app.use('/', router)
    // 网络请求进入时 就去这些控制器里寻找对应的方法
    controllers: [AppController],
    // providers: 声明这个模块有哪些服务（提供者），主要是处理业务逻辑。
    // 在这里注册的服务，就可以在控制器中通过“依赖注入”的方式来使用。
    // 你可以把它理解为，在这里“提供”（provide）了服务，然后在别处“注入”（inject）使用。
    providers: [AppService]
})
export class AppModule {}
