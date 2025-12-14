import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Artwork, getArtworksByCollection } from "@/data/artworks";
import { ArrowLeft, ArrowRight, Frame } from "lucide-react";
import GalleryWallView from "./GalleryWallView";
import ArtworkCard from "./ArtworkCard";
import { Button } from "@/components/UI/button";

interface ArtworkDetailProps {
  artwork: Artwork;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artwork }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGalleryViewOpen, setIsGalleryViewOpen] = useState(false);

  // Get 4 random similar artworks from the same collection
  const similarArtworks = useMemo(() => {
    console.log(artwork.collection);
    const collectionArtworks = getArtworksByCollection(artwork.collection)
      .filter((p) => p.id !== artwork.id && p.featured); // Exclude current artwork and only get featured

    // Shuffle and take 4
    const shuffled = [...collectionArtworks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [artwork.id, artwork.collection]);

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/works"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to all works
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="image-container flex justify-center items-center">
          {!imageLoaded && <div className="placeholder aspect-[3/4]" />}
          <img
            src={`/artworks${artwork.image}`}
            alt={artwork.title}
            className={`w-auto max-w-full max-h-[600px] h-auto ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
            <p className="text-xl text-muted-foreground">{artwork.year}</p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Medium</p>
                <p>{artwork.medium}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Collection</p>
                <p>{artwork.collection}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Dimensions</p>
                <p>
                  {artwork.width} × {artwork.height}{artwork.depth ? ` × ${artwork.depth}` : ''} cm
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Frame</p>
                <p>{artwork.framed ? 'Framed' : 'Unframed'}</p>
              </div>
            </div>

            

            {artwork.editionOf && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Edition</p>
                  <p>Edition of {artwork.editionOf}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Availability</p>
                  <p>{artwork.remaining} remaining</p>
                </div>
              </div>
            )}

            
              <div className="grid grid-cols-2 gap-4">
                <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              {artwork.notForSale ? (
                <p>Not for sale</p>
              ) : artwork.sold ? (
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-600 rounded-full"></span>

                  <span className="font-medium">Sold</span>
                </div>
              ) : (
                <p className="text-lg font-medium">
                  {artwork.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                </p>
              )}
            </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Artist's Proof</p>
                  <p>{artwork.Artistsproof}</p>
                </div>
              </div>
            
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-8">
            <Button onClick={() => setIsGalleryViewOpen(true)} variant="outline" className="hidden md:inline-flex w-auto h-10">
              <Frame className="mr-2 h-4 w-4" />
              View on wall
            </Button>

            {!artwork.sold && !artwork.notForSale && (
              <Button asChild variant="default" className="inline-flex w-auto h-10">
                <Link to={`/contact?subject=${encodeURIComponent(`Enquiry about "${artwork.title}"`)}`}>
                  <span>Enquire</span>
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Wall View Modal */}
      <GalleryWallView artwork={artwork} isOpen={isGalleryViewOpen} onClose={() => setIsGalleryViewOpen(false)} />

      {/* Similar Artworks Section */}
      {similarArtworks.length > 0 && (
        <div className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarArtworks.map((similarArtwork) => (
              <ArtworkCard key={similarArtwork.id} artwork={similarArtwork} fourColCard={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetail;
