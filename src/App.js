import React, { Component} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import axios from "axios";

import './App.css';


class App extends  Component{
  searchbox=[ ];
  state={
    Items:[],
    columns:[
      {
      dataField:'project_id',
      text:'userId',
      },
    {
    dataField:'project_code',
    text:'Project code',
   },
    {
    dataField:'description',
    text:'Description',
  },
  {
  dataField:'start_date',
  text:'Start date',
},
    {
    dataField:'end_date',
    text:'End date',
    },
      {
      dataField:'company_name',
      text:'Company name',
      }, 
        {
        dataField:'status',
        text:'Status',
      }]
  }
 
  constructor(probs){
    super(probs)
    this.getItems();
    
  }
  getItems=async()=>{
    try{
        let data=await axios({
        method:'get',
        url:'http://timeapi.kaaylabs.com/api/v1/project_view/'
        }).then(({data})=>
        data.data)
        console.log(data);
        this.searchbox=data;
        this.setState({Items:data});
    }
    catch(err)
    {
      console.log(err);
    }
  }
  onChangeHandle(e){
    console.log(e.target.value);
    let searchbox=this.searchbox.filter((d)=>{
      console.log(d);
      
      let serchValue =d.status.toLowerCase();
      return serchValue.indexOf(e.target.value)!==-1;
    });
    this.setState({Items:searchbox})
  }
  render()
   {
     return(
       <div className="App">
       <h2 className="App"> Search the values of Status in the search input</h2>
       <br></br>
       <input type="text" value={this.state.value} onChange={this.onChangeHandle.bind(this)} placeholder="search.." style={
         {float:'right',width:'25%',borderColor:'#000'}
       } />
         <BootstrapTable
         columns={this.state.columns} 
         keyField="id"
         data={this.state.Items}
         stripped
         hover
         />
         
       </div>
     )
   }
  

  


}
export default App;