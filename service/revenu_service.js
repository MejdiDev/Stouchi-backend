const revenu = require("../models/revenu.js");

class revenuService{
    static async createRevenu(user, categorie, montantR, date){
            const createrevenu = new revenu({user, categorie, montantR, date});
            return await createrevenu.save();
    }

    static async getUserRevenuList(user){
        const revenuList = await revenu.find({user})
        return revenuList;
    }

   static async deleteRevenu(id){
        const deleted = await revenu.findByIdAndDelete({_id:id})
        return deleted;
   }
}

module.exports = revenuService;