
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

const DownloadStrip: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-400/10 border-b border-brand-400/20">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-brand-500" />
          <span className="text-sm font-medium">Download our feature for better productivity tracking</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button size="sm" variant="outline" className="h-8">
            Download
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6" 
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadStrip;
