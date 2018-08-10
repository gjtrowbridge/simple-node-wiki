
const helpers = {
  convertStringToPath: function(str) {
    var result = '';
    for (var i=0; i<str.length; i++) {
      var ch = str.charAt(i);
      if (ch === ch.toLowerCase()) {
        result += ch;
      } else {
        result += '-' + ch.toLowerCase();
      }
    }
    result = result.replace(/\W+/g, '-');
    result = result.replace(/^-/, '');
    result = result.replace(/-$/, '');
    result = result.replace(/-(2,)/g, '');
    return result;
  }
};

export default helpers;
