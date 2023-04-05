import React, {useEffect, useRef} from 'react'
import {Chart,registerables} from "chart.js";
import IncomeChannelChartHead from "../../Dashboard/ClinicsOwner/Fragments/IncomeChannelChartHead";
import PatientChartHeader from "../../Dashboard/ClinicsOwner/Fragments/PatientChartHeader";
function ClinicOwnerPatientsChart(){
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
                        label: "Finished",
                        data: [40, 10, 7, 42, 45, 19, 13, 7, 20, 35, 42, 30],
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
                        label: "Canceled",
                        data: [10, 30, 51, 0, 15, 32, 26, 22, 15, 7, 10, 10],
                        stack: "Stack 0",
                        backgroundColor: ["#BF539E"],
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
                barThickness: 13,
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
                            stepSize: 10,
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


    return<div className={'chart_incomes_div'}>
            <PatientChartHeader />
            <canvas ref={canvasRef} className="chart" id="appointmentsChart"></canvas>

    </div>
}
export default ClinicOwnerPatientsChart

