import React, { Component } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie} from 'recharts';
import mydata from "../../Seeder/kanbanBoard.json"
import {connect} from "react-redux"
import getColors from "../../Seeder/colors.json"
import {getMetrics} from "../../actions/storyListAction.js"

class Graph extends Component{
  

  render(){
     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const arr = this.props.tasks.list;
    const res1 = arr.reduce((res,i)=>{
      let obj={}
      let index = res.findIndex((t)=>t.category === i.category)
      if(res&& index>=0){
        res[index].value++;
      }
      else{
        obj["category"] = i.category;
        obj["value"] = 1;
      }

      Object.keys(obj).length!=0&&res.push(obj);
      return res;
    },[])
    res1.map((t)=>{
      t["color"] = getColors[t.category]
    })
    
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius,percent,index})=>{
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      let lblString = `${res1[index].category}(${res1[index].value})`
console.log("graph",res1)
      return(
        <text x={x} y={y} fill="black" textAnchor={x>cx?'start':'end'} dominantBaseLine="central">
        {lblString}
        </text>
      );
    };
   
    return(
      <>
     
        <PieChart width={600} height={400} margin={{top: 5, right: 5, bottom:5, left:5}}>
        <Pie isAnimationActiveBoolean={false} activeIndex={100} data={res1} dataKey="value" cx="50%" cy="50%" innerRadius={10} outerRadius={150} labelLine={false} label={renderCustomizedLabel} >
        {res1.map((entry,index)=>(
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
        </Pie>
        </PieChart>
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
    getMetrics:(state)=>{dispatch(getMetrics(state))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Graph)



