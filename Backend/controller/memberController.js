const UserModel = require('../model/userModel');
const TicketModel = require('../model/ticketModel')

module.exports.getAllMembers = async (req, res, next) => {
    try {
        const members = await UserModel.find({ role: 'member' });
        res.send({ data: members });
    }
    catch (e) {
        next(e);
    }
}

module.exports.getAssignedTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        const assignedTicket = await TicketModel.find({ assigned: id });
        res.send({ data: assignedTicket });
    }
    catch (e) {
        next(e);
    }
}