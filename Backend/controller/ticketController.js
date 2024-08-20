const ticketModel = require('../model/ticketModel');
const userModel = require('../model/userModel');

module.exports.addTicket = async (req, res, next) => {
    try {
        const { name, email, companyName, department, message, createdBy } = req.body;

        const availableMember = await userModel.findOne({
            role: 'member',
            availability: true
        });

        const ticketData = {
            name,
            email,
            companyName,
            department,
            message,
            createdBy,
            status: 'pending',
        };

        if (availableMember) {
            ticketData.assigned = availableMember._id;

            availableMember.availability = false;
            await availableMember.save();
        }

        const newTicket = new ticketModel(ticketData);
        await newTicket.save();

        res.send({ status: true, data: newTicket });
    } catch (e) {
        next(e);
    }
};

module.exports.getTicket = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = await ticketModel.find({ createdBy: id });

        if (!data) {
            return res.status(404).json({ status: false, message: "Ticket not found" });
        }
        res.status(200).json({ status: true, data });

    } catch (e) {
        next(e);
    }
}

module.exports.getAllTicket = async (req, res, next) => {
    try {
        const data = await ticketModel.find({ status: 'pending' })
            .populate('assigned', 'username email');

        if (!data || data.length === 0) {
            return res.status(404).json({ status: false, message: "Tickets not found" });
        }

        res.status(200).json({ status: true, data });
    } catch (e) {
        next(e);
    }
}

module.exports.getClosedTickets = async (req, res, next) => {
    try {
        const data = await ticketModel.find({ status: 'closed' })
            .populate('assigned', 'username email');

        if (!data || data.length === 0) {
            return res.status(404).json({ status: false, message: "Tickets not found" });
        }

        res.status(200).json({ status: true, data });
    } catch (e) {
        next(e);
    }
}


module.exports.updateTicket = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const updateData = req.body;

        const updatedTicket = await ticketModel.findByIdAndUpdate(ticketId, updateData, { new: true });

        if (!updatedTicket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({
            message: 'Ticket updated successfully',
            data: updatedTicket,
        });
    } catch (error) {
        console.error('Error updating ticket:', error);
        next(error);
    }
};

module.exports.deleteTicket = async (req, res, next) => {
    try {
        const { ticketId } = req.params;
        const result = await ticketModel.findByIdAndDelete(ticketId);

        if (!result) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        res.json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        next(error);
    }
};