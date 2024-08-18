const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const verifyJWT = require('../middlewares/authMiddleware');



// Rutas protegidas con JWT
router.get('/items', verifyJWT, itemController.getAllItems);
router.get('/items/:id', verifyJWT, itemController.getItem);
router.post('/items', verifyJWT, itemController.createItem);
router.put('/items/:id', verifyJWT, itemController.updateItem);
router.delete('/items/:id', verifyJWT, itemController.deleteItem);

module.exports = router;
