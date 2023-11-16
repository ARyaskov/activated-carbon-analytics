import { Module } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";
import { AnalyticsResolver } from "./resolvers/analytics.resolver";
import { StorageModule } from "../storage/storage.module";

@Module({
  imports: [StorageModule],
  providers: [AnalyticsService, AnalyticsResolver],
  exports: [AnalyticsService, AnalyticsResolver],
})
export class AnalyticsModule {}
