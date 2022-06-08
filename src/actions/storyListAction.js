import axios from "axios"

export const getTaskList = (data) => async (dispatch) =>{
  try{
      const response  = await axios.get("https://mocki.io/v1/818c00b0-ba10-4243-9027-abd3650572a0");
      return dispatch({type:"GET_TASK", payload: response})
  }
  catch(e){
    console.log(e)
  }
}

export const updatedTaskList = (data)=>{
  return{
    type: "UPDATED_TASK",
    payload: data
  }
}

export const insertTask = (data) =>{
  return {type:"INSERT_TASK", payload:data};
}

export const getMetrics = (data) =>{
  return{
    type: "GET_METRICS",
    payload: data
  }
}