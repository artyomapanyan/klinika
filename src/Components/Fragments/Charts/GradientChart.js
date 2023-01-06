import React, {useEffect, useRef} from "react";
import {Chart,registerables} from "chart.js";
import {Dropdown, Space} from "antd";
import {DownOutlined} from "@ant-design/icons";
import GradientChartApp from "../../Dashboard/ClinicsOwner/Fragments/GradientChartApp";

function GradientChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    const previousData = [
        0, 54, 130, 100, 220, 122, 380, 220, 355, 117, 352, 40,
    ];
    const approvedData = [
        24, 114, 200, -10, 120, 250, 513, 117, 209, 520, 120, 110,
    ];
    let maxValue = Math.max(...previousData);
    let maxValueIndex = previousData.indexOf(maxValue);
    const canceledData = [10, 30, 20, -80, 20, 30, 50, 80, 50, 20, 10, 5];


    const verticalLine = {
        id: "verticalLine",
        beforeDraw(chart, args, opions) {
            const {
                ctx,
                chartArea: { top, right, bottom, left, width, height },
                scales: { x, y },
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


    useEffect(()=>{
        const appointmentsStats = canvasRef.current.getContext("2d")
        Chart.register(...registerables)

        let gradientGrey = appointmentsStats.createLinearGradient(0, 500, 0, 50);
        let gradient = appointmentsStats.createLinearGradient(0, 400, 0, 10);
        gradient.addColorStop(0, "rgba(191, 83, 158, 0.05)");
        gradient.addColorStop(1, "rgba(191, 83, 158, 1)");
        gradientGrey.addColorStop(0, "rgba(217, 217, 217, 0)");
        gradientGrey.addColorStop(1, "rgba(217, 217, 217, 1)");

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
                    pointRadius: function (context) {
                        let value = previousData[context.dataIndex];
                        return maxValue === value ? 4 : 0;
                    },
                },
                {
                    label: "Approved",
                    data: approvedData,
                    // stack: 'Stack 0',
                    backgroundColor: gradient,
                    fill: "start",
                    borderColor: ["rgba(191, 83, 158, 1)"],
                    borderWidth: 3,
                    borderRadius: 222,
                    type: "line",
                    pointBorderColor: "white",
                    pointStyle: "circle",
                    pointRadius: 5,
                    // pointBackgroundColor:"#6DAF56",
                    pointBackgroundColor: function (context) {
                        let value = approvedData[context.dataIndex];
                        return value > 0 ? "#6DAF56" : "#CF533E";
                    },
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
                    pointRadius: function (context) {
                        let value = previousData[context.dataIndex];
                        return maxValue === value ? 4 : 0;
                    },
                    pointBorderColor: "#774D9D",
                    pointBackgroundColor: "#774D9D",
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
            plugins: {
                legend: {
                    display: false,
                        // labels:{
                        //     usePointStyle:true,
                        //     pontStyle:'circle',
                        //     boxWidth:'10',
                        //     boxHeight:'10',
                        //     filter: function(label) {
                        //         if (label.text !== 'hide') return true;
                        //     }
                        // },
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
