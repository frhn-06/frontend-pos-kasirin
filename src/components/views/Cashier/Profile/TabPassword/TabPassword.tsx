import { Button, Card, CardBody, Input, Skeleton, Spinner } from "@heroui/react";
import useTabPassword from "./useTabPassword";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface TypeProps {
  refetch: () => void;
}

const TabPasssword = (props: TypeProps) => {
    const {
      refetch
    } = props;

    const {
        controlTabPassword,
        handleSubmitTabPassword,
        errorsTabPassword,
        setValueTabPassword,

        isPendingUpdatePassword,
        isSuccessUpdatePassword,

        onUpdatePassword
    } = useTabPassword();


    useEffect(() => {
      if(isSuccessUpdatePassword) {
        refetch();
        setValueTabPassword("oldPassword", "");
        setValueTabPassword("newPassword", "");
        setValueTabPassword("confirmNewPassword", "");
      }
    },[isSuccessUpdatePassword])

    return (
        <Card>
          <form onSubmit={handleSubmitTabPassword(onUpdatePassword)}>
            <CardBody className="gap-4">
              {errorsTabPassword?.root && (
                <p className="text-danger text-sm">
                  {errorsTabPassword?.root?.message}
                </p>
              )}
              <Controller control={controlTabPassword} name="oldPassword" render={({field}) => (
                <Input 
                  {...field}
                  type="password"
                  label="Password Lama"
                  variant="bordered"
                  isInvalid={!!errorsTabPassword?.oldPassword}
                  errorMessage={errorsTabPassword?.oldPassword?.message}
                />
              )} />
              <Controller control={controlTabPassword} name="newPassword" render={({field}) => (
                <Input 
                  {...field}
                  type="password"
                  label="Password Baru"
                  variant="bordered"
                  isInvalid={!!errorsTabPassword?.newPassword}
                  errorMessage={errorsTabPassword?.newPassword?.message}
                />
              )} />
              <Controller control={controlTabPassword} name="confirmNewPassword" render={({field}) => (
                <Input 
                  {...field}
                  type="password"
                  label="Konfirmasi Password"
                  variant="bordered"
                  isInvalid={!!errorsTabPassword?.confirmNewPassword}
                  errorMessage={errorsTabPassword?.confirmNewPassword?.message}
                />
              )} />

              <Button type="submit" className="bg-blue-500 text-white" disabled={isPendingUpdatePassword} >
                {isPendingUpdatePassword ? <Spinner size="sm" color="default" /> : "Simpan"}
              </Button>
            </CardBody>
          </form>
        </Card>
    )
}

export default TabPasssword;