import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import GradientChartApp from "../../Dashboard/ClinicsOwner/Fragments/GradientChartApp";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import {Button, Dropdown, Radio, Space, Spin, Switch} from "antd";
import {t} from "i18next";
import {DownOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";

function GradientChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);



    const [prevYearState, setPrevYearState] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [radioState, setRadioState] = useState();

    const [date, setDate] = useState({
        from: dayjs().add(-12, 'month').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),

    });


//
    const startDate = dayjs('2022-05-01', 'YYYY-MM-DD');
    const endDate = dayjs('2022-12-31', 'YYYY-MM-DD');

// Создайте объект с месяцами
    const months = {};

// Итерируйтесь по месяцам между начальной и конечной датами
    for (let date = startDate; date.isBefore(endDate); date = date.add(1, 'month')) {
        const monthName = date.format('YYYY-MM');
        const monthNumber = 0 ;
        months[monthName] = monthNumber;
    }


    useEffect(() => {


        postResource('ClinicOwner', 'PeriodAppointments', token, ownerClinics?.id, date).then((response) => {
            console.log(response)
            let prevYear = Object.values(response?.incomes?.prev_year)
            let growth = Object.values(response?.incomes?.growth)
            let canceled = Object.values(response?.incomes[3])
            let closed = Object.values(response?.incomes[2])
            console.log(prevYear,growth,canceled,closed)


            const monthNames = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const startDate = dayjs(date.from);
            const endDate = dayjs(date.to);

            const monthsDiff = endDate.diff(startDate, 'month');

            const labels = [];

            for (let i = 1; i <= monthsDiff; i++) {
                const month = startDate.add(i, 'month').format('M');
                const monthName = monthNames[month - 1];
                labels.push(monthName);
            }






            let maxValue = Math.max(...prevYear);
            let maxValueIndex = prevYear.indexOf(maxValue);
            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)

            let gradientGrey = appointmentsStats.createLinearGradient(0, 300, 0, 50);
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
                        chartArea: {top, height},
                        scales: {x},
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
                    labels,
                    datasets: [
                        {
                            label: "Canceled",
                            data: canceled,
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
                            data: growth,
                            backgroundColor: gradient,
                            fill: "start",
                            borderColor: ["rgba(191, 83, 158, 1)"],
                            borderWidth: 3,
                            borderRadius: 222,
                            type: "line",
                            pointBorderColor: "white",
                            pointStyle: "circle",
                            pointRadius: 5,
                            pointBackgroundColor: function (context) {
                                return context.raw > 0 ? "#6DAF56" : "#CF533E";
                            },
                        },
                        {
                            label: "Previous",
                            data: prevYearState ? prevYear : [],
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
            setLoading(false)
        });


        return () => {
            appointmentChartRef?.current?.destroy()
        }



    }, [ownerClinics.id, radioState, date, prevYearState])


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
    const switchChange = (checked) => {
        console.log(`switch to ${checked}`);
        setPrevYearState(checked)
    };

    const onChange = (e) => {
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
            case 'month':
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-1, 'month').format('YYYY-MM-DD'),
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

    return (
        <Spin spinning={loading}>
            <div className={'gradient_chart_big_div'}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", padding: 30}}>
                    <div className={'app_clinic'} style={{fontSize: 24, fontWeight: 600}}>
                        Appointments:
                    </div>
                    <div>
                        <Space>
                            <Switch defaultChecked onChange={switchChange}/>
                            {t("Previous year")}
                            <Radio.Group onChange={onChange} defaultValue="year" size="large">
                                <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                                <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                                {/*<Radio.Button value="month">{t(" Month ")}</Radio.Button>*/}
                            </Radio.Group>
                            <Button disabled={date?.from <= dayjs(data.to).add(-60, 'month').format('YYYY-MM-DD')} onClick={onBackYear}><LeftOutlined/></Button>
                            <Button disabled={date?.to >= dayjs().format('YYYY-MM-DD')} onClick={onNextYear}><RightOutlined/></Button>
                        </Space>
                    </div>
                </div>
                <canvas ref={canvasRef} className="chart"></canvas>
            </div>
        </Spin>

    )
}
export default GradientChart;
