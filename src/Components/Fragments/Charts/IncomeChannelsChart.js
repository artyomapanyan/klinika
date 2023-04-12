import React, { useEffect, useRef, useState } from 'react';
import {Chart, registerables} from "chart.js";
import { Space, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { postResource } from '../../Functions/api_calls';
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

    useEffect (() => {
        postResource ('ClinicOwner', 'IncomeChannels', token, '', date).then ((response) => {

            setLoading(false)
            const percentages = []
            Object.keys(response).map((key) => {percentages.push(response[key].percentage)})

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
                    ctx.fillStyle = "#BF539E";
                    ctx.fillText(
                      percentages[0] + "%",
                      width / 2,
                      top + height / 2 - 15
                    );
                    ctx.restore();

                    ctx.font = "700 18px Roboto Bold";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "#6DAF56";
                    ctx.fillText(
                      percentages[1] + "%",
                      width / 2,
                      top + height / 2 + 15
                    );

                    ctx.strokeStyle = "rgba(225, 220, 231, 1)";
                    ctx.strokeRect(width / 2 - 35, height / 2 + 20, width / 2 - 40, 1);
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
    }, []);

    return(
      <Spin spinning={loading}>
        <div className={'channel_incomes_big_div'}>
            <h1 className={'h1'} style={{marginTop:-28}}>Income channels</h1>
            <canvas ref={canvasRef} className="chart_income_channel"></canvas>
            <Space direction={'vertical'} >
                {Object.keys(data).map((key, i) =>
                  <div
                    key={key}
                    className={`withDot WD-color-${i}`}
                  >
                      <span>{Resource.incomeChannelsLabels[i]} </span>
                      <span className={`withPercentage color-${i}`}>{data[key].percentage} %</span>
                  </div>
                )}
            </Space>
        </div>
      </Spin>
    )
}
export default IncomeChannelsChart;
