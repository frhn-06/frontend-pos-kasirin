import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner } from "@heroui/react";
import { FaEyeSlash } from "react-icons/fa";
import useRegister from "./useRegister";
import { IoEyeSharp } from "react-icons/io5";
import { Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

const Register = () => {
		const {
			hidePassword,
			onClickHide,

			control,
      handleSubmitRegister,
      errors,

      onRegister,

      isPendingRegister,
      isSuccessRegister
		} = useRegister();


		const router = useRouter();

		useEffect(() => {
			if(isSuccessRegister) router.push("/auth/register/success");
		},[isSuccessRegister])


    return (

      <Card fullWidth>
        <form onSubmit={handleSubmitRegister(onRegister)}>
          <CardHeader>
            <h1 className="font-semibold text-xl text-base">
              Daftar Akun
            </h1>
          </CardHeader>

          <CardBody className="gap-4 text-base">
            {errors?.root && (
              <p className="text-danger text-sm">
                {errors?.root?.message}
              </p>
            )}

            <Controller control={control} name="email" render={({field}) => (
              <Input {...field} label="Email" variant="bordered" isInvalid={!!errors?.email} errorMessage={errors?.email?.message} />
            )} />

            <Controller control={control} name="userName" render={({field}) => (
              <Input {...field} label="Nama User" variant="bordered" isInvalid={!!errors?.userName} errorMessage={errors?.userName?.message} />
            )} />

            <Controller control={control} name="fullName" render={({field}) => (
              <Input {...field} label="Nama Lengkap" variant="bordered" isInvalid={!!errors?.fullName} errorMessage={errors?.fullName?.message} />
            )} />

            <Controller control={control} name="password" render={({field}) => (
              <Input {...field} type={hidePassword.password ? "password" : "text"} label="Kata Sandi" variant="bordered"  isInvalid={!!errors?.password} errorMessage={errors?.password?.message} endContent={(
                <div className="flex items-center h-full">
                {hidePassword.password ? (
                  <FaEyeSlash className="cursor-pointer" onClick={() => onClickHide("password")} />
                ) : (
                  <IoEyeSharp className="cursor-pointer" onClick={() => onClickHide("password")} />
                )}
                </div>
              )} />
            )} />

            <Controller control={control} name="confirmPassword" render={({field}) => (
              <Input {...field} type={hidePassword.confirmPassword ? "password" : "text"} label="Konfirmasi Kata Sandi" variant="bordered" isInvalid={!!errors?.confirmPassword} errorMessage={errors?.confirmPassword?.message} endContent={(
                <div className="flex items-center h-full">
                {hidePassword.confirmPassword ? (
                  <FaEyeSlash className="cursor-pointer" onClick={() => onClickHide("confirmPassword")} />
                ) : (
                  <IoEyeSharp className="cursor-pointer" onClick={() => onClickHide("confirmPassword")} />
                )}
                </div>
              )} />
            )} />
            
          </CardBody>

          <CardFooter>
            <Button type="submit" fullWidth className="bg-blue-400 text-white">
              {isPendingRegister ? <Spinner size="sm" /> : "Daftar"}
            </Button>
          </CardFooter>

          <div className="px-4 pb-4">
            <p className="text-sm">
              sudah punya akun owner ? silahkan <Link href="/auth/login" className="text-blue-600 font-bold">Login disini</Link>
            </p>
          </div>
        </form>
      </Card>
		)
}

export default Register;