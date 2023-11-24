import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableCors({
    origin: ["http://localhost:1234", "http://localhost:3011", "http://127.0.0.1:8080"],
    methods: ["GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"],
    credentials: true,
  });
  console.log(`Running with HOST=${process.env.HOST} PORT=${process.env.PORT}`);
  await app.listen(process.env.PORT || 3000, process.env.HOST || "0.0.0.0");
}
bootstrap();
