// services.js 同 express 不关心网络世界 只专注于业务
// 从 @nestjs/common 导入 Injectable 装饰器。
// 装饰器是 TypeScript 的一个特性，可以为类、方法或属性附加元数据和行为。
import { Injectable } from '@nestjs/common'

// @Injectable() 装饰器将 AppService 标记为一个“提供者”(Provider)。
// “提供者”是 NestJS 的一个基本概念，它可以被注入到其他类（如控制器）中。
// 这就是 NestJS 的“依赖注入”(Dependency Injection, DI) 系统的核心。
// 当你在其他地方需要 AppService 的实例时，NestJS 的 DI 容器会自动创建并提供它。
@Injectable() // 标记可以被注入
export class AppService {
  // 这是一个简单的方法，它包含了这个服务要执行的“业务逻辑”。
  // 在这个例子中，逻辑只是返回一个字符串。
  // 在实际应用中，这里可能会包含数据库查询（例如使用 Prisma）、调用其他 API、进行复杂计算等。
  getHello(): string {
    return 'Hello World!'
  }
}
