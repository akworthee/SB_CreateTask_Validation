
const intial_state = {
  tasks:{
    list: [],
    metrics: {}
  }
}

const getTaskReducer = (state=intial_state,action)=>{
  switch (action.type) {
    case "GET_TASK":
      return{...state, tasks: action.payload.data}
    case "UPDATED_TASK":
      return{...state, tasks: action.payload}
    case "GET_METRICS":
      return{...state.tasks, metrics: action.payload.metrics}
    case "INSERT_TASK":
      return{...state,tasks:{...state.tasks,list:[...state.tasks.list,action.payload]}}
    default:
      return state;
  }
}


export default getTaskReducer;
