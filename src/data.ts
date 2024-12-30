/* eslint-disable prettier/prettier */
export enum ReportType {

    INCOME = 'income',
    EXPENSE = 'expense'
}

interface Data {
    report: {
        id: string;
        source: string;
        amount: number;
        created_at: Date;
        update_at: Date;
        type: ReportType;
    }[]
}

export const data: Data = {
    report: [
    {
        id: 'uuid1',
        source: 'food',
        amount: 2000,
        created_at: new Date(),
        update_at: new Date(),
        type: ReportType.EXPENSE
    },
    {
        id: 'uuid2',
        source: 'salary',
        amount: 2500,
        created_at: new Date(),
        update_at: new Date(),
        type: ReportType.INCOME
    },
    {
        id: 'uuid3',
        source: 'Electronics',
        amount: 32000,
        created_at: new Date(),
        update_at: new Date(),
        type: ReportType.EXPENSE
    },
    {
        id: 'uuid4',
        source: 'sales',
        amount: 56000,
        created_at: new Date(),
        update_at: new Date(),
        type: ReportType.INCOME
    },
    {
        id: 'uuid5',
        source: 'fees',
        amount: 800,
        created_at: new Date(),
        update_at: new Date(),
        type: ReportType.EXPENSE
    }
    ]
};


/*data.report.push({
   
})
*/