import React from 'react';

interface AllowedAppsProps {
  apps: string[];
}

const AllowedApps: React.FC<AllowedAppsProps> = ({ apps }) => {
  return (
    <div className="space-y-2">
      <h3 className="font-medium">Allowed Apps</h3>
      <div className="flex flex-wrap gap-2">
        {apps.map(app => (
          <div key={app} className="px-3 py-1.5 bg-primary/10 dark:bg-primary/20 rounded-full text-sm font-medium text-primary">
            {app}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllowedApps; 