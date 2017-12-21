import React, { Component } from 'react';
import Login from './Login';
import AuthService from './services/auth.service';
import GraphService from './services/graph.service';

class App extends React.Component {

    constructor() {
        super();

        this.authService = new AuthService();
        this.graphService = new GraphService();

        this.state = {
            user: null,
            userInfo: null,
            loginFailed: false,
            apiCallFailed: false
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.callAPI = this.callAPI.bind(this);

    }
    componentWillMount() { }

    logout() {
        this.authService.logout();
    }

    login() {
        this.setState({
            loginFailed: false
        });
        this.authService.login().then(
            user => {
                if (user) {
                    this.setState({
                        user: user
                    });
                } else {
                    this.setState({
                        loginFailed: true
                    });
                }
            },
            () => {
                this.setState({
                    loginFailed: true
                });
            }
        );
    }

    callAPI() {
        this.setState({
            apiCallFailed: false
        });

        this.authService.getToken().then(
            token => {
                this.graphService.getUserInfo(token, this.state.user.name).then(
                    data => {
                        this.setState({
                            userInfo: data
                        });
                    },
                    error => {
                        console.error(error);
                        this.setState({
                            apiCallFailed: true
                        });
                    }
                );
            },
            error => {
                console.error(error);
                this.setState({
                    apiCallFailed: true
                });
            }
        );
    }

    render() {
        let templates = [];

        if (this.state.user) {
            console.log(this.state);

            templates.push(
                <div key="loggedIn">
                    <button onClick={this.callAPI} type="button">
                        Call Graph's /me API
                    </button>
                    <button onClick={this.logout} type="button">
                        Logout
                    </button>
                    <h3>Hello {this.state.user.name}</h3>
                </div>
            );
        } else {
            templates.push(
                <div key="loggedIn">
                    <button onClick={this.login} type="button">
                        Login with Microsoft
                    </button>
                </div>
            );
        }
        if (this.state.userInfo) {
            templates.push(
                <pre key="userInfo">{JSON.stringify(this.state.userInfo, null, 4)}</pre>
            );
        }
        if (this.state.loginFailed) {
            templates.push(<strong key="loginFailed">Login unsuccessful</strong>);
        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">React app with MSAL.js</h1>
                </header>
                {templates}
            </div>
        );
    }
}

export default App;