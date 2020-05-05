import React, { Component } from 'react'
import {get,post} from '../../api/utils'
import styled from 'styled-components'
import Designs from '../../components/Designs'
import { SolarSystemLoading } from 'react-loadingg';

import {
    Redirect, Link,withRouter
  } from "react-router-dom";
const CustomButtons = styled.img`
    margin-top: 2px;
    height:3vh;
    cursor:pointer;
`
const Profile = styled.div`
    display:list-item;
    list-style-type:none;
    margin-top :30px;
    font-size:20px;
    margin-left:auto;
    margin-right:auto;
    color:#1abc9c
`;
const Logout = styled.div`
    position:fixed;
   right:10px;
   top:18px;
`

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
         this.logout =this.logout.bind(this);
        //  this.addbio =this.addbio.bind(this);
    
        
    }
    async componentDidMount(){
        this.setState({
            loading:true
        })
        var response1 = await get('/getprofile')
        console.log(response1)
        if(response1.status ==400){
            this.props.history.push('/login')
        }
        this.setState({
            name:response1.name,
            email:response1.email,
            bio:response1.bio,
            likes:response1.likes,
            following:response1.following,
            loading:false
        })
    }

    async logout(){
        await fetch ('/logout').then(resp => resp.json())
        .then((data) => {

        })
    }
    

    render() {
        if(this.state.loading)
        return(
            <div>
             <SolarSystemLoading />
            </div>
        )

        return (
            
            <Profile>
             <Logout>
            <Link to ='/login'  onClick ={this.logout} >Logout</Link>
            </Logout>
            <h1>Profile</h1>
            <h3>Welcome {this.state.name} !</h3>
          
            <i>Your Bio</i>
            <br/>
            <p> 
              {( this.state.bio === '' )? 
                <Link to= {'/addbio'}> Add Bio</Link>  : <h3>{this.state.bio} </h3> }
            </p>

            <h3>Your Designs:</h3>
            <Designs />

            <Link to='/uploaddesign'>
                Upload a Design!
            </Link>
            <br />
            <Link to='/feed'>
                Check Feed
            </Link>
           
            
            </Profile>
        )
    }
}

export default withRouter(ProfilePage)
