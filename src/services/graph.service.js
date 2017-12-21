export default class GraphService {
    constructor() {
      this.graphUrl = 'https://graph.windows.net/f01e0225-ee80-4bf3-bfda-e665281c6534';

      this.getUserInfo = this.getUserInfo.bind(this);
    }
  
    getUserInfo(token, displayName) {
      const headers = new Headers({ Authorization: `Bearer ${token}` });
      const options = {
        headers
      };
      return fetch(`${this.graphUrl}/users?api-version=1.6`, options)
        .then(response => response.json())
        .catch(response => {
          throw new Error(response.text());
        });
    };
  }