import {useEffect, useRef} from "react";
import {Chart,registerables} from "chart.js";
import {Space} from "antd";

function CounterOrangeChart({data}) {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)


    const counterforOrangeDoughnut = {
        id: "counter",
        beforeDraw(chart) {
            const {
                ctx,
                chartArea: { top, width, height },
            } = chart;
            ctx.save();
            ctx.font = "700 22px Roboto Bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(245, 163, 72, 1)";
            ctx.fillText(chart.config.data.datasets[0].data[1], width / 2, top + height / 2);
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
                        backgroundColor: ["#F5F6FA", "#F5A348"],
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
            plugins: [counterforOrangeDoughnut],
        });
        return () => {
            appointmentChartRef.current.destroy()
        }
    },[])

    return(
        <Space style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <div  style={{height:92,width:92}}>
                <canvas ref={canvasRef}></canvas>
            </div>
            <Space></Space>
            <Space direction={'vertical'}>
                <div className={'chart_counter_bold_text'}>
                    Clinic name
                </div>
                <div> Avg. monthly </div>
                <div>clinic rating </div>
            </Space>
        </Space>
    )
}
export default CounterOrangeChart;
