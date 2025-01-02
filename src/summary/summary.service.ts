/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
    constructor( private readonly reportService: ReportService) {}
    calculateSummary(){
        const allExpense = this.reportService.getAllReport(ReportType.EXPENSE)
        .reduce((sum, report) => sum + report.amount, 0);
        const allIncome = this.reportService.getAllReport(ReportType.INCOME)
        .reduce((sum, report) => sum + report.amount, 0);
        return {
            allExpense,
            allIncome,
            balance: allIncome - allExpense,
        }


    }
}
