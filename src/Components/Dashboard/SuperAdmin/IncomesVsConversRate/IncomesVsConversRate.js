import React from "react";
import IncomesVsConversHeader from "./Fragment/IncomesVsConversHeader";
import "./Style/IncomeVsConversStyle.sass";
import MonthBars from "./Fragment/MonthBars";

function IncomesVsConversRate({data}) {





    return(
        <div className={'chart_incomes_div'}>
            <IncomesVsConversHeader />
            {
                Object.keys(data).map((el, key) => {
                    return <MonthBars key={key} data={data[el]} maxIncome={Math.max(...Object.values(data).map(el=>el.income))}/>
                })
            }
        </div>
    )
}
export default IncomesVsConversRate;