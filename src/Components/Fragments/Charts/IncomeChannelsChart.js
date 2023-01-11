import React, {useEffect, useRef} from "react";
import {Chart, registerables} from "chart.js";
import {Space} from "antd";

function IncomeChannelsChart({data}) {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null);

    let incomeChannelData = [43.3, 28.3, 28.4];


    const shadowPlugin = {
        beforeDraw: (chart, args, options) => {
            const { ctx } = chart;
            ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 3;
            ctx.shadowOffsetY = 3;
        },
    };


    const counterforIncomeChannel = {
        id: "counter",
        beforeDraw(chart, args, opions) {
            const {
                ctx,
                chartArea: { top, right, bottom, left, width, height },
            } = chart;
            ctx.save();
            ctx.font = "700 24px Roboto Bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "#BF539E";
            ctx.fillText(
                incomeChannelData[0] + "%",
                width / 2,
                top + height / 2 - 10
            );
            ctx.restore();

            ctx.font = "700 18px Roboto Bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "#6DAF56";
            ctx.fillText(
                incomeChannelData[1] + "%",
                width / 2,
                top + height / 2 + 22
            );

            ctx.strokeStyle = "rgba(225, 220, 231, 1)";
            ctx.strokeRect(width / 2 - 45, height / 2 + 25, width / 2 - 50, 1);
            ctx.restore();
        },
    };


    useEffect(()=>{
        const appointmentsStats = canvasRef.current.getContext("2d")
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(appointmentsStats, {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        backgroundColor: ["#774D9D", "#BF539E", "#6DAF56"],
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
    },[])

    return(
        <div className={'channel_incomes_div'}>
            <h1 className={'h1'}>Income channels</h1>
            <canvas ref={canvasRef} className="chart_income_channel"></canvas>
            <Space direction={'vertical'}>
                {Object.keys(data).map((itemKey,key)=><div key={key} className={`withDot WD-color-${key}`}><span>{itemKey}</span> <span>{data[itemKey]} %</span> </div>)}
            </Space>
        </div>
    )
}
export default IncomeChannelsChart;