import { useState } from "react"

const useInputFile=()=>{


    const [value,setValue]=useState();

    const valueChangeHandler=(e)=>{
        setValue(e.target.files[0])
    }

    return {
    imagevlue:value,
    imagevalueChangeHandler:valueChangeHandler}

}
export default useInputFile