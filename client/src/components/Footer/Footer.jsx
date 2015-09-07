var React = require('react');

var Footer = React.createClass({
  render: function() {
    return (
      <footer id="footer" className="fill-and-center">
        <p>Created by
          <a target="_blank" href="https://github.com/gjtrowbridge"> Greg Trowbridge</a>
        </p>
      </footer>
    );
  }
});

module.exports = Footer;