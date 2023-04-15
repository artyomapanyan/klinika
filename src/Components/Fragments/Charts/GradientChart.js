import React, {useEffect, useRef, useState} from "react";
import {Chart, registerables} from "chart.js";
import GradientChartApp from "../../Dashboard/ClinicsOwner/Fragments/GradientChartApp";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import {Button, Dropdown, Radio, Space, Spin, Switch} from "antd";
import {t} from "i18next";
import {DownOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import arrow_prev from "../../../dist/icons/arrow-prev.svg";
import arrow_next from "../../../dist/icons/arrow-next.svg";

function GradientChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    let token = useSelector((state) => state.auth.token);
    let ownerClinics = useSelector((state) => state?.owner);


    const [items, setItems] = useState([]);
    const [prevYearState, setPrevYearState] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([]);
    const [radioState, setRadioState] = useState();
    const [idClinic, setIdClinic] = useState('');
    const [maxPrevYear, setMaxPrevYear] = useState();


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
        postResource('ClinicOwnerClinics','list', token,  '', ).then((response) => {
            if(response) {
                setItems(response.clinics.map((el) => {
                    return {
                            label: el?.name,
                            key: el?.id
                        }

                }))
            }
        })
    }, [idClinic])


    useEffect(() => {
        setLoading(true)

        postResource('ClinicOwner', 'PeriodAppointments', token, idClinic ? idClinic : ownerClinics?.id, date).then((response) => {

            let prevYear = Object.values(response?.incomes?.prev_year)

            let growth = Object.values(response?.incomes?.growth)
            let canceled = Object.values(response?.incomes[3])
            let closed = Object.values(response?.incomes[2])

            let a = Math.max(...prevYear);
            let bb = [10, 19, 25, 10, 15, 2];
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
                            pointBackgroundColor: "#C1BEC4",
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
                            pointBackgroundColor: function (context) {
                                return context.raw > 0 ? "#6DAF56" : "#CF533E";
                            },
                        },
                        {
                            label: "Previous",
                            data:prevYear,
                            //prevYearState,
                            borderColor: ["rgba(119, 77, 157, 1)"],
                            backgroundColor: "transparent",
                            fill: "start",
                            borderWidth: 3,
                            pointStyle:function (context) {

                                return context.raw == Math.max(...prevYear) ? true : false;
                            },


                            type: "line",


                        },
                        {
                            label: "aaaaa",
                            data: closed.map(el => el+10),
                            borderColor: ["rgba(119, 77, 157, 1)"],
                            backgroundColor: "transparent",
                            fill: "start",
                            borderWidth: 3,
                            pointBorderColor: "#a7f897",
                            pointStyle: "s",
                            type: "line",


                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    // "animation": {
                    //     "duration": 1,
                    //     "onComplete": function() {
                    //         var chartInstance = this.chart,
                    //             ctx = chartInstance.ctx;
                    //
                    //         //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    //         ctx.textAlign = 'center';
                    //         ctx.textBaseline = 'bottom';
                    //         for(let i = 0; i<10; i++){
                    //             ctx.fillText(i, i*10, 50);
                    //         }
                    //         /*this.data.datasets.forEach(function(dataset, i) {
                    //             var meta = chartInstance.controller.getDatasetMeta(i);
                    //             meta.data.forEach(function(bar, index) {
                    //                 var data = dataset.data[index];
                    //                 ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    //             });
                    //         });*/
                    //     }
                    // },
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
            <div className={'gradient_chart_big_div'}>
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
                <div className={'chart_div_outh'}>
                    <canvas ref={canvasRef} className="chart"></canvas>
                </div>

            </div>
        </Spin>

    )
}
export default GradientChart;
