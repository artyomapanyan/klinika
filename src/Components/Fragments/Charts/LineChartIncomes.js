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


            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        ...a,
                        ...(a.length>1? [{
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
        setStartAndDate(dayjs(startAndDate).add(+date.period, 'month'))

    }

    const onBackYear = () => {
        setStartAndDate(dayjs(startAndDate).add(-date.period, 'month'))

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
                        <Space>
                            <Radio.Group onChange={onRadioChange} defaultValue="year" className={'radio_grup_charts'}>
                                <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                                <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                            </Radio.Group>
                            <Button className={'chart_button'} disabled={startAndDate <= dayjs().add(-36, 'month').format('YYYY-MM-DD')}
                                    onClick={onBackYear}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                            <Button className={'chart_button'} disabled={startAndDate >= dayjs().add(-12, 'month')}
                                    onClick={onNextYear}><img src={arrow_next} alt={'arrow_next'}/></Button>
                        </Space>
                    </div>
                </div>
                <div className={'chart_div_outh'}>
                    <canvas ref={canvasRef} className="chart" id="appointmentsChart"></canvas>
                </div>
            </div>
        </Spin>
    )
}

export default LineChartIncomes;
