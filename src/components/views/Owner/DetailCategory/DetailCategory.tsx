import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, CardFooter, Input, Skeleton, Spinner } from "@heroui/react";
import useDetailCategory from "./useDetailCategory";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";

const DetailCategory = () => {
    const {
        isPendingAddOneImage,
        isSuccessAddOneImage,

        fotoOnLoad,
        handleChangeImg,

        dataCategory,
        isLoadingCategory,
        refetchCategory,

        isPendingRemoveOneImage,
        isSuccessRemoveOneImage,
        handleRemoveImg,

        control,
        handleSubmitCategory,
        errors,
        setValue,

        isPendingUpdateCategory,
        isSuccessUpdateCategory,
        onUpdateCategory,

    } = useDetailCategory();

    useEffect(() => {
      if(dataCategory?.data?.data) {
        const category = dataCategory?.data?.data;
        setValue("name", category?.name);
        setValue("oldImg", category?.img);
        setValue("img", "");
      }
    },[dataCategory?.data?.data])


    useEffect(() => {
      if(isSuccessUpdateCategory) {
        refetchCategory();
      }
    },[isSuccessUpdateCategory])

    return (
        <div className="py-12 px-4 lg:px-8">
          <Breadcrumbs className="mb-4" variant="bordered" radius="lg"  color="primary" size="md">
            <BreadcrumbItem href="/owner/category">Kategori</BreadcrumbItem>
            <BreadcrumbItem>Detail</BreadcrumbItem>
          </Breadcrumbs>

          <form encType="multipart/form-data" onSubmit={handleSubmitCategory(onUpdateCategory)}>
            <Card className="w-full max-w-120 p-4 z-0">
              <CardBody>
                {errors.root && (
                  <p className="text-danger">
                    {errors.root.message}
                  </p>
                )}

                <Controller control={control} name="name" render={({field}) => (
                  <Skeleton isLoaded={!isLoadingCategory} className="rounded-2xl">
                    <Input {...field} label="Nama" labelPlacement="outside" placeholder="nama kategori" variant="bordered" isInvalid={!!errors.name} errorMessage={errors.name?.message} />
                  </Skeleton>
                )}/>

                <div className="flex justify-center items-center p-4">
                  <div className="w-1/2">
                    <Skeleton isLoaded={!isLoadingCategory} className="rounded-2xl aspect-square">
                      <img src={`${dataCategory?.data?.data?.img}`} alt="img-category" className="w-full rounded-xl" />
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
                <Button type="submit" className="text-white bg-blue-500" isDisabled={isPendingUpdateCategory}>
                  {isPendingUpdateCategory ? <Spinner color="default" size="sm" /> : "Simpan"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
    )
}

export default DetailCategory;