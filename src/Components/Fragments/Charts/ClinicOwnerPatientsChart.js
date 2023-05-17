import React, {useEffect, useRef, useState} from 'react'
import {Chart,registerables} from "chart.js";
import IncomeChannelChartHead from "../../Dashboard/ClinicsOwner/Fragments/IncomeChannelChartHead";
import PatientChartHeader from "../../Dashboard/ClinicsOwner/Fragments/PatientChartHeader";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {Button, Radio, Space, Spin} from "antd";
import {t} from "i18next";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {postResource} from "../../Functions/api_calls";
import arrow_next from "../../../dist/icons/arrow-next.svg";
import arrow_prev from "../../../dist/icons/arrow-prev.svg";
function ClinicOwnerPatientsChart(){
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)
    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState({
        from: dayjs().add(-12, 'month').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),
        period:12
    });


    useEffect(()=>{
        setLoading(true)
        postResource('ClinicOwner', 'NewPatients', token, ownerClinics?.id, date).then((response) => {
            const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            const endDate = dayjs(date.to);
            const startDate = dayjs(date.from);
            const monthsDiff = endDate.diff(startDate, 'month');
            const labels = [];
            for (let i = 1; i <= monthsDiff; i++) {
                const month = startDate.add(i, 'month').format('M');
                const monthName = monthNames[month - 1];
                labels.push(monthName);
            }
            const newValues = [];
            const returnValues = [];
            Object.values(response.patients).forEach(e=>{
                newValues.push(e.new)
                returnValues.push(e.returned)
            })


            let isNull = [];
            newValues.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })

            returnValues.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })


            const noData = {
                id: "no-data-text",
                beforeDraw(chart) {
                    const {
                        ctx,
                        chartArea: {height, width},
                        scales: {x},
                    } = chart;

                    ctx.save();
                    ctx.fillText(isNull.length === 0 ? "Ther aren't any information yet." : '' ,width/2,height/1.41, 500);
                    ctx.restore();

                },
            }
            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)
            let gradient = appointmentsStats.createLinearGradient(0, 400, 0, 10);
            gradient.addColorStop(0, "#6DAF5627");
            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: 'line',
                data: {
                    labels,
                    datasets: isNull.length === 0 ? [] : [

                        {
                            label: "Approved",
                            data: newValues,
                            backgroundColor: gradient,
                            fill: "start",
                            borderWidth: 0,
                            borderRadius: 222,
                            type: "line",
                            borderColor: '#ffffff',
                            pointBorderWidth: 0
                        },
                        {
                            label: "New",
                            data: newValues,
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
                            label: "Returned",
                            data: returnValues,
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
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },

                    tooltips: {
                        bevelWidth: 3,
                        bevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
                        bevelShadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowOffsetX: 3,
                        shadowOffsetY: 3,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },


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
                                stepSize: isNull.length === 0 ? 0.2 : 50,
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
                            display: false,
                        },
                        plugins: {},
                        tooltip: {
                            borderWidth: "3",
                            borderColor: "#e3e3e320",
                            // callbacks: {
                            //   label: function (context) {
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
                                fontFamily: 'Roboto'
                            },
                            // borderWidth: "1",
                            // borderColor: "rgb(119,77,157)",
                            caretPadding: 7,

                            callbacks: {


                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (context.parsed.y !== null) {

                                        if (context.dataset.label === 'Approved') {

                                            label = '';
                                        } else {
                                            label = ' ' + context.parsed.y + ' ' + label;
                                        }

                                    }
                                    return label;
                                }

                            }

                        },
                    },
                },
                plugins: [noData],
            });
            setLoading(false)
        })
        return () => {
            appointmentChartRef?.current?.destroy()
        }
    },[date, ownerClinics])


    const onRadioChange = (e) => {
        switch (e.target.value) {
            case 'year':
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-12,'months').format('YYYY-MM-DD'),
                    to: prevState.to,
                    period: 12
                }))
                break;
            case 'half':
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-6,'months').format('YYYY-MM-DD'),
                    to: prevState.to,
                    period: 6
                }))
                break;
            default:
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-12,'months').format('YYYY-MM-DD'),
                    to: prevState.to,
                    period: 12
                }))

        }
    }


    const onNextYear = () => {
        setDate((prevState)=>({
            to:dayjs(prevState.to).add(date.period, 'month').format('YYYY-MM-DD'),
            from:dayjs(prevState.from).add(date.period, 'month').format('YYYY-MM-DD'),
            period: prevState.period
        }))


    }

    const onBackYear = () => {
        setDate((prevState)=>({
            to:dayjs(prevState.to).add(-date.period, 'month').format('YYYY-MM-DD'),
            from:dayjs(prevState.from).add(-date.period, 'month').format('YYYY-MM-DD'),
            period: prevState.period
        }))

    }


    return<Spin spinning={loading}>
    <div className={'gradient_chart_big_div'}>
        <div className={'gradient_chart_inn_big_div'}>
            <Space className={'owner_patient_text'} >
                {t("Patients")}
                {['New', 'Returned'].map((itemKey,key)=><Space  key={key} className={`withDot WD-color2-${key}`}><span className={'color_text_charts'}>{itemKey}</span></Space>)}
            </Space>
            <div>
                <Space className={'arrow_button'}>
                    <Radio.Group onChange={onRadioChange} defaultValue="year" className={'radio_grup_charts'}>
                        <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                        <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                    </Radio.Group>
                    <Button className={'chart_button'} style={{paddingTop: 2}} disabled={dayjs(date.to) <= dayjs().add(-36, 'month')} onClick={onBackYear}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                    <Button className={'chart_button'} style={{paddingTop: 2}} disabled={dayjs(date.to) >= dayjs()} onClick={onNextYear}><img src={arrow_next} alt={'arrow_next'}/></Button>
                </Space>
            </div>
        </div>
        <div className={'chart_div_outh'}>
            <canvas ref={canvasRef} className="chart" id="ClinicOwnerPatientsChart"></canvas>
        </div>

    </div>
    </Spin>
}
export default ClinicOwnerPatientsChart

