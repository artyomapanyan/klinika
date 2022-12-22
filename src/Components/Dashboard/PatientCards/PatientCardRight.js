import risk from "../../../dist/icons/risk.png";
import Vector from "../../../dist/icons/Vector.png";
import VectorHend from "../../../dist/icons/VectorHend.png";
import {Divider, Space} from "antd";
import PatientCardNextAppoint from "./PatientCardNextAppoint";

function PatientCardRight() {
    return(
        <div className={'Patient_card_right_div'}>
            <div className={'Patient_card_right_img'}>
                <img alt={'icons'} src={risk}/>
            </div>
            <Divider />
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
            <Divider />
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
                <PatientCardNextAppoint/>
            </div>
        </div>

    )
}
export default PatientCardRight;