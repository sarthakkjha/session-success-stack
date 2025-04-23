import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Zap, Focus, Target, Gift } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Ambient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_-20%,rgba(120,119,198,0.1),transparent)]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center rounded-full bg-brand-500/10 px-4 py-1.5 text-sm font-medium text-brand-500">
              <img src="/assets/logo.png" alt="Coincentrate Logo" className="h-6 w-auto mr-2" />
              Your Focus is Worth More
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/80">
              Turn Your Focus Into{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">
                Rewards
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Stake crypto, maintain focus, earn rewards. A revolutionary approach to productivity 
              that makes every focused minute count.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group bg-brand-500 hover:bg-brand-600">
                  Start Earning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-brand-500/20 hover:border-brand-500/40">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* App Preview */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative glass rounded-3xl overflow-hidden shadow-2xl bg-background/50 backdrop-blur-sm p-8 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-400/5 to-brand-600/5" />
              <div className="relative">
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold">Current Session</h3>
                      <p className="text-muted-foreground">Stay focused to earn rewards</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-brand-500">$30.00</div>
                      <div className="text-sm text-muted-foreground">Staked Amount</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="h-4 rounded-full bg-gradient-to-r from-brand-500 to-brand-600 w-[85%] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-shimmer" />
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="space-y-1">
                        <div className="text-xl font-medium">51:00</div>
                        <div className="text-muted-foreground">Minutes Remaining</div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-xl font-medium">85%</div>
                        <div className="text-muted-foreground">Session Complete</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="text-muted-foreground text-sm">Potential Earnings</div>
                      <div className="text-xl font-semibold text-green-500">+$7.50</div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-muted-foreground text-sm">Focus Score</div>
                      <div className="text-xl font-semibold text-brand-500">98/100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -left-8 h-40 w-40 rounded-3xl bg-brand-500/10 backdrop-blur-sm flex items-center justify-center rotate-12">
              <Target className="h-12 w-12 text-brand-500" />
            </div>
            <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-3xl bg-brand-500/10 backdrop-blur-sm flex items-center justify-center -rotate-12">
              <Gift className="h-12 w-12 text-brand-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass rounded-2xl p-8 relative group hover:shadow-lg transition-all duration-300 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent rounded-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
              <div className="relative space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold">Time Tracking</h3>
                <p className="text-muted-foreground">
                  Set your focus duration and let our smart tracking keep you accountable.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 relative group hover:shadow-lg transition-all duration-300 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent rounded-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
              <div className="relative space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold">Stake & Earn</h3>
                <p className="text-muted-foreground">
                  Put your crypto at stake and earn rewards for maintaining focus.
                </p>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 relative group hover:shadow-lg transition-all duration-300 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent rounded-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" />
              <div className="relative space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-6 w-6 text-brand-500" />
                </div>
                <h3 className="text-xl font-bold">Smart Focus</h3>
                <p className="text-muted-foreground">
                  AI-powered tracking ensures you stay on your chosen productive apps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container px-4 md:px-6">
          <div className="glass rounded-3xl p-12 relative overflow-hidden border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-brand-600/5" />
            <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Maximize Your{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">
                  Productivity?
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of focused individuals who've earned rewards while boosting their productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto group bg-brand-500 hover:bg-brand-600">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
