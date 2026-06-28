import AuthLayout from "@/components/layouts/AuthLayout"
import Register from "@/components/views/Auth/Register";

const PageRegister = () => {
    return (
        <AuthLayout title="Register" authTitle="Register">
           <Register />
        </AuthLayout>
    )
}

export default PageRegister;