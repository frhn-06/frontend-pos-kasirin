import { FaCartShopping, FaWallet } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
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
            label: "Transaction",
            href: "/owner/transaction",
            icon: <FaWallet className="w-full h-full" />
        },
        {
            id: "store",
            label: "Store",
            href: "/owner/store",
            icon: <IoStorefront className="w-full h-full" />
        }
    ],
    cashier: [
        {
            id: "dashboard",
            label: "Dashboard",
            href: "/cashier/dashboard",
            icon: <MdSpaceDashboard className="w-full h-full" />
        },
        {
            id: "pos",
            label: "Pos",
            href: "/cashier/pos",
            icon: <FaCartShopping className="w-full h-full" />
        },
    ]
}

export default listConstant;