import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import {Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {postResource} from "../../../Functions/api_calls";


function SuperAdminGenderChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null);

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(true);
    let date = new Date().getFullYear().toString()

    useEffect(() => {
        setLoading(true)
        postResource('SuperAdmin', 'SuperAdminGender', token, '', {year: date, month: ownerClinics?.month_key}).then((response) => {
            setLoading(false)
            setData({
                Female: response?.female?.count,
                Male: response?.male?.count
            })

            const incomeChannelData = [
                response?.female?.percentage,
                response?.male?.percentage,
            ]


            const shadowPlugin = {
                beforeDraw: (chart) => {
                    const {ctx} = chart;
                    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
                    ctx.shadowBlur = 10;
                    ctx.shadowOffsetX = 3;
                    ctx.shadowOffsetY = 3;
                },
            };

            const counterforIncomeChannel = {
                id: "counter",
                afterDraw(chart) {
                    const {
                        ctx,
                        chartArea: {top, width, height},
                    } = chart;
                    ctx.save();
                    ctx.font = "700 24px Roboto";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#774D9D";
                    ctx.fillText(
                        (chart.config.data.datasets[0].data[0]===1.128?0:chart.config.data.datasets[0].data[0]) + "%",
                        width / 2,
                        top + height / 2 - 15
                    );
                    ctx.restore();
                    ctx.font = "700 18px Roboto";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#BF539E";
                    ctx.fillText(
                        chart.config.data.datasets[0].data[1] + "%",
                        width / 2,
                        top + height / 2 + 15
                    );

                    ctx.strokeStyle = "rgba(225, 220, 231, 1)";
                    ctx.strokeRect(width / 2.6, height / 2 + 10, width / 4.5, 1);
                    ctx.restore();
                    ctx.fillStyle = '#fff2';
                    let diameter =  Math.min(height, width);
                    var gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
                    gradient.addColorStop(0, "#0005");
                    gradient.addColorStop(1, "#fff3");
                    ctx.beginPath();
                    ctx.zIndex= 99;
                    ctx.arc(width / 2,
                        top + height / 2, diameter * 0.315, 0, 2 * Math.PI);
                    ctx.closePath();
                    ctx.moveTo(200, 100);
                    ctx.arc(width / 2,
                        top + height / 2, diameter * 0.24, 0, 2 * Math.PI, true);
                    ctx.closePath();
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.zIndex= 99;
                    ctx.fill();
                    ctx.globalCompositeOperation = "source-over";
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    ctx.restore();

                },
            };

            const appointmentsStats = canvasRef?.current?.getContext("2d")
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            backgroundColor: response?.female?.count == 0 && response?.male?.count == 0 ? '#ffffff' :  ["#774D9D", "#BF539E"],
                            weight: 0.5,
                            data: response?.female?.count == 0 && response?.male?.count == 0 ? [1.128,0] : incomeChannelData,
                            spacing: -8,
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    cutout: "50%",
                    plugins: {
                        tooltip: {
                            enabled: false,
                        },
                    },
                    layout: {

                    },
                },
                plugins: [shadowPlugin, counterforIncomeChannel],
            });

            return () => {
                appointmentChartRef?.current?.destroy()
            }


        });

    }, [])
    useEffect(()=>{
        if(appointmentChartRef?.current?.ctx){
        setLoading(true)
        postResource('SuperAdmin', 'SuperAdminGender', token, '', {year: date, month: ownerClinics?.month_key}).then((response) => {
            setLoading(false)
            setData({
                Female: response?.female?.count,
                Male: response?.male?.count
            })

            const incomeChannelData = [
                response?.female?.percentage,
                response?.male?.percentage,
            ]

                appointmentChartRef.current.config.data.datasets[0].data =  response?.female?.count == 0 && response?.male?.count == 0 ? [1.128,0] : incomeChannelData;
                appointmentChartRef.current.config.data.datasets[0].backgroundColor = response?.female?.count == 0 && response?.male?.count == 0 ? '#ffffff' :  ["#774D9D", "#BF539E"];
                appointmentChartRef.current.update()
        })
        }
    },[ownerClinics])



    return (
        <Spin spinning={loading}>
            <div className={'patient_gender_div'}>
                <canvas id='SuperAdminGenderChart' ref={canvasRef} className="chart_income_channel"></canvas>
                <div>
                    <h1 className={'h1'}>
                        <div>Patients gender</div>
                    </h1>
                    <Space  direction={'vertical'}>
                        {Object.keys(data).map((itemKey, key) => {
                            return<div key={key} className={`withDot WD-colorPatientGenger-${key}`}>
                                <span>{itemKey}</span> <span style={{fontWeight: 600}}>{data[itemKey]}</span></div>
                        })}
                    </Space>
                </div>
            </div>
        </Spin>
    )
}

export default SuperAdminGenderChart;
