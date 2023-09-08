import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import {Space, Spin} from "antd";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import {t} from "i18next";

function PatientGenderChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null);

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(true);
    let date = new Date().getFullYear().toString()

    useEffect(() => {
        postResource('ClinicOwner', 'PatientGenders', token, '', {year: date, month: ownerClinics?.month_key}).then((response) => {
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
                beforeDraw(chart) {
                    const {
                        ctx,
                        chartArea: {top, width, height},
                    } = chart;
                    ctx.save();
                    ctx.font = "700 24px Roboto Bold";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#BF539E";
                    ctx.fillText(
                        incomeChannelData[0],
                        width / 2,
                        top + height / 2 - 10
                    );
                    ctx.restore();

                    ctx.font = "700 18px Roboto Bold";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#774D9D";
                    ctx.fillText(
                        incomeChannelData[1],
                        width / 2,
                        top + height / 2 + 22
                    );

                    ctx.strokeStyle = "rgba(225, 220, 231, 1)";
                    ctx.strokeRect(width / 3 - 35, height / 2 + 25, width / 2 - 40, 1);
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
                            backgroundColor: ["#774D9D", "#BF539E"],
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
                            top: 10,
                            bottom: 10,
                        },
                    },
                },
                plugins: [shadowPlugin, counterforIncomeChannel],
            });
            return () => {
                appointmentChartRef?.current?.destroy()
            }

        });

    }, [ownerClinics])



    return (
        <Spin spinning={loading}>
            <div className={'patient_gender_div'}>
                <canvas ref={canvasRef} className="chart_income_channel"></canvas>
                <div>
                    <h1 className={'h1'}>
                        <div>{t('Patients')}</div>
                        <div>{t('gender')}</div>
                    </h1>
                    <Space direction={'vertical'}>
                        {Object.keys(data).map((itemKey, key) => {
                            return<div key={key} className={`withDot WD-color-${key}`}>
                                <span>{itemKey}</span> <span style={{fontWeight: 600}}>{data[itemKey]}</span></div>
                        })}
                    </Space>
                </div>
            </div>
        </Spin>
    )
}

export default PatientGenderChart;
