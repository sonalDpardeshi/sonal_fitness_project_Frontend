import React, { useEffect, useState } from 'react'
import UserService from '../Services/UserService';

function RecommendPlan() {

  const userid=localStorage.getItem('userid');

  const[recommendplan,setRecommendplan]=useState([]);

  useEffect(()=>{
    let promise=UserService.recommendplan(userid)
    .then((res)=>{
      // console.log(res.data);
      setRecommendplan(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[userid]);
  
  const[msg,setMsg]=useState('');
  return (
    <>
    <div className='text-center fs-3 mb-3'><strong>Recommended Plan</strong></div>
    <h2 className='box'>Workouts</h2>
    {recommendplan?.workouts && recommendplan.workouts.length>0?(recommendplan.workouts.map((e,index)=>(
      <p key={index} className='fs-2 '>{e}</p>
    ))
  ):(<p className='fs-2 text-center mb-4'>No workouts are recommended</p>)
    }

<h2 className='box'>Intensities</h2>
{
  recommendplan?.intensties && recommendplan.intensties.length>0?(recommendplan.intensties.map((e,index)=>(
    <p key={index} className='fs-2' >{e}</p>
  ))
):(<p className='fs-2 text-center mb-4'>No intensities are recommended</p>)
}
<h2 className='box'>Duration per day</h2>
{
  recommendplan?.durationPerDay && recommendplan.durationPerDay.length>0?( recommendplan.durationPerDay.map((e,index)=>(
    <p key={index} className='fs-2 '>{e} minutes</p>
  ))
):(
  <p className='fs-2 text-center'>0 minutes</p>)
}

    </>
  )
}

export default RecommendPlan