import { Button, Card, CardBody, CardFooter, CardHeader, Input, Spinner } from "@heroui/react"
import { FaEyeSlash } from "react-icons/fa6"
import useLogin from "./useLogin"
import { IoEyeSharp } from "react-icons/io5";
import { Controller } from "react-hook-form";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Login = () => {
    const {
      hidePassword,
      onClickHide,

      control,
      errors,
      handleSubmitLogin,

      isSuccessLogin,
      isPendingLogin,

      onLogin
    } = useLogin();

    const router = useRouter();

    useEffect(() => {
      if(isSuccessLogin) {
        router.push(`/dashboard`)
      }
    },[isSuccessLogin])


    return (
        <Card fullWidth>
          <form onSubmit={handleSubmitLogin(onLogin)}>
            <CardHeader>
              <h1 className="font-semibold text-xl text-base">
                Login Akun
              </h1>
            </CardHeader>

            <CardBody className="gap-4 text-base">
              {errors?.root && (
                <p className="text-danger text-sm">
                  {errors?.root?.message}
                </p>
              )}

              <Controller control={control} name="identifier" render={({field}) => (
                <Input {...field} label="Email / User Name" variant="bordered" isInvalid={!!errors?.identifier} errorMessage={errors?.identifier?.message} />              
              )} />

              <Controller control={control} name="password" render={({field}) => (
                <Input {...field} type={hidePassword ? "password" : "text"} label="Kata Sandi" variant="bordered" isInvalid={!!errors?.password} errorMessage={errors?.password?.message} endContent={(
                  <div className="flex items-center h-full">
                    {hidePassword ? 
                      <FaEyeSlash className="cursor-pointer" onClick={onClickHide} /> :
                      <IoEyeSharp className="cursor-pointer" onClick={onClickHide} />
                    }
                  </div>
                )} />
              )} />

            </CardBody>

            <CardFooter>
              <Button type="submit" fullWidth className="bg-blue-400 text-white">
                {isPendingLogin ? <Spinner size="sm" /> : "Login"}
              </Button>
            </CardFooter>
            
            <div className="px-4 pb-4">
              <p className="text-sm">
                belum punya akun ? silahkan <Link href="/auth/register" className="text-blue-600 font-bold">Daftar disini</Link>
              </p>
            </div>
          </form>
        </Card>
    )
}


export default Login