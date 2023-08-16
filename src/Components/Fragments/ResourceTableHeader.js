import React from 'react';
import {Button} from "antd";
import arrow_prev from "../../dist/icons/arrow-prev.svg";
import arrow_next from "../../dist/icons/arrow-next.svg";

function ResourceTableHeader({props}) {

    const onNextPage = () => {

        props?.setParams((prevState)=>({
            ...prevState,
            page: props?.data?.pagination?.current+1
        }))
    }
    const onBackPage = () => {
        props?.setParams((prevState)=>({
            ...prevState,
            page: props?.data?.pagination?.current-1
        }))
    }
    return(
        <div style={{display: 'flex', gap: 5}}>
            <Button className={'chart_button'} style={{paddingTop: 2}} disabled={props?.data?.pagination?.current == 1} onClick={onBackPage}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
            <div className={'resource_table_pagination_info_div'}>
                {props?.data?.pagination?.current}/{props?.data?.pagination?.last_page}
            </div>
            <Button className={'chart_button'} style={{paddingTop: 2}} disabled={props?.params?.page == props?.data?.pagination?.last_page} onClick={onNextPage} ><img src={arrow_next} alt={'arrow_next'}/></Button>
        </div>
    )
}
export default ResourceTableHeader;