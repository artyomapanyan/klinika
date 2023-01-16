import React, {useState} from "react";
import "./ClinicManagerCalendar.scss";
import {Avatar, Button, Input} from "antd";
import {SearchOutlined, DownOutlined} from "@ant-design/icons";
import ClinicManagerCalendarHead from "./Fragments/ClinicManagerCalendarHead";
import ClicicManagerCalendarCollapse from "./Fragments/ClicicManagerCalendarCollapse";

function ClinicManagerCalendar() {




    return(
        <section style={{backgroundColor:"white", marginTop:20, borderRadius:10}}>
            <ClinicManagerCalendarHead />
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
                                                    <Input placeholder="Alex sushkoff" size={'large'} aria-label="Search" prefix={<SearchOutlined />} />
                                                </div>
                                            </td>
                                            <td className="appointmentsDate">
                                                <div className="appointmentsDate__content">
                                                    <span className="appointmentsDate__content__text">21</span>
                                                    <span
                                                        className="ppointmentsDate__content__text appointmentsDate__content__text--light">tue</span>
                                                </div>
                                            </td>
                                            <td className="appointmentsDate">
                                                <div className="appointmentsDate__content">
                                                    <span className="appointmentsDate__content__text">22</span>
                                                    <span
                                                        className="appointmentsDate__content__text appointmentsDate__content__text--light">wed</span>
                                                </div>
                                            </td>
                                            <td className="appointmentsDate">
                                                <div className="appointmentsDate__content">
                                                    <span className="appointmentsDate__content__text">23</span>
                                                    <span
                                                        className="appointmentsDate__content__text appointmentsDate__content__text--light">Thu</span>
                                                </div>
                                            </td>
                                            <td className="appointmentsDate">
                                                <div className="appointmentsDate__content">
                                                    <span
                                                        className="appointmentsDate__content__text appointmentsDate__content__text--disabled">24</span>
                                                    <span
                                                        className="appointmentsDate__content__text appointmentsDate__content__text--light">Fri</span>
                                                </div>
                                            </td>
                                            <td className="appointmentsDate">
                                                <div className="appointmentsDate__content">
                                                    <span className="appointmentsDate__content__text">25</span>
                                                    <span
                                                        className="appointmentsDate__content__text appointmentsDate__content__text--light">sat</span>
                                                </div>
                                            </td>
                                            <td className="appointmentsDate">
                                                <div className="appointmentsDate__content">
                                                    <span className="appointmentsDate__content__text">26</span>
                                                    <span
                                                        className="appointmentsDate__content__text appointmentsDate__content__text--light">sun</span>
                                                </div>
                                            </td>
                                            <td className="appointmentsDate">
                                                <div className="appointmentsDate__content">
                                                    <span className="appointmentsDate__content__text">27</span>
                                                    <span
                                                        className="appointmentsDate__content__text appointmentsDate__content__text--light">mon</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div className="scrollXHide">
                                    <table className="appointmentsProgressTable">

                                        <ClicicManagerCalendarCollapse />

                                        <tr onClick="showHideRow('hidden_row2');"
                                            className="appointmentsProgressTable__shownRow">
                                            <td>
                                                <button className="appointmentsBranch">
                                                    <span>Neurology</span>
                                                    <DownOutlined />
                                                </button>
                                            </td>
                                            <td>
                                                <div className="progress progressPurple">
                                                    <div className="progress-bar progressPurple__inside"
                                                         role="progressbar"
                                                         style={{width: '85%'}} aria-valuenow="85" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                    </div>
                                                    <div className="progressText">85%</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="progress progressPurple">
                                                    <div className="progress-bar progressPurple__inside"
                                                         role="progressbar"
                                                         style={{width: '85%'}} aria-valuenow="85" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                    </div>
                                                    <div className="progressText">85%</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="progress progressPurple">
                                                    <div className="progress-bar progressPurple__inside"
                                                         role="progressbar"
                                                         style={{width: '15%'}} aria-valuenow="15" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                    </div>
                                                    <div className="progressText">15%</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="progress progressPurple ">
                                                    <div className="progressInactive"></div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="progress progressPurple">
                                                    <div className="progress-bar progressPurple__inside"
                                                         role="progressbar"
                                                         style={{width: '58%'}} aria-valuenow="58" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                    </div>
                                                    <div className="progressText">58%</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="progress progressPurple">
                                                    <div className="progress-bar progressPurple__inside"
                                                         role="progressbar"
                                                         style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                    </div>
                                                    <div className="progressText">25%</div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="progress progressPurple">
                                                    <div className="progress-bar progressPurple__inside"
                                                         role="progressbar"
                                                         style={{width: '0'}} aria-valuenow="85" aria-valuemin="0"
                                                         aria-valuemax="100">
                                                    </div>
                                                    <div className="progressText">0%</div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr id="hidden_row2" className="hide">
                                            <td className="p-0 border-top-0">
                                                <div>
                                                    <table className="mb-0 w-100">
                                                        <tbody>
                                                        <tr className="hiddenTableRow">
                                                            <td className="hiddenTableRow__col">
                                                                <div className="hiddenTableRow__col-item">
                                                                    <div className="circleImageHolder">
                                                                        <Avatar size={45}/>
                                                                    </div>
                                                                    <p>Marvin McKinney</p>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '100%'}}
                                                                         aria-valuenow="85" aria-valuemin="0"
                                                                         aria-valuemax="100">
                                                                    </div>
                                                                    <div className="progressText">100%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '72%'}}
                                                                         aria-valuenow="72" aria-valuemin="0"
                                                                         aria-valuemax="100">
                                                                    </div>
                                                                    <div className="progressText">72%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '53%'}}
                                                                         aria-valuenow="42" aria-valuemin="0"
                                                                         aria-valuemax="100">
                                                                    </div>
                                                                    <div className="progressText">53%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressInactive"></div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div
                                                                    className="progressGreen progressGreen--disabled"></div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '35%'}}
                                                                         aria-valuenow="0" aria-valuemin="12"
                                                                         aria-valuemax="100">
                                                                    </div>
                                                                    <div className="progressText">35%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '35%'}}
                                                                         aria-valuenow="0" aria-valuemin="12"
                                                                         aria-valuemax="100">
                                                                    </div>
                                                                    <div className="progressText">35%</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="hiddenTableRow">
                                                            <td className="hiddenTableRow__col">
                                                                <div className="hiddenTableRow__col-item">
                                                                    <div className="circleImageHolder">
                                                                        <Avatar size={45}/>
                                                                    </div>
                                                                    <p>Marvin McKinney</p>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '100%'}}
                                                                         aria-valuenow="85" aria-valuemin="0"
                                                                         aria-valuemax="100"></div>
                                                                    <div className="progressText">100%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '72%'}}
                                                                         aria-valuenow="72" aria-valuemin="0"
                                                                         aria-valuemax="100"></div>
                                                                    <div className="progressText">72%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '53%'}}
                                                                         aria-valuenow="42" aria-valuemin="0"
                                                                         aria-valuemax="100"></div>
                                                                    <div className="progressText">53%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressInactive"></div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div
                                                                    className="progressGreen progressGreen--disabled"></div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '35%'}}
                                                                         aria-valuenow="0" aria-valuemin="12"
                                                                         aria-valuemax="100">
                                                                    </div>
                                                                    <div className="progressText">35%</div>
                                                                </div>
                                                            </td>
                                                            <td className="hiddenTableRow__col">
                                                                <div className="progress progressGreen">
                                                                    <div className="progress-bar progressGreen__inside"
                                                                         role="progressbar" style={{width: '0'}}
                                                                         aria-valuenow="0" aria-valuemin="12"
                                                                         aria-valuemax="100">
                                                                    </div>
                                                                    <div className="progressText">0%</div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}
export default ClinicManagerCalendar;