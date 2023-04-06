import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Header from './Component/Header/Header';
import Home from './Component/HomePage/Home';
import { useState , useEffect } from 'react';
import AddUserForm from './Component/form/AddUserForm';
import axios from 'axios';
import {Route, Routes, useNavigate } from 'react-router-dom';
import EditUserForm from './Component/form/EditUserForm';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import UserDetails from './Component/user/userdetails';

function App() {
  const [users,setUsers]=useState([]);
    useEffect(()=>{
        LoadUser();
          
    },[]);
    const navigate=useNavigate();
    const LoadUser=async()=> {

      try{
        const result = await axios.get("http://localhost:8080/users")
        setUsers(result.data)
      }catch(err){
        toast.error('failed to fetch data', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }

        
        //.then(response=>setUsers(response.data))
        
        
    }
  const CancelAddUser=()=>{
    navigate("/")
    
  }
  const AdduserPost=async(username,email,image)=>{
    const formdata=new FormData();
    formdata.append("username",username)
    formdata.append("email",email)
    formdata.append("file",image)
    const response = await axios.post("http://localhost:8080/insert", formdata)
      
      setUsers(users.concat({id:response.data,username:username,email:email}))
      
      toast.success('user Inserted', {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      CancelAddUser();
  }

  const DeleteUser=async(id)=>{
    await axios.delete(`http://localhost:8080/deleteuser/${id}`)
    const newusers=users.filter(user=>(user.id!==id))
    setUsers(newusers)
    toast.warning('User Deleted', {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  const EdituserPut=async(username,email,image,id)=>{
      const formdata=new FormData();
      formdata.append("username",username)
      formdata.append("email",email)
      formdata.append("file",image)
      await axios.put(`http://localhost:8080/update/${id}`,formdata).then(response=>{
        toast.success('Used Updated', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          
        users.map(user=>{
          if(user.id===id){
            user.email=email
            user.username=username
          }
      })
        navigate("/")
      })
  }
  
  
  return (
    <div className='app'>
    <header>
      <Header></Header>
    </header>
  
    <Routes>
      <Route exact path='/adduser' element={<AddUserForm canceladduser={CancelAddUser} addusersend={AdduserPost}></AddUserForm>}></Route>
      <Route exact path='/'  element={<Home user={users} DeleteUser={DeleteUser}></Home>}/>
      <Route path='/edituser/:id' element={<EditUserForm canceladduser={CancelAddUser} Editusersend={EdituserPut}/>}/>
      <Route exact path="/userdetails/:id" element={<UserDetails/>}></Route>
      </Routes>
      </div>
  
  
    
  );
}

export default App;
