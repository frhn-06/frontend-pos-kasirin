import SuccessRegisterLayout from "@/components/layouts/SuccessRegisterLayout/SuccessRegisterLayout";
import Image from "next/image";

const PageRegisterSuccess = () => {
    return (
        <SuccessRegisterLayout title="register success">
          <div className="p-4 flex flex-col gap-4 justify-center items-center">
            <div className="w-1/2">
              <Image src={`/auth/success.png`} alt="success" width={720} height={720} className="w-full" />
            </div>
            <div>
              <h1 className="font-semibold text-lg text-blue-500 text-center">
                  Success Regitration
              </h1>
              <p className="text-blue-500 text-center">
                  please Check and open your email for activation account 📩
              </p>
            </div>
          </div>
        </SuccessRegisterLayout>
    )
}

export default PageRegisterSuccess;