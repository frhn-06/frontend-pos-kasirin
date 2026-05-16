import AuthLayout from "@/components/layouts/AuthLayout"
import Register from "@/components/views/Auth/Register";

const PageRegister = () => {
    return (
        <AuthLayout title="register">
           <Register />
        </AuthLayout>
    )
}

export default PageRegister;