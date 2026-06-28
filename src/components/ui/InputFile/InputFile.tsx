import cn from "@/utils/cn";
import { Spinner } from "@heroui/react";
import { ChangeEvent, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md"


interface TypeProps {
  fotoOnLoad: string;
  label?: string;

  onChangeImg: (e:ChangeEvent<HTMLInputElement>, onChange: (files: FileList) => void) => void;
  isPendingAdd: boolean;
  isSuccessAdd: boolean;

  onRemoveImg: (url: string, onChange: (files: FileList | null) => void) => void;
  isPendingRemove: boolean;
  isSuccessRemove: boolean;

  onChange: (files: FileList | null) => void;

  isInvalid: boolean
  errorMessage: string | undefined
}
const InputFile = (props: TypeProps) => {
    const {
      fotoOnLoad,
      label,

      onChangeImg,
      isPendingAdd,

      onRemoveImg,
      isPendingRemove,

      onChange,

      isInvalid,
      errorMessage
    } = props;

    const onChangeFoto = (e:ChangeEvent<HTMLInputElement>) => {
      onChangeImg(e, onChange)
    }

    const onRemoveFoto = (url: string) => {
      onRemoveImg(url, onChange)
    }

    return (
      <div >
        <p className="text-gray-700 mb-2">
          {label}
        </p>
        <label htmlFor="input-poto">
          <div className={cn("min-h-40 p-4 border-2 bg-gray-100 active:bg-gray-200 border-gray-400/30 border-dashed rounded-2xl flex justify-center items-center relative", {"border-red-400" : isInvalid})}>

            {fotoOnLoad && (
              <div className="w-1/2" >
                <img src={fotoOnLoad} alt="foto" className="w-full rounded-xl" />
              </div>
            )}

            {fotoOnLoad && (
              <div className="absolute top-2 right-2 text-danger bg-danger-100 rounded-full p-1 active:bg-danger-200" onClick={() => onRemoveFoto(fotoOnLoad)}>
                {isPendingRemove ? <Spinner color="danger" /> : <MdDelete color="danger" />}
              </div>
            )}

            {isPendingAdd && (
              <Spinner size="sm" />
            )}

            {!fotoOnLoad && !isPendingAdd && (
              <div className="flex flex-col justify-center items-center">
                <span>
                  <FaPlus className="w-10 h-10 text-gray-400" />
                </span>
                <p className="text-gray-400 text-sm">
                  Klik Input untuk menambah foto
                </p>

              </div>
            )}
          </div>

          {isInvalid && (
            <p className="text-danger text-xs mt-1">
              {errorMessage}
            </p>
          )}

          <input type="file" id="input-poto" className="hidden" onChange={(e) => onChangeFoto(e)} disabled={!!fotoOnLoad} />
        </label>
      </div>
    )
}

export default InputFile;