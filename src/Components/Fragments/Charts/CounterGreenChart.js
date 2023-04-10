import {useEffect, useRef, useState} from "react";
import {Chart,registerables} from "chart.js";
import {Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import dayjs from "dayjs";

function CounterGreenChart() {
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);
    const [loading, setLoading] = useState(true);

    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    const [data,setData] = useState([]);
    const [responseState,setResponseState] = useState({});

    useEffect(() => {
        postResource('ClinicOwner','OwnerClinicRating', token,  ownerClinics?.id, ).then((response) => {
            setResponseState(response)
            let arr = []
            arr.push(+((+response?.avg_rating).toFixed(1)));
            arr.unshift(+((5 - (+response?.avg_rating)).toFixed(1)))
            setData(arr)
            setLoading(false)
        });

    }, [ownerClinics])


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
            ctx.fillStyle = "#6DAF56";
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
                        backgroundColor: ["#F5F6FA", "#6DAF56"],
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
            appointmentChartRef?.current?.destroy()
        }
    },[])


    return(
        <Spin spinning={loading}>
            <Space style={{display:"flex", alignItems:"center"}}>
                <div  style={{height:92,width:92}}>
                    <canvas ref={canvasRef}></canvas>
                </div>
                <Space></Space>
                <Space direction={'vertical'}>
                    <div className={'chart_counter_bold_text'}>
                        {responseState?.clinic}
                    </div>
                 {/*   <div>{dayjs().month(ownerClinics?.month_key).format('MMM')}</div>*/}
                    <div>clinic rating {responseState?.avg_rating}</div>
                </Space>
            </Space>
        </Spin>

    )
}
export default CounterGreenChart;
