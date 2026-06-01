import InputFile from "@/components/ui/InputFile";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddProduct from "./useAddProduct";
import { ICategory } from "@/types/category";

interface TypeProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}
const AddProduct = (props: TypeProps) => {
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
        handleSubmitProduct,
        errors,
        reset,

        isPendingCreateProduct,
        isSuccessCreateProduct,
        onCreateProduct,

        dataCategoriesInputAdd,
        isLoadingCategoriesInputAdd
    } = useAddProduct();

    useEffect(() => {
      if(isSuccessCreateProduct) {
        onClose();
        reset();
        refetch();
      }
    },[isSuccessCreateProduct]);

    const onCloseModal = () => {
      onClose();
      reset();
    }

    return (
        <Modal isOpen={isOpen} onClose={onCloseModal} placement="center">
          <form encType="multipart/form-data" onSubmit={handleSubmitProduct(onCreateProduct)}>
            <ModalContent>
              <ModalHeader>
                Tambah Produk
              </ModalHeader>

              <ModalBody>
                {errors.root && (
                  <p className="text-danger">
                    {errors.root.message}
                  </p>
                )}

                <Controller control={control} name="name" render={({field}) => (
                  <Input {...field} label="Nama" labelPlacement="outside" placeholder="nama produk" variant="bordered" isInvalid={!!errors.name} errorMessage={errors.name?.message} />
                )}/>

                <Controller control={control} name="categoryId" render={({field}) => (
                  <Select {...field} className="w-full" label="Kategori" labelPlacement="outside-top" placeholder="kategori" disallowEmptySelection variant="bordered">
                    {dataCategoriesInputAdd?.data?.map((category: ICategory) => (
                      <SelectItem key={category._id}>{category.name}</SelectItem>
                    ))}
                  </Select>
                )} />

                <Controller control={control} name="price" render={({field}) => (
                  <Input {...field} value={field.value ? field.value.toString() : ""} type="number" label="Harga" labelPlacement="outside" placeholder="Rp. " variant="bordered" isInvalid={!!errors.price} errorMessage={errors.price?.message} />
                )}/>

                <Controller control={control} name="description" render={({field}) => (
                  <Textarea {...field} value={field.value ? field.value.toString() : ""} label="Deskripsi" labelPlacement="outside" placeholder="deskripsi..." variant="bordered" isInvalid={!!errors.description} errorMessage={errors.description?.message} />
                )} />

            
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
                <Button className="bg-blue-500 text-white" type="submit">
                  {isPendingCreateProduct ? <Spinner color="default" size="sm" />: "Simpan" }
                </Button>
              </ModalFooter>
            </ModalContent>
          </form>
        </Modal>
        
    )
}

export default AddProduct;