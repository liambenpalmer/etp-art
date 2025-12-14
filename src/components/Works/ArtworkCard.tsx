
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "@/data/artworks";

interface ArtworkCardProps {
  artwork: Artwork;
  fourColCard?: boolean;
  showPrice?: boolean;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, fourColCard = false, showPrice = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link 
      to={`/work/${artwork.id}`}
      className="group block"
    >
      <div className={`image-container mb-2 p-2 bg-muted overflow-hidden ${fourColCard ? 'h-[220px] md:h-[280px]' : 'h-[320px] md:h-[380px]'} flex items-center justify-center`}>
        {!imageLoaded && <div className="placeholder" />}
        <img
          src={`/artworks/thumbnails${artwork.image}`}
          alt={artwork.title}
          className={`max-w-full max-h-full object-contain transition-all duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:opacity-95`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="space-y-1">
        <h3 className="text-black font-bold group-hover:text-primary transition-colors text-xl">
          {artwork.title}
        </h3>
        <p className="text-sm text-black">{artwork.year}</p>
        {showPrice && (
          <p className={`text-sm ${!artwork.notForSale ? 'font-medium' : 'text-muted-foreground'}`}>
            {artwork.notForSale ? (
              "Not for sale"
            ) : artwork.sold ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                Sold
              </span>
            ) : (
              artwork.price.toLocaleString("en-GB", {style:"currency", currency:"GBP"})
            )}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ArtworkCard;
