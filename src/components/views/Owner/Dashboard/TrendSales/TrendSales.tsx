import { ITrendSalesDashboardOwner } from "@/types/dashboard"
import convert from "@/utils/convert";
import { Card, CardBody } from "@heroui/react"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface TypeProps {
  data: ITrendSalesDashboardOwner[];
}

const TrendSales = (props: TypeProps) => {
    const {
      data
    } = props;

    const lineCharts = data.map((item) => {
      return {
        ...item,
        day: convert.Day(`${item.date}`)
      }
    });

    return (
        <Card>
          <CardBody>
            <ResponsiveContainer  
            width="100%" 
            height={300} 
            >
              <LineChart 
              data={lineCharts} 
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}>
                <CartesianGrid strokeDasharray="3 3" />

                <Tooltip formatter={(value) => convert.IDR(Number(value))} />

                <XAxis dataKey="day" />

                <YAxis />

                <Line 
                dataKey="totalSales"  
                type="monotone" 
                stroke="#006FEE" 
                strokeWidth={3} 
                dot 
                animationDuration={3000}
                isAnimationActive={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
    )
}

export default TrendSales;