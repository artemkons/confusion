import React from 'react';
import './App.css';
import Main from './components/MainComponent'

class App extends React.Component {
  
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
