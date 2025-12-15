import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { books } from "@/data/books";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";

const Books = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Books</h1>
          <p className="text-muted-foreground">
            Explore published books and catalogues featuring artworks and collections.
          </p>
        </div>

        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Books and catalogues coming soon...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Link key={book.id} to={`/book/${book.id}`}>
                <Card className="overflow-hidden cursor-pointer h-full">
                  {book.images && book.images.length > 0 && (
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={`/artworks/${book.images[0]}`}
                        alt={book.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-xl">{book.title}</CardTitle>
                    {book.authors && book.authors.length > 0 && (
                      <CardDescription>by {book.authors.join(', ')}</CardDescription>
                    )}
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Books;
