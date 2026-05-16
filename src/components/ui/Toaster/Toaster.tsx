import cn from "@/utils/cn";
import { Card, CardBody } from "@heroui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

interface TypeProps {
    type: string;
    message: string;
}

const Toaster = (props: TypeProps) => {
    const {
      type,
      message
    } = props;

    return (
        <div className="w-60 fixed top-4 right-4">
          <Card>
            <CardBody className="flex flex-row gap-2 items-center">
              {type === "success" ? <FaCircleCheck className="w-8 h-8 text-success" /> : <IoMdCloseCircle className="w-8 h-8 text-danger" />}
              
              <p className={cn("line-clamp-2", {"text-success" : type === "success", "text-danger" : type === "error"})}>
                {message}
              </p>
            </CardBody>
          </Card>
        </div>
    )
}

export default Toaster;