import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import IncomeChannelChartHead from "../../Dashboard/ClinicsOwner/Fragments/IncomeChannelChartHead";
import {postResource} from "../../Functions/api_calls";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {Button, Radio, Space, Spin} from "antd";
import {t} from "i18next";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import arrow_prev from "../../../dist/icons/arrow-prev.svg";
import arrow_next from "../../../dist/icons/arrow-next.svg";
import 'chartjs-plugin-style';
import ChartDataLabels from "chartjs-plugin-datalabels";

function LineChartIncomes() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [loading, setLoading] = useState(true);


    const [date, setDate] = useState({
        year: dayjs().format('YYYY'),
        month: ownerClinics?.month_key,
        period: 12
    });

    const [startAndDate, setStartAndDate] = useState(dayjs());
    const [nullData, setNullData] = useState([]);




    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const endDate = startAndDate;
    const startDate = dayjs(startAndDate).add(-date.period, 'month');


    const monthsDiff = endDate.diff(startDate, 'month');

    const labels = [];

    for (let i = 1; i <= monthsDiff; i++) {
        const month = startDate.add(i, 'month').format('M');
        const monthName = monthNames[month - 1];
        labels.push(monthName);
    }

    labels.length = date.period


    useEffect(() => {
        setLoading(true)
        postResource('ClinicOwner', 'PeriodIncomes', token, '', date).then((response) => {
            const totalData =[];
            let a = response?.map((el) =>{
                let data = Object.values(el.month_incomes).map((el) => Object.values(el)).flat();
                data.forEach((e,key)=>{
                    totalData[key] = (totalData[key]??0)+e
                })
                setNullData(data)
                return {
                    label: el.clinic,
                    data,
                    stack: el.clinic,
                    backgroundColor: "#F7BE93",
                    borderColor: ["white"],
                    borderSkipped: false,
                    borderWidth: 2,
                    borderRadius: 5,
                    type: "bar",
                }
            })

console.log(nullData)



            const noData = {
                id: "no-data-text",
                beforeDraw(chart) {
                    const {
                        ctx,
                        chartArea: {height, width},
                        scales: {x},
                    } = chart;

                    ctx.save();
                    ctx.fillText(a.length === 0 ? "Ther aren't any information yet." : '' ,width/2,height/1.41, 500);
                    ctx.restore();

                },
            }

            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: "bar",
                data: {
                    labels,
                    datasets: a.length === 0 ? [] : [
                        ...a,
                        ...(a.length>0? [{
                            label: "Total",
                            data: totalData,
                            stack: "Total",
                            backgroundColor: "#774D9D",
                            borderColor: ["white"],
                            borderSkipped: false,
                            borderWidth: 2,
                            borderRadius: 5,
                            type: "bar",
                        }]:[]),
                    ],
                },

                options: {
                    interaction: {
                        intersect: false,
                        mode: 'index',
                    },
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
                                stepSize: 500,
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
                        plugins: {
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                            shadowBlur: a.length === 0 ? 0.2 : 10,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                        tooltip: {

                            // callbacks: {
                            //   label: function (context) {
                            //     return context.dataset.data.map((item) => item + "$ ");
                            //   },
                            //       afterLabel: function(tooltipItem, data) {
                            //       var dataset = data['datasets'][0];
                            //       return '(' + dataset + '$)';
                            //       },
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
                              borderWidth: "3",
                              borderColor: "#e3e3e320",
                            caretPadding: 7,
                            callbacks: {


                                label: function(context) {
                                    let label = context.dataset.label || '';

                                    if (context.parsed.y !== null) {

                                        if (context.dataset.label === 'Approved') {

                                            label = '';
                                        } else {
                                            label = ' ' + context.parsed.y + '$' + ' ' + label;
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

        });
        return () => {
            appointmentChartRef?.current?.destroy()
        }


    }, [date, startAndDate])

    const onRadioChange = (e) => {
        switch (e.target.value) {
            case 'year':
                setDate((prevState) => ({
                    year: dayjs(prevState.year).format('YYYY'),
                    month: prevState.month,
                    period: 12
                }))
                break;
            case 'half':
                setDate((prevState) => ({
                    year: dayjs(prevState.year).format('YYYY'),
                    month: prevState.month,
                    period: 6
                }))
                break;
            default:
                setDate((prevState) => ({
                    year: dayjs(prevState.year).format('YYYY'),
                    month: prevState.month,
                    period: 12
                }))

        }
    }

    const onNextYear = () => {
        setDate((prevState)=>({
            year:dayjs(prevState.year).add(date.period, 'month').format('YYYY'),
            month:prevState?.month,
            period: prevState.period
        }))

    }

    const onBackYear = () => {

        setDate((prevState)=>({
            year:dayjs(prevState.year).add(-date.period, 'month').format('YYYY'),
            month:prevState?.month,
            period: prevState.period
        }))

    }



    return (
        <Spin spinning={loading}>
            <div className={'gradient_chart_big_div'}>
                <div className={'gradient_chart_inn_big_div'}>
                    <Space style={{fontSize: 24, fontWeight: 600}}>
                        {t("Incomes")}
                        {['Jeddah Clinic', 'Clinic name', 'Total'].map((itemKey, key) => <Space key={key}
                                                                                                className={`withDot WD-color1-${key}`}>{itemKey}</Space>)}
                    </Space>
                    <div>
                        <Space className={'arrow_button'}>
                            <Radio.Group onChange={onRadioChange} defaultValue="year" className={'radio_grup_charts'}>
                                <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                                <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                            </Radio.Group>
                            <Button className={'chart_button'} style={{paddingTop: 2}} disabled={date.year <= dayjs().add(-4, 'year').format('YYYY')}
                                    onClick={onBackYear}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                            <Button className={'chart_button'} style={{paddingTop: 2}} disabled={date.year >= dayjs().format('YYYY')}
                                    onClick={onNextYear}><img src={arrow_next} alt={'arrow_next'}/></Button>
                        </Space>
                    </div>
                </div>
                <div className={'chart_div_outh'}>
                    <canvas ref={canvasRef} className="chart" id="LineChartIncomes"></canvas>
                </div>
            </div>
        </Spin>
    )
}

export default LineChartIncomes;
