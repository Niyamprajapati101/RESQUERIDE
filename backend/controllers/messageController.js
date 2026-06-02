import Message from '../models/Message.js';


export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    const formattedMessages = messages.map(message => ({
      id: message._id.toString(),
      _id: message._id.toString(),
      userId: message.userId,
      name: message.name || 'Unknown',
      email: message.email || '—',
      subject: message.subject || '—',
      message: message.message || '—',
      status: message.status || 'Unread',
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: formattedMessages.length,
      messages: formattedMessages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch messages'
    });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('userId', 'name email phone');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    const formattedMessage = {
      id: message._id.toString(),
      _id: message._id.toString(),
      userId: message.userId,
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: message.status,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    };

    res.status(200).json({
      success: true,
      message: formattedMessage
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch message'
    });
  }
};

export const createMessage = async (req, res) => {
  try {
    const { userId, name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const newMessage = new Message({
      userId: userId || null,
      name,
      email,
      subject,
      message,
      status: 'Unread'
    });

    await newMessage.save();

    const formattedMessage = {
      id: newMessage._id.toString(),
      _id: newMessage._id.toString(),
      userId: newMessage.userId,
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject,
      message: newMessage.message,
      status: newMessage.status,
      createdAt: newMessage.createdAt,
      updatedAt: newMessage.updatedAt
    };

    res.status(201).json({
      success: true,
      message: 'Message created successfully',
      data: formattedMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create message'
    });
  }
};

export const updateMessage = async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Update fields if provided
    if (req.body.status !== undefined) message.status = req.body.status;
    if (req.body.subject !== undefined) message.subject = req.body.subject;
    if (req.body.message !== undefined) message.message = req.body.message;

    message.updatedAt = new Date();
    await message.save();

    const formattedMessage = {
      id: message._id.toString(),
      _id: message._id.toString(),
      userId: message.userId,
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      status: message.status,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt
    };

    res.status(200).json({
      success: true,
      message: 'Message updated successfully',
      data: formattedMessage
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update message'
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete message'
    });
  }
};
