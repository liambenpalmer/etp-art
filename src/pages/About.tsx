import React from 'react';
import Layout from '@/components/Layout/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto pb-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 hidden">About</h1>

          <div className="flex flex-col gap-8 md:flex-row items-start">
            <div className="md:w-1/3">
              <img src="/paintings/2024/self-portrait-2024.jpg" alt="Self Portrait 2024" className="" />
            </div>
            <div className="prose prose-lg md:w-2/3">
              <p className="text-2xl text-black mb-6 font-bold">
                Everything as a continuation of something else
              </p>
              <p className="text-black mb-6">
                My work is mostly engaging with iterations of itself and ideas that come through the process of making it. Every
                subsequent painting to be an act of rebirth, reimagining, reincarnation.
              </p>
              <p className="text-black mb-6">
                The principle tenet being that everything is a continuation and nothing exists in isolation.
              </p>
              {/* <p className="text-black mb-6">"To err is human," etc...</p> */}
            </div>
          </div>

          {/* <div className="mt-12">
            <h2 className="text-xl font-medium mb-4">Education</h2>
            <ul className="space-y-4">
              <li>
                <p className="font-medium">Master of Fine Arts</p>
                <p className="text-muted-foreground">Institution Name, 2015-2017</p>
              </li>
              <li>
                <p className="font-medium">Bachelor of Arts</p>
                <p className="text-muted-foreground">Institution Name, 2011-2015</p>
              </li>
            </ul>
          </div>
          
          <div className="mt-12">
            <h2 className="text-xl font-medium mb-4">Exhibitions</h2>
            <ul className="space-y-4">
              <li>
                <p className="font-medium">Solo Exhibition: "Title"</p>
                <p className="text-muted-foreground">Gallery Name, City, 2023</p>
              </li>
              <li>
                <p className="font-medium">Group Exhibition: "Title"</p>
                <p className="text-muted-foreground">Gallery Name, City, 2022</p>
              </li>
              <li>
                <p className="font-medium">Group Exhibition: "Title"</p>
                <p className="text-muted-foreground">Gallery Name, City, 2021</p>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default About;
