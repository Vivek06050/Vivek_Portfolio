const Message = require('../models/messageModel'); // Ensure the correct path to the model

const saveMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new message document
    const newMessage = new Message({ name, email, message });

    // Save to database
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { saveMessage };
