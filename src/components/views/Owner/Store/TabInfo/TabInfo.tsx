import { Alert, Button, Card, CardBody, Input, Skeleton, Spinner, Textarea } from "@heroui/react";
import useTabInfo from "./useTabInfo";
import { IStore } from "@/types/store";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface TypeProps {
  data: IStore;
  refetch: () => void;
  isLoading: boolean;
}

const TabInfo = (props: TypeProps) => {
    const {
      data,
      isLoading,
      refetch
    } = props;

    const {
        controlTabInfo,
        handleSubmitTabInfo,
        errorsTabInfo,
        setValueTabInfo,
        getValuesTabInfo,

        isPendingUpdateInfo,
        isSuccessUpdateInfo,

        onUpdateInfo
    } = useTabInfo();

    useEffect(() => {
      if(data) {
        setValueTabInfo("name", `${data?.name}`);
        setValueTabInfo("phone", `${data?.phone}`);
        setValueTabInfo("address", `${data?.address}`);
        setValueTabInfo("description", `${data?.description}`);
      }
    },[data]);

    useEffect(() => {
      if(isSuccessUpdateInfo) {
        refetch();
      }
    },[isSuccessUpdateInfo])

    return (
        <Card className="z-0">
          <form onSubmit={handleSubmitTabInfo(onUpdateInfo)}>
            <CardBody className="gap-4">
              {!getValuesTabInfo("description") && (
                <Alert color="warning">
                  Anda belum mengisi deskripsi
                </Alert>
              )}
              {errorsTabInfo?.root && (
                <p className="text-danger text-sm">
                  {errorsTabInfo?.root?.message}
                </p>
              )}
              <Controller control={controlTabInfo} name="name" render={({field}) => (
                <Skeleton isLoaded={!isLoading}>
                  <Input 
                    {...field}
                    label="Name"
                    variant="bordered"
                    isInvalid={!!errorsTabInfo?.name}
                    errorMessage={errorsTabInfo?.name?.message}
                  />
                </Skeleton>
              )} />
              <Controller control={controlTabInfo} name="address" render={({field}) => (
                <Skeleton isLoaded={!isLoading}>
                  <Input 
                    {...field}
                    label="Alamat"
                    variant="bordered"
                    isInvalid={!!errorsTabInfo?.address}
                    errorMessage={errorsTabInfo?.address?.message}
                  />
                </Skeleton>
              )} />
              <Controller control={controlTabInfo} name="phone" render={({field}) => (
                <Skeleton isLoaded={!isLoading}>
                  <Input 
                    {...field}
                    label="No. HP"
                    variant="bordered"
                    isInvalid={!!errorsTabInfo?.phone}
                    errorMessage={errorsTabInfo?.phone?.message}
                  />
                </Skeleton>
              )} />
              <Controller control={controlTabInfo} name="description" render={({field}) => (
                <Skeleton isLoaded={!isLoading}>
                  <Textarea 
                    {...field}
                    label="Deskripsi"
                    variant="bordered"
                    isInvalid={!!errorsTabInfo?.description}
                    errorMessage={errorsTabInfo?.description?.message}
                  />
                </Skeleton>
              )} />

              <Button type="submit" className="bg-blue-500 text-white" disabled={isPendingUpdateInfo} >
                {isPendingUpdateInfo ? <Spinner size="sm" color="default" /> : "Simpan"}
              </Button>
            </CardBody>
          </form>
        </Card>
    )
}

export default TabInfo;