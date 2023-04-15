import React, {useEffect, useRef, useState} from 'react';
import {Chart, registerables} from "chart.js";
import {Space, Spin} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {postResource} from '../../Functions/api_calls';
import Resource from '../../../store/Resources';
import dayjs from "dayjs";

function IncomeChannelsChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null);
    let ownerClinics = useSelector((state) => state?.owner);
    let token = useSelector((state) => state.auth.token);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    let dispatch = useDispatch()

    const [date, setDate] = useState({
        year: dayjs().format('YYYY'),
        month: ownerClinics?.month_key,
        period: 12
    })

    useEffect(() => {
        setLoading(true)
        postResource('ClinicOwner', 'IncomeChannels', token, '', date).then((response) => {

            setLoading(false)
            const percentages = []
            Object.keys(response).map((key) => {
                percentages.push(response[key].percentage)
            })

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
                    ctx.fillStyle = "#BF539E";
                    ctx.fillText(
                        percentages[0] + "%",
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
                    ctx.fillStyle = "#6DAF56";
                    ctx.fillText(
                        percentages[1] + "%",
                        width / 2,
                        top + height / 2 + 15
                    );

                    ctx.strokeStyle = "rgba(225, 220, 231, 1)";
                    ctx.strokeRect(width / 3, height / 2 + 20, width / 3, 1);
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
                            backgroundColor: ["#774D9D", "#BF539E", "#6DAF56"],
                            weight: 0.5,
                            data: percentages,
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
            setData(response);
        });
        return () => {
            appointmentChartRef?.current?.destroy()
        }
    }, [ownerClinics]);


    return (
        <Spin spinning={loading}>
            <div className={'channel_incomes_big_div'}>
                <h1 className={'h1'} style={{marginTop: 25}}>Income channels</h1>
                <canvas ref={canvasRef} className="chart_income_channel"></canvas>
                <table cellPadding={7}  border={0} style={{width:'100%', margin: 15}} >
                    {Object.keys(data).map((key, i) =>
                            <tr key={i}>
                                <td>
                                    <div
                                        key={key}
                                        className={`withDot WD-color-${i}`}
                                    >
                                        <span>{Resource.incomeChannelsLabels[i]} </span>
                                    </div>
                                </td>
                                <td style={{width:'20%', fontWeight: 700}}>
                                    {(data[key].percentage * 10).toFixed()}
                                </td>
                                <td style={{textAlign:'right'}}>
                                    <div className={`withPercentage color-${i}`}>{data[key].percentage} %</div>
                                </td>
                            </tr>

                    )}
                </table>

            </div>
        </Spin>
    )
}

export default IncomeChannelsChart;
