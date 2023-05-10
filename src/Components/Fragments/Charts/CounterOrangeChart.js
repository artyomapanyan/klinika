import {useEffect, useRef, useState} from "react";
import {Chart,registerables} from "chart.js";
import {Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import dayjs from "dayjs";

function CounterOrangeChart() {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);
    const [loading, setLoading] = useState(true);

    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    let date = new Date().getFullYear().toString()
    const [data,setData] = useState([0,0]);
    const [responseState,setResponseState] = useState({});

    useEffect(() => {
        setLoading(true)
        postResource('ClinicOwner','OwnerClinicMontlyRating', token,  ownerClinics?.id, {year:date, month: ownerClinics?.month_key}).then((response) => {
            setResponseState(response)
            let arr = []
            arr.push(+((+response?.avg_rating).toFixed(1)));
            arr.unshift(+((5 - (+response?.avg_rating)).toFixed(1)))
            setData(arr)
            setLoading(false)
        });

    }, [ownerClinics])


    const counterforOrangeDoughnut = {
        id: "counter",
        beforeDraw(chart) {
            const {
                ctx,
                chartArea: { top, width, height },
            } = chart;
            ctx.save();
            ctx.font = "700 22px Roboto";
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
                plugins: {
                    tooltip: {
                        enabled: false,
                    },
                },
            },
            plugins: [counterforOrangeDoughnut],
        });
        return () => {
            appointmentChartRef?.current?.destroy()
        }
    },[])

    return(
        <Spin spinning={loading}>
            <Space className={'round_charts_big_div'}>
                <div  style={{height:92,width:92}}>
                    <canvas id='CounterOrangeChart' ref={canvasRef}></canvas>
                </div>
                <Space></Space>
                <Space direction={'vertical'}>
                    <div className={'chart_counter_bold_text'}>
                        {responseState?.clinic}
                    </div>
                    <div className={'avg_montly'}> Avg. monthly</div>
                    <div className={'avg_montly'}>clinic rating {responseState?.avg_rating}</div>
                </Space>
            </Space>
        </Spin>

    )
}
export default CounterOrangeChart;
