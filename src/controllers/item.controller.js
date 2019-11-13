var Item = require('../models/item');
var config = require('../config/config');

exports.getAll = async (req,res)=>{
    try {
        const items = await Item.find().populate('items').populate('belongsTo');
        return res.status(200).json(items);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}


exports.getById = async (req,res)=>{
    try {
        
        const item = await Item.findById(req.params.id).populate('shop');
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.createItem = async (req,res)=>{
    try {
        if(!req.body.name){
            return res.status(400).json({"msg":"provide a name"})
        }
        const dItem = await Item.findOne({name:req.body.name});
        if(dItem){
            return res.status(400).json({"msg":"Item with this name already exists"})
        }

        const item = await Item.create(req.body);
        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.updateItem = async (req,res)=>{
    try {
        
        const item = await Item.findByIdAndUpdate(req.params.id,req.body).populate('items').populate('belongsTo');

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
    exports.deleteItem = async (req,res)=>{
        try {
            
            const item = await Item.findByIdAndDelete(req.params.id);
    
            return res.status(200).json(item);
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
}

exports.getItemByUser = async (req,res)=>{
    try {
        
        const item = await Item.find({belongsTo:req.params.id}).populate('category');

        return res.status(200).json(item);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}


exports.itemsStats = async(req,res)=>{
    let stats={};
    try {
        const items = await Item.find();
        stats.itemsCount=items.length;
        return res.status(200).json(stats);
    } catch (error) {
        return res.status(500).json({msg:''+error});
        
    }
  }