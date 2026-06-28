import { Button, Card, CardBody, Skeleton, Spinner } from "@heroui/react"
import Image from "next/image";
import useTabAvatar from "./useTabAvatar";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import convert from "@/utils/convert";

interface TypeProps {
  data: string;
  name: string;
  isLoading: boolean;
  refetch: () => void;
}

const TabAvatar = (props: TypeProps) => {
    const {
      data,
      name,
      isLoading,
      refetch
    } = props;

    const {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        
        controlTabAvatar,
        handleSubmitTabAvatar,
        errorsTabAvatar,

        fotoOnLoad,

        handleChangeImg,
        handleRemoveImg,

        isPendingUpdateAvatar,
        isSuccessUpdateAvatar,
        
        onUpdateAvatar
    } = useTabAvatar();

    useEffect(() => {
      if(isSuccessUpdateAvatar) refetch()
    },[isSuccessUpdateAvatar])



    useEffect(() => {
      console.log(data)
    },[data])

    console.log("data ", data)
    return (
        <Card className="z-0">
          <form encType="multipart/form-data" onSubmit={handleSubmitTabAvatar(onUpdateAvatar)}>
            <CardBody className="gap-6">
              <div className="flex justify-center items-center py-8">
                <div className="w-1/3 aspect-square rounded-full overflow-hidden">
                  {isLoading ? (
                    <Skeleton isLoaded={!isLoading} className="w-full h-full rounded-full" />
                  ) : typeof data === "string" ? (     
                               
                    <Image src={`${data}`} alt="avtStore" className="w-full rounded-xl" width={1080} height={1080} />
                  ) : data === null && (
                    <div className="w-full h-full flex justify-center items-center bg-gray-200">
                      <p className="text-5xl">
                        {convert.Acronym(`${name}`)}
                      </p>
                    </div>
                  )}
                </div>
              </div>


              <div>
                {errorsTabAvatar?.root && (
                  <p className="text-danger text-sm my-2">
                    {errorsTabAvatar?.root?.message}
                  </p>
                )}

                <Controller control={controlTabAvatar} name="avatar" render={({field}) => (
                  <InputFile
                    {...field}
                    fotoOnLoad={typeof fotoOnLoad === "string" ? fotoOnLoad : ""}
      
                    onChangeImg={handleChangeImg}
                    onRemoveImg={handleRemoveImg}
      
                    isPendingAdd={isPendingAddOneImage}
                    isPendingRemove={isPendingRemoveOneImage}
      
                    isSuccessAdd={isSuccessAddOneImage}
                    isSuccessRemove={isSuccessRemoveOneImage}
      
                    onChange={field.onChange}
                    
                    isInvalid={!!errorsTabAvatar?.avatar}
                    errorMessage={errorsTabAvatar?.avatar?.message}
                  />
                )} />
              </div>

              <Button type="submit" className="bg-blue-500 text-white" isDisabled={typeof fotoOnLoad !== "string" || isPendingUpdateAvatar}>
                {isPendingUpdateAvatar ? <Spinner size="sm" color="default" /> : "Simpan" }
              </Button>
            </CardBody>
          </form>
        </Card>        

        
    )
}

export default TabAvatar