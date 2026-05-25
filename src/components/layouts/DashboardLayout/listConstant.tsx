import { FaWallet } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdCategory, MdOutlineRestaurantMenu, MdSpaceDashboard } from "react-icons/md";

const listConstant = {
    owner: [
        {
            id: "dashboard",
            label: "Dashboard",
            href: "/dashboard",
            icon: <MdSpaceDashboard className="w-full h-full" />
        },
        {
            id: "category",
            label: "Category",
            href: "/category",
            icon: <MdCategory className="w-full h-full" />
        },
        {
            id: "product",
            label: "Product / Menu",
            href: "/product",
            icon: <MdOutlineRestaurantMenu className="w-full h-full" />
        },
        {
            id: "setting",
            label: "Setting",
            href: "/setting",
            icon: <IoMdSettings className="w-full h-full" />
        },
        {
            id: "transaction",
            label: "transaction",
            href: "/transaction",
            icon: <FaWallet className="w-full h-full" />
        },

    ],
    cashier: [
        
    ]
}

export default listConstant;