import React, { Component } from 'react'
import styled from 'styled-components'
import {get,post} from '../../api/utils'
import {
    Link,withRouter
  } from "react-router-dom";
const Profile = styled.div`
    display:list-item;
    list-style-type:none;
    margin-top :30px;
    font-size:20px;
    margin-left:auto;
    margin-right:auto;
    
`;
const InputFields = styled.div`
    padding:10px;
    margin-top:2vh;
    color:#1abc9c;
`;
class Addbio extends Component {
    constructor(props){
        super(props)
        this.state ={
            bio:''
        }
        this.onSubmit =this.onSubmit.bind(this);
    }

    onSubmit = async() => {
 
        var postData = { bio: this.state.bio}
        var res = await post('/addbio', postData)
        console.log(res)
        
        alert('Bio added Successfully')
        this.props.history.push('/profile')
        return 
    }
    render() {
        return (
          <Profile>
               <InputFields >
               Add Bio:
                <br />
                <input type ='text' placeholder='Add Bio' onChange= {(e)=> this.setState({ bio: e.target.value})} />
            </InputFields>
            
            <button onClick= {this.onSubmit}>
           Add
            </button>
            <div>
             <Link className="link-register" to="/profile">
					Back to Profile
			</Link>
            </div>
          </Profile>
        )
    }
}

export default withRouter(Addbio)
