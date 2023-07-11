import React from 'react';
import {Button} from "antd";
import arrow_prev from "../../dist/icons/arrow-prev.svg";
import arrow_next from "../../dist/icons/arrow-next.svg";

function ResourceTableHeader({params, setParams,data, setData}) {

    const onNextPage = () => {

        setParams((prevState)=>({
            ...prevState,
            page: data?.pagination?.current+1
        }))
    }
    const onBackPage = () => {
        setParams((prevState)=>({
            ...prevState,
            page: data?.pagination?.current-1
        }))
    }

    return(
        <div style={{display: 'flex', gap: 5}}>
            <Button className={'chart_button'} style={{paddingTop: 2}} disabled={data?.pagination?.current == 1} onClick={onBackPage}><img src={arrow_prev} alt={'arrow_prev'}/></Button>
            <div className={'resource_table_pagination_info_div'}>
                {data?.pagination?.current}/{data?.pagination?.last_page}
            </div>
            <Button className={'chart_button'} style={{paddingTop: 2}} disabled={params?.page == data?.pagination?.last_page} onClick={onNextPage} ><img src={arrow_next} alt={'arrow_next'}/></Button>
        </div>
    )
}
export default ResourceTableHeader;