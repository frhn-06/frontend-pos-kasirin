import { Button, Card, CardBody, Skeleton, Spinner } from "@heroui/react";
import Image from "next/image";
import useTabLogo from "./useTabLogo";
import InputFile from "@/components/ui/InputFile";
import { Controller } from "react-hook-form";
import { useEffect } from "react";


interface TypeProps {
  data: string;
  isLoading: boolean;
  refetch: () => void;
}
const TabLogo = (props: TypeProps) => {
    const {
      data,
      isLoading,
      refetch
    } = props;

    const {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        
        controlTabLogo,
        handleSubmitTabLogo,
        errorsTabLogo,

        fotoOnLoad,

        handleChangeImg,
        handleRemoveImg,

        isPendingUpdateLogo,
        isSuccessUpdateLogo,
        
        onUpdateLogo  
    } = useTabLogo();

    useEffect(() => {
      if(isSuccessUpdateLogo) {
        refetch();
        
      }
    },[isSuccessUpdateLogo]);

    return (
        <Card className="z-0">
          <form encType="multipart/form-data" onSubmit={handleSubmitTabLogo(onUpdateLogo)}>
            <CardBody className="gap-6">
              <div className="flex justify-center items-center py-8">
                <div className="w-1/3">
                  {isLoading ? (
                    <Skeleton isLoaded={!isLoading} className="w-full h-1/2 rounded-xl" />
                  ) : (                  
                    <Image src={`${data}`} alt="avtStore" className="w-full rounded-xl" width={1080} height={1080} />
                  )}
                </div>
              </div>



              
              <div>
                {errorsTabLogo?.root && (
                  <p className="text-danger text-sm my-2">
                    {errorsTabLogo?.root?.message}
                  </p>
                )}

                <Controller control={controlTabLogo} name="logo" render={({field}) => (
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
                    
                    isInvalid={!!errorsTabLogo?.logo}
                    errorMessage={errorsTabLogo?.logo?.message}
                  />
                )} />
              </div>

              <Button type="submit" className="bg-blue-500 text-white" isDisabled={typeof fotoOnLoad !== "string"}>
                {isPendingUpdateLogo ? <Spinner size="sm" color="default" /> : "Simpan" }
              </Button>
            </CardBody>
          </form>
        </Card>
    )
}

export default TabLogo;