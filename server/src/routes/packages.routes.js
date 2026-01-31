import express from 'express';
import Package from '../models/Package.model.js';

const router = express.Router();

// Get all packages with filters
router.get('/', async (req, res) => {
  try {
    const {
      destination,
      category,
      minPrice,
      maxPrice,
      minRating,
      duration,
      page = 1,
      limit = 12,
      sort = '-rating.average'
    } = req.query;

    // Build query
    const query = { isActive: true };

    if (destination) {
      query['destination.city'] = new RegExp(destination, 'i');
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query['pricing.discountedPrice'] = {};
      if (minPrice) query['pricing.discountedPrice'].$gte = parseFloat(minPrice);
      if (maxPrice) query['pricing.discountedPrice'].$lte = parseFloat(maxPrice);
    }

    if (minRating) {
      query['rating.average'] = { $gte: parseFloat(minRating) };
    }

    if (duration) {
      const days = parseInt(duration);
      query['duration.days'] = days;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [packages, total] = await Promise.all([
      Package.find(query)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Package.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        packages,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: total,
          hasNext: skip + packages.length < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Get Packages Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
      error: error.message
    });
  }
});

// Get featured packages
router.get('/featured', async (req, res) => {
  try {
    const packages = await Package.find({
      isActive: true,
      isFeatured: true
    })
      .sort('-rating.average')
      .limit(8)
      .lean();

    res.json({
      success: true,
      data: packages
    });
  } catch (error) {
    console.error('Get Featured Packages Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching featured packages',
      error: error.message
    });
  }
});

// Get package by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const packageData = await Package.findOne({
      $or: [{ _id: id }, { packageId: id }],
      isActive: true
    }).lean();

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.json({
      success: true,
      data: packageData
    });
  } catch (error) {
    console.error('Get Package Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching package',
      error: error.message
    });
  }
});

// Get packages by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 8 } = req.query;

    const packages = await Package.find({
      category,
      isActive: true
    })
      .sort('-rating.average')
      .limit(parseInt(limit))
      .lean();

    res.json({
      success: true,
      data: packages
    });
  } catch (error) {
    console.error('Get Packages by Category Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
      error: error.message
    });
  }
});

// Search packages
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }

    const searchRegex = new RegExp(query, 'i');

    const packages = await Package.find({
      isActive: true,
      $or: [
        { title: searchRegex },
        { 'destination.city': searchRegex },
        { 'destination.country': searchRegex },
        { description: searchRegex },
        { tags: searchRegex }
      ]
    })
      .sort('-rating.average')
      .limit(20)
      .lean();

    res.json({
      success: true,
      data: packages
    });
  } catch (error) {
    console.error('Search Packages Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching packages',
      error: error.message
    });
  }
});

export default router;