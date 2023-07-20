
import Vector from "../../../../../dist/icons/Vector.png";
import VectorHend from "../../../../../dist/icons/VectorHend.png";
import {Avatar, Space, Tag} from "antd";

import plusPurple from "../../../../../dist/icons/plus-purple.svg";
import {UserOutlined} from "@ant-design/icons";
import React from "react";

function PatientCardRight() {
    return(
        <div className={'Patient_card_right_div'} style={{marginRight: 24, marginTop: 24}}>
            {/*<div className={'Patient_card_right_img'}>*/}
            {/*    <img alt={'icons'} src={risk}/>*/}
            {/*</div>*/}
            {/*<Divider />*/}
            <div className={'Patient_card_right_content'}>
                <Space size={'large'}>
                    <div>
                        <img alt={'icons'} src={Vector}/>
                    </div>

                    <div style={{padding:20}}>
                        <div><Space size={'large'}><span className={'right_vector'}>Height</span>170 cm</Space></div>
                        <div><Space size={'large'}><span className={'right_vector'}>Weight</span> 70 kgs</Space></div>
                        <div><Space size={'large'}><span className={'right_vector'}>BMI</span> <span className={'Patient_card_right_bold_text'}>25.8 kg/m2</span></Space><div>(Overweight)</div></div>
                    </div>
                </Space>
            </div>

            <div>
                <div className={'Patient_card_right_content'}>
                    <Space size={'large'}>
                        <div>
                            <img alt={'icons'} src={VectorHend}/>
                        </div>

                        <div style={{padding:20}}>
                            <div>
                                <h1 style={{fontWeight:700}}>Blood Pressure</h1>
                            </div>
                            <div><Space size={'large'}><span className={'right_vector'}>Systolic</span>120 mmHg</Space></div>
                            <div><Space size={'large'}><span className={'right_vector'}>Diasstolic</span>80 mmHg</Space></div>
                            <div><Space size={'large'}><span className={'right_vector'}>Blood type</span>A+</Space></div>
                        </div>

                    </Space>
                </div>
            </div>

            <div>
                <div className={'patient_next_app_head'}>
                    <div className={'next_app_text'}>
                        Next Appointments:
                    </div>
                    <div>
                        <div> <img alt={'icons'} src={plusPurple}/><span className={'add_text'}>Add</span></div>
                    </div>
                </div>
                <div className={'patient_next_app_content'}>
                    <div>
                        <Avatar  size={48}  shape="square" icon={<UserOutlined />} />
                    </div>
                    <div className={'patient_next_app_texts'}>
                        <div><Tag color="magenta" style={{backgroundColor:'#D477B030'}} className={'ant_tag'}>Cardiology</Tag> 30 July 2022</div>
                        <div className={'patient_next_app_name_text'}>
                            Annette Black
                        </div>

                    </div>
                </div>
                <div className={'patient_next_app_content'}>
                    <div>
                        <Avatar  size={48}  shape="square" icon={<UserOutlined />} />
                    </div>
                    <div className={'patient_next_app_texts'}>
                        <div><Tag color="magenta" style={{backgroundColor:'#D477B030'}} className={'ant_tag'}>Cardiology</Tag> 30 July 2022</div>
                        <div className={'patient_next_app_name_text'}>
                            Annette Black
                        </div>

                    </div>
                </div>
                {/*<PatientCardNextAppoint/>*/}
            </div>
        </div>

    )
}
export default PatientCardRight;