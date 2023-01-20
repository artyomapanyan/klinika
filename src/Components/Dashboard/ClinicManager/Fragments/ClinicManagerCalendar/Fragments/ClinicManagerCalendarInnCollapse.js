import {Avatar, Modal} from "antd";
import React, {useState} from "react";
import CalendarInnCollapseModal from "./CalendarInnCollapseModal";

function ClinicManagerCalendarInnCollapse() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    let cal = [100, 72, 53, 11, 30, 35, 30]

    return(
        <tr id="hidden_row1" className="hide">
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
                            {
                                cal.map((el)=> {
                                    return<td className="hiddenTableRow__col" onClick={()=>setIsModalOpen(true)} >

                                        <div className="progress progressGreen">
                                           <div className="progress-bar progressGreen__inside"
                                                 role="progressbar" style={{width: '100%'}}
                                                 aria-valuenow="85" aria-valuemin="0"
                                                aria-valuemax="100">
                                           </div>
                                           <div className="progressText">{el}%</div>
                                       </div>
                                    </td>
                                })
                            }
                            <Modal open={isModalOpen}  onCancel={()=>setIsModalOpen(false)} width={'400px'} footer={null}>
                                <CalendarInnCollapseModal />
                            </Modal>

                            {/*<td className="hiddenTableRow__col">*/}
                            {/*    <div className="progress progressInactive"></div>*/}
                            {/*</td>*/}
                            {/*<td className="hiddenTableRow__col">*/}
                            {/*    <div className="progressGreen progressGreen--disabled"></div>*/}
                            {/*</td>*/}

                        </tr>
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    )
}
export default ClinicManagerCalendarInnCollapse;