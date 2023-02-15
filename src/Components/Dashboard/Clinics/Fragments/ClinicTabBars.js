import React from 'react'
import {Tabs} from "antd";
import "../../../../dist/styles/Styles.sass"
function ClinicTabBars({children,onChange,activeKey}){
    return<Tabs onChange={(e)=>onChange(e)}
                activeKey={activeKey}
                renderTabBar={(props)=><div className={'Clinic_tab_conteiner'}  >
        {  props.panes.map(pane=> {
            return <div className={`tab_item_container ${pane.key===props.activeKey?'tab_active':''}`} key={pane.key} onClick={(e) => props.onTabClick(pane.key, e)}>
                <div className={'clinic_tab_item'}>{pane.props.tab}</div>
            </div>
        })}
    </div>}>
        {children}

    </Tabs>
}
export default ClinicTabBars