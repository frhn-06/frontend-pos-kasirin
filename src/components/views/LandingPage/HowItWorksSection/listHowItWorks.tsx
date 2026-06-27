import { SiAnycubic } from "react-icons/si";
import { MdOutlineShoppingCart } from "react-icons/md";
import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";

const listHowItWork = [
    {
        id: 1,
        key: "Setup",
        title: "Add Products",
        description: "Create products and organize them into categories to build your store catalog.",
        icon: <SiAnycubic className="w-full h-full" />
    },
    {
        id: 2,
        key: "Checkout",
        title: "Create Orders",
        description: "Process customer transactions quickly through the POS interface.",
        icon: <MdOutlineShoppingCart className="w-full h-full" />
    },
    {
        id: 3,
        key: "Receipt",
        title: "Print Receipt",
        description: "Generate a professional receipt instantly after payment.",
        icon: <RiMoneyDollarBoxLine className="w-full h-full" />
    },
    {
        id: 4,
        key: "Analytics",
        title: "View Reports",
        description: "Monitor sales, revenue, and top products from the dashboard.",
        icon: <FaChartBar className="w-full h-full" />
    }
]

export default listHowItWork;