import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { audioItems } from "@/data/audio";

const Audio = () => {
  return (
    <Layout>
      <div className="container mx-auto pb-8">
        <h1 className="text-2xl font-bold mb-8">Audio ({audioItems.length})</h1>
        
        {audioItems.length === 0 ? (
          <p className="text-muted-foreground">
            Audio content coming soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {audioItems.map((audio) => (
              <Link
                key={audio.id}
                to={`/audio/${audio.id}`}
                className="group block"
              >
                <div className="aspect-square bg-muted overflow-hidden mb-3">
                  <img
                    src={`/audio/thumbnails/${audio.image}`}
                    alt={audio.title}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:opacity-95"
                  />
                </div>
                <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {audio.title}
                </h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Audio;
