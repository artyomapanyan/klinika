import React, {useEffect, useRef, useState} from 'react'
import {Button, Space, Spin, Switch} from "antd";
import {Chart,registerables} from "chart.js";
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



    const [date, setDate] = useState({
        from: dayjs().add(-14, 'days').format('YYYY-MM-DD'),
        to: dayjs().format('YYYY-MM-DD'),
    });



    useEffect(()=>{
        setLoading(true)
        postResource('DoctorReworked', 'PeriodAppointmentStats', token, '', date).then((response) => {
            let dates = Object.keys(response?.incomes).map(el => el.slice(5).replace('-', '/')).sort()
            let data = {
                2:[],
                3:[],
                4:[]
            }

            Object.values(response.incomes).forEach(item=>{
                item[2] = item[2]??0;
                item[3] = item[3]??0;
                item[4] = item[4]??0;
                Object.keys(item).forEach(itemKey=>{
                    data[itemKey].push(item[itemKey])
                })

            })

            let isNull = [];
            data[2].forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })

            data[3].forEach((el) => {
                if(el !== 0){
                    return isNull.push(el)
                }

            })

            data[4].forEach((el) => {
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
                    ctx.fillText(isNull.length === 0 ? "Ther aren't any information yet." : '' ,width/2,height/1.5, 500);
                    ctx.restore();

                },
            }


            const appointmentsStats = canvasRef.current.getContext("2d")
            Chart.register(...registerables)
            appointmentChartRef.current = new Chart(appointmentsStats, {
                type: "bar",
                data: {
                    labels: dates,
                    datasets: isNull.length === 0 ? [] : [
                        {
                            label: "Finished",
                            data: data[2],
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
                            label: "Canceled",
                            data:  data[3],
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
                            label: "Rescheduled",
                            data:  data[4],
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
                                stepSize: isNull.length === 0 ? 0.2 : 5,
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
                plugins: [noData],

            });
            setLoading(false)
        })




        return () => {
            appointmentChartRef?.current?.destroy()
        }
    },[date])
    const handleShowHide = (key,e)=>{
        let appointmentChart = appointmentChartRef.current;
        appointmentChart.config.data.datasets[key].hidden = !e
        appointmentChart.update()
    }

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
                        <Switch defaultChecked onChange={(e)=>handleShowHide(2,e)} style={{background:'#635D6B'}} /><span className={'text_switch'}>Canceled</span>
                    </div>
                    <div className={'switc_div'}>
                        <Switch defaultChecked onChange={(e)=>handleShowHide(1,e)} style={{background:'#F5A348'}} /> <span className={'text_switch'}>Rescheduled</span>
                    </div>
                    <div className={'switc_div'}>
                        <Switch defaultChecked onChange={(e)=>handleShowHide(0,e)} style={{background:'#60a428'}} /> <span className={'text_switch'}>Finished</span>
                    </div>

                    <Space style={{marginLeft:50}} className={'arrow_button'}>
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
