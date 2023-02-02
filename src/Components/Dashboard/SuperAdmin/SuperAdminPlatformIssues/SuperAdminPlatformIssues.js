import React from "react";
import { Progress, Tooltip } from 'antd';
function SuperAdminPlatformIssues() {
    return(
        <div className={'issues_div'}>
            <div>Current month</div>
            <Tooltip title="3 done / 3 in progress / 4 to do">
                <Progress
                    percent={20}
                    success={{
                        percent: 20,
                    }}
                    showInfo={true}
                    strokeWidth={20}
                    strokeColor={'#F5A348'}
                    strokeLinecap="butt"
                    format={((percent) => {
                        return <div style={{marginLeft:-20, color:'white'}}>dfdfdf</div>
                    })
                    }
                />
            </Tooltip>
            <Tooltip title="3 done / 3 in progress / 4 to do">
                <Progress
                    percent={50}
                    success={{
                        percent: 30,
                    }}
                    showInfo={true}
                    strokeWidth={20}
                    strokeColor={'#F5A348'}
                    strokeLinecap="butt"
                    format={((percent) => {
                        return <div style={{marginLeft:-20, color:'white'}}>dfdfdf</div>
                    })
                    }
                />
            </Tooltip>
            <div>Previous month</div>
            <Tooltip title="3 done / 3 in progress / 4 to do">
                <Progress
                    percent={100}
                    success={{
                        percent: 60,
                    }}
                    showInfo={true}
                    strokeWidth={20}
                    strokeColor={'#F5A348'}
                    strokeLinecap="butt"
                    format={((percent) => {
                        return <div style={{marginLeft:-20, color:'white'}}>dfdfdf</div>
                    })
                    }
                />
            </Tooltip>
            <Tooltip title="3 done / 3 in progress / 4 to do">
                <Progress
                    percent={70}
                    success={{
                        percent: 50,
                    }}
                    showInfo={true}
                    strokeWidth={20}
                    strokeColor={'#F5A348'}
                    strokeLinecap="butt"
                    format={((percent) => {
                        return <div style={{marginLeft:-20, color:'white'}}>dfdfdf</div>
                    })
                    }
                />
            </Tooltip>
        </div>
    )
}
export default SuperAdminPlatformIssues;