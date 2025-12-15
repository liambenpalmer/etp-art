import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from "@/data/books";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/UI/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/UI/carousel";
import { Badge } from "@/components/UI/badge";

interface BookDetailProps {
  book: Book;
}

const BookDetail: React.FC<BookDetailProps> = ({ book }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="max-w-6xl mx-auto">
      <Link
        to="/books"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to books
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex justify-center items-center">
          {book.images && book.images.length > 0 && (
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                {book.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                      <img
                        src={`/artworks/${image}`}
                        alt={`${book.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                        onLoad={() => setImageLoaded(true)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {book.images.length > 1 && (
                <>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </>
              )}
            </Carousel>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-xl text-muted-foreground">{book.year}</p>
          </div>

          {book.authors && book.authors.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {book.authors.length > 1 ? 'Authors' : 'Author'}
              </p>
              <p className="text-lg">{book.authors.join(', ')}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-muted-foreground mb-1">Description</p>
            <p className="leading-relaxed">{book.description}</p>
          </div>

          <div className="space-y-4">
            {book.publisher && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Publisher</p>
                  <p>{book.publisher}</p>
                </div>
                {book.pages && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pages</p>
                    <p>{book.pages}</p>
                  </div>
                )}
              </div>
            )}

            {book.isbn && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">ISBN</p>
                <p>{book.isbn}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                {book.price > 0 ? (
                  <p className="text-lg font-medium">
                    {book.price.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' })}
                  </p>
                ) : (
                  <p className="text-muted-foreground">Price TBA</p>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Availability</p>
                {book.available ? (
                  <Badge variant="default">Available</Badge>
                ) : (
                  <Badge variant="secondary">Out of Stock</Badge>
                )}
              </div>
            </div>
          </div>

          {book.available && (
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              {book.buyLink ? (
                <Button asChild variant="default" className="inline-flex w-auto h-10">
                  <a href={book.buyLink} target="_blank" rel="noopener noreferrer">
                    <span>Buy Now</span>
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </Button>
              ) : (
                <Button asChild variant="default" className="inline-flex w-auto h-10">
                  <Link to={`/contact?subject=${encodeURIComponent(`Enquiry about "${book.title}"`)}`}>
                    <span>Enquire</span>
                    <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
