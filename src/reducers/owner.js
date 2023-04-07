import dayjs from 'dayjs'
export default function owner(state = {
    month_key: dayjs().month()
}, action){

    if(action.type === 'OWNER_DATA'){
        return {
            ...state,
            ...action.payload
        }
    }
    if(action.type === 'CLEAR_OWNER_DATA'){
        return {

        }
    }

    return state;
}