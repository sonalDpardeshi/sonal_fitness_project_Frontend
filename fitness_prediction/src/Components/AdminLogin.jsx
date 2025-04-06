import React, { useState } from 'react'
import AdminService from '../Services/Adminservice'

function AdminLogin() {
  const [admin,setAdmin]=useState({
    username:"",
    password:""
  })

  let unihandler=(e)=>{
    setAdmin(prev=>{return {...prev,[e.target.name]:e.target.value}})
  }
let alogin=(e)=>{
  e.preventDefault();
  let promise=AdminService.login(admin);
  promise.then((res)=>{
    setMsg(res.data);
  }).catch((err)=>{
    setMsg(err.response?.data||"login failed");
  })
}
let [msg,setMsg]=useState("");
  return (
  <>
  <div className='w-25 mt-1 border border-dark p-2 rounded-1'>
  <form>
    <label>Enter username</label>
    <input type="text" name="username" className='form-control border-2' value={admin.username} onChange={(e)=>unihandler(e)}/>
<label>Enter password</label>
<input type="password" name="password" className='form-control border-2' value={admin.password} onChange={(e)=>unihandler(e)}/>
<input type="button" value="login" onClick={(e)=>alogin(e)}/>
  {msg}
  </form>
  </div>
  </>
  )
}

export default AdminLogin