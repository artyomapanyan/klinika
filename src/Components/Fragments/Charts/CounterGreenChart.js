import {useEffect, useRef, useState} from "react";
import {Chart,registerables} from "chart.js";
import {Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import Preloader from "../../Preloader";

function CounterGreenChart({loading, data, responseState, el, setResponseState, color, a}) {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)



    let arr = []
    arr.push(+((+el?.avg_rating).toFixed(1)));
    arr.unshift(+((5 - (+el?.avg_rating)).toFixed(1)))


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
            ctx.fillStyle = a;
            ctx.fillText(chart.config.data.datasets[0].data[1], width / 2, top + height / 2);
        },
    };
    useEffect(()=>{

        if(appointmentChartRef?.current?.ctx){
            appointmentChartRef.current.config.data.datasets[0].data = arr
            appointmentChartRef.current.update()

        }
    },[arr])


    useEffect(()=>{
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(canvasRef.current.getContext("2d"), {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        backgroundColor: ["#F5F6FA", a],
                        weight: 0.5,
                        data: [+((5 - (+el?.avg_rating)).toFixed(1)), +((+el?.avg_rating).toFixed(1))],
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
        return () => {
            appointmentChartRef?.current?.destroy()
        }
    },[])


    return(
        <Spin spinning={loading}>
            <Space className={'round_charts_big_div'}>
                    <div  style={{height:92,width:92}}>
                        <canvas id='CounterGreenChart' ref={canvasRef}></canvas>
                    </div>

                    <Space direction={'vertical'} style={{marginLeft: 11}}>
                        <div className={'chart_counter_bold_text'}>
                            {el?.clinic}
                        </div>
                        <div className={'avg_montly'}> Avg. monthly</div>
                        <div className={'avg_montly'}>clinic rating {el?.avg_rating}</div>
                    </Space>
                </Space>

        </Spin>

    )
}
export default CounterGreenChart;
