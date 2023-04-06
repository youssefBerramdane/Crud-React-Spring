import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useInput from "../../hooks/use-input";
import useInputFile from "../../hooks/use-input-file";


const EditUserForm=(props)=>{

    const{id}=useParams();
    

    const [iduser,setIduser]=useState('');
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [image,setImage]=useState();
    const [emailvalid,setEmailvalid]=useState(true);
    const [usernamevalid,setUsernamevalid]=useState(true);
     
    useEffect(()=>{
        Loaduser();
    },[]);
    const Loaduser=async()=>{
        try{
            await axios.get(`http://localhost:8080/user/${id}`).then(response=>{
                setEmail(response.data.userdata.email)
                setUsername(response.data.userdata.username)
                setIduser(response.data.userdata.id)
                
        })
            
        }
        catch(err){
            console.log(err.response.data.message)
        }  
        
    }

    

    
    
    const emailchangehandler=(e)=>{
        setEmail(e.target.value)
        setEmailvalid(e.target.value.trim().includes("@"))
    }

    const usernamechangeHandler=(e)=>{
        setUsername(e.target.value)
        setUsernamevalid(e.target.value.trim().length>3)
    }
    const emailOnblurHandler=()=>{
        setEmailvalid(email.trim().includes("@"))
    }
    const usernameblurhandler=()=>{
        setUsernamevalid(username.trim().length>3)
    }
    
    const{imagevlue:imagevalue,
        imagevalueChangeHandler:imagechangehandler}=useInputFile();


    const addusersend=(e)=>{
        e.preventDefault();
        props.Editusersend(username,email,imagevalue?imagevalue:image,iduser)
    }

    return <div className="mt-5">
        <form className="col-6 mx-auto border p-4">
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input style={{background:emailvalid==false?"red":""}} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={emailchangehandler} onBlur={emailOnblurHandler} value={email}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    {emailvalid==false?<p style={{color:"red"}}>Email is required</p>:null}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Username</label>
    <input style={{background:usernamevalid==false?"red":""}} type="text" className="form-control" id="exampleInputPassword1" onChange={usernamechangeHandler} onBlur={usernameblurhandler} value={username}/>
    {usernamevalid==false?<p style={{color:"red"}}>Username must have more than 3 character</p>:null}
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputimage1" className="form-label">Image</label>
    <input  onChange={imagechangehandler}  type="file" className="form-control" id="exampleInputimage1" />
    
  </div>
  
  <button onClick={addusersend} disabled={emailvalid!=true || usernamevalid!=true} style={{background:(usernamevalid==false && emailvalid==false)?"gray":""}} type="submit" className="btn btn-primary" >Save</button>
  <button type="button" className="btn btn-danger ms-3" onClick={props.canceladduser}>Cancel</button>
        </form>
    </div>
    
}
export default EditUserForm;