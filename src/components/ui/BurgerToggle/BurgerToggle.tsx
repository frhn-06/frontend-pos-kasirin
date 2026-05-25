import cn from "@/utils/cn";
import { Dispatch, SetStateAction } from "react";

interface TypeProps {
  onClick?: () => Dispatch<SetStateAction<boolean>>
  isClicked?: boolean;
}

const BurgerToggle = (props: TypeProps) => {
    const {
      isClicked = false
    } = props;


    return (
      <div className="h-5 w-7 flex-col justify-between flex lg:hidden">
        <span className={cn("h-[3px] bg-gray-800 rounded-xl transition-all duration-300", {"Burger-atas-nonactive" : !isClicked,"Burger-atas-active" : isClicked})}></span>
        <span className={cn("h-[3px] bg-gray-800 rounded-xl transition-all duration-300", {"Burger-tengah-nonactive" : !isClicked,"Burger-tengah-active" : isClicked})}></span>
        <span className={cn("h-[3px] bg-gray-800 rounded-xl transition-all duration-300", {"Burger-bawah-nonactive" : !isClicked,"Burger-bawah-active" : isClicked})}></span>
      </div>
    )
}

export default BurgerToggle;