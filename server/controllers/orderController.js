const Order = require('../models/Order');
const Buyer = require('../models/Buyer');
const Traveller = require('../models/Traveller');
const Partner = require('../models/Partner');

// Helper function to normalize location strings for matching
const normalizeLocation = (location) => {
  if (!location) return '';
  return location.toLowerCase().trim().replace(/[^\w\s]/g, '');
};

// Helper function to check if locations match (fuzzy matching)
const locationsMatch = (loc1, loc2) => {
  if (!loc1 || !loc2) return false;
  const normalized1 = normalizeLocation(loc1);
  const normalized2 = normalizeLocation(loc2);
  
  // Exact match
  if (normalized1 === normalized2) return true;
  
  // Check if one contains the other (for partial matches like "New York" and "New York City")
  if (normalized1.includes(normalized2) || normalized2.includes(normalized1)) return true;
  
  return false;
};

// Create new order from buyer
exports.createOrder = async (req, res) => {
  try {
    console.log('Create order request received:', { body: req.body });
    const { buyerId, deliveryMethod, orderInfo } = req.body;

    if (!buyerId || !deliveryMethod || !orderInfo) {
      console.log('Missing required fields:', { buyerId: !!buyerId, deliveryMethod: !!deliveryMethod, orderInfo: !!orderInfo });
      return res.status(400).json({
        status: 'error',
        message: 'Buyer ID, delivery method, and order info are required'
      });
    }

    // Verify buyer exists
    const buyer = await Buyer.findById(buyerId);
    if (!buyer) {
      return res.status(404).json({
        status: 'error',
        message: 'Buyer not found'
      });
    }

    // Create the order
    const order = await Order.create({
      buyerId,
      deliveryMethod,
      orderInfo
    });

    // Try to automatically match with travelers or partners based on location
    let matched = false;
    let matchDetails = null;

    if (deliveryMethod === 'traveler') {
      // Find matching travelers
      // Match criteria:
      // 1. Traveler's currentLocation (departure city) should match buyer's currentCity
      // 2. Traveler's destinationCity should match order's countryOfOrigin (if provided) or be flexible
      // 3. Traveler should be active
      // 4. Traveler's departure date should be reasonable (not too far in the past)
      
      const buyerCity = buyer.currentCity;
      // Use deliveryDestination first, then countryOfOrigin, then fallback to buyer city
      const orderDestination = orderInfo.deliveryDestination || orderInfo.countryOfOrigin || buyerCity;
      const preferredDate = orderInfo.preferredDeliveryDate ? new Date(orderInfo.preferredDeliveryDate) : null;
      
      // Find active travelers matching location
      const matchingTravelers = await Traveller.find({
        status: 'active',
        currentLocation: { $regex: new RegExp(buyerCity, 'i') }
      });

      // Filter travelers by destination and date
      const suitableTravelers = matchingTravelers.filter(traveler => {
        // Check if destination matches (flexible matching)
        const destinationMatch = !orderDestination || 
          locationsMatch(traveler.destinationCity, orderDestination) ||
          locationsMatch(traveler.destinationCity, buyerCity);
        
        // Check if departure date is reasonable (not too far in the past, and before preferred delivery date if provided)
        const departureDate = new Date(traveler.departureDate);
        const now = new Date();
        const isDateValid = departureDate >= now || 
          (departureDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)); // Allow up to 7 days in the past
        
        const isDateBeforePreferred = !preferredDate || departureDate <= preferredDate;
        
        return destinationMatch && isDateValid && isDateBeforePreferred;
      });

      // Sort by departure date (closest first)
      suitableTravelers.sort((a, b) => {
        const dateA = new Date(a.departureDate);
        const dateB = new Date(b.departureDate);
        return dateA - dateB;
      });

      // Match with the first suitable traveler
      if (suitableTravelers.length > 0) {
        const matchedTraveler = suitableTravelers[0];
        order.assignedTravelerId = matchedTraveler._id;
        order.status = 'matched';
        await order.addTrackingUpdate('matched', `Order automatically matched with traveler: ${matchedTraveler.name}`, matchedTraveler.currentLocation);
        matched = true;
        matchDetails = {
          type: 'traveler',
          name: matchedTraveler.name,
          phone: matchedTraveler.phone,
          email: matchedTraveler.email
        };
      }
    } else if (deliveryMethod === 'partner') {
      // Find matching delivery partners
      // Match criteria:
      // 1. Partner's city or primaryLocation should match buyer's currentCity
      // 2. Partner should be approved
      
      const buyerCity = buyer.currentCity;
      
      // Find approved partners matching location
      const matchingPartners = await Partner.find({
        status: 'approved',
        $or: [
          { city: { $regex: new RegExp(buyerCity, 'i') } },
          { primaryLocation: { $regex: new RegExp(buyerCity, 'i') } }
        ]
      });

      // Filter by exact or fuzzy location match
      const suitablePartners = matchingPartners.filter(partner => {
        return locationsMatch(partner.city, buyerCity) || 
               locationsMatch(partner.primaryLocation, buyerCity);
      });

      // Match with the first suitable partner
      if (suitablePartners.length > 0) {
        const matchedPartner = suitablePartners[0];
        order.assignedPartnerId = matchedPartner._id;
        order.status = 'assigned';
        await order.addTrackingUpdate('assigned', `Order automatically assigned to partner: ${matchedPartner.name || matchedPartner.companyName}`, matchedPartner.city || matchedPartner.primaryLocation);
        matched = true;
        matchDetails = {
          type: 'partner',
          name: matchedPartner.name || matchedPartner.companyName,
          phone: matchedPartner.phone,
          email: matchedPartner.email
        };
      }
    }

    // Prepare response message
    let message = 'Order created successfully';
    if (matched) {
      message += ` and automatically ${deliveryMethod === 'traveler' ? 'matched' : 'assigned'} with ${deliveryMethod === 'traveler' ? 'a traveler' : 'a delivery partner'}`;
    } else {
      message += '. No automatic match found - order is pending assignment.';
    }

    res.status(201).json({
      status: 'success',
      message: message,
      data: {
        ...order.toObject(),
        matched,
        matchDetails
      }
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

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const { status, deliveryMethod, buyerId } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (deliveryMethod) filter.deliveryMethod = deliveryMethod;
    if (buyerId) filter.buyerId = buyerId;

    const orders = await Order.find(filter)
      .populate('buyerId', 'name email phone currentCity')
      .populate('assignedTravelerId', 'name email phone currentLocation destinationCity')
      .populate('assignedPartnerId', 'name companyName email phone city')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyerId', 'name email phone currentCity location')
      .populate('assignedTravelerId', 'name email phone currentLocation destinationCity departureDate arrivalDate')
      .populate('assignedPartnerId', 'name companyName email phone city primaryLocation');

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get orders by buyer ID
exports.getOrdersByBuyer = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const orders = await Order.find({ buyerId })
      .populate('assignedTravelerId', 'name email phone currentLocation destinationCity')
      .populate('assignedPartnerId', 'name companyName email phone city')
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Match order with traveler
exports.matchWithTraveler = async (req, res) => {
  try {
    const { orderId, travelerId } = req.body;

    if (!orderId || !travelerId) {
      return res.status(400).json({
        status: 'error',
        message: 'Order ID and Traveler ID are required'
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    if (order.deliveryMethod !== 'traveler') {
      return res.status(400).json({
        status: 'error',
        message: 'This order is not set for traveler delivery'
      });
    }

    const traveler = await Traveller.findById(travelerId);
    if (!traveler) {
      return res.status(404).json({
        status: 'error',
        message: 'Traveler not found'
      });
    }

    order.assignedTravelerId = travelerId;
    order.status = 'matched';
    order.addTrackingUpdate('matched', `Order matched with traveler: ${traveler.name}`, '');
    await order.save();

    res.status(200).json({
      status: 'success',
      message: 'Order matched with traveler successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Assign order to partner
exports.assignToPartner = async (req, res) => {
  try {
    const { orderId, partnerId } = req.body;

    if (!orderId || !partnerId) {
      return res.status(400).json({
        status: 'error',
        message: 'Order ID and Partner ID are required'
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    if (order.deliveryMethod !== 'partner') {
      return res.status(400).json({
        status: 'error',
        message: 'This order is not set for partner delivery'
      });
    }

    const partner = await Partner.findById(partnerId);
    if (!partner) {
      return res.status(404).json({
        status: 'error',
        message: 'Partner not found'
      });
    }

    order.assignedPartnerId = partnerId;
    order.status = 'assigned';
    order.addTrackingUpdate('assigned', `Order assigned to partner: ${partner.name || partner.companyName}`, '');
    await order.save();

    res.status(200).json({
      status: 'success',
      message: 'Order assigned to partner successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, message, location } = req.body;

    if (!status) {
      return res.status(400).json({
        status: 'error',
        message: 'Status is required'
      });
    }

    const validStatuses = ['pending', 'matched', 'assigned', 'picked_up', 'in_transit', 'delivered', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status'
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    await order.addTrackingUpdate(status, message, location);

    res.status(200).json({
      status: 'success',
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Confirm delivery
exports.confirmDelivery = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    if (order.status !== 'delivered') {
      return res.status(400).json({
        status: 'error',
        message: 'Order must be in delivered status before confirmation'
      });
    }

    order.deliveryConfirmed = true;
    order.deliveryConfirmedAt = new Date();
    order.status = 'completed';
    await order.addTrackingUpdate('completed', 'Delivery confirmed by user', '');
    await order.save();

    res.status(200).json({
      status: 'success',
      message: 'Delivery confirmed successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get available travelers for matching
exports.getAvailableTravelers = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Find travelers that match the order's destination
    // This is a simplified matching - you can enhance this with more criteria
    const travelers = await Traveller.find({
      status: 'active',
      destinationCity: { $regex: new RegExp(order.orderInfo.countryOfOrigin || '', 'i') }
    }).limit(20);

    res.status(200).json({
      status: 'success',
      count: travelers.length,
      data: travelers
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get available partners for assignment
exports.getAvailablePartners = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    // Find active partners
    const partners = await Partner.find({
      status: 'approved'
    }).limit(20);

    res.status(200).json({
      status: 'success',
      count: partners.length,
      data: partners
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

