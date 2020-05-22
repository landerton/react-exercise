import React from 'react';
import { Container, Divider } from '@material-ui/core';
import './App.css';
import RepFinder from './components/RepFinder';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Container>
          <header className="App-header">
            <h1>
              Who's My Representative?
            </h1>
            <Divider />
          </header>
          <RepFinder />
        </Container>
      </div>
    );
   }
}

export default App;
