/* eslint-disable prettier/prettier */
import { IsNumber, IsPositive, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ReportType } from "src/data";
import { Exclude, Expose } from "class-transformer";
//import { constants } from "buffer";


export class ReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;
    @Expose({ name: 'CreatedAt'})
    changeToCreatedAt(){
        return this.created_at;
    }

    @Exclude()
    created_at: Date;

    @Exclude()
    update_at: Date;
    type: ReportType;

    constructor(partial: Partial<ReportResponseDto>) {
        Object.assign(this, partial);
    }
}
