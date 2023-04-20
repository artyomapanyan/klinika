import React from 'react'
import ResourceTable from "../../Fragments/ResourceTable";
import TableFilterElement from "../../Fragments/TableFilterElements/TableFilterElement";
import {t} from "i18next";
import DateParser from "../../Fragments/DateParser";

function Coupons() {
    return(
        <div>
            <ResourceTable resource={'Coupon'} tableColumns={[
                {
                    title:'Redeem code',
                    dataIndex:'redeem_code',
                    key:'redeem_code',
                    sorter:true,
                },
                {
                    title:t('Name'),
                    dataIndex:'name',
                    key:'name',
                    sorter:true,
                    filterDropdown: (props)=><TableFilterElement filterProps={props}/>,
                },
                {
                    dataIndex:'discount_amount',
                    title:t('Discount amount'),
                    key:'discount_amount',
                    render:(e, record)=><div>{record?.discount_amount}</div>
                },
                {
                    dataIndex:'max_usable_count',
                    title:t('Max usable count'),
                    key:'max_usable_count',
                },
                {
                    dataIndex:'money_redeemed_so_far',
                    title:t('Money redeemed so far'),
                    key:'money_redeemed_so_far',
                },
                {
                    dataIndex:['expired_at','iso_string'],
                    title:t('Export date'),
                    key:'date',
                    render:i=><DateParser date={i}/>
                },
            ]} title={t('Coupons')}/>
        </div>
    )
}
export default Coupons;
