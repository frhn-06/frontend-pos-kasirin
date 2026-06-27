import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const listFooter = {
    quickLinks: [
        {
            link: "#home",
            label: "Home"
        },
        {
            link: "#features",
            label: "Features"
        },
        {
            link: "#how",
            label: "How It Works"
        },
    ],

    resources: [
        {
            link: "https://github.com/frhn-06",
            icon: <FaGithub className="w-full h-full" />,
            label: "Github"
        },
        {
            link: "mailto:farhanmunif233@gmail.com",
            icon: <MdEmail className="w-full h-full" />,
            label: "Email"
        },
        {
            link: "https://www.linkedin.com/in/farhan-munif-0167992b9/",
            icon: <FaLinkedin className="w-full h-full" />,
            label: "LinkedIn"
        },
       
    ]
}

export default listFooter;