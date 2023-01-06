import {Chart,registerables} from "chart.js";
import {useEffect, useRef} from "react";
import {Space} from "antd";
import './ChartStyles.sass'

function CounterMultipleChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    let incomeChannelData = [43.3, 28.3, 28.4];

    const counterforIncomeChannel = {
        id: "counter",
        beforeDraw(chart, args, opions) {
            const {
                ctx,
                chartArea: { top, right, bottom, left, width, height },
            } = chart;
            ctx.save();
            ctx.font = "700 24px Roboto Bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "#BF539E";
            ctx.fillText(
                incomeChannelData[0] + "%",
                width / 2,
                top + height / 2 - 10
            );
            ctx.restore();

            ctx.font = "700 18px Roboto Bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "#6DAF56";
            ctx.fillText(
                incomeChannelData[1] + "%",
                width / 2,
                top + height / 2 + 22
            );

            ctx.strokeStyle = "rgba(225, 220, 231, 1)";
            ctx.strokeRect(width / 2 - 35, height / 2 + 25, width / 2 - 40, 1);
            ctx.restore();
        },
    };



    useEffect(()=>{
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(canvasRef.current.getContext("2d"), {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        data: [33.7, 67.3],
                        backgroundColor: ["#F5F6FA", "#BF539E"],
                        weight: 0.5,
                        spacing: 0,
                        borderWidth: 2,
                    },
                    {
                        data: [13, 87],
                        backgroundColor: ["#F5F6FA", "#774D9D"],
                        weight: 0.5,
                        spacing: 0,
                        borderWidth: 3,
                    },
                ],
            },
            responsive: true,
            options: {
                cutout: "45%",
            },
        });
        return () => {
            appointmentChartRef.current.destroy()
        }
    },[])
    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div  style={{height:92,width:92}}>
                <canvas ref={canvasRef}></canvas>
            </div>
            <Space direction={'vertical'}>
                <div>
                    Fact/Plan load
                </div>
                <div className={'withDot WD-lightpurple'}>Jeddah clinic 67.3% </div>
                <div className={'withDot WD-purple'}>Clinic name 87%</div>
            </Space>
        </div>
    )
}
export default CounterMultipleChart;