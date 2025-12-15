import React, { useEffect } from "react";
import { X } from "lucide-react";
import { Artwork } from "@/data/artworks";

interface GalleryWallViewProps {
  artwork: Artwork;
  isOpen: boolean;
  onClose: () => void;
}

const GalleryWallView: React.FC<GalleryWallViewProps> = ({ artwork, isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Detect screen dimensions and orientation
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const isMobile = screenWidth < 768;
  
  // Artwork dimensions in cm
  const artworkWidthCm = artwork.width;
  const artworkHeightCm = artwork.height;
  const artworkAspectRatio = artworkWidthCm / artworkHeightCm;
  const isArtworkPortrait = artworkHeightCm > artworkWidthCm;
  
  // Frame width in cm (always framed on wall)
  const frameWidthCm = 1;
  
  // Mat/border space between frame and image (0.5cm of black space)
  const matWidthCm = 0.5;
  
  // Calculate artwork display size in pixels
  let artworkWidthPx: number;
  let artworkHeightPx: number;
  
  if (isMobile) {
    // Mobile: fit to 90% of screen width or 80% of screen height for portrait artworks
    if (isArtworkPortrait) {
      // Portrait artwork: fit to 80% of screen height
      artworkHeightPx = screenHeight * 0.8;
      artworkWidthPx = artworkHeightPx * artworkAspectRatio;
    } else {
      // Landscape or square artwork: fit to 90% of screen width
      artworkWidthPx = screenWidth * 0.9;
      artworkHeightPx = artworkWidthPx / artworkAspectRatio;
    }
  } else {
    // Desktop: use realistic wall-based sizing
    const wallWidthCm = 450; // 4.5m
    const wallHeightCm = 300; // 3m
    const floorHeightCm = 75; // 0.75m
    const availableWallHeightCm = wallHeightCm - floorHeightCm; // 225cm
    
    const maxArtworkWidthCm = wallWidthCm * 0.4;
    const maxArtworkHeightCm = availableWallHeightCm * 0.6;
    
    let scaleFactor = 1;
    
    if (artworkWidthCm > maxArtworkWidthCm) {
      scaleFactor = maxArtworkWidthCm / artworkWidthCm;
    }
    if (artworkHeightCm > maxArtworkHeightCm) {
      const heightScale = maxArtworkHeightCm / artworkHeightCm;
      scaleFactor = Math.min(scaleFactor, heightScale);
    }
    
    const scaledWidthCm = artworkWidthCm * scaleFactor;
    const scaledHeightCm = artworkHeightCm * scaleFactor;
    
    // Convert to pixels based on screen width
    artworkWidthPx = (scaledWidthCm / wallWidthCm) * screenWidth;
    artworkHeightPx = (scaledHeightCm / wallWidthCm) * screenWidth;
  }
  
  // Calculate frame and mat dimensions in pixels
  const frameWidthPx = isMobile ? screenWidth * 0.005 : (frameWidthCm / 450) * screenWidth;
  const matWidthPx = isMobile ? screenWidth * 0.003 : (matWidthCm / 450) * screenWidth;
  
  // Calculate bottom position based on artwork height
  // Larger artworks should sit lower (smaller bottom %)
  const minBottom = 36;
  const maxBottom = 50;
  const minHeightPx = screenWidth * 0.1;
  const maxHeightPx = screenWidth * 0.4;
  
  let bottomPercent: number;
  if (isMobile) {
    bottomPercent = 20;
  } else {
    // Linear interpolation: as artwork gets taller, bottom % decreases
    const heightRatio = Math.min(Math.max((artworkHeightPx - minHeightPx) / (maxHeightPx - minHeightPx), 0), 1);
    bottomPercent = maxBottom - (heightRatio * (maxBottom - minBottom));
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
        aria-label="Close gallery view"
      >
        <X size={24} />
      </button>

      {/* Gallery wall container - represents the full wall view */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        style={{
          left: "0px",
          top: "0px",
          background: "linear-gradient(rgb(245, 245, 245) 0px, rgb(234, 234, 234) 85%, silver 0px, silver) 0% 0% / 100% 100%",
          overflow: "hidden",
        }}
      >
        {/* Artwork container positioned on the wall */}
        {/* Position it centered horizontally and at eye level */}
        <div 
          className="absolute"
          style={{
            // Center the artwork horizontally
            left: "50%",
            transform: "translateX(-50%)",
            // Position scales based on artwork size - larger artworks sit lower
            bottom: `${bottomPercent}%`,
          }}
        >
          {/* Frame - always shown on wall */}
          <div
            className="frame"
            style={{
              display: "inline-block",
              background: artwork.viewOnWall === 'framed' ? "linear-gradient(135deg, #8B7355 0%, #6B5345 50%, #4A3728 100%)" : "transparent",
              boxShadow: `
                inset 0 0 0 1px rgba(255,255,255,0.1),
                0 10px 10px rgba(0,0,0,0.1),
                0 5px 10px rgba(0,0,0,0.075)
              `,
              padding: artwork.viewOnWall === 'framed' ?  `${frameWidthPx}px` : "0px",
            }}
          >
            {/* Frame inner edge with black mat/border */}
            <div
              className="frame__inner"
              style={{
                boxShadow: "inset 0 0 5px rgba(0,0,0,0.3)",
                backgroundColor: artwork.viewOnWall === 'framed' ? "#000" : "transparent",
                padding: artwork.viewOnWall === 'framed' ? `${matWidthPx}px` : "0px",
              }}
            >
              {/* The artwork image */}
              <img
                src={`/artworks${artwork.image}`}
                alt={artwork.title}
                style={{
                  width: `${artworkWidthPx}px`,
                  height: "auto",
                  display: "block",
                  maxWidth: '90vw'
                }}
              />
            </div>
          </div>
        </div>

        {/* Artwork info overlay */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-sm font-bold">{artwork.title}</p>
          <p className="text-xs">
            {artwork.width} × {artwork.height} cm
          </p>
        </div>
      </div>
    </div>
  );
};

export default GalleryWallView;
