import endpoint from "@/services/endpoint"
import exportService from "@/services/export.service"
import { DateValue } from "@internationalized/date"
import { useRouter } from "next/router"
import { ChangeEvent } from "react"

const useSales = () => {
    const router = useRouter()

    const handleChangeStartDate = (e: DateValue | null) => {
        router.replace({
            query: {
                ...router.query,
                start: e?.toString()
            }
        })
    }

    const handleChangeEndDate = (e: DateValue | null) => {
        router.replace({
            query: {
                ...router.query,
                end: e?.toString()
            }
        })
    }

    const handleClearStartDate = () => {
        router.replace({
            query: {
                ...router.query,
                start: ""
            }
        })
    }

    const handleClearEndDate = () => {
        router.replace({
            query: {
                ...router.query,
                end: ""
            }
        })
    }



    const exportExcelSales = async () => {
        const result = await exportService.salesExcel()

        const url = window.URL.createObjectURL(result.data);

        const link = document.createElement("a");

        link.href = url;

        link.download = "sales-report-kasirin.xlsx";

        link.click();
    }

    const handleCetakExcel = () => {
        exportExcelSales();
    }
    return {
        handleChangeStartDate,
        handleChangeEndDate,

        handleClearStartDate,
        handleClearEndDate,

        handleCetakExcel
    }
}

export default useSales;