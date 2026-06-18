import { DatePicker } from "@heroui/react";
import { DateValue, parseDate } from "@internationalized/date";
import { useRouter } from "next/router";
import { IoCloseCircle } from "react-icons/io5";

interface TypeProps {
  currentStart: string;
  currentEnd: string;

  onChangeStart: (e: DateValue | null) => void;
  onChangeEnd: (e: DateValue | null) => void;

  onClearStart: () => void;
  onClearEnd: () => void;
}

const DateFilter = (props: TypeProps) => {
    const {
      currentStart,
      currentEnd,

      onChangeStart,
      onChangeEnd,

      onClearStart,
      onClearEnd
    } = props;

    const router = useRouter();

    return (
        <div className="flex lg:flex-row justify-between gap-4">
          <div className="flex gap-1">
            <div className="bg-white rounded-xl shadow-lg">
              <DatePicker
                className="max-w-[284px] bg-transparent" 
                variant="bordered" 
                label={(<p className="font-semibold">Waktu awal</p>)}
                value={currentStart && router.isReady ? parseDate(`${currentStart}`) as never : null}
                onChange={onChangeStart}
              />
            </div>
              {currentStart && (
                <IoCloseCircle className="cursor-pointer shadow-lg" onClick={onClearStart} />
              )}
          </div>
        
          <div className="flex gap-1">
            <div className="bg-white rounded-xl shadow-lg">
              <DatePicker 
                className="max-w-[284px] bg-transparent" 
                variant="bordered" 
                label={(<p className="font-semibold">Waktu akhir</p>)}
                value={currentEnd && router.isReady ? parseDate(`${currentEnd}`) as never : null}
                onChange={onChangeEnd}
              />
            </div>
            {currentEnd && (
              <IoCloseCircle className="cursor-pointer shadow-lg" onClick={onClearEnd} />
            )}
          </div>
          
        </div>

    )
}

export default DateFilter;