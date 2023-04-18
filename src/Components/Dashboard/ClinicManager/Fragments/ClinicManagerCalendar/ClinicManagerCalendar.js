import React, {useEffect, useState} from "react";
import "./ClinicManagerCalendar.scss";
import {Avatar, Input, Spin} from "antd";
import {SearchOutlined, DownOutlined} from "@ant-design/icons";
import ClinicManagerCalendarHead from "./Fragments/ClinicManagerCalendarHead";
import ClicicManagerCalendarCollapse from "./Fragments/ClicicManagerCalendarCollapse";
import dayjs from "dayjs";
import {postResource} from "../../../../Functions/api_calls";
import {useSelector} from "react-redux";
import Resources from "../../../../../store/Resources";

function ClinicManagerCalendar() {
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState([dayjs().startOf('week'), dayjs().endOf('week')])
    const [data, setData] = useState([{}]);
    let token = useSelector((state) => state.auth.token);
    useEffect(() => {
        setLoading(true)
        postResource('ClinicManager', 'DoctorWorkload', token, '', {
            from: date[0],
            to: date[1],
            speciality: 1
        }).then((response) => {
            setData(Object.values(response.workload))
            setLoading(false)

        })

    }, [date])


    return (
        <section className={'table_conteiner'}>
            <Spin spinning={loading}>
                <ClinicManagerCalendarHead date={date} setDate={setDate}/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="d-flex justify-content-center w-100">
                            <div className="col-12 card mb-4 cardStyle">
                                <div className="card-body">
                                    <div className="scrollXHide">
                                        <table className="w-100">
                                            <tr className="d-flex align-items-center justify-content-between w-100">
                                                <td>
                                                    <div className="input-group md-form form-sm pl-0 mr-3 searchInput">
                                                        <Input placeholder="Alex sushkoff" size={'large'}
                                                               aria-label="Search" prefix={<SearchOutlined/>}/>
                                                    </div>
                                                </td>
                                                {[...Array(7).keys()].map(e => {
                                                    return <td className="appointmentsDate">
                                                        <div className="appointmentsDate__content">
                                                            <span
                                                                className="appointmentsDate__content__text">{date[0].add(e, 'days').format('DD')}</span>
                                                            <span
                                                                className="ppointmentsDate__content__text appointmentsDate__content__text--light">{Resources.Days[e]}</span>
                                                        </div>
                                                    </td>
                                                })}
                                            </tr>
                                            {data.map(item => <ClicicManagerCalendarCollapse item={item}/>)}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </section>


    )
}

export default ClinicManagerCalendar;