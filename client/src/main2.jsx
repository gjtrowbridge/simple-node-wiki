import React from 'react';
import ReactDOM from 'react-dom';

class Example extends React.Component {
  render() {
    return (
      <div>
        This is a rendered component123!
      </div>
    )
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('mount_point'),
);
