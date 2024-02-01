import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { forms, SleepQuestionSchema } from "./schema/sleepquestion.schema";
import { SleepQuestionController } from "./sleepquestion.controller";
import { SleepQuestionService } from "./sleepquestion.service";
import { formData, FormDataSchema } from "./schema/formdataschema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: forms.name, schema: SleepQuestionSchema },
      { name: formData.name, schema: FormDataSchema },
    ]),
  ],
  controllers: [SleepQuestionController],
  providers: [SleepQuestionService],
})
export class SleepQuestionModule {}
