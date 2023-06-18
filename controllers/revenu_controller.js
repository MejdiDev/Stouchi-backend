const revenuService = require('./../service/revenu_service.js');
var revenu = require("../models/revenu.js");

exports.createRevenu =  async (req,res,next)=>{
    try {
        const { user, categorie, montantR, date } = req.body;
        let revenuData = await revenuService.createRevenu(user, categorie, montantR, date);
        res.json({status: true, success:revenuData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getRevenuList =  async (req,res,next)=>{
    try {
        const { user } = req.body;
        let revenuData = await revenuService.getUserRevenuList(user);
        res.json({status: true,success:revenuData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.deleteRevenu =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await revenuService.deleteRevenu(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.updateRevenu = async(req, res) => {
    revenu.findByIdAndUpdate(req.query.id, {
        $set: {
            date:req.body.date,
            categorie: req.body.categorie,
            montantR:req.body.montantR,
            user: req.body.userId,
        
        }
    },
    {
        new: true
    }, (err,revenus) =>{
        if (err) {
            res.json({success: false, description: "Update revenu", error: err})
        } else {
            res.json({success: true, description: "Update revenu", message: "User revenu", data: revenus})
        }
    })
}