import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { exhibitions, getCurrentExhibitions, getPastExhibitions } from "@/data/exhibitions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Badge } from "@/components/UI/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { Calendar, MapPin } from "lucide-react";

const Exhibitions = () => {
  const [filter, setFilter] = useState<'all' | 'current' | 'past'>('all');
  
  const currentExhibitions = getCurrentExhibitions();
  const pastExhibitions = getPastExhibitions();
  
  const getDisplayExhibitions = () => {
    if (filter === 'current') return currentExhibitions;
    if (filter === 'past') return pastExhibitions;
    return exhibitions;
  };
  
  const displayExhibitions = getDisplayExhibitions();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Exhibitions</h1>
          <p className="text-muted-foreground">
            Current and past exhibitions featuring artworks and installations.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={(value) => setFilter(value as 'all' | 'current' | 'past')}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="current">
              Current {currentExhibitions.length > 0 && `(${currentExhibitions.length})`}
            </TabsTrigger>
            <TabsTrigger value="past">
              Past {pastExhibitions.length > 0 && `(${pastExhibitions.length})`}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {displayExhibitions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {filter === 'current' 
                ? 'No current exhibitions at the moment.'
                : filter === 'past'
                ? 'No past exhibitions to display.'
                : 'Exhibitions information coming soon...'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {displayExhibitions.map((exhibition) => (
              <Card key={exhibition.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  {exhibition.image && (
                    <div className="md:w-1/3 aspect-[4/3] md:aspect-auto overflow-hidden">
                      <img
                        src={exhibition.image}
                        alt={exhibition.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <CardTitle className="text-2xl mb-2">{exhibition.title}</CardTitle>
                          <CardDescription className="text-base">
                            {exhibition.venue}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          {exhibition.current && (
                            <Badge variant="default">Current</Badge>
                          )}
                          {exhibition.featured && (
                            <Badge variant="secondary">Featured</Badge>
                          )}
                          <Badge variant="outline" className="capitalize">
                            {exhibition.type}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{exhibition.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{exhibition.location}</span>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Exhibitions;
