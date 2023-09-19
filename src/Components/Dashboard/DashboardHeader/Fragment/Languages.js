import {Dropdown, Space} from "antd";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeLanguage} from "i18next";
import Eglend from "../../../../dist/Img/Eglend.png";
import Arabia from "../../../../dist/Img/Arabia.png";
import arrowDownPurple from "../../../../dist/icons/arrowDownPurple.svg";
import {postResource} from "../../../Functions/api_calls";


function Languages() {
    //let {supported_locales,current_locale} = useSelector((state) => state?.app);
    let lngs = useSelector((state) => state?.app?.current_locale);
    const auth = useSelector(state => state.auth)
    let dispatch = useDispatch()
    // const languageChange = (value) => {
    //     changeLanguage(value)
    //     dispatch({
    //         type:'LANGUAGE_STATE',
    //         payload:value
    //     })
    //     window.location.reload()
    // }


    const items = [
        {
            label: [<img key={Math.random()} src={Eglend} alt={'Eglend'} style={{width:20, borderRadius: 15}}/>, '  ', 'English'],
            key: 'en',
        },
        {
            label: [<img key={Math.random()} src={Arabia} alt={'Arabia'} style={{width:22}}/>,"  ", "Arabic"],
            key: 'ar',
        },

    ];
    const onClick = ({key}) => {

        changeLanguage(key)
        dispatch({
            type:'LANGUAGE_STATE',
            payload:key
        })
        // postResource('Auth','switchRole', auth.token,null,{role_id:auth?.selected_role?.id}).then((response) => {
        //     console.log(response, 'o')
        // })
        window.location.reload()
    };

    return(
        <div style={{paddingLeft: 10,paddingRight:10, cursor:'pointer'}}>
            {/*<Select*/}
            {/*    defaultValue={current_locale}*/}
            {/*    style={{width: 120, borderRadius:15}}*/}
            {/*    onChange={languageChange}*/}
            {/*    className={'lngSelect'}*/}
            {/*>*/}
            {/*    {*/}
            {/*        Object.keys(supported_locales??[]).map((el) => (*/}
            {/*            <Select.Option key={el}>{supported_locales[el].native}</Select.Option>*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</Select>*/}


            <Dropdown
                menu={{
                    items,
                    onClick,
                }}
                trigger={['click']}
                style={{color: 'white'}}
            >
                <Space>
                    {lngs === "ar" ? <img src={Arabia} alt={'Arabia'} style={{width:30}}/> : <img src={Eglend} alt={'Eglend'} style={{width:30, borderRadius: 15}}/>}
                    <img alt={'icons'} src={arrowDownPurple}/>
                </Space>

            </Dropdown>
        </div>
    )
}
export default Languages;