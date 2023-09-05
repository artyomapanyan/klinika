import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import {Space, Spin} from "antd";
import {postResource} from "../../../Functions/api_calls";
import {useSelector} from "react-redux";
import {t} from "i18next";

function SuperAdminClinicLicenseChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null);

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(true);







    useEffect(()=>{
        setLoading(true)
        postResource('SuperAdmin', 'SuperAdminclinicLicenses', token, '', ).then((response) => {
            setLoading(false)

            setData({
                'Actual': response?.actual?.count,
                'Expire soon': response?.expire_soon?.count,
                'Expired': response?.expired?.count
            })

            const incomeChannelData = [
                response?.actual?.percentage,
                response?.expire_soon?.percentage,
                response?.expired?.percentage,
            ]

            const shadowPlugin = {
                beforeDraw: (chart) => {
                    const { ctx } = chart;
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
                    ctx.fillStyle = "#6DAF56";
                    ctx.fillText(
                        incomeChannelData[0] + "%",
                        width / 2,
                        top + height / 2 - 15
                    );
                    ctx.restore();

                    ctx.fillStyle = '#fff2';
                    let diameter =  Math.min(height, width);
                    var gradient = ctx.createLinearGradient(width / 2, 0, width / 2, height);
                    gradient.addColorStop(0, "#0005");
                    gradient.addColorStop(1, "#fff3");

// Draw the outer circle
                    ctx.beginPath();
                    ctx.zIndex= 99;
                    ctx.arc(width / 2,
                        top + height / 2, diameter * 0.315, 0, 2 * Math.PI);
                    ctx.closePath();

// Draw the inner circle
                    ctx.moveTo(200, 100);
                    ctx.arc(width / 2,
                        top + height / 2, diameter * 0.24, 0, 2 * Math.PI, true);
                    ctx.closePath();

// Subtract the inner circle from the outer circle
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.zIndex= 99;
                    ctx.fill();

// Fill the ring with the gradient
                    ctx.globalCompositeOperation = "source-over";
                    ctx.fillStyle = gradient;
                    ctx.fill();
                    ctx.restore();
                    ctx.font = "700 18px Roboto";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#F5A348";
                    ctx.fillText(
                        incomeChannelData[1] + "%",
                        width / 2,
                        top + height / 2 + 15
                    );

                    ctx.strokeStyle = "rgba(225, 220, 231, 1)";
                    ctx.strokeRect(width / 2.6, height / 2 + 10, width / 4.5, 1);
                    ctx.restore();
                },
            };




            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: "doughnut",
                data: {
                    datasets: [
                        {
                            backgroundColor: ["#6DAF56", "#F5A348", "#CF533E"],
                            weight: 0.5,
                            data: incomeChannelData,
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
                        padding: {
                        },
                    },
                },
                plugins: [shadowPlugin, counterforIncomeChannel],
            });
            return () => {
                appointmentChartRef?.current?.destroy()
            }
        })
    },[])



    return(
        <Spin spinning={loading}>
            <div className={'patient_gender_div'}>
                <canvas id='SuperAdminClinicLicenseChart' ref={canvasRef} className="chart_income_channel"></canvas>
                <div>
                    <h1 className={'h1'}><div>{t('Clinics licenses')}</div> </h1>
                    <Space direction={'vertical'}>
                        {Object.keys(data).map((itemKey,key)=><div key={key} className={`doctor_licenses_chart WD-color-${key}`}><span>{itemKey}</span> <span style={{fontWeight:600}}>{data[itemKey]}</span> </div>)}
                    </Space>
                </div>
            </div>
        </Spin>
    )
}
export default SuperAdminClinicLicenseChart;
