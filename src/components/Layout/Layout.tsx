
import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 md:px-6 lg:px-8 pt-24 pb-12 animate-fade-in">
        {children}
      </main>
      <footer className="py-6 px-4 md:px-6 lg:px-8 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Ellie Tsatsou-Palmer. All rights reserved.
            </p>
            <a 
              href="https://www.instagram.com/ellietsatsoustudio" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram: @ellietsatsoustudio
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
