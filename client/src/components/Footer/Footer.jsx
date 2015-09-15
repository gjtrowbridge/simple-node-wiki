var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <footer id="footer" className="layout-fill-and-center">
        <p>See the source code
          <a target="_blank" href="https://github.com/gjtrowbridge/simple-node-wiki"> here</a>
        </p>
      </footer>
    );
  }
});

module.exports = Footer;