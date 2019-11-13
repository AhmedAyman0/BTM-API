
var Category = require('../models/category');
var Item = require('../models/item');
var config = require('../config/config');

exports.getAll = async (req,res)=>{
    try {
        const shops = await Category.find().populate('shops');
        return res.status(200).json(shops);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}


exports.getById = async (req,res)=>{
    try {
        
        const category = await Category.findById(req.params.id).populate('shops');
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.createCategory = async (req,res)=>{
    try {
        if(!req.body.name){
            return res.status(400).json({"msg":"provide a name"})
        }
        const dCategory = await Category.findOne({name:req.body.name});
        if(dCategory){
            return res.status(400).json({"msg":"Category with this name already exists"})
        }

        const category = await Category.create(req.body);

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.updateCategory = async (req,res)=>{
    try {
        
        const category = await Category.findByIdAndUpdate(req.params.id,req.body).populate('shops');

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
    exports.deleteCategory = async (req,res)=>{
        try {
            
            const category = await Category.findByIdAndDelete(req.params.id);
    
            return res.status(200).json(category);
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
}

exports.categStats = async(req,res)=>{
    let stats={};
    try {
        const categs = await Category.find();
        stats.categsCount=categs.length;
        return res.status(200).json(stats);
    } catch (error) {
        return res.status(500).json({msg:''+error});
        
    }
}