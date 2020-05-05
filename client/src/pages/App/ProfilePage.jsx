import React, { Component } from 'react'
import {get,post} from '../../api/utils'
import styled from 'styled-components'
import Designs from '../../components/Designs'
import {
    Redirect, Link
  } from "react-router-dom";
const Profile = styled.div`
    display:list-item;
    list-style-type:none;
    margin-top :30px;
    font-size:20px;
    margin-left:auto;
    margin-right:auto;
    color:#1abc9c
`;

class ProfilePage extends Component {
    constructor(props){
        super(props)
        this.state ={
            loading:false,
            name:'',
            email:'',
            bio:'',
            likes:[],
            following:[],
            designs:[],
        }
        // this.addBio =this.addBio.bind(this);
        // this.showForm =this.showForm.bind(this);
        
    }
    async componentDidMount(){
        this.setState({
            loading:true
        })
        var response1 = await get('/getprofile')
        console.log(response1)
        this.setState({
            name:response1.name,
            email:response1.email,
            bio:response1.bio,
            likes:response1.likes,
            following:response1.following,
            loading:false
        })
    }


    render() {
        if(this.state.loading)
        return(
            <div>
                Loading...
            </div>
        )

        return (
            <Profile>
            <h1>Profile</h1>
            <h3>Welcome {this.state.name} !</h3>
          
            <i>Your Bio</i>
            <br/>
            <p> 
              {( this.state.bio === '' )? 
              <button onclick= {<Redirect from ='/profile' to='/addbio/' />} > Add Bio</button> : <h3>{this.state.bio} </h3> }
            </p>

            <h3>Your Designs:</h3>
            <Designs />

            <Link to='/uploaddesign'>
                Upload a Design!
            </Link>
            </Profile>
        )
    }
}

export default ProfilePage