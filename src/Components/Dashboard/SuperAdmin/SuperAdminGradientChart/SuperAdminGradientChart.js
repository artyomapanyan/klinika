import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import {postResource} from "../../../Functions/api_calls";
import {Chart, registerables} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Button, Dropdown, Radio, Space, Spin, Switch} from "antd";
import {t} from "i18next";
import {DownOutlined} from "@ant-design/icons";
import arrow_prev from "../../../../dist/icons/arrow-prev.svg";
import arrow_next from "../../../../dist/icons/arrow-next.svg";

function SuperAdminGradientChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);


    const [items, setItems] = useState([]);
    const [prevYearState, setPrevYearState] = useState(true)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [radioState, setRadioState] = useState();
    const [idClinic, setIdClinic] = useState('');


    const [date, setDate] = useState({
        from: dayjs().add(-12, 'month').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),

    });




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

    // useEffect(() => {
    //     postResource('ClinicOwnerClinics','list', token,  '', ).then((response) => {
    //         if(response) {
    //             setItems(response.clinics.map((el) => {
    //                 return {
    //                     label: el?.name,
    //                     key: el?.id
    //                 }
    //
    //             }))
    //         }
    //     })
    // }, [idClinic])


    useEffect(() => {
        setLoading(true)

        postResource('SuperAdmin', 'PeriodAppointments', token, null, date).then((response) => {

            let prevYear = Object.values(response?.appointments?.prev_year)

            let growth = Object.values(response?.appointments?.growth)
            let canceled = Object.values(response?.appointments[3])
            let closed = Object.values(response?.appointments[2])




            let isNull = [];
            prevYear.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })

            growth.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })

            canceled.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })
            closed.forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })



            const monthNames = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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






            let maxValue = Math.max(...growth);
            let maxValueIndex = growth.indexOf(maxValue);
            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)

            let gradientGrey = appointmentsStats.createLinearGradient(0, 400, 0, 100);
            let gradient = appointmentsStats.createLinearGradient(0, 400, 0, 10);
            gradient.addColorStop(0, "rgba(191, 83, 158, 0.05)");
            gradient.addColorStop(1, "rgba(191, 83, 158, 1)");
            gradientGrey.addColorStop(0, "rgba(217, 217, 217, 0)");
            gradientGrey.addColorStop(1, "rgb(185, 186, 189)");
            const verticalLine = {
                id: "verticalLine",
                beforeDraw(chart) {
                    if(isNull.length === 0) {
                        const {
                            ctx,

                        } = chart;
                        ctx.save();



                    } else {
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
                    }

                },
            };

            const noData = {
                id: "no-data-text",
                beforeDraw(chart) {
                    const {
                        ctx,
                        chartArea: {height, width},
                        scales: {x},
                    } = chart;

                    ctx.save();
                    ctx.fillText(isNull.length === 0 ? "Ther aren't any information yet." : '',width/2,height/1.5, 500);
                    ctx.restore();

                },
            }


            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: "line",
                data: {
                    labels,
                    datasets: isNull.length === 0 ? [] :[
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
                            pointBackgroundColor: "#C1BEC4",
                            color: '#C1BEC4',
                            pointRadius: 1,
                            pointStyle:function (context) {
                                return Math.max(...prevYear) == Math.max(...prevYear) ? true : false;
                            },
                        },
                        {
                            label: "Closed",
                            data: closed,

                            backgroundColor: gradient,
                            fill: "start",
                            borderColor: ["rgba(191, 83, 158, 1)"],
                            borderWidth: 3,
                            borderRadius: 222,
                            type: "line",
                            pointBorderColor: "white",
                            pointStyle: "circle",
                            pointRadius: 5,
                            color: ["rgba(191, 83, 158, 1)"],
                            pointBackgroundColor: function (context) {
                                return context.raw > 0 ? "#6DAF56" : "#CF533E";
                            },
                        },
                        {
                            label: " In previous year",
                            data:prevYear,
                            borderSkipped: true,
                            borderColor: ["rgb(97,60,133)"],
                            pointBackgroundColor:["rgb(97,60,133)"],
                            color: ["rgb(97,60,133)"],
                            backgroundColor: "transparent",
                            fill: "start",
                            showLine: true,
                            borderWidth: prevYearState ? 3 : 0,
                            pointStyle:function (context) {
                                return context.raw == Math.max(...prevYear) ? true : false;
                            },
                            type: "line",


                        },
                        {
                            label: "Growth",
                            data: closed,
                            borderWidth: 0,
                            borderRadius: 222,
                            type: "line",
                            pointStyle: "circle",
                            pointRadius: 5,
                            color: '#6DAF56',
                            additionalKey:'%',
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
                                stepSize: 50,
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


                        tooltip: {
                            borderWidth: "4",
                            borderColor: "#e3e3e320",
                            backgroundColor: "white",
                            padding: 16,
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
                                labelTextColor: function(context) {
                                    return '#000000';
                                },

                                // afterLabel:function (context){
                                //   return['\n']
                                // },
                                labelColor: function(context) {
                                    return {
                                        backgroundColor: context.dataset.color,
                                        borderWidth:'none',
                                        borderColor:  '#ffffff',
                                        borderRadius: 5,

                                    };
                                },
                                label: function(context) {
                                    let label = context.dataset.label || '';


                                    if (context.parsed.y !== null) {
                                        if (context.dataset.label === 'Growth') {
                                            label = '   ' + growth[context.parsed.x]  +(context.dataset.additionalKey??'') + '   ' + label ;
                                        }else{
                                            label = '   ' + context.parsed.y + '   ' + label;
                                        }

                                    }
                                    return label;
                                }

                            }

                        },
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
                            align: "top",
                            color: "#a09ca6",
                            font: {
                                weight: "bold",
                                size: 12,
                            },
                            padding: {
                                bottom: 40,
                                left: 30,
                            },
                            formatter: function(value, context) {
                                return "+" + growth[context.dataIndex]+'%';
                            },
                            display: function (context) {
                                return context.dataset.label === "Closed";
                            },
                        },
                    },
                },
                plugins: [verticalLine, ChartDataLabels, noData],
            });
            setLoading(false)
        });


        return () => {
            appointmentChartRef?.current?.destroy()
        }



    }, [ownerClinics.id, radioState, date, prevYearState, idClinic])




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
            default:
                setDate((prevState) => ({
                    from: dayjs(prevState.to).add(-12, 'month').format('YYYY-MM-DD'),
                    to: prevState.to
                }))

        }
    }

    const onClick = ({key}) => {
        setIdClinic(key)

    };

    return (
        <Spin spinning={loading}>
            <div className={'superAdmin_gradient_chart_big_div'}>
                <div className={'gradient_chart_inn_big_div'}>
                    <div className={'app_clinic'}>
                        <span>Appointments:</span>  <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                        trigger={['click']}
                        className={'own_gr_chart_drop'}
                        >
                        <Space direction={'horizontal'} style={{cursor:"pointer"}}>
                            <div className={'all_clinic_dr'}>{items.find((e)=>e.key==idClinic)?.label??t('All Clinics')}</div>
                            <div><DownOutlined /></div>
                        </Space>

                     </Dropdown>
                    </div>
                    <div>
                        <Space>

                            <Switch defaultChecked onChange={switchChange}/>
                            <span className={'gradient_szitch_text'}>
                                {t("Previous year")}
                            </span>

                            <Radio.Group onChange={onChange} defaultValue="year"  className={'radio_grup_charts'}>
                                <Radio.Button value="year">{t("12 Month")}</Radio.Button>
                                <Radio.Button value="half">{t("1/2 Year")}</Radio.Button>
                                {/*<Radio.Button value="month">{t(" Month ")}</Radio.Button>*/}
                            </Radio.Group>
                            <Button className={'chart_button'} disabled={date?.from <= dayjs(data.to).add(-60, 'month').format('YYYY-MM-DD')} onClick={onBackYear}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                            <Button className={'chart_button'} disabled={date?.to >= dayjs().format('YYYY-MM-DD')} onClick={onNextYear}><img src={arrow_next} alt={'arrow_next'}/></Button>
                        </Space>
                    </div>
                </div>
                <div className={'superAdmin_chart_div_outh'}>
                    <canvas id='SuperAdminGradientChart' ref={canvasRef} className="chart"></canvas>
                </div>

            </div>
        </Spin>

    )
}
export default SuperAdminGradientChart;