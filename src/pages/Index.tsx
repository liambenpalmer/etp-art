import React, { useMemo } from 'react';
import Layout from '@/components/Layout/Layout';
import FeaturedArtwork from '@/components/UI/FeaturedArtwork';
import CollectionPromo from '@/components/UI/CollectionPromo';
import ArtworkCard from '@/components/Works/ArtworkCard';
import { getFeaturedArtwork, artworks } from '@/data/artworks';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/UI/button';

const Index = () => {
  const featuredArtwork = getFeaturedArtwork();

  // Get 4 random featured artworks
  const randomArtworks = useMemo(() => {
    const featuredArtworks = artworks.filter(p => p.featured);
    const shuffled = [...featuredArtworks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, []);

  return (
    <Layout>
      <FeaturedArtwork artwork={featuredArtwork} />
       {/* Random Artworks Section */}
      <div className="container mx-auto px-4 mt-24 mb-16">
        <h2 className="text-4xl font-medium mb-8 text-center text-black">Featured Works</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomArtworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} fourColCard={true} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="outline"
            className="inline-flex w-auto h-10"
          >
            <Link to="/works">
              <span>View all works</span>
              <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      

      {/* Collection Promos - Grid */}
      <div className="container mx-auto px-4 mt-16">
        <h2 className='text-4xl font-medium mb-8 text-center text-black'>Explore Collections</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <CollectionPromo
            title="Moon series"
            collectionSlug="moon-series"
            textColor="text-white"
            linkText="View artworks"
            backgroundImage='/moon-series.jpg'
          />
          <CollectionPromo
            title="Alphabet"
            collectionSlug="alphabet"
            textColor="text-black"
            linkText="View artworks"
            backgroundImage='/alphabet.jpg'
          />
        </div>
      </div>
    </Layout>
  );
};

export default Index;