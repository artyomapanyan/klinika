import React from 'react'
import {Tabs} from "antd";
import './TabBars.sass';
function TabBars({children, onChange, activeKey}){
    return<Tabs onChange={(e)=>onChange(e)}
                activeKey={activeKey}
        renderTabBar={(props)=><div className={'tabContainer'}>
            {  props.panes.map(pane=> {
                return <div className={`tab-item-container ${pane.key===props.activeKey?'tab-active':''}`} key={pane.key} onClick={(e) => props.onTabClick(pane.key, e)}>
                    <div className={'tab-item'}>{pane.props.tab}</div>
                    <div className={'tab-below'}></div>
                </div>
            })}
        </div>}>
        {children}

    </Tabs>
}
export default TabBars
