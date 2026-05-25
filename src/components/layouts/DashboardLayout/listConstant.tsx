import { FaWallet } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { MdCategory, MdOutlineRestaurantMenu, MdSpaceDashboard } from "react-icons/md";

const listConstant = {
    owner: [
        {
            id: "dashboard",
            label: "Dashboard",
            href: "admin/dashboard",
            icon: <MdSpaceDashboard className="w-full h-full" />
        },
        {
            id: "category",
            label: "Category",
            href: "admin/category",
            icon: <MdCategory className="w-full h-full" />
        },
        {
            id: "product",
            label: "Product / Menu",
            href: "admin/product",
            icon: <MdOutlineRestaurantMenu className="w-full h-full" />
        },
        {
            id: "setting",
            label: "Setting",
            href: "admin/setting",
            icon: <IoMdSettings className="w-full h-full" />
        },
        {
            id: "transaction",
            label: "transaction",
            href: "admin/transaction",
            icon: <FaWallet className="w-full h-full" />
        },

    ],
    cashier: [
        
    ]
}

export default listConstant;