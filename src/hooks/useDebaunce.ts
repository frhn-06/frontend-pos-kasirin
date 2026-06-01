import { useRef } from "react"

const useDebaunce = () => {
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const debaunce = (callback: () => void, delay: number) => {
        if(timeRef.current) {
            clearTimeout(timeRef.current)
        }

        timeRef.current = setTimeout(() => {
            callback();
        }, delay)
    } 

    return {
        debaunce
    }
} 

export default useDebaunce