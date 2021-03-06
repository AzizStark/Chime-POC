import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import View from './View';
import Stream from './Stream';
import Video from './video';

const routing = (
  <Router>
    <div style={{width: '100%', height: '100%'}}>
      <Route exact path="/" component={View} />
      <Route exact path="/Stream" component={Stream} />
      <Route exact path="/Video" component={Video} />
    </div>
  </Router>
)

ReactDOM.render(routing , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
