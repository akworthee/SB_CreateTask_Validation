import React, { Component} from "react"
import Graph from "./Components/Graph/index.jsx"
import DragDrop from "./Components/DragDrop/index.jsx"
import {insertTask} from "./actions/storyListAction.js"
import {connect} from "react-redux";
import "./App.scss"
import {CreateTask} from "./Components/CreateTask/CreateTask.jsx"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      //caption: "Arun"
      style: {
        display: "none"
      }
    }
  }
  openModal = () =>{
    this.setState({...this.state,style:{display:"block"}})
  }
  modalClose = () =>{
    this.setState({...this.state,style:{display:"none"}})
  }
  createTask = (list) =>{
    if(list.name === null || list.name === ""){
      alert('Please enter the Project Name');
      return;
    }
    this.props.createTask(list)
    this.childRef.value="";
    this.childStatusRef.value="todo";
    this.setState({...this.state,style:{display:"none"}})
  }
  statusParentRef = (select) =>{
    this.childStatusRef = select
  }
  parentRef = (input) =>{
    this.childRef = input
  }
  render(){
    const childProps = {
        getTask: this.props,
        modal: this.state,
        childModalClose: this.modalClose,
        createTask: this.createTask,
        projectRef: this.parentRef,
        statusRef: this.statusParentRef
    }
  return (
    <div className="container" style={{"height": "500vh"}}>
    <header>
      <h1> Story Book</h1>
    </header>
    <main>
    <CreateTask {...childProps}/>
    <input id="myBtn" className="btn" type="button" onClick={this.openModal} value="Create Task"/>
    <DragDrop />
      <Graph/>
    </main>
    </div>
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
    createTask:(data)=>{dispatch(insertTask(data))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);