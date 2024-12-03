import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { uploadFile } from '../config/firebase';
import { v4 as uuidv4 } from 'uuid';

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUploaded }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size must be less than 5MB');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fileName = `${uuidv4()}-${file.name}`;
      const path = `travel-images/${fileName}`;
      const downloadUrl = await uploadFile(file, path);
      onImageUploaded(downloadUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {loading ? (
            <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
          ) : (
            <>
              <Upload className="h-12 w-12 text-gray-400 mb-3" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
            </>
          )}
        </div>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={loading}
        />
      </label>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};