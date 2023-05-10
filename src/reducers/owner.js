import dayjs from 'dayjs'
export default function owner(state = {
    month_key: dayjs().month()
}, action){

    if(action.type==='AUTH'){
        return {
            ...state,
            month_key: dayjs().month(),
            id:action.payload.clinics?.find(e=>e.id).id

        }
    }
    if(action.type === 'OWNER_DATA'){
        return {
            ...state,
            ...action.payload
        }
    }


    return state;
}