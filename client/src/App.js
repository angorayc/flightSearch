import React, { Component } from 'react';
import './App.scss';

import TopNav from './components/topnav';
import Placeholder from './components/placeholder';
import Result from './components/result';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNav/>
        <Placeholder />
        <Result />
        {
          /* TODO header
          TODO placeholder controls
          TODO results component
          */
        }
      </div>
    );
  }
}

// example api use
// TODO put this call somewhere sensible
// TODO send parameters to server - check out `server/src/api/server.js`
// console.log('fetching results from server...');

// fetch('http://localhost:4000/api/search')
// .then((response) => {
//   return response.json();
// })
// .then((results) => {
//   console.log('TODO: something with these results:');
//   console.log(results);
// })
// .catch(console.error);

export default App;
