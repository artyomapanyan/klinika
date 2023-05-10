import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {postResource} from "../../Functions/api_calls";
import {Chart, registerables} from "chart.js";
import {Button, Radio, Space, Spin} from "antd";
import {t} from "i18next";
import arrow_prev from "../../../dist/icons/arrow-prev.svg";
import arrow_next from "../../../dist/icons/arrow-next.svg";



function SuperAdminIncomesChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);

    const [loading, setLoading] = useState(true);


    const [date, setDate] = useState({
        from: dayjs().add(-12, 'month').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),
        year: dayjs().format('YYYY'),
        month: ownerClinics?.month_key,
        period: 12
    });










    useEffect(() => {
        setLoading(true)
        postResource('SuperAdmin', 'SuperAdminIncomes', token, '', date).then((response) => {
            let incomes = Object.values(response?.incomes);
            let offers = Object.values(response?.offers);

            let isNull = [];
            incomes.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })

            offers.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })
            const endDate = dayjs(date.to);
            const startDate = dayjs(date.from);


            const monthsDiff = endDate.diff(startDate, 'month');

            const labels = [];
            const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            for (let i = 0; i <= monthsDiff-1; i++) {
                const month = startDate.add(i,'month').month();
                const monthName = monthNames[month];
                labels.push(monthName);
            }


            const noData = {
                id: "no-data-text",
                beforeDraw(chart) {
                    const {
                        ctx,
                        chartArea: {height, width},
                        scales: {x},
                    } = chart;

                    ctx.save();
                    ctx.fillText(isNull.length === 0 ? "Ther aren't any information yet." : '' ,width/2,height/1.5, 500);
                    ctx.restore();

                },
            }

            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(appointmentsStats, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Jeddah Clinic",
                                data: incomes,
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
                                data: offers,
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
                                stepSize: 10,
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
                            shadowBlur: 10,
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


    }, [date])

    const onRadioChange = (e) => {
        switch (e.target.value) {
            case 'year':
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-12, 'month').format('YYYY-MM-DD'),
                    to: prevState.to
                }))
                break;
            case 'half':
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-6, 'month').format('YYYY-MM-DD'),
                    to: prevState.to
                }))
                break;
            default:
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-12, 'month').format('YYYY-MM-DD'),
                    to: prevState.to
                }))

        }
    }

    const onNextYear = () => {
        if(date?.to === dayjs(date.from).add(+12, 'month').format('YYYY-MM-DD')) {
            setDate((prevState) => ({
                from: dayjs(prevState.from).add(+12, 'month').format('YYYY-MM-DD'),
                to: dayjs(prevState.to).add(+12, 'month').format('YYYY-MM-DD')
            }))
        } else {
            setDate((prevState) => ({
                from: dayjs(prevState.from).add(+6, 'month').format('YYYY-MM-DD'),
                to: dayjs(prevState.to).add(+6, 'month').format('YYYY-MM-DD')
            }))
        }

    }

    const onBackYear = () => {
        if (date?.to === dayjs(date.from).add(+12, 'month').format('YYYY-MM-DD')) {
            setDate((prevState) => ({
                from: dayjs(prevState.from).add(-12, 'month').format('YYYY-MM-DD'),
                to: dayjs(prevState.to).add(-12, 'month').format('YYYY-MM-DD')
            }))
        } else {
            setDate((prevState) => ({
                from: dayjs(prevState.from).add(-6, 'month').format('YYYY-MM-DD'),
                to: dayjs(prevState.to).add(-6, 'month').format('YYYY-MM-DD')
            }))
        }

    }



    return(
            <Spin spinning={loading}>
                <div className={'gradient_chart_big_div'}>
                    <div className={'gradient_chart_inn_big_div'}>
                        <Space style={{fontSize: 24, fontWeight: 600}}>
                            {t("Incomes")}
                            {['Offers created', 'Income'].map((itemKey, key) => <Space key={key}
                                                                                                    className={`withDot WD-colorSuperAdmin-incomes-${key}`}>{itemKey}</Space>)}
                        </Space>
                        <div>
                            <Space>
                                <Radio.Group onChange={onRadioChange} defaultValue="year" className={'radio_grup_charts'}>
                                    <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                                    <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                                </Radio.Group>
                                <Button className={'chart_button'} disabled={date.from <= dayjs().add(-4, 'year').format('YYYY-MM-DD')}
                                        onClick={onBackYear}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                                <Button className={'chart_button'} disabled={date.to >= dayjs().format('YYYY-MM-DD')}
                                        onClick={onNextYear}><img src={arrow_next} alt={'arrow_next'}/></Button>
                            </Space>
                        </div>
                    </div>
                    <div className={'chart_div_outh'}>
                        <canvas ref={canvasRef} className="chart" id="SuperAdminIncomesChart"></canvas>
                    </div>
                </div>
            </Spin>

    )
}
export default SuperAdminIncomesChart;
