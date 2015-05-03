var addPageEndpoints = function(express, sequelize) {
  var pages = express.Router();
  pages.get('/:name', function(req, res) {
    res.send(req.params.name);
  });
};

module.exports = addPageEndpoints;
