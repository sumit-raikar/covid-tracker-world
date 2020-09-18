import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import App from './App';
import World from './containers/world';
import Header from './components/Header';
import IndiaStateCovidstatus from './containers/india-state-status';
import store from './storeSetUp';
import * as serviceWorker from './serviceWorker';
import './app.scss';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename='/covid-tracker-world'>
        <div>
          <Header />
          <div className='not-official-sign'>THIS IS NOT THE OFFICIAL WEBSITE</div>
          <Route exact path='/'>
            <Redirect from='/' to="/homepage" />
          </Route>
          <Route path='/homepage' component={App}></Route>
          <Route path='/world' component={World}></Route>
          <Route path='/state/:stateVal' component={IndiaStateCovidstatus}></Route>
        </div>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
