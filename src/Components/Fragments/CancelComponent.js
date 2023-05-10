import React from "react";
import {Button, Popconfirm} from "antd";
import {t} from "i18next";
import resourceLinks from "../ResourceLinks";
import {QuestionCircleOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
function CancelComponent({changeValuesState, resource}) {
    const navigate = useNavigate();
    return(
        <div>
            {
                Object.keys(changeValuesState).length > 0 ? <Popconfirm
                    title={t("your changes will not be saved")}
                    onConfirm={() => navigate(-1) }
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