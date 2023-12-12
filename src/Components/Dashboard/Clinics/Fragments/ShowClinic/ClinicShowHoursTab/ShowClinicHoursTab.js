import {useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {postResource, updateResource} from "../../../../../Functions/api_calls";
import WorkingHours from "../../../../../Fragments/WorkingHours/WorkingHours";
import ClinicShowWorkingHours from "./ClinicShowWorkingHours";
import Preloader from "../../../../../Preloader";

const resource = "Clinic";
const service = 'main'
function ShowClinicHoursTab({loadingState, workingHoursFooter}) {
  const params = useParams();
  let token = useSelector((state) => state.auth.token);
  const {loading, setLoading} = loadingState;

  const [data, setData] = useState({})


  useEffect(()=>{
    postResource(resource,'WorkingHours',token,params.id,{service}).then(response => {

      setData(response)
    })


  }, []);


  const onFinish = (values,prevValues) => {
    setLoading(true)
    setData((prevState)=>({
      ...prevState,
      ...prevValues?.working_hours
    }))
    if (params.id) {
      updateResource('ClinicWorkingHours', params.id, values, token, ).then(response => {
        setData(response)
      }).finally(() => {
        setLoading(false)
      })
    }
  }


  let type = "telehealth"

  return(
      <div className={'add_edit_content'} style={{width: '50%'}}>
        {
          loading ? <Preloader /> : <ClinicShowWorkingHours loading={loading} data={data} onFinish={onFinish} type={type} workingHoursFooter={workingHoursFooter}/>
        }

      </div>
  )
}
export default ShowClinicHoursTab;