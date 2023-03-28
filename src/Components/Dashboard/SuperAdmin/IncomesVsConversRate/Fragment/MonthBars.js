import React from "react";

function MonthBars({data, maxIncome}) {
    const HGP =(income)=>income*100/maxIncome


    return(
        <div className={'month_conteiner'}>
            <div className={'month_name'}>{data.month}</div>
            <div className={'big_container'}>
                <div className={'dark_purple_container'}>
                    <div className={'purple_bar'} style={{width:HGP(data.income)+'%', minWidth:60, backgroundColor:'#7c4d98'}}>
                        <div className={'purple_int'}>{data.income}$</div>
                    </div>
                </div>
                <div className={'purple_container'}>
                    <div className={"purple_bar"} style={{width:`${data.offer_sold /10}%`,minWidth:50, backgroundColor:'#ce4e99'}} >
                        <div className={'purple_int'}>{data.offer_sold}</div>
                    </div>
                    <div className={"small_bar1"}>
                        <div className={'int_1'}>{data.views}K</div>
                    </div>
                    <div className={"small_bar2"} style={{backgroundColor: data.conversation_rate < 1 ? 'red' : data.conversation_rate >= 1 && data.conversation_rate <= 7 ? '#F5A348' : '#60a428'}}>
                        <div className={'int_2'}>{data.conversation_rate}%</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MonthBars;