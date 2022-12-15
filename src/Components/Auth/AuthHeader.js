import i18n, {changeLanguage} from "i18next";
import {Button, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ArrowLeftOutlined} from "@ant-design/icons";

function AuthHeader() {
    let lngs = useSelector((state) => state?.app?.supported_locales);
    let dispatch = useDispatch()

    const languageChange = (value) => {
        changeLanguage(value)
        dispatch({
            type:'LANGUAGE_STATE',
            payload:value
        })
        window.location.reload()
    }

    return (
        <div style={{width:'100%', position:"absolute", top:45, display: "flex", flexDirection:"row", JustifyContent:'space-around'}}>

                <Button style={{left:'3%', height: 48, width: 48, backgroundColor:'#FFFFFF3D', color:'white', fontWeight: 900, border:'none'}}><ArrowLeftOutlined /></Button>

                <Select
                    defaultValue={i18n.resolvedLanguage}
                    style={{width: 100, left:'89%'}}
                    onChange={languageChange}
                >
                    {
                        Object.keys(lngs).map((el) => (
                            <Select.Option key={el}>{lngs[el].nativeName}</Select.Option>
                        ))
                    }
                </Select>


        </div>
    )
}
export default AuthHeader;