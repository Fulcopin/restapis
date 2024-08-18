const db = require('../config/firebase');  // Importa la configuración de Firebase

// Controlador para crear un ítem
exports.createItem = async (req, res) => {
    try {
        const data = req.body;
        
        // Verifica que data sea un objeto plano
        if (typeof data !== 'object' || Array.isArray(data) || data === null) {
            return res.status(400).send('Los datos enviados no son un objeto JSON válido.');
        }
        
        const itemRef = await db.collection('items').add(data);
        res.status(201).send(`Created a new item: ${itemRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Controlador para obtener todos los ítems
exports.getAllItems = async (req, res) => {
    try {
        const itemsSnapshot = await db.collection('items').get();
        const items = [];
        itemsSnapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
        res.status(200).json(items);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Controlador para obtener un ítem por ID
exports.getItem = async (req, res) => {
    try {
        const id = req.params.id;
        const itemRef = db.collection('items').doc(id);
        const itemDoc = await itemRef.get();
        if (!itemDoc.exists) {
            res.status(404).send('Item not found');
        } else {
            res.status(200).json({ id: itemDoc.id, ...itemDoc.data() });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Controlador para actualizar un ítem
exports.updateItem = async (req, res) => {
    try {
        const id = req.params.id; 
        const data = req.body;

        // Verifica que data sea un objeto plano
        if (typeof data !== 'object' || Array.isArray(data) || data === null) {
            return res.status(400).send('Los datos enviados no son un objeto JSON válido.');
        }

        const itemRef = db.collection('items').doc(id); 
        const itemDoc = await itemRef.get();
        if (!itemDoc.exists) {
            res.status(404).send('Ítem no encontrado'); 
        } else {
            await itemRef.update(data); 
            res.status(200).send(`Ítem con ID: ${id} actualizado exitosamente`); 
        }
    } catch (error) {
        res.status(400).send(error.message); 
    }
};

// Controlador para eliminar un ítem
exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        const itemRef = db.collection('items').doc(id);
        await itemRef.delete();
        res.status(200).send(`Item with ID: ${id} deleted successfully`);
    } catch (error) {
        res.status(400).send(error.message);
    }
};
