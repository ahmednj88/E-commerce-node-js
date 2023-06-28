const CategoryModel= require('../models/categoryModel')



exports.getCategory=(req , res)=>{
    const name = req.body.name;
    console.log('body', req.body)
    const newCategory= new CategoryModel({name})
    newCategory.save().then((doc) =>{
        return res.json(doc)
    }).catch((err) => { return res.json(err)})
}

