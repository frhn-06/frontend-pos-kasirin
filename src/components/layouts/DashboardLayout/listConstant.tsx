import { FaWallet } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdCategory, MdOutlineRestaurantMenu, MdSpaceDashboard } from "react-icons/md";

const listConstant = {
    owner: [
        {
            id: "dashboard",
            label: "Dashboard",
            href: "/owner/dashboard",
            icon: <MdSpaceDashboard className="w-full h-full" />
        },
        {
            id: "category",
            label: "Category",
            href: "/owner/category",
            icon: <MdCategory className="w-full h-full" />
        },
        {
            id: "product",
            label: "Product / Menu",
            href: "/owner/product",
            icon: <MdOutlineRestaurantMenu className="w-full h-full" />
        },
        {
            id: "setting",
            label: "Setting",
            href: "/owner/setting",
            icon: <IoMdSettings className="w-full h-full" />
        },
        {
            id: "transaction",
            label: "transaction",
            href: "/owner/transaction",
            icon: <FaWallet className="w-full h-full" />
        },

    ],
    cashier: [
        
    ]
}

export default listConstant;