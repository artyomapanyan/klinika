import  React from 'react'
import moment from "moment";
function DateParser({date}){
    return date?moment(date).format('DD-MM-YYYY'):null
}
export default DateParser
