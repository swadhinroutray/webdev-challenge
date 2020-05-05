import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect
  } from "react-router-dom";
import RegisterPage from '../pages/App/RegisterPage'
import LoginPage from '../pages/App/LoginPage'
import ProfilePage from '../pages/App/ProfilePage'
import Addbio from '../pages/App/Addbio'
import UploadDesign from '../pages/App/UploadDesign'
import feedPage from '../pages/App/feedPage'
import LikedPage from '../pages/App/LikedPage'

class AppRouter extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route path = {'/register'} component = {RegisterPage} />
                    <Route path = {'/login' } component ={LoginPage}/>
                    <Route path = {'/profile'} component ={ProfilePage}/>
                    <Route path ={'/addbio'} component ={Addbio}/>
                    <Route path ={'/uploaddesign'} component ={UploadDesign} />
                    <Route path = {'/feed'} component={feedPage}/>
                    <Route path = {'/likes'} component={LikedPage}/>
                    {/* <Route path = {'/feed'} component ={FeedPage}/>
                    <Route path = {'/saved'} component ={SavedDesigns}/>
                     */}
                    <Route exact path ={'/'} component= {LoginPage}/>
                </Router>
            </div>
        )
    }
}

export default AppRouter
