const epargneService = require('./../service/epargne_service.js');

exports.createEpargne =  async (req,res,next)=>{
    try {
        const { user, montantE, date } = req.body;
        let epargneData = await epargneService.createEpargne(user, montantE, date);
        res.json({status: true, success:epargneData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getEpargneList =  async (req,res,next)=>{
    try {
        const { user } = req.body;
        let epargneData = await epargneService.getUserEpargneList(user);
        res.json({status: true,success:epargneData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.deleteEpargne =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await epargneService.deleteEpargne(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}