import React from 'react';
import './App.css';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './lib/history';
import { alertActions } from './actions/alertActions';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';

class App extends React.Component {

  constructor(props) {
      super(props);

      history.listen((location, action) => {
          // clear alert on location change
          this.props.clearAlerts();
      });
  }

  render() {
      const { alert } = this.props;
      return (
        <Router history={history}>
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Header />
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Navigation />
                    </div>
                </div>
            </div>
          </Router>
      );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear
};

export default connect(mapState, actionCreators)(App);