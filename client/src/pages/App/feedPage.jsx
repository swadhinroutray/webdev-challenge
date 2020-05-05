import React, { Component } from 'react'
import styled from 'styled-components'
import FeedCard  from '../../components/FeedCard'
import { SolarSystemLoading } from 'react-loadingg';
import {get} from '../../api/utils'
import { Grid } from 'semantic-ui-react'
import {
    Redirect, Link
  } from "react-router-dom";
export class feedPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            feed: [],
            isFetching: false
        }
         this.renderItems = this.renderItems.bind (this)
    }
    async componentDidMount(){
        this.setState({
            isFetching:true
        })
        const data = await get('/getfeed')

        this.setState({
            feed: [...data],
            isFetching:false
        })
    }
    renderItems =() => {
        
        return (
            
              this.state.feed.map((card) => (
                <FeedCard
                  key={card.id} 
                  title={card.title}
                  author={card.authorname}
                    email={card.authoremail}
                />
              )
              )
              
          )
    }
    render() {

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

export default feedPage
