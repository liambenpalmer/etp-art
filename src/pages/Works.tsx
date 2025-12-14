
import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import ArtworkCard from "@/components/Works/ArtworkCard";
import { artworks, getArtworksByCollection } from "@/data/artworks";
import SubNav from "@/components/Layout/SubNav";

const Works = () => {
  const location = useLocation();
  const { collection } = useParams<{ collection?: string }>();
  const [displayedArtworks, setDisplayedArtworks] = useState(artworks);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedYear, setSelectedYear] = useState("all");
  const [showPrices, setShowPrices] = useState(false);
  const artworksPerPage = 18;

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time for transition effect
    const timer = setTimeout(() => {
      if (location.pathname.includes("/collection/") && collection) {
        setCurrentPage(1);
        const collectionArtworks = getArtworksByCollection(collection);
        console.log(collectionArtworks);
        if (selectedYear === "all") {
          setDisplayedArtworks(collectionArtworks);
        } else {
          setDisplayedArtworks(collectionArtworks.filter(artwork => artwork.year === +selectedYear));
        }
      } else {
        setCurrentPage(1);
        const filteredArtworks = selectedYear === "all" ? artworks : artworks.filter(artwork => artwork.year === +selectedYear);
        setDisplayedArtworks(filteredArtworks);
      }
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname, collection, selectedYear]);

  const getTitle = () => {
    if (location.pathname === "/works") {
      return "All Works";
    } else if (collection) {
      return collection.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
    return "Works";
  };

  return (
    <Layout>
      <div className="container mx-auto py-0 md:py-8">
       <div className="block mb-4 md:hidden"><SubNav /></div>
        <div className="block flex-wrap justify-between items-center mb-8 md:flex">
          <h1 className="text-2xl font-bold">{getTitle()} ({displayedArtworks.length})</h1>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <div className="flex items-center">
              <label htmlFor="yearFilter" className="block text-sm font-medium text-black mr-4">
                Filter by Year
              </label>
              <select
                id="yearFilter"
                className="mt-1 border block w-75 pl-3 pr-10 py-2 text-base border-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setIsLoading(true);
                  setTimeout(() => {
                    if (e.target.value === "all") {
                      console.log(collection);
                      console.log(artworks.length);
                      setDisplayedArtworks((collection ? getArtworksByCollection(collection) : artworks))
                    } else {
                      const filteredArtworks = collection ? getArtworksByCollection(collection) : artworks;
                      setDisplayedArtworks(filteredArtworks.filter(artwork => artwork.year === +e.target.value));
                    }
                    setIsLoading(false);
                    setCurrentPage(1);
                  }, 300);
                }}
              >
                <option value="all">All Years</option>
                {[...new Set(artworks.map(artwork => artwork.year))].reverse().map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPrices"
                checked={showPrices}
                onChange={(e) => setShowPrices(e.target.checked)}
                className="mr-2 h-4 w-4 border-black"
              />
              <label htmlFor="showPrices" className="text-sm font-medium text-black cursor-pointer">
                Show prices
              </label>
            </div>
          </div>
        </div>
       
        <div id="works-list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted mb-3 w-100 h-[360px]"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </div>
            ))
          ) : (
            displayedArtworks
              .slice()
              .reverse()
              .slice((currentPage - 1) * artworksPerPage, currentPage * artworksPerPage)
              .map((artwork) => (
                <div key={artwork.id} className="animate-slide-up">
                  <ArtworkCard artwork={artwork} showPrice={showPrices} />
                </div>
              )))}
          </div>
          <div className="flex justify-center items-center mt-8 gap-1">
            {displayedArtworks.length / artworksPerPage > 1 && (() => {
              const totalPages = Math.ceil(displayedArtworks.length / artworksPerPage);
              const pageNumbers = [];
              
              // Previous button
              pageNumbers.push(
                <button
                  key="prev"
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  ←
                </button>
              );

              // First page
              pageNumbers.push(
                <button
                  key={1}
                  onClick={() => {
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`px-4 py-2 border ${currentPage === 1 ? 'bg-muted' : ''}`}
                >
                  1
                </button>
              );

              // Left ellipsis
              if (currentPage > 3) {
                pageNumbers.push(
                  <span key="ellipsis-left" className="px-2">...</span>
                );
              }

              // Previous page number (hidden on small screens)
              if (currentPage > 2) {
                pageNumbers.push(
                  <button
                    key={currentPage - 1}
                    onClick={() => {
                      setCurrentPage(currentPage - 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 border hidden md:block"
                  >
                    {currentPage - 1}
                  </button>
                );
              }

              // Current page (if not first or last)
              if (currentPage !== 1 && currentPage !== totalPages) {
                pageNumbers.push(
                  <button
                    key={currentPage}
                    className="px-4 py-2 border bg-muted"
                  >
                    {currentPage}
                  </button>
                );
              }

              // Next page number (hidden on small screens)
              if (currentPage < totalPages - 1) {
                pageNumbers.push(
                  <button
                    key={currentPage + 1}
                    onClick={() => {
                      setCurrentPage(currentPage + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 border hidden md:block"
                  >
                    {currentPage + 1}
                  </button>
                );
              }

              // Right ellipsis
              if (currentPage < totalPages - 2) {
                pageNumbers.push(
                  <span key="ellipsis-right" className="px-2">...</span>
                );
              }

              // Last page (if more than 1 page)
              if (totalPages > 1) {
                pageNumbers.push(
                  <button
                    key={totalPages}
                    onClick={() => {
                      setCurrentPage(totalPages);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 border ${currentPage === totalPages ? 'bg-muted' : ''}`}
                  >
                    {totalPages}
                  </button>
                );
              }

              // Next button
              pageNumbers.push(
                <button
                  key="next"
                  onClick={() => {
                    if (currentPage < totalPages) {
                      setCurrentPage(currentPage + 1);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-2 border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  →
                </button>
              );

              return pageNumbers;
            })()}
          </div>        
        {!isLoading && displayedArtworks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No artworks found in this collection.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Works;
