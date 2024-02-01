import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { forms } from "./schema/sleepquestion.schema";
import { formData } from "./schema/formdataschema";
import mongoose, { Model } from "mongoose";

@Injectable()
export class SleepQuestionService {
  constructor(
    @InjectModel(forms.name)
    private sleepquestionModel: Model<forms>,
    @InjectModel(formData.name) private formDatamodel: Model<formData>
  ) {}

  // Update or Add new Data in FormData Database
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

  // Get Form Data By ID
  async getformdatabyid(id: string) {
    const res = await this.formDatamodel.findOne({ id });
    if (!res) {
      throw new BadRequestException("Invalid Id");
    }
    return res;
  }

  // Get forms
  async getbyid(id: string) {
    return await this.sleepquestionModel.findOne({ id });
  }

  //update or add fields

  async addfield(id: string, dto: any) {
    const existingForm = await this.sleepquestionModel.findOne({ id });

    if (!existingForm) {
      throw new BadRequestException(`Form with ID ${id} not found`);
    }

    const updatedUiSchema = {
      ...existingForm.uiSchema,
      ...dto.uiSchema,
    };

    const updatedDataSchema = {
      ...existingForm.dataSchema,
      ...dto.dataSchema,
    };

    const updatedForm = await this.sleepquestionModel.findOneAndUpdate(
      { id },
      { uiSchema: updatedUiSchema, dataSchema: updatedDataSchema },
      { new: true }
    );

    return updatedForm;
  }
}
