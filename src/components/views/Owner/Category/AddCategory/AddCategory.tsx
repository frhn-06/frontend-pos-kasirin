import InputFile from "@/components/ui/InputFile";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react";
import useAddCategory from "./useAddCategory";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}
const AddCategory = (props: TypeProps) => {
    const {
      isOpen,
      onClose,
      refetch
    } = props;

    const {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        fotoOnLoad,
        handleChangeImg,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,

        handleRemoveImg,

        control,
        handleSubmitCategory,
        errors,
        reset,

        isPendingCreateCategory,
        isSuccessCreateCategory,
        onCreateCategory
    } = useAddCategory();

    useEffect(() => {
      if(isSuccessCreateCategory) {
        onClose();
        reset();
        refetch();
      }
    },[isSuccessCreateCategory])

    const onCloseModal = () => {
      onClose();
      reset();
    }

    return (
        <Modal isOpen={isOpen} onClose={onCloseModal} placement="center">
          <form encType="multipart/form-data" onSubmit={handleSubmitCategory(onCreateCategory)}>
            <ModalContent>
              <ModalHeader>
                Tambah Kategori
              </ModalHeader>

              <ModalBody>
                {errors.root && (
                  <p className="text-danger">
                    {errors.root.message}
                  </p>
                )}

                <Controller control={control} name="name" render={({field}) => (
                  <Input {...field} label="Nama" labelPlacement="outside" placeholder="nama kategori" variant="bordered" isInvalid={!!errors.name} errorMessage={errors.name?.message} />
                )}/>

            
                <Controller control={control} name="img" render={({field}) => (
                  <InputFile 
                    {...field}
                    fotoOnLoad={typeof fotoOnLoad === "string" ? fotoOnLoad : ""}
                    onChangeImg={handleChangeImg}
                    isPendingAdd={isPendingAddOneImage}
                    isSuccessAdd={isSuccessAddOneImage}

                    onRemoveImg={handleRemoveImg}
                    isPendingRemove={isPendingRemoveOneImage}
                    isSuccessRemove={isSuccessRemoveOneImage}
          
                    onChange={field.onChange}

                    isInvalid={!!errors.name} 
                    errorMessage={errors.name?.message}

                    
                  />
                )} />
                
              </ModalBody>

              <ModalFooter>
                <Button variant="flat" color="warning" onPress={onCloseModal}>
                  Kembali
                </Button>
                <Button className="bg-blue-500 text-white" type="submit" isDisabled={isPendingCreateCategory}>
                  {isPendingCreateCategory ? <Spinner color="default" size="sm" />: "Simpan" }
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        
    )
}

export default AddCategory;