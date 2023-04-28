import React, {useEffect, useRef, useState} from 'react'
import {Button, Radio, Space, Spin, Switch, Typography} from "antd";
import {Chart,registerables} from "chart.js";
import {t} from "i18next";
import dayjs from "dayjs";
import arrow_prev from "../../../dist/icons/arrow-prev.svg";
import arrow_next from "../../../dist/icons/arrow-next.svg";
import {useSelector} from "react-redux";
import {postResource} from "../../Functions/api_calls";
import {GMBK} from "../../../functions";
function AppointmentStats(){
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)
    let token = useSelector((state) => state.auth.token);
    const [loading, setLoading] = useState(true)
    let ownerClinics = useSelector((state) => state?.owner);

    const [startAndDate, setStartAndDate] = useState(dayjs());

    const [date, setDate] = useState({
        from: dayjs().add(-14, 'days').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),
    });

    console.log(date, 'date')

    useEffect(()=>{

        postResource('DoctorReworked', 'PeriodAppointmentStats', token, '', date).then((response) => {

console.log(response)

            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: "bar",
                data: {
                    labels: [
                        "11/01",
                        "12/04",
                        "13/04",
                        "14/04",
                        "15/04",
                        "16/04",
                        "17/04",
                        "18/04",
                        "19/04",
                        "20/04",
                        "21/04",
                        "22/04",
                        "23/04",
                        "24/04",
                    ],
                    datasets: [
                        {
                            label: "Finished",
                            data: [40, 70, 7, 62, 45, 39, 13, 7, 20, 35, 42, 10, 5, 20],
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
                            label: "Rescheduled",
                            data: [20, 15, 0, 38, 15, 22, 15, 22, 5, 17, 30, 41, 50, 32],
                            stack: "Stack 0",
                            backgroundColor: ["#F5A348"],
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
                            data: [10, 0, 75, 0, 15, 32, 26, 22, 15, 7, 10, 14, 30, 12],
                            stack: "Stack 0",
                            backgroundColor: ["rgba(99, 93, 107, 0.4)"],
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
                    responsive: true,
                    maintainAspectRatio: false,
                    barThickness: 10,
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
                                stepSize: 20,
                                showLabelBackdrop: false,
                                position: "left",
                                padding: 40,
                                callback: function (label) {
                                    return label  + "%";
                                },
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
                        tooltip: false,
                    },
                },

            });
            setLoading(false)
        })




        return () => {
            appointmentChartRef?.current?.destroy()
        }
    },[])
    const handleShowHide = (key,e)=>{
        let appointmentChart = appointmentChartRef.current;
        appointmentChart.config.data.datasets[key].hidden = !e
        appointmentChart.update()
    }


   let period = 14;

    const onNextYear = () => {
        setDate((prevState)=>({
            from:dayjs(prevState.from).add(14, 'days').format('YYYY-MM-DD'),
            to:dayjs(prevState.to).add(14, 'days').format('YYYY-MM-DD')
        }))

    }

    const onBackYear = () => {
        setDate((prevState)=>({
            from:dayjs(prevState.from).add(-14, 'days').format('YYYY-MM-DD'),
            to:dayjs(prevState.to).add(-14, 'days').format('YYYY-MM-DD')
        }))

    }

    return<Spin spinning={loading}>
    <div className={'chart_incomes_div'}>
        <div className={'dr_reworked_app_states_chart_head'}>
            <div className={'app_clinic'}>Appointments stats</div>

            <div>
                <div className={'switches_div'}>

                    <div className={'switc_div'}>
                        <Switch defaultChecked onChange={(e)=>handleShowHide(2,e)} style={{background:'#a7a8a7'}} /><span style={{marginLeft: 15}}>Canceled</span>
                    </div>
                    <div className={'switc_div'}>
                        <Switch defaultChecked onChange={(e)=>handleShowHide(1,e)} style={{background:'#F5A348'}} /> <span style={{marginLeft: 15}}>Rescheduled</span>
                    </div>
                    <div className={'switc_div'}>
                        <Switch defaultChecked onChange={(e)=>handleShowHide(0,e)} style={{background:'#60a428'}} /> <span style={{marginLeft: 15}}>Finished</span>
                    </div>

                    <Space style={{marginLeft:50}}>
                        <Button className={'chart_button'}
                                onClick={onBackYear}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
                        <div className={'app_stats_date_div'}>
                            {dayjs(date.from).format('DD')} -  {dayjs(date.to).format('DD')} {GMBK(dayjs(date.to).month())}
                        </div>
                        <Button className={'chart_button'} disabled={date.to >= dayjs()}
                                onClick={onNextYear}><img src={arrow_next} alt={'arrow_next'}/></Button>
                    </Space>
                </div>

            </div>
        </div>

        <div style={{height: '427px', width: '100%'}}>
            <canvas ref={canvasRef} className="chart" id="appointmentsChart"></canvas>
        </div>
    </div>
    </Spin>
}
export default AppointmentStats
