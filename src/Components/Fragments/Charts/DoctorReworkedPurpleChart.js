import {useEffect, useRef} from "react";
import {Chart,registerables} from "chart.js";
import {Space} from "antd";

function DoctorReworkedPurpleChart({data}) {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    const counterforGreenDoughnut = {
        id: "counter",
        beforeDraw:(chart)=>{
            const {
                ctx,
                chartArea: { top, width, height },
            } = chart;
            ctx.save();
            ctx.font = "700 22px Roboto Bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(191, 83, 158, 1)";
            ctx.fillText(`${chart.config.data.datasets[0].data[1]}%`, width / 2, top + height / 2);
        },
    };
    useEffect(()=>{
        if(appointmentChartRef?.current?.ctx){
            appointmentChartRef.current.config.data.datasets[0].data = data
            appointmentChartRef.current.update()
        }
    },[data])



    useEffect(()=>{
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(canvasRef.current.getContext("2d"), {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        backgroundColor: ["#F5F6FA", "rgba(191, 83, 158, 1)"],
                        weight: 0.5,
                        data: data,
                        spacing: 0,
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                cutout: "75%",
            },
            plugins: [counterforGreenDoughnut],
        });
        return () => {
            appointmentChartRef.current.destroy()
        }
    },[])

    return(
        <Space style={{display:"flex", alignItems:"center"}}>
            <div  style={{height:92,width:92}}>
                <canvas ref={canvasRef}></canvas>
            </div>
            <Space></Space>
            <Space direction={'vertical'}>
                <div>Patients </div>
                <div>satisfaction</div>
            </Space>
        </Space>
    )
}
export default DoctorReworkedPurpleChart;
