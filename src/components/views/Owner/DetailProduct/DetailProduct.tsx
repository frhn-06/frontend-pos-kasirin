import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@heroui/react";
import useDetailProduct from "./useDetailProduct";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import { ICategory } from "@/types/category";

const DetailProduct = () => {
    const {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        fotoOnLoad,
        handleChangeImg,

        dataProduct,
        isLoadingProduct,
        refetchProduct,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        handleRemoveImg,

        control,
        handleSubmitProduct,
        errors,
        setValue,

        isPendingUpdateProduct,
        isSuccessUpdateProduct,
        onUpdateProduct,

        dataCategoriesInputAdd,
        isLoadingCategoriesInputAdd

    } = useDetailProduct();

    useEffect(() => {
      if(dataProduct?.data?.data) {
        const product = dataProduct?.data?.data;
        setValue("name", product?.name);
        setValue("oldImg", product?.img);
        setValue("price", product?.price);
        setValue("categoryId", product?.categoryId);
        setValue("description", product?.description);
        setValue("img", "");
        console.log(product?.categoryId)
      }
    },[dataProduct?.data?.data])


    useEffect(() => {
      if(isSuccessUpdateProduct) {
        refetchProduct();
      }
    },[isSuccessUpdateProduct])

    return (
        <div className="py-12 px-4 lg:px-8">
          <Breadcrumbs className="mb-4" variant="bordered" radius="lg"  color="primary" size="md">
            <BreadcrumbItem href="/owner/product">Produk</BreadcrumbItem>
            <BreadcrumbItem>Detail</BreadcrumbItem>
          </Breadcrumbs>

          <form encType="multipart/form-data" onSubmit={handleSubmitProduct(onUpdateProduct)}>
            <Card className="w-full max-w-120 p-4 z-0">
              <CardBody className="gap-4">
                {errors.root && (
                  <p className="text-danger">
                    {errors.root.message}
                  </p>
                )}

                <Controller control={control} name="name" render={({field}) => (
                  <Skeleton isLoaded={!isLoadingProduct} className="rounded-2xl">
                    <Input {...field} label="Nama" labelPlacement="outside" placeholder="nama produk" variant="bordered" isInvalid={!!errors.name} errorMessage={errors.name?.message} />
                  </Skeleton>
                )}/>

                <Controller control={control} name="categoryId" render={({field}) => (
                  <Skeleton isLoaded={!!dataCategoriesInputAdd?.data} className="rounded-2xl">
                    <Select {...field} className="w-full" label="Kategori" labelPlacement="outside-top" placeholder="kategori" disallowEmptySelection variant="bordered" isInvalid={!!errors.categoryId} errorMessage={errors.categoryId?.message} selectedKeys={field.value ? [field.value] : []}>
                      {dataCategoriesInputAdd?.data?.map((category: ICategory) => (
                        <SelectItem key={category._id}>{category.name}</SelectItem>
                      ))}                   
                    </Select>
                  </Skeleton>
                )} />
                

                <Controller control={control} name="price" render={({field}) => (
                  <Skeleton isLoaded={!isLoadingProduct} className="rounded-2xl">
                    <Input {...field} type="number" value={field.value ? field.value.toString() : ""} label="Harga" labelPlacement="outside" placeholder="Rp." variant="bordered" isInvalid={!!errors.price} errorMessage={errors.price?.message} />
                  </Skeleton>
                )}/>

                <Controller control={control} name="description" render={({field}) => (
                  <Skeleton isLoaded={!isLoadingProduct} className="rounded-2xl">
                    <Textarea {...field} label="Deskripsi" labelPlacement="outside" placeholder="deskripsi..." variant="bordered" isInvalid={!!errors.description} errorMessage={errors.description?.message} />
                  </Skeleton>
                )}/>

                <div className="flex justify-center items-center p-4">
                  <div className="w-1/2">
                    <Skeleton isLoaded={!isLoadingProduct} className="rounded-2xl aspect-square">
                      <img src={`${dataProduct?.data?.data?.img}`} alt="img-produk" className="w-full rounded-xl" />
                    </Skeleton>
                  </div>
                </div>
            
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

                <Controller control={control} name="oldImg" render={({field}) => (
                  <input {...field} type="hidden" />
                )} />
                
              </CardBody>

              <CardFooter>
                <Button type="submit" className="text-white bg-blue-500" isDisabled={isPendingUpdateProduct}>
                  {isPendingUpdateProduct ? <Spinner color="default" size="sm" /> : "Simpan"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
    )
}

export default DetailProduct;