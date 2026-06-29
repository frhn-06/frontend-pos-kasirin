import DashboardLayout from "@/components/layouts/DashboardLayout"
import Sales from "@/components/views/Owner/Report/Sales"
import reportService from "@/services/report.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {  useEffect } from "react";

const useSales = () => {
    const router = useRouter();

    const currentDateStart = router.query.start;
    const currentDateEnd = router.query.end;

    const setUrl = () => {
        router.replace({
            query: {
                start: currentDateStart || "",
                end: currentDateEnd || ""
            }
        })
    }

    const getReportSales = async () => {
        const params = `start=${currentDateStart}&end=${currentDateEnd}`;
        const {data} = await reportService.sales(`${params}`);
        return data;
    }

    const {data:dataReportSales, isLoading:isLoadingReportSales} = useQuery({
        queryKey: ["ReportSales", currentDateStart, currentDateEnd],
        queryFn: getReportSales,
        enabled: router.isReady
    })

    return {
        dataReportSales,
        isLoadingReportSales,

        setUrl,

        currentDateStart,
        currentDateEnd,

    }   
}

const PageOwnerReportSales = () => {
    const {
        dataReportSales,
        isLoadingReportSales,

        setUrl,

        currentDateStart,
        currentDateEnd
    } = useSales();

    
    useEffect(() => {
        setUrl();
    },[])


    return (
        <DashboardLayout title="Report Sales | Owner" description="Review sales performance with detailed transaction summaries and export options." role="owner" pageTitle="Sales Report">
            <Sales 
                data={dataReportSales?.data} 
                isLoading={isLoadingReportSales}
                currentStart={typeof currentDateStart === "string" ? `${currentDateStart}` : ""} 
                currentEnd={typeof currentDateEnd === "string" ? `${currentDateEnd}` : ""} 
            />
        </DashboardLayout>
    )
}


export default PageOwnerReportSales