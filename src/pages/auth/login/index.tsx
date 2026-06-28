import AuthLayout from "@/components/layouts/AuthLayout";
import Login from "@/components/views/Auth/Login";

const PageLogin = () => {
    return (
        <AuthLayout title="Login" authTitle="Login">
          <Login />
        </AuthLayout>
    )
}



export default PageLogin;
