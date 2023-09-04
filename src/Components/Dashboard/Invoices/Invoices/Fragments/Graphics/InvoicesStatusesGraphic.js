import {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import {Space} from "antd";
import {t} from "i18next";

function InvoiceStatusesGraphic() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null);

    const [data, setData] = useState({
        'Payed':72,
        'New':90,})

    const colors = ["#6CAE56FF", "#BF539E"];
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

    const counterforGreenDoughnut = {
        id: "counter",
        beforeDraw:(chart)=>{
            const {
                ctx,
                chartArea: { top, width, height },
            } = chart;
            ctx.save();
            ctx.font = "900 20px Roboto";
            ctx.textAlign = "center";
            ctx.fillStyle = '#000000';
            ctx.fillText(
                Object.values(data).reduce((a, b) => a + b, 0),
                width / 2,
                top + height / 2
            );
            //ctx.fillText(chart.config.data.datasets[0].data[1], width / 2, top + height / 2);
        },
    };


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
                        borderWidth: 3,
                    }))
            },
            responsive: true,
            options: {
                cutout: "45%",
                plugins: {
                    tooltip: {
                        enabled: false,
                    },
                },
            },
            plugins: [counterforGreenDoughnut]
        });
        return () => {
            appointmentChartRef?.current?.destroy()
        }
    },[])
    return(
        <Space className={'round_charts_big_div'}>
            <div  style={{height:93,width:93}}>
                <canvas id='CounterMultipleChart' ref={canvasRef}></canvas>
            </div>
            <Space></Space>
            <Space direction={'vertical'}>
                <div className={'chart_counter_bold_text'}>
                    {t('Statuses')}
                </div>
                {Object.keys(data).map((itemKey,key)=><div key={key} className={`withDot_fact WD-invoice-status-${key}`}><span className={'plan_load_jaddah'}>{itemKey}</span> <span className={'fact_percent'}>{data[itemKey]}</span> </div>)}

            </Space>
        </Space>
    )
}
export default InvoiceStatusesGraphic;