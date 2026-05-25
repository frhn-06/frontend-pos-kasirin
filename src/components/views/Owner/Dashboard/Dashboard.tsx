import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";

const Dashboard = () => {
    return (
      <div className="w-full h-full bg-gray-100">
        <Button onPress={() => signOut()} >
          keluar
        </Button>
      </div>
    )
}


export default Dashboard;