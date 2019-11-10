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
        if(!req.body.name){
            return res.status(400).json({"msg":"provide a name"})
        }
        const dCheckOut = await CheckOut.findOne({name:req.body.name});
        if(dCheckOut){
            return res.status(400).json({"msg":"CheckOut with this name already exists"})
        }
        const checkOut = await CheckOut.create(req.body);
        checkOut.save();
            const user = await User.findById(checkOut.belongsTo).populate('checkOuts');
            console.log(user);
            user.checkOuts.push(checkOut);
            user.save();
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