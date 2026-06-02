import Assistance from '../models/Assistance.js';


export const getAllAssistance = async (req, res) => {
  try {
    const assistance = await Assistance.find()
      .populate('userId', 'name email phone')
      .sort({ createdAt: -1 });

    const formattedAssistance = assistance.map(item => ({
      id: item._id.toString(),
      _id: item._id.toString(),
      userId: item.userId,
      user: item.userId?.name || item.user || 'Unknown',
      phone: item.userId?.phone || item.phone || '—',
      issue: item.type || item.issue || 'Unknown',
      type: item.type || item.issue || 'Unknown',
      car: item.car || 'Unknown',
      location: item.location || '—',
      description: item.description || '—',
      status: item.status || 'Pending',
      date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—',
      createdAt: item.createdAt,
      updatedAt: item.updatedAt
    }));

    res.status(200).json({
      success: true,
      count: formattedAssistance.length,
      assistance: formattedAssistance
    });
  } catch (error) {
    console.error('Error fetching assistance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch assistance'
    });
  }
};

export const getAssistanceById = async (req, res) => {
  try {
    const assistance = await Assistance.findById(req.params.id)
      .populate('userId', 'name email phone');

    if (!assistance) {
      return res.status(404).json({
        success: false,
        message: 'Assistance request not found'
      });
    }

    const formattedAssistance = {
      id: assistance._id.toString(),
      _id: assistance._id.toString(),
      userId: assistance.userId,
      type: assistance.type,
      description: assistance.description,
      status: assistance.status,
      createdAt: assistance.createdAt,
      updatedAt: assistance.updatedAt
    };

    res.status(200).json({
      success: true,
      assistance: formattedAssistance
    });
  } catch (error) {
    console.error('Error fetching assistance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch assistance'
    });
  }
};

export const createAssistance = async (req, res) => {
  try {
    console.log('📥 POST /api/assistance - Request body:', req.body);
    
    const { userId, type, description, location } = req.body;

    if (!type || !description) {
      console.error('❌ Validation failed - Missing type or description');
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: type, description'
      });
    }

    console.log('✅ Validation passed');

    const assistance = new Assistance({
      userId: userId || null,
      type,
      description,
      location: location || '—',
      status: 'Pending'
    });

    console.log('💾 Saving to database:', assistance);
    await assistance.save();
    console.log('✅ Saved successfully');
    
    await assistance.populate('userId', 'name email phone');

    const formattedAssistance = {
      id: assistance._id.toString(),
      _id: assistance._id.toString(),
      userId: assistance.userId,
      type: assistance.type,
      description: assistance.description,
      location: assistance.location,
      status: assistance.status,
      createdAt: assistance.createdAt,
      updatedAt: assistance.updatedAt
    };

    console.log('📤 Sending response:', formattedAssistance);
    res.status(201).json({
      success: true,
      message: 'Assistance request created successfully',
      assistance: formattedAssistance
    });
  } catch (error) {
    console.error('❌ Error creating assistance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create assistance'
    });
  }
};

export const updateAssistance = async (req, res) => {
  try {
    let assistance = await Assistance.findById(req.params.id);

    if (!assistance) {
      return res.status(404).json({
        success: false,
        message: 'Assistance request not found'
      });
    }

    // Update fields if provided
    if (req.body.status !== undefined) assistance.status = req.body.status;
    if (req.body.type !== undefined) assistance.type = req.body.type;
    if (req.body.description !== undefined) assistance.description = req.body.description;

    assistance.updatedAt = new Date();
    await assistance.save();
    await assistance.populate('userId', 'name email phone');

    const formattedAssistance = {
      id: assistance._id.toString(),
      _id: assistance._id.toString(),
      userId: assistance.userId,
      type: assistance.type,
      description: assistance.description,
      status: assistance.status,
      createdAt: assistance.createdAt,
      updatedAt: assistance.updatedAt
    };

    res.status(200).json({
      success: true,
      message: 'Assistance updated successfully',
      assistance: formattedAssistance
    });
  } catch (error) {
    console.error('Error updating assistance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update assistance'
    });
  }
};

export const deleteAssistance = async (req, res) => {
  try {
    const assistance = await Assistance.findByIdAndDelete(req.params.id);

    if (!assistance) {
      return res.status(404).json({
        success: false,
        message: 'Assistance request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Assistance deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting assistance:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete assistance'
    });
  }
};
