const { default: slugify } = require("slugify");

//I use that for change slug when update to slugfy style
exports.applySlugify= (req, res, next) => {
    if (req.body.name) 
      req.body.slug=slugify(req.body.name);
    else if(req.body.title)
      req.body.slug=slugify(req.body.title)
    next()
  }
  