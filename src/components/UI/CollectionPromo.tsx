import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./button";

interface CollectionPromoProps {
  title: string;
  description?: string;
  collectionSlug: string;
  linkText?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
}

const CollectionPromo: React.FC<CollectionPromoProps> = ({
  title,
  description,
  collectionSlug,
  linkText = "Explore Collection",
  backgroundColor,
  backgroundImage,
  textColor = "text-black",
}) => {
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {
        backgroundColor: backgroundColor || "#f5f5f5",
      };

  return (
    <div
      className="min-h-[400px] relative  w-full max-w-full mx-auto"
      
    >
      <div className="container mx-auto px-4 min-h-[400px]  relative" style={backgroundStyle}>
        <div className={`absolute bottom-0 right-0 p-6 md:p-8`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${textColor === 'text-white' ? 'text-white' : 'text-black'}`}>
            {title}
          </h2>
          <Button
            asChild
            variant="outline"
            className={`inline-flex w-auto h-10 ${textColor === 'text-white' ? 'text-white' : 'text-black'}`}
          >
          <Link
            to={`/works/collection/${collectionSlug.toLowerCase()}`}
          >
            <span>{linkText}</span>
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link></Button>
        </div>
      </div>
    </div>
  );
};

export default CollectionPromo;
