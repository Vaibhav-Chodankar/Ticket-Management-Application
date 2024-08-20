const { getAllMembers, getAssignedTicket } = require('../controller/memberController')
const router = require('express').Router();

router.get('/getAllMembers', getAllMembers);
router.get('/getAssignedTicket/:id', getAssignedTicket);

module.exports = router;