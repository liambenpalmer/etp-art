import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import BookDetail from "@/components/Books/BookDetail";
import { getBookById } from "@/data/books";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time for transition effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    // If book doesn't exist, redirect to books page
    if (id && !getBookById(id)) {
      navigate("/books");
    }
    
    return () => clearTimeout(timer);
  }, [id, navigate]);

  const book = id ? getBookById(id) : undefined;

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto pb-8">
          <div className="animate-pulse h-4 bg-muted rounded w-32 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-muted rounded"></div>
            <div className="space-y-8">
              <div>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/3"></div>
              </div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <div key={j}>
                        <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return null; // Redirecting to books page
  }

  return (
    <Layout>
      <div className="container mx-auto pb-8">
        <BookDetail book={book} />
      </div>
    </Layout>
  );
};

export default BookDetailPage;
