import React, {Component} from "react";
import {connect} from "react-redux";
import "./index.scss";
import {refProps} from "../../constant.js"
import {getMetrics, getTaskList, updatedTaskList} from "../../actions/storyListAction.js"

class DragDrop extends Component{
  constructor(props){
    super(props)
    this.state = {
  list:[],
  metrics:{}
}
  }

componentDidMount = () =>{
  this.props.getTaskList(this.state)
}

handleDragStart = (item) => {
  refProps.doc = item;
}

handleDragLeave = (e) =>{
  e.target.style.backgroundColor = "grey";
  e.target.style.opacity = 5;
  e.preventDefault();
}

handleDrop = (e,item) =>{
  let metrics =  this.props.tasks.list.filter((task)=>{
    if(task.name == refProps.doc){
      task.category = item;
    }
    return task;
  });
  this.setState({
    ...this.state,metrics
  })
  this.props.updatedTaskList({list:metrics})
}
render(){
  var metrics = {
    todo: [],
    blocked: [],
    inprogress: [],
    mergepen: [],
    mergecom: [],
    done:[]
  }
  this.props.tasks && this.props.tasks.list.length>0 && this.props.tasks.list.forEach((t)=>{
    metrics[t.category].push(
      <article draggable
      key={t.name}
      onDragStart={()=>this.handleDragStart(t.name)}
      onDragOver={(e)=>e.preventDefault()}
      >
      <h5>{t.ticketId}</h5>
      {t.name}
      </article>
    )
  })
  return(
    <>
    <header>
    <h4>ToDo</h4>
    <h4>Blocked</h4>
    <h4>InProgress</h4>
    <h4>Merge Pending</h4>
    <h4>Merge Complete</h4>
    <h4>Done</h4>
    </header>
    <main className="mainJira">
      <section className="dnd" style={{backgroundColor: '#65C6C6'}} onDrop={(e)=>this.handleDrop(e,"todo")}  onDragOver={(e)=>e.preventDefault()}>
      {metrics.todo}
      </section>
      <section className="dnd" style={{backgroundColor: '#A2514A'}}  onDrop={(e)=>this.handleDrop(e,"blocked")}  onDragOver={(e)=>e.preventDefault()}>
      {metrics.blocked}
      </section>
      <section className="dnd" style={{backgroundColor: '#C9B23F'}}  onDrop={(e)=>this.handleDrop(e,"inprogress")}  onDragOver={(e)=>e.preventDefault()}>
      {metrics.inprogress}
      </section>
      <section className="dnd" style={{backgroundColor: '#5476F5'}}  onDrop={(e)=>this.handleDrop(e,"mergepen")}  onDragOver={(e)=>e.preventDefault()}>
      {metrics.mergepen}
      </section>
      <section className="dnd" style={{backgroundColor: '#8B47A9'}}  onDrop={(e)=>this.handleDrop(e,"mergecom")} onDragOver={(e)=>e.preventDefault()}>
      {metrics.mergecom}
      </section>
      <section className="dnd" style={{backgroundColor: '#459544'}}  onDrop={(e)=>this.handleDrop(e,"done")}  onDragOver={(e)=>e.preventDefault()}>
      {metrics.done}
      </section>
          </main>
    </>
  )
}
}

const mapStateToProps = (state) =>{
  return{
    tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    getTaskList: (state)=>{dispatch(getTaskList(state))},
    updatedTaskList: (state) => {dispatch(updatedTaskList(state))},
    getMetrics: (tasks) =>{dispatch(getMetrics(tasks))}
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(DragDrop);