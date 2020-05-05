import React, {Component} from 'react'
import { Link,Redirect ,withRouter} from 'react-router-dom';
import styled from 'styled-components';

const FormPage = styled.div`
    display:list-item;
    list-style-type:none;
    margin-top :30px;
    height: 60vh;
    width: 50vh;
    font-size:20px;
    margin-left:auto;
    margin-right:auto;
    border: 2px solid black;
    border-radius:10px;
`;

const Heading =styled.div`
    font-family:"nidus sans";
    font-size:60px;
    color:#1abc9c;
`
const LinkBox =styled.div`
    font-family:"nidus sans";
    font-size:20px;
    margin-top:4vh
`
const InputFields = styled.div`
    padding:10px;
    margin-top:2vh;
    color:#1abc9c;
`;
 

class LoginPage extends Component{
    constructor(props){
        super(props)
        this.state ={
            email:'',
            password:''
        }
        this.SubmitForm = this.SubmitForm.bind(this)
    }
    SubmitForm (){
        fetch ('/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
        }).then(resp => resp.json())
        .then((data) => {
            
            this.props.history.push('/profile')
        })
    }
    
    // const [email, setEmail] = useState('');
    // const [password,setPassword] =useState('');
    render(){
    return (
        <FormPage>
            <Heading>
                Login
            </Heading>
          
            
            <InputFields>
                Email:
                <br />
                <input type = 'text' placeholder='Input Email' onChange= {(e)=> this.setState({ email: (e.target.value)})} />
            </InputFields>

            <InputFields>
                Password:
                <br />
                <input type ='password' placeholder='Input Password' onChange= {(e)=> this.setState({ password: (e.target.value)})} />
             </InputFields>

            <button onClick={ 
                this.SubmitForm}
            >
           Login
            </button>
            <LinkBox>
            <Link className="link-register" to="/register">
                Register
			</Link>
            </LinkBox>
            {this.state.email} {this.state.password}
        </FormPage>
    )
                }
}

export default withRouter(LoginPage);