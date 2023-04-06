import { useState } from "react"

const useInput=(ValidateValue)=>{
    

    const [entredvalue,setEntredvalue]=useState("");
    const [validvalue,setValidvalue]=useState();
    
    const valueChangeHandler=(e)=>{
        setEntredvalue(e.target.value)
        setValidvalue(ValidateValue(e.target.value))
    }
    const valueOnblurHandler=()=>{
        setValidvalue(ValidateValue(entredvalue))
        console.log(ValidateValue(entredvalue))
    }

    return{

        value:entredvalue,
        validvalue,
        valueChangeHandler,
        valueOnblurHandler
    }


}
export default useInput