const { deletebudget } = require("./../controllers/budget_controller.js");

const budget = require("./../models/budget");

class budgetService{
    static async createbudget(userId,montant,date){
            const createbudget = new budget({userId,montant,date});
            return await createbudget.save();
    }

    static async getUserbudgetList(userId){
        const budgetList = await budget.find({userId})
        return budgetList;
    }

   static async deletebudget(id){
        const deleted = await budget.findByIdAndDelete({_id:id})
        return deleted;
   }
}

module.exports = budgetService;