import React from "react";
import "./CreateTask.scss"


export const CreateTask = (props) =>{
  const list = {
    "name": "",
    "ticketId":"",
    "category":"todo"
  }

  const options = [
    {
      label: "To Do",
      value: "todo"
    },
    {
      label: "Blocked",
      value: "blocked"
    },
    {
      label: "In Progress",
      value: "inprogress"
    },
    {
      label: "Merge Pending",
      value: "mergepen"
    },
    {
      label: "Merge Complete",
      value: "mergecom"
    },
    {
      label: "Done",
      value: "done"
    },
  ];

  const getTicketId = () =>{
    let funTasks = props.getTask.tasks
    let id = 0;
    if(funTasks && funTasks.list.length>0){
      id=Math.max(...props.getTask.tasks.list.map((z)=>{
        return z.ticketId.split('-')[1]
      })) + 1
    }
    list.ticketId = "PROJ-"+id.toString();
    return "PROJ-"+id.toString();
  }

  const getStatus = (e) =>{
    list.category = e.target.value;
  }

  const getProject = (e) =>{
    list.name = e.target.value
  }

  return(
    <div id="myModal" className="modal" style={props.modal.style}>
      <div className="modal-content">
      <span className="close" onClick={()=>{props.childModalClose()}}>&times;</span>
        <table>
        <thead><h1>Create New Task</h1></thead>
          <tbody>
            <tr>
              <td><label id="ticketId">Ticket Id:</label></td>
              <td><label>{getTicketId()}</label></td>
            </tr>
            <tr>
              <td><label id="status">Choose a Status:</label></td>
              <td><select id="status" className="select-style" onChange={(e)=>{getStatus(e)}} ref={(e)=>{props.statusRef(e)}}>
              {options.map((option)=>(
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
              </select></td>
            </tr>
            <tr>
              <td><label id="projectname">Project heading:</label></td>
              <td><input type="text" onChange={(e)=>{getProject(e)}} ref={(e)=>{props.projectRef(e)}}/></td>
            </tr>
          </tbody>
        </table>
      <input type="button" value="Create" onClick={()=>{props.createTask(list)}}/>
      </div>
    </div>
  )
}