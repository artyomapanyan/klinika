import risk from "../../../dist/icons/risk.png";
import Vector from "../../../dist/icons/Vector.png";
import VectorHend from "../../../dist/icons/VectorHend.png";
import {Divider, Space} from "antd";

function PatientCardRight() {
    return(
        <div style={{padding:24}}>
            <div style={{display:"flex", flexDirection:'column', justifyContent:"center", alignItems:"center"}}>
                <img style={{height:150, width:150}} alt={'icons'} src={risk}/>
                <div> <span >Max</span> <span>Risks</span></div>

            </div>
            <Divider />
            <div style={{display:"flex", flexDirection:'row', justifyContent:"center", alignItems:"center", lineHeight:'25px'}}>
                <Space size={'large'}>
                    <div>
                        <img alt={'icons'} src={Vector}/>
                    </div>

                    <div style={{padding:20}}>
                        <div><Space size={'large'}><span className={'right_vector'}>Height</span>170 cm</Space></div>
                        <div><Space size={'large'}><span className={'right_vector'}>Weight</span> 70 kgs</Space></div>
                        <div><Space size={'large'}><span className={'right_vector'}>BMI</span> <span style={{fontWeight:700, color:'#F5A348'}}>25.8 kg/m2</span></Space><div>(Overweight)</div></div>
                    </div>
                </Space>
            </div>
            <Divider />
            <div>
                <div style={{display:"flex", flexDirection:'row', justifyContent:"center", alignItems:"center", padding:20, lineHeight:'25px'}}>
                    <Space size={'large'}>
                        <div>
                            <img alt={'icons'} src={VectorHend}/>
                        </div>

                        <div style={{padding:20}}>
                            <div>
                                <h1>Blood Pressure</h1>
                            </div>
                            <div><Space size={'large'}><span className={'right_vector'}>Height</span>170 cm</Space></div>
                            <div><Space size={'large'}><span className={'right_vector'}>Weight</span> 70 kgs</Space></div>
                            <div><Space size={'large'}><span className={'right_vector'}>BMI</span> <span style={{fontWeight:700, color:'#F5A348'}}>25.8 kg/m2</span></Space><div>(Overweight)</div></div>
                        </div>
                    </Space>
                </div>
            </div>
        </div>

    )
}
export default PatientCardRight;