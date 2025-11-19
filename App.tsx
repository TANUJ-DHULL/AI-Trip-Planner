import React, { useState, useCallback } from 'react';
import { InputSection } from './components/InputSection';
import { AdPreview } from './components/AdPreview';
import { AdConfig, AspectRatio, GeneratedAd, GenerationState } from './types';
import { generateBannerImage } from './services/geminiService';
import { Layout, Sparkles, AlertCircle } from 'lucide-react';

const DEFAULT_CONFIG: AdConfig = {
  productName: '',
  description: '',
  headline: '',
  ctaText: '',
  aspectRatio: AspectRatio.LANDSCAPE_16_9,
};

export default function App() {
  const [config, setConfig] = useState<AdConfig>(DEFAULT_CONFIG);
  const [generatedAds, setGeneratedAds] = useState<GeneratedAd[]>([]);
  const [genState, setGenState] = useState<GenerationState>({ isLoading: false, error: null });

  const handleGenerate = useCallback(async () => {
    if (!config.description) return;

    setGenState({ isLoading: true, error: null });

    try {
      const imageUrl = await generateBannerImage(config.description, config.aspectRatio);
      
      const newAd: GeneratedAd = {
        id: Date.now().toString(),
        imageUrl,
        config: { ...config }, // Copy current config state
        createdAt: Date.now(),
      };

      setGeneratedAds(prev => [newAd, ...prev]);
    } catch (error: any) {
      setGenState({ isLoading: false, error: error.message || "Something went wrong" });
    } finally {
      setGenState(prev => ({ ...prev, isLoading: false }));
    }
  }, [config]);

  const handleDelete = (id: string) => {
    setGeneratedAds(prev => prev.filter(ad => ad.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">AdGenius</h1>
          </div>
          <a 
            href="https://ai.google.dev" 
            target="_blank" 
            rel="noreferrer"
            className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Powered by Tanuj 
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar: Controls */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="sticky top-24 h-[calc(100vh-8rem)]">
              <InputSection 
                config={config} 
                onChange={setConfig} 
                onGenerate={handleGenerate}
                isLoading={genState.isLoading}
              />
              
              {genState.error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{genState.error}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Content: Gallery */}
          <div className="lg:col-span-8 xl:col-span-9">
            
            {generatedAds.length === 0 ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Layout className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-lg font-medium text-slate-600">No ads generated yet</p>
                <p className="text-sm">Fill out the details on the left to create your first banner.</p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800">Your Gallery</h2>
                  <span className="text-sm text-slate-500">{generatedAds.length} items</span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {generatedAds.map(ad => (
                    <AdPreview 
                      key={ad.id} 
                      imageUrl={ad.imageUrl} 
                      config={ad.config} 
                      onDelete={() => handleDelete(ad.id)}
                    />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </main>
    </div>
  );
}
