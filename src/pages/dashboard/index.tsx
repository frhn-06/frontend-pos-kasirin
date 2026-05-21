import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

const PageDashboard = () => {
    return (
        <section>
            <div>
                dashboard
            </div>

            <Button onPress={() => signOut()} >
                keluar
            </Button>

        </section>
    )
}

export default PageDashboard;