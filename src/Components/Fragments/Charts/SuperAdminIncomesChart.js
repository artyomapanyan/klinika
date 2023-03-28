import React, {useEffect, useRef} from "react";
import {Chart,registerables} from "chart.js";
import IncomeChannelChartHead from "../../Dashboard/ClinicsOwner/Fragments/IncomeChannelChartHead";

function SuperAdminIncomesChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)


    useEffect(()=>{
        const appointmentsStats = canvasRef.current.getContext("2d")
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(appointmentsStats, {
            type: "bar",
            data: {
                labels: [
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                ],
                datasets: [
                    {
                        label: "Jeddah Clinic",
                        data: [
                            58000, 84000, 30000, 22000, 50900, 20000, 13000, 70000, 33500,
                            51000, 12000, 10000,
                        ],
                        stack: "Jeddah Clinic",
                        backgroundColor: "#D477B0",
                        borderColor: ["white"],
                        borderSkipped: false,
                        borderWidth: 2,
                        borderRadius: 5,
                        type: "bar",
                    },
                    {
                        label: "Total",
                        data: [
                            110000, 40000, 50000, 42000, 80900, 90000, 21000, 70000, 50500,
                            71000, 52000, 31000,
                        ],
                        stack: "Total",
                        backgroundColor: "#774D9D",
                        borderColor: ["white"],
                        borderSkipped: false,
                        borderWidth: 2,
                        borderRadius: 5,
                        type: "bar",
                    },
                ],
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,
                barThickness: 14,
                layout: {
                    padding: {
                        left: -20,
                    },
                },
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
                            color: "rgba(66, 57, 77, 0.5)",
                            font: {
                                size: "14",
                                weight: "700",
                            },
                            padding: 40,
                            stepSize: 20000,
                            showLabelBackdrop: false,
                            callback: function (label) {
                                return label / 1000 + "k";
                            },
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "1k = 1000",
                        },
                    },
                    x: {
                        grid: {
                            drawBorde: false,
                            display: false,
                            borderColor: "white",
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
                        display: false,
                    },
                    plugins: {},
                    tooltip: {
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        shadowBlur: 10,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                        // callbacks: {
                        //   label: function (context) {
                        //     console.log(context);
                        //     return context.dataset.data.map((item) => item + "$ ");
                        //   },
                        //   //     afterLabel: function(tooltipItem, data) {
                        //   //     var dataset = data['datasets'][0];
                        //   //     return '(' + dataset + '$)';
                        //   //     },
                        // },
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
                        // borderWidth: "1",
                        // borderColor: "rgb(119,77,157)",
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
            <IncomeChannelChartHead />
            <canvas ref={canvasRef} className="chart" id="appointmentsChart"></canvas>
        </div>
    )
}
export default SuperAdminIncomesChart;
