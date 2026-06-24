import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddCashier from "./useAddCashier";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}
const AddCashier = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      refetch
    } = props;

    const {
        control,
        handleSubmitCashier,
        errors,
        reset,

        isPendingCreateCashier,
        isSuccessCreateCashier,
        onCreateCashier,

        merem,
        setMeremMelek
    } = useAddCashier();

    useEffect(() => {
      if(isSuccessCreateCashier) {
        onClose();
        reset();
        refetch();
      }
    },[isSuccessCreateCashier])

    const onCloseModal = () => {
      onClose();
      reset();
    }

    return (
        <Modal isOpen={isOpen} onClose={onCloseModal} placement="center">
          <form onSubmit={handleSubmitCashier(onCreateCashier)}>
            <ModalContent>
              <ModalHeader>
                Buat Cashier
              </ModalHeader>

              <ModalBody>
                {errors.root && (
                  <p className="text-danger">
                    {errors.root.message}
                  </p>
                )}

                <Controller 
                  control={control} 
                  name="fullName" 
                  render={({field}) => (
                    <Input 
                      {...field} 
                      label="Nama Lengkap" 
                      labelPlacement="outside"
                      placeholder="nama kategori" 
                      variant="bordered" 
                      isInvalid={!!errors.fullName} 
                      errorMessage={errors.fullName?.message} 
                    />
                )}/>

                <Controller 
                  control={control} 
                  name="userName" 
                  render={({field}) => (
                    <Input 
                      {...field} 
                      label="Nama Pengguna" 
                      labelPlacement="outside"
                      placeholder="nama kategori" 
                      variant="bordered" 
                      isInvalid={!!errors.userName} 
                      errorMessage={errors.userName?.message} 
                    />
                )}/>

                <Controller 
                  control={control} 
                  name="email" 
                  render={({field}) => (
                    <Input 
                      {...field} 
                      label="Email" 
                      labelPlacement="outside"
                      placeholder="nama kategori" 
                      variant="bordered" 
                      isInvalid={!!errors.email} 
                      errorMessage={errors.email?.message} 
                    />
                )}/>

                <Controller 
                  control={control} 
                  name="password" 
                  render={({field}) => (
                    <Input 
                      {...field} 
                      type={merem.password ? "password" : "text"} label="Kata Sandi" 
                      labelPlacement="outside"
                      placeholder="nama kategori" 
                      variant="bordered" 
                      isInvalid={!!errors.password} 
                      errorMessage={errors.password?.message} 
                      endContent={(
                        <div className="h-full flex justify-center items-center" 
                          onClick={() => setMeremMelek("password")}
                        >
                          {merem.password ? <FaEyeSlash /> : <IoEyeSharp />}
                        </div>
                      )} 
                    />
                  )
                }/>

                <Controller 
                  control={control} 
                  name="confirmPassword" 
                  render={({field}) => (
                    <Input 
                      {...field} 
                      type={merem.confirmPassword ? "password" : "text"} label="Konfirmasi Kata Sandi" 
                      labelPlacement="outside"
                      placeholder="nama kategori" 
                      variant="bordered" 
                      isInvalid={!!errors.confirmPassword} 
                      errorMessage={errors.confirmPassword?.message} 
                      endContent={(
                        <div className="h-full flex justify-center items-center" 
                          onClick={() => setMeremMelek("confirmPassword")}
                        >
                          {merem.confirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                        </div>
                      )} 
                    />
                  )
                }/>

            
                
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" color="warning" onPress={onCloseModal}>
                  Kembali
                </Button>
                <Button className="bg-blue-500 text-white" type="submit" disabled={isPendingCreateCashier}>
                  {isPendingCreateCashier ? <Spinner color="default" size="sm" />: "Simpan" }
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        
    )
}

export default AddCashier;