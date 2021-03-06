var CheckOut = require("../models/checkout");
exports.getAll = async (req, res) => {
  try {
    const checkOuts = await CheckOut.find();
    return res.status(200).json(checkOuts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const checkOut = await CheckOut.findById(req.params.id).populate(
      "requests"
    );
    return res.status(200).json(checkOut);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.getForUser = async (req, res) => {
  try {
    const checkOut = await CheckOut.find({ belongsTo: req.params.id }).populate('requests');
    return res.status(200).json(checkOut);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.createCheckOut = async (req, res) => {
  try {
    const checkOut = await CheckOut.create(req.body);

    return res.status(200).json(checkOut);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.updateCheckOut = async (req, res) => {
  try {
    let pending= true;
    req.body.requests.forEach(r=>{
        pending = pending && r.isPending;
    })
    if(pending){
        req.body.isPending=pending;
    }
    const checkOut = await CheckOut.findByIdAndUpdate(req.params.id, req.body)
      .populate("requests");

    return res.status(200).json(checkOut);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
exports.deleteCheckOut = async (req, res) => {
  try {
    const checkOut = await CheckOut.findByIdAndDelete(req.params.id);

    return res.status(200).json(checkOut);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

exports.getCheckOutByUser = async (req, res) => {
  try {
    const checkOut = await CheckOut.find({ belongsTo: req.params.id }).populate(
      "category"
    );

    return res.status(200).json(checkOut);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


exports.checkOutsStats = async(req,res)=>{
  let stats={};
  try {
      const checkOuts = await CheckOut.find();
      const pending = await CheckOut.find({isPending:true});
      const nonPending = await CheckOut.find({isPending:false});
      stats.pendingCheckOuts = pending.length;
      stats.nonPendingCheckOuts = nonPending.length;
      stats.checkOutsCount=checkOuts.length;
      return res.status(200).json(stats);
  } catch (error) {
      return res.status(500).json({msg:''+error});
      
  }
}