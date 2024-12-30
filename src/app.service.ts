/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ReportResponseDto } from './dto/report.dto';



interface Report { 
  amount: number; 
  source: string
}

interface upDateReport { 
  amount?: number; 
  source?: string
}

@Injectable()
export class AppService {
  getAllReport(type: ReportType): ReportResponseDto[] {
    return data.report.filter((report) => report.type === type).map((report) => new ReportResponseDto(report));

  }

  getAllById(type: ReportType, id: string): ReportResponseDto {
   const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

      if (!report) return;
      return new ReportResponseDto(report);
  }


  createReport(type: ReportType, { amount, source}: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      update_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  };

  updateReport(
    type: ReportType, 
    id: string, 
    body: upDateReport 
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
      
      if (!reportToUpdate) return;

      const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);

      data.report[reportIndex] = {
        ...data.report[reportIndex],
        ...body,
        update_at: new Date(),
      };

      return new ReportResponseDto(data.report[reportIndex])
    }

    removeReport(id: string){
      const reportIndex = data.report.findIndex((report) => report.id === id);
    
      if (reportIndex === -1) return;
  
      data.report.splice(reportIndex, 1);
    }

}
