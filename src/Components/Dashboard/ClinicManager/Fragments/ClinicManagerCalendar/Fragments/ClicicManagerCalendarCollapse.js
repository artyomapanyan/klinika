
import React, {useState} from "react";
import {Avatar, Button} from "antd";
import {DownOutlined} from "@ant-design/icons";

function ClicicManagerCalendarCollapse() {
    const [btnCollapsed, setBtnCollapsed] = useState(false);

    const openCollapse = () => {
        setBtnCollapsed(!btnCollapsed)
    }

    return(
        <>
            <tr className="appointmentsProgressTable__shownRow">
                <td>
                    <Button className="appointmentsBranch" onClick={openCollapse} >
                        <span>Pediatrics</span>
                        <DownOutlined/>
                    </Button>
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
                             style={{width: '85%',}} aria-valuenow="85" aria-valuemin="0"
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


            {
                btnCollapsed ? <tr id="hidden_row1" className="hide">
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
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr> : null
            }


        </>

    )
}
export default ClicicManagerCalendarCollapse;