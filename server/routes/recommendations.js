import express from 'express';
import { analyzeImages, extractLocationContext } from '../services/vision.js';
import { getPlaceRecommendations, getPlaceDetails } from '../services/places.js';

const router = express.Router();

router.post('/analyze', async (req, res) => {
  try {
    const { images } = req.body;
    
    // Analyze images with Vision API
    const imageLabels = await analyzeImages(images.map(img => img.url));
    
    // Extract location context from labels
    const searchContext = await extractLocationContext(imageLabels);
    
    // Get place recommendations
    const recommendations = await getPlaceRecommendations(searchContext);
    
    // Get detailed information for top recommendations
    const detailedRecommendations = await Promise.all(
      recommendations.slice(0, 5).map(place => 
        getPlaceDetails(place.placeId)
      )
    );
    
    res.json({
      labels: imageLabels,
      recommendations: detailedRecommendations
    });
  } catch (error) {
    console.error('Recommendation Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;