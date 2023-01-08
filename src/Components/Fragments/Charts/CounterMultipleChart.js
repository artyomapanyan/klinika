import {Chart,registerables} from "chart.js";
import {useEffect, useRef} from "react";
import {Space} from "antd";
import './ChartStyles.sass'

function CounterMultipleChart({data}) {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)
    const colors = ["#BF539E","#774D9D","#ff0000"]
    useEffect(()=>{
        if(appointmentChartRef?.current?.ctx){
            appointmentChartRef.current.config.data.datasets= Object.values(data).map((number,key)=> (
                {
                    data: [100-number,number],
                    backgroundColor: ["#F5F6FA",colors[key]],
                    weight: 0.5,
                    spacing: 0,
                    borderWidth: 2,
                }))
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
