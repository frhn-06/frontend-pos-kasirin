import { Alert, Button, Card, CardBody, Input, Skeleton, Spinner, Textarea } from "@heroui/react";
import useTabInfo from "./useTabInfo";
import { IStore } from "@/types/store";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IUser } from "@/types/auth";

interface TypeProps {
  data: IUser;
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

        isPendingUpdateInfo,
        isSuccessUpdateInfo,

        onUpdateInfo
    } = useTabInfo();

    useEffect(() => {
      if(data) {
        setValueTabInfo("userName", `${data?.userName}`);
        setValueTabInfo("fullName", `${data?.fullName}`);
        setValueTabInfo("email", `${data?.email}`);
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
              {errorsTabInfo?.root && (
                <p className="text-danger text-sm">
                  {errorsTabInfo?.root?.message}
                </p>
              )}
              <Controller control={controlTabInfo} name="userName" render={({field}) => (
                <Skeleton isLoaded={!isLoading} className="rounded-xl">
                  <Input 
                    {...field}
                    label="User Name"
                    variant="bordered"
                    isInvalid={!!errorsTabInfo?.userName}
                    errorMessage={errorsTabInfo?.userName?.message}
                  />
                </Skeleton>
              )} />
              <Controller control={controlTabInfo} name="fullName" render={({field}) => (
                <Skeleton isLoaded={!isLoading} className="rounded-xl">
                  <Input 
                    {...field}
                    label="Nama Lengkap"
                    variant="bordered"
                    isInvalid={!!errorsTabInfo?.fullName}
                    errorMessage={errorsTabInfo?.fullName?.message}
                  />
                </Skeleton>
              )} />
              <Controller control={controlTabInfo} name="email" render={({field}) => (
                <Skeleton isLoaded={!isLoading} className="rounded-xl">
                  <Input 
                    {...field}
                    label="Email"
                    variant="bordered"
                    isInvalid={!!errorsTabInfo?.email}
                    errorMessage={errorsTabInfo?.email?.message}
                    isDisabled
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