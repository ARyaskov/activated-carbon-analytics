import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MercuriusDriver, MercuriusDriverConfig } from "@nestjs/mercurius";
import { resolve } from "path";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import {AnalyticsModule} from "./src/analytics/analytics.module";
require('dotenv').config()

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        HOST: Joi.string(),
        PORT: Joi.number(),
        CLICKHOUSE_HOST: Joi.string(),
        CLICKHOUSE_DATABASE: Joi.string(),
        CLICKHOUSE_USERNAME: Joi.string(),
        CLICKHOUSE_PASSWORD: Joi.string().allow('').optional()
      }),
        isGlobal: true,
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: true,
      ide: true,
      typePaths: [resolve(__dirname, "../graphql/**/*.graphql")],
      path: "/api/v0/graphql",
      subscription: true,
    }),

      AnalyticsModule
  ]
})
export class AppModule {}
