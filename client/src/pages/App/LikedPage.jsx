import React, { Component } from 'react'
import styled from 'styled-components'
import { SolarSystemLoading } from 'react-loadingg';
import {get} from '../../api/utils'
import { Grid } from 'semantic-ui-react'
import {
    Redirect, Link
  } from "react-router-dom";
import FeedCard from '../../components/FeedCard';
const Profile = styled.div`
    display:list-item;
    list-style-type:none;
    margin-top :30px;
    font-size:20px;
    margin-left:auto;
    margin-right:auto;
    color:#1abc9c
`;
export class LikedPage extends Component {
    constructor(props){
        super(props)
        this.state ={
        likes: [],
        isFetching: false
    }
     this.renderItems = this.renderItems.bind (this)
}
async componentDidMount(){
    this.setState({
        isFetching:true
    })
    const data = await get('/getliked')
    console.log(data)
    this.setState({
        likes: [...data],
        isFetching:false
    })
}

renderItems =() => {
        
    return (
        
          this.state.likes.map((card) => (
            <FeedCard
              key={card.id} 
              title={card.title}
              
            />
          )
          )
          
      )
}
render(){

    if(this.state.isFetching === true){
    return (
        <div>
        <SolarSystemLoading />
        </div>
    )
    }
    else{
        return (
            <div className = 'listDesigns'>
                
                <Grid.Row>
                    {this.renderItems()}
                </Grid.Row>
            
                <Link to='/profile'>
                Back to Profile
                </Link>
            </div>

            )
    }
}
}

export default LikedPage
