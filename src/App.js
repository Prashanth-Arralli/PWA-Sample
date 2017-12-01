import React, { Component } from 'react';
import { Router, browserHistory,Route } from 'react-router';
import './App.css';

const Page = ({ title }) => (
  <div className="App">
    <div className="App-header">
      <h2>{title}</h2>
    </div>
    <div className="App-intro">
      This is a demo app, it reminds you to take break every hour through notification.
    </div>
    <h3>Welcome</h3>
  </div>
    // <div className="App">
    //   <div className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <h2>{title}</h2>
    //   </div>
    //   <p className="App-intro">
    //     This is the {title} page.
    //   </p>
    //   {/* <p>
    //     <Link to="/">Home</Link>
    //   </p>
    //   <p>
    //     <Link to="/about">About</Link>
    //   </p>
    //   <p>
    //     <Link to="/settings">Settings</Link>
    //   </p> */}
    // </div>
);

    const Home = (props) => (
     <Page title="PWA-React"/>
   );

// const About = (props) => (
//   <Page title="About"/>
// );

// const Settings = (props) => (
//   <Page title="Settings"/>
// );

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
       <Route path="/" component={Home}/>
        {/* <Route path="/about" component={About}/>
        <Route path="/settings" component={Settings}/> */}
      </Router>
    );
  }
}

export default App;