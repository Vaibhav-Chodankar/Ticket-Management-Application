const { addTicket, getTicket, getAllTicket, updateTicket, deleteTicket, getClosedTickets } = require('../controller/ticketController')

const router = require('express').Router();

router.post('/addTicket', addTicket);
router.get('/getTicket', getAllTicket);
router.get('/getClosedTicket', getClosedTickets);
router.get('/getTicket/:id', getTicket);
router.put('/:ticketId', updateTicket);
router.delete('/:ticketId', deleteTicket);

module.exports = router;