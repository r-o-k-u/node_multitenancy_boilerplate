const { errorHelper } =require( '../../utils/index.js');

module.exports =  (req, res, next) => {
  if (!req.params.id)
    return res.status(400).json(errorHelper('00022', req));


  next();
}