// express controller.js + route.js
// @Controller 和 @Get 都是装饰器。
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service.js'

// @Controller() 装饰器定义了一个控制器。括号里可以传入路径前缀，比如 @Controller('api/v1')。
// 这里为空，表示它处理根路径的请求。这类似于 const router = express.Router();
@Controller('/foo')
export class AppController {
    // 这是构造函数，在这里进行了“依赖注入”
    // Nest 会自动创建 AppService 的实例，并把它赋值给 this.appService。
    // 你不需要手动 new AppService()。这免去了在 Express 中需要在文件顶部手动 require/import 各种服务的步骤。
    constructor(private readonly appService: AppService) {} // 让 Nest 自动注入服务

    // @Get() 装饰器将 getHello 方法标记为根路径 (/) 的 GET 请求处理器。
    // 这完全等同于 Express 中的 router.get('/', (req, res) => { ... });
    @Get()
    getHello(): string {
        // 调用服务中的方法来获取业务逻辑处理结果。
        // 职责分离：Controller 只负责请求和响应，Service 负责具体的业务逻辑。
        return this.appService.getHello() // 调用服务
        // Nest 内部自动设置了 Content-Type 与 status 最后自动 res.send()
        // 就相当于 return res.send()
    }
}
