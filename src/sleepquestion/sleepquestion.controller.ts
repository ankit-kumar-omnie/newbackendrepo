import {
  Body,
  Controller,
  HttpException,
  Get,
  Param,
  Put,
  HttpCode,
  BadRequestException,
  Post,
} from "@nestjs/common";
import { SleepQuestionService } from "./sleepquestion.service";

@Controller("sleepquestion")
export class SleepQuestionController {
  constructor(private sleepService: SleepQuestionService) {}

  @HttpCode(201)
  @Put(":id")
  async updateform(@Param("id") id: string, @Body() createformDto: any) {
    try {
      return await this.sleepService.updateform(id, createformDto);
    } catch (error) {
      throw new HttpException(error.message, error.statuscode ?? 400);
    }
  }

  @HttpCode(200)
  @Get("formdata/:id")
  async getformdata(@Param("id") id: string) {
    try {
      return await this.sleepService.getformdatabyid(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @HttpCode(200)
  @Get(":id")
  async getbyid(@Param("id") id: string) {
    return await this.sleepService.getbyid(id);
  }

  // ...

@Put("/update/:id")
async addfield(@Param("id") id: string, @Body() dto: any) {
  return await this.sleepService.addfield(id, dto);
}

}
