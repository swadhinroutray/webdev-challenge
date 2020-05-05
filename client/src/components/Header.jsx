import React, { Component } from 'react'
import styled from 'styled-components'

const Headers = styled.div`
    display:flexbox;
    justify-content:space-between;
    padding: 2vh;
    text-align: center;
    background: #1abc9c;
    color: white;
    font-size: 30px;
    /* width:100%; */


`
export class Header extends Component {
    render() {
        return (
            <Headers>
            {/* <img /> */}
                IECSE DRIBBBLE 
                
            </Headers>
        )
    }
}

export default Header
