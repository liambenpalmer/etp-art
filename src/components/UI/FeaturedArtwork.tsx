
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Artwork } from "@/data/artworks";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/UI/button";

interface FeaturedArtworkProps {
  artwork: Artwork;
}

const FeaturedArtwork: React.FC<FeaturedArtworkProps> = ({ artwork }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-muted py-8 md:py-12 mt-[-2rem]">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center md:gap-12 px-4">
          <div className="image-container order-2 md:order-1 flex justify-start items-center ml-[-2rem] lg:justify-end">
        {!imageLoaded && <div className="placeholder aspect-[3/4]" />}
        <img
          src={`/artworks${artwork.image}`}
          alt={artwork.title}
          className={`w-auto h-auto max-w-full transition-all duration-700 w-auto max-w-full h-auto  max-h-[60vh] lg:max-h-[80vh] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      <div className="space-y-2 order-2 lg:order-2 md:space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{artwork.title}</h1>
          <p>{artwork.year}, {artwork.medium}</p>
        </div>
        
        <p className="max-w-md">
          From <a href={`/works/collection/${artwork.collection.replace(' ', '-').toLowerCase()}`} className="underline">{artwork.collection} collection</a>.
        </p>
        
        <div className="pt-4">
          <Button
            asChild
            variant="outline"
            className="inline-flex w-auto h-10"
          >
            <Link to={`/work/${artwork.id}`}>
              <span>View artwork</span>
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtwork;
