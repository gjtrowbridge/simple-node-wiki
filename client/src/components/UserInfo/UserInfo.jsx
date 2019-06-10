import React from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }

  render() {
    const {
      logoutFn,
      userEmail,
    } = this.props;

    const baseUrl = 'https://simple-node-wiki.herokuapp.com';
    const jwt = localStorage.getItem('jwt');

    const createPagesCode = `// Install "node-fetch" package with \`npm install node-fetch\`
const fetch = require('node-fetch');
fetch('${baseUrl}/_api/pages', {
  method: 'POST',
  headers: {
    jwt: '${jwt}',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'new-page-url',
    title: 'My New Page (created via API!)',
    text: '#My New Page\\n\\nThis is my new page!', 
  })
}).then((response) => {
  return response.text();
}).then((text) => {
  console.log('response body:', text);
}).catch((error) => {
  console.err('something went wrong', error);
});`;

    return (
      <div className="user-info">
        <h2>User Info ({userEmail})</h2>
        <p className="user-token-info">
          Your current user token is: "{jwt}".
        </p>
        <p className="warning">(Do not share this token with others)</p>
        <p>
          To write automated requests that interact with your wiki pages,
          simply add this token as a header in all your requests, as shown below:
        </p>
        <h3>Example: Creating a New Page With a Node Script</h3>
        <pre className="language-javascript">
          <code className="language-javascript">
            {createPagesCode}
          </code>
        </pre>
        <p>To see a list of all the API methods available (create, read, update, delete, search), see the <a href="https://github.com/gjtrowbridge/simple-node-wiki/blob/master/README.md">README</a>.</p>
        <button className="logout-button" onClick={logoutFn}>Logout {userEmail}</button>
      </div>
    );
  }
}

UserInfo.propTypes = {
  logoutFn: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default UserInfo;
