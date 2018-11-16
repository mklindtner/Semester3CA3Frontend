import React, { Component } from 'react';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import welcome from '../welcome';
import StarwarsTable from '../sw/starwars';
import LoginAuth from '../login/loginAuth';

class RoutesForApp extends Component {
    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-light" />
                    <ul className="nav navbar-nav">
                        <li>
                            <NavLink to="/">Welcome Page</NavLink>
                        </li>
                        <li>
                            <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/sw/starwars">starwars</NavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route
                            exact={true}
                            path="/"
                            component={welcome}
                        />
                        <Route
                            exact={true}
                            path="/login"
                            component={LoginAuth}
                        />
                        <Route
                            exact={true}
                            path="/sw/starwars"
                            component={StarwarsTable}
                        />
                    </Switch>
                </div>
            </Router>

        );
    }
}


const Login = () => {
    return (
        <div>
            i am a placeholder for the login page
        </div>
    );
}



export default RoutesForApp;