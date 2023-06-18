const epargne = require("../models/epargne.js");

class epargneService{
    static async createEpargne(user, montantE, date){
            const createEpargne = new epargne({user, montantE, date});
            return await createEpargne.save();
    }

    static async getUserEpargneList(user){
        const epargneList = await epargne.find({user})
        return epargneList;
    }

   static async deleteEpargne(id){
        const deleted = await epargne.findByIdAndDelete({_id:id})
        return deleted;
   }
}

module.exports = epargneService;