import React, {useEffect, useRef} from "react";
import {Chart,registerables} from "chart.js";
import IncomesVsConversHeader from "../../Dashboard/SuperAdmin/IncomesVsConversHeader/IncomesVsConversHeader";

function SuperAdminIncVsConvers() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)


    useEffect(()=>{
        const appointmentsStats = canvasRef.current.getContext("2d")
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(appointmentsStats, {
            type: "bar",
            data: {
                labels: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                ],
                datasets: [
                    {
                        label: "Jeddah Clinic",
                        data: [58,84, 30, 22,],
                        stack: "Jeddah Clinic",
                        backgroundColor: "#D477B0",
                        borderColor: ["white"],
                        borderSkipped: false,
                        borderWidth: 1,
                        borderRadius: 5,
                        type: "bar",

                    },
                    {
                        label: "Total",
                        data: [
                            11, 40, 50, 42,
                        ],
                        stack: "Total",
                        backgroundColor: "#774D9D",
                        borderColor: ["white"],
                        borderSkipped: false,
                        borderWidth: 1,
                        borderRadius: 5,
                        type: "bar",
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                barThickness: 14,

                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            drawBorder: false,
                            borderDash: [4, 2],
                            color: "rgba(99, 93, 107, 0.2)",
                        },
                        stacked: true,
                        ticks: {
                            font: {
                                size: "14",
                                weight: "700",
                            },
                        },
                    },

                },
                x: {
                    callback: function (label) {
                        return label / 100 + "%";
                    },
                    stacked: false

                },
                elements: {
                    bar: {
                        borderSkipped: "middle",
                    },
                },
                plugins: {
                    tooltip: {
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        backgroundColor: "white",
                        padding: 16,
                        usePointStyle: true,
                        titleColor: "rgba(0, 0, 0, 0.5)",
                        titleFont: {
                            size: "16",
                            weight: "700",
                        },
                        bodyColor: "black",
                        bodyFont: {
                            size: 12,
                            weight: 700,
                        },
                        caretPadding: 7,
                    },
                },
            },
        });
        return () => {
            appointmentChartRef.current.destroy()
        }
    },[])



    return(
        <div className={'chart_incomes_div'}>
            <IncomesVsConversHeader />
            <canvas ref={canvasRef} className="chart" id="appointmentsChart"></canvas>
        </div>
    )
}
export default SuperAdminIncVsConvers;
