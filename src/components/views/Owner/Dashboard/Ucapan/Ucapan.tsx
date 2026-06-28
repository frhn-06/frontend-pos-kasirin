import { IUser } from "@/types/auth";
import { Card, CardBody } from "@heroui/react"

interface TypeProps {
  user: IUser;
}
const Ucapan = (props: TypeProps) => {
    const {
      user
    } = props;
    

   

    const renderUcapan = (name:string) => {
      const hour = new Date().toLocaleString("id-ID", {
        hour: "2-digit"
      });


      if(hour === "03" || hour === "04" || hour === "05" || hour === "06" || hour === "07" || hour === "08" || hour === "09" || hour === "10" ) {
        return `⛅ Selamat Pagi ${name} 👋`;
      } else if(hour === "11" || hour === "12" || hour === "13" || hour === "14") {
        return `🌞 Selamat Siang ${name} 👋`;
      } else if(hour === "15" || hour === "16" || hour === "17" || hour === "18") {
        return `⛅ Selamat Sore ${name} 👋`;
      } else {
        return `🌛 Selamat Malam ${name} 👋`;
      }

    }

    return (
        <Card className="w-fit p-1">
          <CardBody className="gap-1">
            <h1 className="text-default-700 font-bold text-lg">
              {renderUcapan(`${user.fullName}`) }
            </h1>
            <p className="text-default-700">
              Kelola toko Anda dan pantau performa penjualan hari ini.
            </p>
          </CardBody>
        </Card>
    )
}

export default Ucapan