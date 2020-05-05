import React, { Component } from 'react'
import ArticleCard  from './ArticleCard'
import { SolarSystemLoading } from 'react-loadingg';
import {get} from '../api/utils'
import { Grid } from 'semantic-ui-react'

export class Designs extends Component {
    constructor(props){
        super(props)
        this.state = {
            designs: [],
            isFetching: false
        }
         this.renderItems = this.renderItems.bind (this)
    }
    async componentDidMount(){
        this.setState({
            isFetching:true
        })
        const data = await get('/getdesigns')

        this.setState({
            designs: [...data],
            isFetching:false
        })
    }
    renderItems =() =>{
        
        return (
            
              this.state.designs.map((card) => (
                <ArticleCard
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
                
                </div>
                )
        }
    
}
}

export default Designs
