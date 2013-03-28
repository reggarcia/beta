
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'A Day In The Life' });
};
exports.contact = function(req, res){
   res.render('contact', { title: 'A Day In The Life' });
};