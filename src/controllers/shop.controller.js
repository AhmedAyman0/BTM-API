var Shop = require('../models/shop');
var User = require('../models/user');
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
        if(!req.body.name){
            return res.status(400).json({"msg":"provide a name"})
        }
        const dShop = await Shop.findOne({name:req.body.name});
        if(dShop){
            return res.status(400).json({"msg":"Shop with this name already exists"})
        }

        const shop = await Shop.create(req.body);
        shop.save();
            const user = await User.findById(shop.belongsTo).populate('shops');
            console.log(user);
            user.shops.push(shop);
            user.save();
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
    exports.deleteShop = async (req,res)=>{
        try {
            
            const shop = await Shop.findByIdAndDelete(req.params.id);
    
            return res.status(200).json(shop);
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
}

exports.getShopByUser = async (req,res)=>{
    try {
        
        const shop = await Shop.find({belongsTo:req.params.id}).populate('category');

        return res.status(200).json(shop);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}