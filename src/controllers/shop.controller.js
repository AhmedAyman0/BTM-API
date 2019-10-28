var Shop = require('../models/shop');
var Item = require('../models/item');
var config = require('../config/config');

exports.getAll = async (req,res)=>{
    try {
        const shops = await Shop.find().populate('items').populate('belongsTo');
        return res.status(200).json(shops);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}

exports.getById = async (req,res)=>{
    try {
        
        const shop = await Shop.findById(req.params.id).populate('items').populate('belongsTo');
        return res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.createShop = async (req,res)=>{
    try {
        console.log(req.body)

        const shop = await Shop.create(req.body);

        return res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.updateShop = async (req,res)=>{
    try {
        
        const shop = await Shop.findByIdAndUpdate(req.params.id,req.body).populate('items').populate('belongsTo');

        return res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}