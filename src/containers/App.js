import React, { Component } from 'react';
import classes from './App.css';
// import Radium,{StyleRoot} from 'radium';
import Persons from '../components/Persons/Persons';
// import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';
// import styled from 'styled-components'
// import UserOutput from './UserOutput/UserOutput';
// import UserInput from './UserInput/UserInput';
// import { render } from 'react-dom';

// const StyledButton = styled.button`
//       background-color: ${props => props.alt ? 'red' : 'green'};
//       color:white;
//       font: inherit;
//       border: 1px solid blue;
//       padding: 8px;
//       cursor: pointer;

//       &:hover{background-color:${props => props.alt ? 'salmon' : 'lightgreen'};
//       color:black;}
// `;

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] construcot');
  }

  state = {
      persons : [
        {id:'adssd',name:'Max',age:29},
        {id:'aderwedfsd',name:'Manu',age:30},
        {id:'adered',name:'Steph',age:40}
      ],
      showPersons: false,
      showCockpit: true,
      changeCounter:0,
      authenticated:false
      // ,
      // user: [
      //   {user:'Ajayan',pass:'aj123'}]
    }

  static getDerivedStateFromProps(props,state){
    console.log('[App.js] getDerivedStateFromProps',props);
    return state
  }

  // componentWillMount(){
  //   console.log('[App.js] componentWillMount')
  // }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  switchNameHandler = (newName) => {
      // console.log('was clicked')
      // Dont do this: this.state.persons[0].name='Ajayan'
      this.setState({
        persons : [
        {name:newName,age:31},
        {name:'Manu Gangadhar',age:30},
        {name:'Stephanie',age:20}
      ]})
    }

    // switchUsernameHandler = (event) => {
    //   this.setState({
    //     user:[
    //       {user:event.target.value,pass:'aj123'}
    //     ]
    //   })
    // }
  
    nameChangedHandler = (event,id) => {
      // console.log('was clicked')
      // Dont do this: this.state.persons[0].name='Ajayan'
      const personIndex = this.state.persons.findIndex(p => {
        return p.id ===id;
      })

      const person = {
        ...this.state.persons[personIndex]
      };

      // const person = Object.assign({},this.state.persons[personIndex]) alternative

      person.name = event.target.value

      const persons = [...this.state.persons];

      persons[personIndex] = person;

      this.setState((prevState,props) => {
        return {
        persons: persons,
        changeCounter: prevState.changeCounter+1};
        });

      // this.setState({
      //   persons : [
      //   {name:'Max',age:31},
      //   {name: event.target.value,age:30},
      //   {name:'Stephanie',age:20}
      // ]})
    }

    deletePersonHandler = (personIndex) => {
      // const persons = this.state.persons.slice();
      const persons = [...this.state.persons]
      persons.splice(personIndex,1);
      this.setState({persons:persons});
    }

    togglePersonsHandler = () => {
      const doesShow = this.state.showPersons;
      this.setState({showPersons:!doesShow});

    }

    loginHandler = () => {
      this.setState({authenticated:true})
    }

    
  render ()
  {
    console.log('[App.js] render');
    let persons =null;
    if(this.state.showPersons){
      persons=
          <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} 
          isAuthenticated = {this.state.authenticated}/>;
          
          // <Person 
          //   name={this.state.persons[0].name} 
          //   age={this.state.persons[0].age}/>
          // <Person 
          //   name={this.state.persons[1].name} 
          //   age={this.state.persons[1].age}
          //   click = {this.switchNameHandler.bind(this,'Max!')}
          //   changed = {this.nameChangedHandler}>My hobbies:Racing</Person>  
          // <Person 
          //   name={this.state.persons[2].name} 
          //   age={this.state.persons[2].age}/>
      // style.backgroundColor = 'red';
      // style[':hover'] = {backgroundColor:'salmon',color:'black'};
    }

    
    return (
      // <StyleRoot>
      <Aux>
      <button
      onClick = {() => {
        this.setState({showCockpit:false});
      }}> Remove Cockpit</button>
      <AuthContext.Provider value={{authenticated:this.state.authenticated,
          login: this.loginHandler}}>
        {this.state.showCockpit ? (
        <Cockpit

        title={this.props.appTitle}
        showPersons={this.state.showPersons}
        personsLength={this.state.persons.length}
        clicked={this.togglePersonsHandler}/>) : null}
        {persons}
        </AuthContext.Provider>
        {/* <UserOutput 
          user= {this.state.user[0].user}/>
        <UserInput 
        user = {this.state.user[0].user}
          changed={this.switchUsernameHandler}/> */}
           
      </Aux>
      // </StyleRoot>
    );
  };
    // return React.createElement('div',null,React.createElement('h1',{className:'App'},'Does,this work now'),'Hi, this is a react app')
};

export default withClass(App, classes.App);

  //when using hooks
  // const [Personsstate,setPersonState] = useState({
  //   persons : [
  //       {name:'Max',age:29},
  //       {name:'Manu',age:30},
  //       {name:'Steph',age:40}
  //     ],
  //     otherState:'some other value'});
  
  // const [otherStateValue,setOtherState] = useState('some other value');

  // console.log(Personsstate,otherStateValue)

  // const switchNameHandler = () => {
  //         // console.log('was clicked')
  //         setPersonState({
  //           persons : [
  //           {name:'Maximilian',age:31},
  //           {name:'Manu Gangadhar',age:30},
  //           {name:'Stephanie',age:20}
  //         ]});
  //       };