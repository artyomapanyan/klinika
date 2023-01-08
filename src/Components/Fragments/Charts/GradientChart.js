import React, {useEffect, useRef} from "react";
import {Chart,registerables} from "chart.js";
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import GradientChartApp from "../../Dashboard/ClinicsOwner/Fragments/GradientChartApp";

function GradientChart({data}) {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)






        useEffect(()=>{

        },[data])
    useEffect(()=>{
        const previousData = [
            0, 54, 130, 100, 220, 122, 380, 220, 355, 117, 352, 40,
        ];
        const approvedData = [
            24, 114, 200, -10, 120, 250, 513, 117, 209, 520, 120, 110,
        ];
        let maxValue = Math.max(...previousData);
        let maxValueIndex = previousData.indexOf(maxValue);
        const canceledData = [10, 30, 20, -80, 20, 30, 50, 80, 50, 20, 10, 5];
        const appointmentsStats = canvasRef.current.getContext("2d")
        Chart.register(...registerables)

        let gradientGrey = appointmentsStats.createLinearGradient(0, 500, 0, 50);
        let gradient = appointmentsStats.createLinearGradient(0, 400, 0, 10);
        gradient.addColorStop(0, "rgba(191, 83, 158, 0.05)");
        gradient.addColorStop(1, "rgba(191, 83, 158, 1)");
        gradientGrey.addColorStop(0, "rgba(217, 217, 217, 0)");
        gradientGrey.addColorStop(1, "rgba(217, 217, 217, 1)");
        const verticalLine = {
            id: "verticalLine",
            beforeDraw(chart) {
                const {
                    ctx,
                    chartArea: { top,height },
                    scales: { x },
                } = chart;
                ctx.save();
                ctx.setLineDash([2, 2]);
                ctx.strokeStyle = "#635D6B";
                ctx.strokeRect(
                    x.getPixelForValue(maxValueIndex),
                    top - 20,
                    0,
                    height + 20
                );
                ctx.restore();
            },
        };
        appointmentChartRef.current = new Chart(appointmentsStats, {
        type: "line",
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
                    label: "Canceled",
                    data: canceledData,
                    backgroundColor: gradientGrey,
                    fill: "start",
                    borderColor: "white",
                    borderWidth: 3,
                    borderRadius: 222,
                    type: "line",
                    pointBorderColor: "#C1BEC4",
                    pointStyle: "circle",
                    pointBackgroundColor: "#C1BEC4",
                    pointRadius: 1,
                },
                {
                    label: "Approved",
                    data: approvedData,
                    backgroundColor: gradient,
                    fill: "start",
                    borderColor: ["rgba(191, 83, 158, 1)"],
                    borderWidth: 3,
                    borderRadius: 222,
                    type: "line",
                    pointBorderColor: "white",
                    pointStyle: "circle",
                    pointRadius: 5,
                },
                {
                    label: "Previous",
                    data: previousData,
                    borderColor: ["rgba(119, 77, 157, 1)"],
                    backgroundColor: "transparent",
                    borderSkipped: false,
                    borderWidth: 2,
                    borderRadius: 222,
                    type: "line",
                    pointBorderColor: "#774D9D",
                    pointBackgroundColor: "#774D9D",
                    pointRadius: 3,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
                    ticks: {
                        color: "rgba(66, 57, 77, 0.5)",
                        font: {
                            size: "14",
                            weight: "700",
                        },
                        stepSize: 100,
                        showLabelBackdrop: false,
                        padding: 40,
                    },
                },
                x: {
                    beginAtZero: false,
                    grid: {
                        drawBorder: false,
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
            plugins: {
                legend: {
                    display: false,
                         labels:{
                             usePointStyle:true,
                             pontStyle:'circle',
                             boxWidth:'10',
                             boxHeight:'10',
                             filter: function(label) {
                                 if (label.text !== 'hide') return true;
                             }
                         },
                },
                datalabels: {
                    anchor: "top",
                    align: "right",
                    color: "#a09ca6",
                    font: {
                        weight: "bold",
                        size: 12,
                    },
                    padding: {
                        bottom: 54,
                        left: 30,
                    },
                    display: function (context) {
                        return context.dataset.label === "Approved";
                    },
                },
            },
        },
        plugins: [verticalLine],
    });
        return () => {
            appointmentChartRef.current.destroy()
        }
    },[])

    return(
        <div className={'gradient_chart_big_div'} style={{maxHeight:'350px', }}>
            <GradientChartApp/>
            <canvas ref={canvasRef} className="chart" id="appointmentsChart"></canvas>
        </div>
    )
}
export default GradientChart;
