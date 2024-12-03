import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { getPlaceRecommendations } from './services/places.js';
import { configureGoogleCloud } from './config/googleCloud.js';

// Load environment variables first
dotenv.config();

// Configure Google Cloud credentials
configureGoogleCloud();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Vision API client
let visionClient;
try {
  visionClient = new ImageAnnotatorClient();
} catch (error) {
  console.error('Failed to initialize Vision API client:', error);
  process.exit(1);
}

// API endpoints
app.post('/api/analyze', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    
    // Analyze image with Vision API
    const [result] = await visionClient.labelDetection(imageUrl);
    const labels = result.labelAnnotations;
    
    // Filter relevant labels for travel
    const travelLabels = labels.filter(label => {
      const description = label.description.toLowerCase();
      return (
        description.includes('landscape') ||
        description.includes('architecture') ||
        description.includes('nature') ||
        description.includes('city') ||
        description.includes('landmark') ||
        description.includes('tourist')
      );
    });
    
    // Create search context from labels
    const searchContext = travelLabels
      .map(label => label.description)
      .join(' ');
    
    // Get place recommendations
    const recommendations = await getPlaceRecommendations(searchContext);
    
    res.json({
      labels: travelLabels,
      recommendations
    });
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});