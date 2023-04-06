import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { faPen , faTrash , faEye } from '@fortawesome/free-solid-svg-icons'
import styles from './home.module.css'
import { Link } from "react-router-dom";


const Home=(props)=>{
  

    return <div className={styles.table}>
     <table className="table">
    <thead className="border-dark">
      <tr className="col-12">
        <th scope="col">Id</th>
        <th scope="col">Email</th>
        <th scope="col">Username</th>
        <th className="col-2"  scope="col-6">Actions</th>
      </tr>
    </thead>
    <tbody>    
        {
        
        props.user.map(user=>(
            <tr key={user.id}>
            <th className="align-middle" scope="row">{user.id}</th>
            <td className="align-middle">{user.email}</td>
            <td className="align-middle">{user.username}</td>
            
            <td className={styles.actions}>
              <Link to={`/edituser/${user.id}`} className="bg-warning border-0 text-light"><FontAwesomeIcon icon={faPen} /> </Link>
              <Link to={`/userDetails/${user.id}`} className="bg-success border-0 mx-3 text-light"><FontAwesomeIcon icon={faEye} /></Link>
              <Link onClick={()=>props.DeleteUser(user.id)} className="bg-danger border-0 text-light"><FontAwesomeIcon icon={faTrash} /></Link>
             </td>
            
            </tr>
        ))}
    </tbody>
  </table>
  </div>
}
export default Home;