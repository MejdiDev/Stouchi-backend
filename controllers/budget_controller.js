const budgetService = require('./../service/budget_service');


exports.createbudget =  async (req,res,next)=>{
    try {
        const { userId, montant , date } = req.body;
        let budgetData = await budgetService.createbudget(userId, montant , date);
        res.json({status: true,success:budgetData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getbudgetList =  async (req,res,next)=>{
    try {
        const { userId } = req.body;
        let budgetData = await budgetService.getUserbudgetList(userId);
        res.json({status: true,success:budgetData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.deletebudget =  async (req,res,next)=>{
    try {
        const { id } = req.body;
        let deletedData = await budgetService.deletebudget(id);
        res.json({status: true,success:deletedData});
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}