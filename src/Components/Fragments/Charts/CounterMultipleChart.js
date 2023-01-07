import {Chart,registerables} from "chart.js";
import {useEffect, useRef} from "react";
import {Space} from "antd";
import './ChartStyles.sass'

function CounterMultipleChart({data}) {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    // let incomeChannelData = [43.3, 28.3, 28.4];
    const colors = ["#BF539E","#774D9D","#ff0000"]

    // const counterforIncomeChannel = {
    //     id: "counter",
    //     beforeDraw(chart, args, opions) {
    //         const {
    //             ctx,
    //             chartArea: { top, right, bottom, left, width, height },
    //         } = chart;
    //         ctx.save();
    //         ctx.font = "700 24px Roboto Bold";
    //         ctx.textAlign = "center";
    //         ctx.fillStyle = "#BF539E";
    //         ctx.fillText(
    //             incomeChannelData[0] + "%",
    //             width / 2,
    //             top + height / 2 - 10
    //         );
    //         ctx.restore();
    //
    //         ctx.font = "700 18px Roboto Bold";
    //         ctx.textAlign = "center";
    //         ctx.fillStyle = "#6DAF56";
    //         ctx.fillText(
    //             incomeChannelData[1] + "%",
    //             width / 2,
    //             top + height / 2 + 22
    //         );
    //
    //         ctx.strokeStyle = "rgba(225, 220, 231, 1)";
    //         ctx.strokeRect(width / 2 - 35, height / 2 + 25, width / 2 - 40, 1);
    //         ctx.restore();
    //     },
    // };


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
                datasets: Object.values(data).map((number,key)=> (
                    {
                        data: [100-number,number],
                        backgroundColor: ["#F5F6FA",colors[key]],
                        weight: 0.5,
                        spacing: 0,
                        borderWidth: 2,
                    }))
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
        <Space style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div  style={{height:92,width:92}}>
                <canvas ref={canvasRef}></canvas>
            </div>
            <Space></Space>
            <Space direction={'vertical'}>
                <div className={'chart_counter_bold_text'}>
                    Fact/Plan load
                </div>
                {Object.keys(data).map((itemKey,key)=><div key={key} className={`withDot WD-color-${key}`}>{itemKey} {data[itemKey]} %</div>)}

            </Space>
        </Space>
    )
}
export default CounterMultipleChart;
