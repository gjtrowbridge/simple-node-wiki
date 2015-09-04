var React = require('react');
var PageList = require('../PageList/PageList.jsx');
var shared = require('../../../../shared/shared.js');

var HomePage = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  render: function() {
    return (
      <div className="home-page">
        Home page!
        <PageList title="Recently Modified Pages" pages={[{id: 5, name: 'asana-org-chart', title: 'Org Chart'}]} />
        <PageList title="Recently Created Pages" pages={[]} />
      </div>
    );
  }
});

module.exports = HomePage;
