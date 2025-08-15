import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface BlurImageProps {
  src: string;
  blurDataUri: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const BlurImage: React.FC<BlurImageProps> = ({
  src,
  blurDataUri,
  alt,
  className,
  loading = 'lazy'
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setLoaded(true); // Show the error state instead of blur
  };

  if (error) {
    return (
      <div className={cn('bg-gray-200 flex items-center justify-center', className)}>
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Blur placeholder - shows first */}
      <img
        src={blurDataUri}
        alt=""
        className={cn(
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden="true"
      />
      
      {/* Actual image - loads on top */}
      <img
        src={src}
        alt={alt}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0'
        )}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};