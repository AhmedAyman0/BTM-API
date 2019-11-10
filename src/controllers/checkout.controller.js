var CheckOut = require('../models/checkout');

exports.getAll = async (req,res)=>{
    try {
        const checkOuts = await CheckOut.find();
        return res.status(200).json(checkOuts);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}


exports.getById = async (req,res)=>{
    try {
        
        const checkOut = await CheckOut.findById(req.params.id).populate('requests');
        return res.status(200).json(checkOut);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.createCheckOut = async (req,res)=>{
    try {
        const checkOut = await CheckOut.create(req.body);

        return res.status(200).json(checkOut);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.updateCheckOut = async (req,res)=>{
    try {
        
        const checkOut = await CheckOut.findByIdAndUpdate(req.params.id,req.body).populate('items').populate('belongsTo');

        return res.status(200).json(checkOut);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
    exports.deleteCheckOut = async (req,res)=>{
        try {
            
            const checkOut = await CheckOut.findByIdAndDelete(req.params.id);
    
            return res.status(200).json(checkOut);
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
}

exports.getCheckOutByUser = async (req,res)=>{
    try {
        
        const checkOut = await CheckOut.find({belongsTo:req.params.id}).populate('category');

        return res.status(200).json(checkOut);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}