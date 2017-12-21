import * as Msal from 'msal';

export default class AuthService {
    constructor() {
        let redirectUri = 'http://localhost:3000';

        const loggerOptions = { level: Msal.LogLevel.Verbose, correlationId:'12345' };
        const logger = new Msal.Logger((logLevel, message, piiLoggingEnabled) => console.log(message), loggerOptions);
       
        this.applicationConfig = {
            clientID: 'f38871af-b098-4fe8-9dd9-0cda41d59f31',
            authority: "https://login.microsoftonline.com/tfp/grymta.onmicrosoft.com/B2C_1_SignUpSignIn", 
            graphScopes: ['openid']
        };

        this.app = new Msal.UserAgentApplication(
            this.applicationConfig.clientID,
            this.applicationConfig.authority,
            () => {
                // callback for login redirect
            },
            {
                logger,
                redirectUri,
                postLogoutRedirectUri: redirectUri
            }
        );

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    login() {
        return this.app.loginPopup(this.applicationConfig.graphScopes).then(
            idToken => {
                console.log(idToken);
                
                const user = this.app.getUser();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
            () => {
                return null;
            }
        );
    }

    logout() {
        this.app.logout();
    };

    getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
          accessToken => {
            return accessToken;
          },
          error => {
            return this.app
              .acquireTokenPopup(this.applicationConfig.graphScopes)
              .then(
                accessToken => {
                  return accessToken;
                },
                err => {
                  console.error(err);
                }
              );
          }
        );
      };
}

