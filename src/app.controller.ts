/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe
} from '@nestjs/common';
import { ReportType } from './data';
//import { v4 as uuid } from 'uuid';
import { AppService } from './app.service';
import { ReportDto, UpdateReportDto } from './dto/report.dto';


@Controller('report/:type')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  // get all report
  @Get()
  getAllReport(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReport(reportType);
  }

  // get report by id
  @Get(':id')
  getAllById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
    // filter the report type
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.getAllById(reportType, id);

  }

  // create report
  @Post()
  createReport(
    @Body() { amount, source }:  ReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ) {
    const reportType =
      type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,  
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ) {
    const reportType =
    type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
    return this.appService.updateReport(reportType, id, body);
    

  }

  @HttpCode(204)
  @Delete()
  removeReport(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.appService.removeReport(id);
  }
}