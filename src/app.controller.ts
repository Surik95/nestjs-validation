import {
  Controller,
  Get,
  Param,
  Query,
  Body,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RequestInterceptor } from './interceptor/app.request.interceptor';
import { UseInterceptors, UseFilters } from '@nestjs/common';
import { AppAgeValidationPipe } from './validate/app.validate.age';
import { AgeDto } from './interfaces/dto/age.dto';
import { ageSchemaString } from './interfaces/shemas/age.validate.shema.string';
import { JoiValidationPipeObject } from './validate/joiValidate/joi.validate.object.pipe';
import { JoiValidationPipeString } from './validate/joiValidate/joi.validate.string.pipe';
import { ageSchemaObject } from './interfaces/shemas/age.validate.shema.object';
import { HttpExceptionFilter } from './interfaces/filter/http.exception.filterCatch';

@Controller()
@UseFilters(new HttpExceptionFilter())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(RequestInterceptor)
  @Get('interceptor')
  getHello(): string {
    if (Math.random() > 0) {
      throw new Error('something wrong');
    }
    return this.appService.getHello();
  }

  @UsePipes(new JoiValidationPipeString(ageSchemaString))
  @Get('validate/:age')
  getAgeInfo(@Param('age', AppAgeValidationPipe) age: string): string {
    return age;
  }

  @UsePipes(new JoiValidationPipeString(ageSchemaString))
  @Get('validate/')
  queryAgeInfo(@Query('age', AppAgeValidationPipe) age: string) {
    return age;
  }

  @UsePipes(new JoiValidationPipeObject(ageSchemaObject))
  @Post('validate/')
  postAgeInfo(@Body(AppAgeValidationPipe) ageDto: AgeDto) {
    return ageDto;
  }
}
