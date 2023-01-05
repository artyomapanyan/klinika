import React, {useEffect, useRef} from 'react'
import {Space, Switch, Typography} from "antd";
import {Chart,registerables} from "chart.js";
function AppointmentStats(){
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    useEffect(()=>{
        const appointmentsStats = canvasRef.current.getContext("2d")
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(appointmentsStats, {
            type: "bar",
            data: {
                labels: [
                    "11/01",
                    "12/04",
                    "13/04",
                    "14/04",
                    "15/04",
                    "16/04",
                    "17/04",
                    "18/04",
                    "19/04",
                    "20/04",
                    "21/04",
                    "22/04",
                    "23/04",
                    "24/04",
                ],
                datasets: [
                    {
                        label: "Finished",
                        data: [40, 70, 7, 62, 45, 39, 13, 7, 20, 35, 42, 10, 5, 20],
                        stack: "Stack 0",
                        backgroundColor: ["#6DAF56"],
                        borderColor: ["white"],
                        borderSkipped: false,
                        borderWidth: 2,
                        borderRadius: {
                            topRight: 222,
                            topLeft: 222,
                            bottomLeft: 222,
                            bottomRight: 222,
                        },
                        type: "bar",
                        hidden: false,
                    },
                    {
                        label: "Rescheduled",
                        data: [20, 15, 0, 38, 15, 22, 15, 22, 5, 17, 30, 41, 50, 32],
                        stack: "Stack 0",
                        backgroundColor: ["#F5A348"],
                        borderColor: ["white"],
                        borderSkipped: false,
                        borderWidth: 2,
                        borderRadius: {
                            topRight: 222,
                            topLeft: 222,
                            bottomLeft: 222,
                            bottomRight: 222,
                        },
                        type: "bar",
                        hidden: false,
                    },
                    {
                        label: "Canceled",
                        data: [10, 0, 75, 0, 15, 32, 26, 22, 15, 7, 10, 14, 30, 12],
                        stack: "Stack 0",
                        backgroundColor: ["rgba(99, 93, 107, 0.4)"],
                        borderColor: ["white"],
                        borderSkipped: false,
                        borderWidth: 2,
                        borderRadius: {
                            topRight: 222,
                            topLeft: 222,
                            bottomLeft: 222,
                            bottomRight: 222,
                        },
                        type: "bar",
                        hidden: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                barThickness: 10,
                layout: {
                    padding: {
                        left: -30,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            drawBorder: false,
                            borderDash: [4, 2],
                            color: "rgba(99, 93, 107, 0.2)",
                        },
                        stacked: true,
                        ticks: {
                            color: "rgba(66, 57, 77, 0.5)",
                            font: {
                                size: "14",
                                weight: "700",
                            },
                            stepSize: 20,
                            showLabelBackdrop: false,
                            position: "left",
                            padding: 40,
                        },
                        min: 0,
                    },
                    x: {
                        grid: {
                            drawBorde: false,
                            display: false,
                            borderColor: "rgba(99, 93, 107, 0.05)",
                        },
                        ticks: {
                            color: "rgba(66, 57, 77, 1)",
                            font: {
                                size: "14",
                                weight: "700",
                            },
                        },
                    },
                },
                elements: {
                    bar: {
                        borderSkipped: "middle",
                    },
                },
                plugins: {
                    legend: {
                        labels: false,
                    },
                    tooltip: true,
                },
            },
        });
        return () => {
            appointmentChartRef.current.destroy()
        }
    },[])
    const handleShowHide = (key,e)=>{
        let appointmentChart = appointmentChartRef.current;
        appointmentChart.config.data.datasets[key].hidden = !e
        appointmentChart.update()

    }

    return<div>
        <Space>
            <Typography.Title level={3}>Appointments stats</Typography.Title>
            <div>
                <Switch defaultChecked onChange={(e)=>handleShowHide(2,e)} />Canceled
            </div>
            <div>
                <Switch defaultChecked onChange={(e)=>handleShowHide(1,e)} />Rescheduled
            </div>
            <div>
                <Switch defaultChecked onChange={(e)=>handleShowHide(0,e)} />Finished
            </div>
        </Space>
        <div style={{height: '427px', width: '100%'}}>
            <canvas ref={canvasRef} className="chart" id="appointmentsChart"></canvas>
        </div>
    </div>
}
export default AppointmentStats
