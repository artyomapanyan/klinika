import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import {Space} from "antd";

function PatientSetisfactionChart() {
    useSelector((state) => state.auth.token);
    useSelector((state) => state?.owner);


    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    const [data] = useState([5,0]);


    // useEffect(() => {
    //     setLoading(true)
    //     postResource('ClinicOwner','OwnerClinicRating', token,  ownerClinics?.id ).then((response) => {
    //         setResponseState(response)
    //         let arr = []
    //         arr.push(+((+response?.avg_rating).toFixed(1)));
    //         arr.unshift(+((5 - (+response?.avg_rating)).toFixed(1)))
    //         setData(arr)
    //         setLoading(false)
    //     });
    //
    // }, [ownerClinics])


    const counterforGreenDoughnut = {
        id: "counter",
        beforeDraw:(chart)=>{
            const {
                ctx,
                chartArea: { top, width, height },
            } = chart;
            ctx.save();
            ctx.font = "700 22px Roboto";
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
                        data: [1, 0],
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

            <Space className={'round_charts_big_div'}>
                <div  style={{height:92,width:92}}>
                    <canvas ref={canvasRef}></canvas>
                </div>
                <Space></Space>
                <Space direction={'vertical'}>

                    <div className={'avg_montly'}> Patients</div>
                    <div className={'avg_montly'}>satisfaction</div>
                </Space>
            </Space>


    )
}
export default PatientSetisfactionChart;