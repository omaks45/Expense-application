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
    ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService} from './report.service';
import { ReportDto, ReportResponseDto, UpdateReportDto } from 'src/dto/report.dto';



@Controller('report/:type')
export class ReportController {
    constructor(
        private readonly reportService: ReportService
      ) {}
    
      // get all report
      @Get()
      getAllReport(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponseDto[] {
        const reportType = type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.getAllReport(reportType);
      }
    
      // get report by id
      @Get(':id')
      getAllById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string): ReportResponseDto {
        // filter the report type
        const reportType =
          type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
        return this.reportService.getAllById(reportType, id);
    
      }
    
      // create report
      @Post()
      createReport(
        @Body() { amount, source }:  ReportDto,
        @Param('type', new ParseEnumPipe(ReportType)) type: string,
      ): ReportResponseDto {
        const reportType =
          type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
        return this.reportService.createReport(reportType, { amount, source });
      }
    
      @Put(':id')
      updateById(
        @Param('type', new ParseEnumPipe(ReportType)) type: string,  
        @Param('id', ParseUUIDPipe) id: string,
        @Body() body: UpdateReportDto,
      ): ReportResponseDto {
        const reportType =
        type === 'expense' ? ReportType.EXPENSE : ReportType.INCOME;
        return this.reportService.updateReport(reportType, id, body);
        
    
      }
    
      @HttpCode(204)
      @Delete()
      removeReport(
        @Param('id', ParseUUIDPipe) id: string
      ) {
        return this.reportService.removeReport(id);
      }
}
