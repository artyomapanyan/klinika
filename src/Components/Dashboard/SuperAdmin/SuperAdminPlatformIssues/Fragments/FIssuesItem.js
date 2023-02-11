import React from 'react'

function FIssuesItem({data}){
    return <div className={'container'}>

        <div className={'bar1'} style={{width: `${data.active *10}%`, borderRadius: data.active === data.solved ? 5 : "5px 0 0 5px"}}>
            <div className={'web'}>
                {data.name}
            </div>
        </div>
        <div className={'bar2'} style={{width:`${(data.solved - data.active) *10}%`, borderRadius: data.active === 0 ? 5 : "0 5px 5px 0"}}>
            <div className={'int'}>
                {data.active}/{data.solved}
            </div>
        </div>

    </div>
}
export default FIssuesItem