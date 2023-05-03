import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {postResource} from "../../../../Functions/api_calls";
import dayjs from "dayjs";
import {Chart, registerables} from "chart.js";
import {Space, Spin} from "antd";

function DrReworkedStatuses() {
    let canvasRef = useRef();
    const token = useSelector((state) => state.auth.token);
    const [data,setData] = useState({});
    let appointmentChartRef = useRef(null)
    const [loading,setLoading] = useState(true)
    const ownerClinics = useSelector((state) => state?.owner);



    let text = [null,"Confirmed", 'Finished', "Cancelled", "Rescheduled"]

    useEffect(()=>{
        setLoading(true)
        postResource('DoctorReworked','AppointmentStatuses', token,  '',{
            month:ownerClinics.month_key,
            year:dayjs().format('YYYY')
        } ).then((response) => {
            text.forEach((e,k)=>{
                if(!response.appointments[k] && e) {
                    response.appointments[k] = 0
                }
            })
            console.log(Object.values(response.appointments), 'rrrrrrrrr')

            setData(response.appointments??{})

            setLoading(false)
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
                    ctx.fillText(
                        Object.values(response.appointments).reduce((a, b) => a + b, 0),
                        width / 2,
                        top + height / 2
                    );
                },
            };
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(canvasRef.current.getContext("2d"), {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            backgroundColor: ["#BF539E","#6DAF56", "#87828E",  "#FFD850"],
                            weight: 0.5,
                            data: Object.values(response.appointments),
                            spacing: 0,
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    cutout: "75%",
                    plugins: {
                        tooltip: {
                            enabled: false,
                        },
                    },
                },
                plugins: [counterforGreenDoughnut],
            });
        })

        return () => {
            appointmentChartRef?.current?.destroy()
        }
    },[ownerClinics.month_key])

    return(
        <Spin spinning={loading}>
            <Space className={'round_charts_big_div'}>
                <div  style={{height:92,width:92}}>
                    <canvas ref={canvasRef}></canvas>
                </div>

                <Space direction={'vertical'}>
                    <div style={{marginLeft: 15}} className={'chart_counter_bold_text'}>
                        Statuses
                    </div>
                    <div>
                        {Object.keys(data).map((key)=>data[key] || data[key]==0?<Space  style={{paddingTop:10}} key={key} className={`withDot WD-colorStatuses-${key}`}><span style={{padding:10}} className={'plan_load_jaddah'}>{text[key]}</span><span className={'fact_percent'}>{data[key]}</span></Space>:null)}
                    </div>
                </Space>
            </Space>
        </Spin>

    )
}
export default DrReworkedStatuses;