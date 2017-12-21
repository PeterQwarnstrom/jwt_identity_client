import React from 'react';
import * as Msal from 'msal';


class Login extends React.Component {

    render() {
        const loggerOptions = { level: Msal.LogLevel.Verbose, correlationId:'12345' };
        const logger = new Msal.Logger((logLevel, message, piiLoggingEnabled) => console.log(message), loggerOptions);
        const userAgentApplication = new Msal.UserAgentApplication('f38871af-b098-4fe8-9dd9-0cda41d59f31', null, authCallback, { logger: logger, cacheLocation: 'localStorage'})
    
        const authCallback = (errorDesc, token, error, tokenType) => {
            if (token) {
                console.log(token);
            }
            else {
                console.log(error + ":" + errorDesc);
            }
        }
    
        userAgentApplication.loginPopup(["user.read"]).then(function (idToken) {
            console.log(idToken);
            userAgentApplication.acquireTokenSilent(["user.read"]).then(function (accessToken) {
                //AcquireToken Success
                console.log(accessToken);
            }, function (error) {
                //AcquireToken Failure, send an interactive request.
                userAgentApplication.acquireTokenPopup(["user.read"]).then(function (accessToken) {
                    console.log(accessToken);
                }, function (error) {
                    console.log(error);
                });
            })
        }, function (error) {
            console.log(error);
        });

        return (
            <div>Login</div>
        );
    }
}

export default Login;