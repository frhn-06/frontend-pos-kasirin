import exportService from "@/services/export.service"
import { DateValue } from "@internationalized/date"
import { useRouter } from "next/router"

const useProduct = () => {

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


    const cetakProductExcel = async () => {
        const result = await exportService.productExcel();

        const url = window.URL.createObjectURL(result.data);

        const link = document.createElement("a");

        link.href = url;

        link.download = "product-report-kasirin.xlsx";

        link.click();
    }

    const handleCetakExcel = () => {
        cetakProductExcel();
    }

    return {
        handleChangeStartDate,
        handleChangeEndDate,

        handleClearStartDate,
        handleClearEndDate,

        handleCetakExcel
    }
}

export default useProduct;