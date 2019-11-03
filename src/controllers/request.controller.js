
var Request = require('../models/request');

exports.getAll = async (req,res)=>{
    try {
        const requests = await Request.find();
        return res.status(200).json(requests);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }

}


exports.getById = async (req,res)=>{
    try {
        
        const request = await Request.findById(req.params.id);
        return res.status(200).json(request);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.createRequest = async (req,res)=>{
    try {

        const request = await Request.create(req.body);

        return res.status(200).json(request);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
exports.updateRequest = async (req,res)=>{
    try {
        
        const request = await Request.findByIdAndUpdate(req.params.id,req.body).populate('requests');

        return res.status(200).json(request);
    } catch (error) {
        return res.status(500).json({msg : error.message})
    }
}
    exports.deleteRequest = async (req,res)=>{
        try {
            
            const request = await Request.findByIdAndDelete(req.params.id);
    
            return res.status(200).json(request);
        } catch (error) {
            return res.status(500).json({msg : error.message})
        }
}