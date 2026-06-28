import { Alert, Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner, Textarea } from "@heroui/react"
import useCreateStore from "./useCreateStore"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { signOut, useSession } from "next-auth/react"

const CreateStore = () => {
    const {
        control,
        handleSubmitStore,
        errors,
        
        onCreateStore,

        isPendingStore,
        isSuccessStore,
    } = useCreateStore()

    const {update} = useSession();

    const router = useRouter();

    useEffect(() => {
      if(isSuccessStore) {
        signOut();
      }
    },[isSuccessStore])
    
    return (
      <Card fullWidth>
        <form onSubmit={handleSubmitStore(onCreateStore)}>
          <CardHeader>
            <h1 className="font-semibold text-xl text-base">
              Buat Toko / Store
            </h1>
          </CardHeader>
       
          <CardBody className="gap-4 text-base">
            <Alert
              hideIcon
              color="warning"
              title="Anda harus membuat akun toko / kedai terlebih dahulu"
              variant="faded"
            />

              {errors?.root && (
                <p className="text-danger text-sm">
                  {errors?.root?.message}
                </p>
              )}
           
            <Controller control={control} name="name" render={({field}) => (
              <Input {...field} label="Nama Store" variant="bordered" isInvalid={!!errors.name} errorMessage={errors?.name?.message} endContent={(
                <div className="h-full flex items-start">
                  <span className="text-danger">*</span>
                </div>
              )} />                        
            )} />

            <Controller control={control} name="phone" render={({field}) => (
              <Input {...field} label="Nomor Telepon" variant="bordered" isInvalid={!!errors.phone} errorMessage={errors?.phone?.message} endContent={(
                <div className="h-full flex items-start">
                  <span className="text-danger">*</span>
                </div>
              )} />             
            )} />
            
            <Controller control={control} name="address" render={({field}) => (
              <Textarea {...field} label="Alamat" variant="bordered" isInvalid={!!errors.address} errorMessage={errors?.address?.message} endContent={(
                <div className="h-full flex items-start">
                  <span className="text-danger">*</span>
                </div>
              )} /> 
            )} />

            <Controller control={control} name="descriptiom" render={({field}) => (
              <Textarea {...field} label="Deskripsi" variant="bordered" isInvalid={!!errors.descriptiom} errorMessage={errors?.phone?.message} />
            )} />  
          </CardBody>
       
          <CardFooter>
            <Button type="submit" fullWidth className="bg-blue-400 text-white">
              {isPendingStore ? <Spinner size="sm" /> : "Buat"}
            </Button>
          </CardFooter>
        </form>
      </Card> 
    )
}

export default CreateStore