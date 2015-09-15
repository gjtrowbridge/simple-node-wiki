jest.dontMock('../Footer.jsx');

describe('Footer', function() {
  it('has a link to the github repository for the package', function() {
    var React = require('react/addons');
    var Footer = require('../Footer.jsx');
    var TestUtils = React.addons.TestUtils;

    var footer = TestUtils.renderIntoDocument(
      <Footer />
    );

    var linkToRepo = TestUtils.findRenderedDOMComponentWithTag(
      footer, 'a'
    );
    expect(React.findDOMNode(linkToRepo).href).toEqual(
        'https://github.com/gjtrowbridge/simple-node-wiki');
  });
});
