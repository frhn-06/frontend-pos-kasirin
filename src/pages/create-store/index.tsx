import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

const PageCreateStore = () => {
    return (
        <div>
            <div>
                create store
            </div>

            <Button onPress={() => signOut()}>
                Keluar
            </Button>
        </div>
    )
}

export default PageCreateStore;