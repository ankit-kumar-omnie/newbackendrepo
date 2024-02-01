import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { forms } from "./schema/sleepquestion.schema";
import mongoose, { Model } from "mongoose";
import { formData } from "./schema/formdataschema";

@Injectable()
export class SleepQuestionService {
  constructor(
    @InjectModel(forms.name)
    private sleepquestionModel: Model<forms>,
    @InjectModel(formData.name) private formDatamodel: Model<formData>
  ) {}

  async updateform(id: string, createform: any): Promise<any> {
    const updateform = await this.formDatamodel.findOneAndUpdate(
      { id },
      { $set: { data: createform } },
      { new: true, upsert: true }
    );
    if (!updateform) {
      throw new BadRequestException(`Invalid Details`);
    }
    return updateform;
  }

  async getformdatabyid(id: string) {
    const res = await this.formDatamodel.findOne({ id });
    if (!res) {
      throw new BadRequestException("Invalid Id");
    }
    return res;
  }

  async getbyid(id: string) {
    return await this.sleepquestionModel.findOne({ id });
  }

  async createform(dto: any) {
    const res = await this.formDatamodel.create(dto);
    if (!res) {
      throw new BadRequestException("Error");
    }
    return res;
  }
}
