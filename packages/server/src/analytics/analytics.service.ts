import { Inject, Injectable } from "@nestjs/common";
import { XRepositoryStorageService } from "../storage/xRepository/xRepository.service";
import { Event } from "./dto/event";
@Injectable()
export class AnalyticsService {
  constructor(
    @Inject(XRepositoryStorageService)
    private xRepositoryStorageService: XRepositoryStorageService,
  ) {}

  async getTop50Models() {
    return this.xRepositoryStorageService.getTop50Models();
  }

  async getCTRByDay(day: Date) {
    return this.xRepositoryStorageService.getCTRByDate(day);
  }

  async getCTRByTwoDates(date1: Date, date2: Date) {
    return this.xRepositoryStorageService.getCTRByTwoDates(date1, date2);
  }

  async getEvPMByTwoDates(date1: Date, date2: Date, mode: Event) {
    return this.xRepositoryStorageService.getEvPMByTwoDates(date1, date2, mode);
  }
}
