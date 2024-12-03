import { ImageAnnotatorClient } from '@google-cloud/vision';

// Initialize the client
const visionClient = new ImageAnnotatorClient();

export const analyzeImages = async (imageUrls) => {
  try {
    // Analyze multiple images in parallel
    const analysisPromises = imageUrls.map(url => visionClient.labelDetection(url));
    const results = await Promise.all(analysisPromises);
    
    // Process and filter relevant labels
    return results.map(([result]) => {
      const labels = result.labelAnnotations || [];
      return labels
        .filter(label => {
          const description = label.description.toLowerCase();
          return (
            description.includes('landscape') ||
            description.includes('architecture') ||
            description.includes('nature') ||
            description.includes('city') ||
            description.includes('landmark') ||
            description.includes('tourist attraction')
          );
        })
        .map(label => ({
          description: label.description,
          score: label.score,
          confidence: label.confidence
        }));
    });
  } catch (error) {
    console.error('Vision API Error:', error);
    throw new Error('Failed to analyze images');
  }
};

export const extractLocationContext = async (labels) => {
  // Combine and process labels to create location context
  const relevantTerms = labels
    .flat()
    .filter(label => label.score > 0.7)
    .map(label => label.description)
    .join(' ');
    
  return relevantTerms;
};