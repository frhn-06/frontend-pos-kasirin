import DashboardLayout from "@/components/layouts/DashboardLayout"
import Product from "@/components/views/Owner/Report/Product";
import Sales from "@/components/views/Owner/Report/Sales"
import reportService from "@/services/report.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect } from "react";

const useProduct = () => {
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
        const {data} = await reportService.product(`${params}`);
        return data;
    }

    const {data:dataReportProduct, isLoading:isLoadingReportProduct} = useQuery({
        queryKey: ["Report Product", currentDateStart, currentDateEnd],
        queryFn: getReportSales,
        enabled: router.isReady
    })

    return {
        dataReportProduct,
        isLoadingReportProduct,

        setUrl,

        currentDateStart,
        currentDateEnd,

    }   
}

const PageOwnerReporttProduct= () => {
    const {
        dataReportProduct,
        isLoadingReportProduct,

        setUrl,

        currentDateStart,
        currentDateEnd
    } = useProduct();

    
    useEffect(() => {
        setUrl();
    },[])


    return (
        <DashboardLayout title="Report Sales | Owner" description="this is report sales of this bussines" role="owner" pageTitle="Report Sales">
            <Product 
                data={dataReportProduct?.data} 
                isLoading={isLoadingReportProduct}
                currentStart={typeof currentDateStart === "string" ? `${currentDateStart}` : ""} 
                currentEnd={typeof currentDateEnd === "string" ? `${currentDateEnd}` : ""} 
            />
        </DashboardLayout>
    )
}


export default PageOwnerReporttProduct