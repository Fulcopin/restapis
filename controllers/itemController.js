const admin = require('firebase-admin');
const db = admin.firestore();

exports.createItem = async (req, res) => {
  try {
    const data = req.body;
    const itemRef = await db.collection('items').add(data);
    res.status(201).send(`Created a new item: ${itemRef.id}`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

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

exports.updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const itemRef = db.collection('items').doc(id);
    await itemRef.update(data);
    res.status(200).send(`Item with ID: ${id} updated successfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

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
