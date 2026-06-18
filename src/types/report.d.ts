interface Isummarysales {
    totalSales: number;
    totalOrders: number;
    averegeOrderValue: number;
}

interface Isalesbyday  {
    date: string;
    totalSales: number;
    totalOrders: number;
}

interface IReportSales {
    summary: Isummarysales;
    salesByDay: Isalesbyday[]
} 

export type {IReportSales, Isummarysales, Isalesbyday}