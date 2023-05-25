import React, { Component } from "react";
import axios from 'axios';
import './css/style.css';
import {fetchData} from './AwsFunctions';

class ReadForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            age:"",

        }
    }

    changeName = (e) =>{
        this.setState({
            name : e.target.value
        });
    }

    changeAge = (e) =>{
        this.setState({
            age : e.target.value
        });
    }

    submitForm = () =>{
        axios.defaults.withCredentials= true;
        axios.post('http://localhost:8080/submit', {
            data: {
                name :this.state.name,
                age: this.state.age
                
            }
        })
    }

    render() {
        return(
            <form className="red-input">
                <input type="text" placeholder="Name" onChange={this.changeName}></input>
                <input type="number" placeholder="Age" onChange={this.changeAge}></input>
                <button className="btn" type="sumbit" onClick={this.submitForm}>submit</button>
            </form>
        )
           
    }

}



  const App = () => {
  
  const fetchDataFormDynamoDb = () => {
    fetchData('users')
  }
  
  return <>
    <button onClick={() => fetchDataFormDynamoDb()}> Fetch </button>
  </>
}
export default ReadForm;