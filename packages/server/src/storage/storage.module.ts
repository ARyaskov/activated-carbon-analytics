import { Module } from "@nestjs/common";
import { XRepositoryStorageService } from "./xRepository/xRepository.service";

@Module({
  providers: [
    XRepositoryStorageService,
  ],
  exports: [
    XRepositoryStorageService,
  ],
})
export class StorageModule {}
