
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import DownloadStrip from '@/components/layout/DownloadStrip';

const LandingPage: React.FC = () => {
  return (
    <>
      <DownloadStrip />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-brand-100 dark:bg-brand-900/30 px-3 py-1 text-sm">
                  Focus. Earn. Grow.
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Boost Your Productivity with Blockchain Rewards
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Set your work session goals, stake crypto, and earn rewards for staying focused. 
                  FocusChain uses blockchain technology to help you build better productivity habits.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto relative">
                <div className="relative glass rounded-xl overflow-hidden w-full aspect-video">
                  <div className="animate-pulse-slow rounded-xl bg-brand-200/50 dark:bg-brand-800/20 absolute inset-0"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-brand-600 dark:text-brand-300 font-medium">App Preview</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-lg bg-brand-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-brand-100 dark:bg-brand-900/30 px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  How FocusChain Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our innovative platform helps you stay focused and productive using blockchain rewards.
                </p>
              </div>
            </div>
            <div className="mx-auto grid gap-8 md:gap-12 lg:grid-cols-3 mt-12">
              <div className="glass rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 -mt-8 -mr-8 bg-brand-100 dark:bg-brand-900/30 rounded-full"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Set Up Your Session</h3>
                  <p className="text-muted-foreground mt-2">
                    Choose your focus apps, set a timer, and stake an amount of crypto as your commitment.
                  </p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 -mt-8 -mr-8 bg-brand-100 dark:bg-brand-900/30 rounded-full"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Stay Focused</h3>
                  <p className="text-muted-foreground mt-2">
                    Our app tracks which applications you're using to ensure you're staying on task.
                  </p>
                </div>
              </div>
              <div className="glass rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-20 w-20 -mt-8 -mr-8 bg-brand-100 dark:bg-brand-900/30 rounded-full"></div>
                <div className="relative">
                  <div className="h-12 w-12 rounded-lg bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-600 dark:text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Earn Rewards</h3>
                  <p className="text-muted-foreground mt-2">
                    Successfully complete your session to retain your stake or choose to donate it to charity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="glass rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/20 to-brand-600/20 dark:from-brand-400/10 dark:to-brand-600/10"></div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Boost Your Productivity?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Join thousands of users who have improved their focus and productivity with FocusChain.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/signup">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Start for Free
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default LandingPage;
