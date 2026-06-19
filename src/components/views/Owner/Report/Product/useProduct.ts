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

    return {
        handleChangeStartDate,
        handleChangeEndDate,

        handleClearStartDate,
        handleClearEndDate
    }
}

export default useProduct;