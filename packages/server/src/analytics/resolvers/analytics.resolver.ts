import { Resolver, Query, Args } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { AnalyticsService } from "../analytics.service";
import { DeviceModel } from "../dto/deviceModel";
import { GetCTRByDayFilterInput } from "../dto/getCTRByDayFilterInput";
import { CTRData } from "../dto/ctrData";
import { DateTime } from "luxon";
import { GetCTRByTwoDatesFilterInput } from "../dto/getCTRByTwoDatesFilterInput";
import { GetEvPMByTwoDatesFilterInput } from "../dto/getEvPMByTwoDatesFilterInput";
import { EvPMData } from "../dto/evpmData";

@Resolver("Analytics")
export class AnalyticsResolver {
  constructor(
    @Inject(AnalyticsService)
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Query("getTop50Models")
  async getTop50Models(): Promise<DeviceModel[]> {
    let deviceModels: DeviceModel[] = [];
    const v = await this.analyticsService.getTop50Models();
    if (v?.length) {
      deviceModels = v;
    }
    return deviceModels;
  }

  @Query("getCTRByDay")
  async getCTRByDay(
    @Args("filter") filter: GetCTRByDayFilterInput,
  ): Promise<CTRData[]> {
    const format = "yyyy-MM-dd";
    const dateTime: DateTime = DateTime.fromFormat(filter.date, format).startOf(
      "day",
    );
    const ctrData = await this.analyticsService.getCTRByDay(
      dateTime.toJSDate(),
    );
    return ctrData;
  }

  @Query("getCTRByTwoDates")
  async getCTRByTwoDates(
    @Args("filter") filter: GetCTRByTwoDatesFilterInput,
  ): Promise<CTRData[]> {
    const format = "yyyy-MM-dd";
    const dateTime1: DateTime = DateTime.fromFormat(filter.startDate, format);
    const dateTime2: DateTime = DateTime.fromFormat(filter.endDate, format);
    const ctrData = await this.analyticsService.getCTRByTwoDates(
      dateTime1.toJSDate(),
      dateTime2.toJSDate(),
    );
    return ctrData;
  }

  @Query("getEvPMByTwoDates")
  async getEvPMByTwoDates(
    @Args("filter") filter: GetEvPMByTwoDatesFilterInput,
  ): Promise<EvPMData[]> {
    const format = "yyyy-MM-dd";
    const dateTime1: DateTime = DateTime.fromFormat(filter.startDate, format);
    const dateTime2: DateTime = DateTime.fromFormat(filter.endDate, format);
    const evpmData = await this.analyticsService.getEvPMByTwoDates(
      dateTime1.toJSDate(),
      dateTime2.toJSDate(),
      filter.mode,
    );
    return evpmData;
  }
}
