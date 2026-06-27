import { FaShoppingCart  } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { FaUserPen } from "react-icons/fa6";
import { IoReceipt } from "react-icons/io5";
import { GoFileDirectoryFill } from "react-icons/go";

const listFieatures = [
    {
        title: "Product Management",
        description: "Create, update, and organize products with categories to keep your inventory well managed.",
        icon: <AiFillProduct className="w-full h-full" />
    },
    {
        title: "Order Management",
        description: "Process customer orders quickly with an intuitive point-of-sale interface.",
        icon: <FaShoppingCart className="w-full h-full" />
    },
    {
        title: "Sales Reports",
        description: "Monitor daily sales, revenue trends, and top-selling products.",
        icon: <TbReportAnalytics className="w-full h-full" />
    },
    {
        title: "Cashier Management",
        description: "Manage cashier accounts and control access for your store staff.",
        icon: <FaUserPen className="w-full h-full" />
    },
    {
        title: "Receipt Printing",
        description: "Generate professional receipts instantly after every transaction.",
        icon: <IoReceipt className="w-full h-full" />
    },
    {
        title: "Excel Export",
        description: "Export sales and product reports for further analysis.",
        icon: <GoFileDirectoryFill className="w-full h-full" />
    },
]

export default listFieatures;