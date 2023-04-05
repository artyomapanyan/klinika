import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import {Space, Spin} from "antd";
import {postResource} from "../../Functions/api_calls";
import {useSelector} from "react-redux";

function DoctorLicensesChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null);

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [loading, setLoading] = useState(true);

    const [data, setData] = useState(true);







    useEffect(()=>{

        postResource('ClinicOwner', 'ClinicLicenses', token, '', ).then((response) => {

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
                beforeDraw(chart) {
                    const {
                        ctx,
                        chartArea: { top, width, height },
                    } = chart;
                    ctx.save();
                    ctx.font = "700 24px Roboto Bold";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#6DAF56";
                    ctx.fillText(
                        incomeChannelData[0] ,
                        width / 2,
                        top + height / 2 - 10
                    );
                    ctx.restore();

                    ctx.font = "700 18px Roboto Bold";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#CF533E";
                    ctx.fillText(
                        incomeChannelData[2],
                        width / 2,
                        top + height / 2 + 22
                    );

                    ctx.strokeStyle = "rgba(225, 220, 231, 1)";
                    ctx.strokeRect(width / 3 - 35, height / 2 + 25, width / 2 - 40, 1);
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
                        backgroundColor: ["#6DAF56", "#CF533E", "#F5A348"],
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
            appointmentChartRef.current.destroy()
        }
        })
    },[])

    return(
        <Spin spinning={loading}>
        <div className={'patient_gender_div'}>
            <canvas ref={canvasRef} className="chart_income_channel"></canvas>
            <div>
                <h1 className={'h1'}><div>Doctors'</div><div>licenses</div> </h1>
                <Space direction={'vertical'}>
                    {Object.keys(data).map((itemKey,key)=><div key={key} className={`doctor_licenses_chart WD-color-${key}`}><span>{itemKey}</span> <span style={{fontWeight:600}}>{data[itemKey]}</span> </div>)}
                </Space>
            </div>
        </div>
        </Spin>
    )
}
export default DoctorLicensesChart;
