const Traveller = require('../models/Traveller');

// Get all travellers
exports.getAllTravellers = async (req, res, next) => {
  try {
    const { travellerType, status, destinationCity, currentLocation } = req.query;
    const filter = {};
    
    if (travellerType) filter.travellerType = travellerType;
    if (status) filter.status = status;
    
    // Search by destination city (case-insensitive partial match)
    if (destinationCity) {
      filter.destinationCity = { $regex: destinationCity, $options: 'i' };
    }
    
    // Search by departure city/current location (case-insensitive partial match)
    if (currentLocation) {
      filter.currentLocation = { $regex: currentLocation, $options: 'i' };
    }
    
    const travellers = await Traveller.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      status: 'success',
      count: travellers.length,
      data: travellers
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get single traveller by ID
exports.getTravellerById = async (req, res, next) => {
  try {
    const traveller = await Traveller.findById(req.params.id);
    
    if (!traveller) {
      return res.status(404).json({
        status: 'error',
        message: 'Traveller not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: traveller
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Create new traveller
exports.createTraveller = async (req, res, next) => {
  try {
    console.log('Creating traveller - received data:', JSON.stringify(req.body, null, 2));
    
    const traveller = await Traveller.create(req.body);
    
    res.status(201).json({
      status: 'success',
      message: 'Traveller created successfully',
      data: traveller
    });
  } catch (error) {
    console.error('Error creating traveller:', error);
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: error.message || 'Internal server error'
    });
  }
};

// Update traveller
exports.updateTraveller = async (req, res, next) => {
  try {
    const traveller = await Traveller.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!traveller) {
      return res.status(404).json({
        status: 'error',
        message: 'Traveller not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Traveller updated successfully',
      data: traveller
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Delete traveller
exports.deleteTraveller = async (req, res, next) => {
  try {
    const traveller = await Traveller.findByIdAndDelete(req.params.id);
    
    if (!traveller) {
      return res.status(404).json({
        status: 'error',
        message: 'Traveller not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Traveller deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
