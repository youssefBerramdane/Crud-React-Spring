import { Link, useParams } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";
import style from "./userdetails.module.css"

const UserDetails=()=>{
    const {id} = useParams()
    const [email,setEmail]=useState('');
    const [username,setUsername]=useState('');
    const [image,setImage]=useState('');
    useEffect(()=>{
        Loaduser();
    },[]);
    const Loaduser=async()=>{
        try{
            await axios.get(`http://localhost:8080/user/${id}`).then(response=>{
                setEmail(response.data.userdata.email)
                setUsername(response.data.userdata.username)
                setImage(response.data.image);    
        })
            
        }
        catch(err){
            
        }  
        
    }


    return <div className="container mt-5">
    
    <div className="row d-flex justify-content-center">
        
        <div className="col-md-7">
            
            <div className="card p-3 py-4">
                
                <div className={style.image}>
                    <img src={`data:image/jpeg;base64,${image}`} />
                </div>
                
                <div className="text-center mt-3">
                    <span className="bg-secondary p-1 px-4 rounded text-white">Pro</span>
                    <h5 className="mt-2 mb-0">{username}</h5>
                    <span>{email}</span>
                    
                    
                     <ul className={style.social}>
                        <li><i className="fa fa-facebook"></i></li>
                        <li><i className="fa fa-dribbble"></i></li>
                        <li><i className="fa fa-instagram"></i></li>
                        <li><i className="fa fa-linkedin"></i></li>
                        <li><i className="fa fa-google"></i></li>
                    </ul>
                    <div className={style.buttons}>
                        
                        <Link to={"/"} className="btn btn-outline-primary px-4">Cancel</Link>
                        
                    </div>     
                </div>    
            </div>     
        </div> 
    </div>
</div>
}
export default UserDetails;