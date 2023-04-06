import React, { useState } from "react";
import useInput from "../../hooks/use-input";
import useInputFile from "../../hooks/use-input-file";


const AddUserForm=(props)=>{

    const{value:emailvalue,
        validvalue:emailvalid,
        valueChangeHandler:emailchangehandler,
        valueOnblurHandler:emailOnblurHandler
    }=useInput(Value => Value.trim().includes("@") );

    const {value:usernamevalue,
        validvalue:usernamevalid,
        valueChangeHandler:usernamechangeHandler,
        valueOnblurHandler:usernameblurhandler
    }=useInput(value => value.trim().length>3);

    
    const{imagevlue:imagevalue,
        imagevalueChangeHandler:imagechangehandler}=useInputFile();


    const addusersend=(e)=>{
        e.preventDefault();
        props.addusersend(usernamevalue,emailvalue,imagevalue)
    }

    return <div className="mt-5">
        <form className="col-6 mx-auto border p-4">
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input style={{background:emailvalid==false?"red":""}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={emailchangehandler} onBlur={emailOnblurHandler} value={emailvalue}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    {emailvalid==false?<p style={{color:"red"}}>Email is required</p>:null}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Username</label>
    <input style={{background:usernamevalid==false?"red":""}} type="text" className="form-control" id="exampleInputPassword1" value={usernamevalue} onChange={usernamechangeHandler} onBlur={usernameblurhandler}/>
    {usernamevalid==false?<p style={{color:"red"}}>Username must have more than 3 character</p>:null}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputimage1" className="form-label">Image</label>
    <input  onChange={imagechangehandler}  type="file" className="form-control" id="exampleInputimage1" />
    
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button onClick={addusersend} disabled={emailvalid!=true || usernamevalid!=true} style={{background:(usernamevalid==false && emailvalid==false)?"gray":""}} type="submit" className="btn btn-primary" >Submit</button>
  <button type="button" className="btn btn-danger ms-3" onClick={props.canceladduser}>Cancel</button>
        </form>
    </div>
    
}
export default AddUserForm;