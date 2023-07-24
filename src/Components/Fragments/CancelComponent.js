import React from "react";
import {Button, Popconfirm} from "antd";
import {t} from "i18next";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
function CancelComponent({changeValuesState}) {
    let dispatch = useDispatch()
    const navigate = useNavigate();
    return(
        <div>
            {
                Object.keys(changeValuesState).length > 0 ? <Popconfirm
                    title={t("your changes will not be saved")}
                    onConfirm={() => {
                        navigate(-1)
                        dispatch({
                            type: 'DASHBOARD_STATE',
                            payload: false
                        })
                    } }
                    okText={t("Yes")}
                    cancelText={t("No")}
                    icon={<QuestionCircleOutlined style={{color: 'red'}}/>}>
                    <Button size={'large'} type={'secondary'} >{t('Cancel')}</Button>
                </Popconfirm> : <Button onClick={() => navigate(-1)} size={'large'} type={'secondary'} >{t('Cancel')}</Button>
            }
        </div>
    )
}
export default CancelComponent;