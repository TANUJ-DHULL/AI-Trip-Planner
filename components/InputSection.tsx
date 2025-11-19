import React from 'react';
import { AdConfig, AspectRatio } from '../types';
import { Wand2, Type, Link as LinkIcon, Layers, Image as ImageIcon } from 'lucide-react';

interface InputSectionProps {
  config: AdConfig;
  onChange: (newConfig: AdConfig) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ASPECT_RATIOS = [
  { value: AspectRatio.SQUARE, label: 'Square (1:1)', icon: '▢', desc: 'Instagram / Feed' },
  { value: AspectRatio.LANDSCAPE_16_9, label: 'Wide (16:9)', icon: '▭', desc: 'YouTube / Header' },
  { value: AspectRatio.LANDSCAPE_4_3, label: 'Standard (4:3)', icon: '▭', desc: 'Blog / Web' },
  { value: AspectRatio.PORTRAIT_9_16, label: 'Story (9:16)', icon: '▯', desc: 'TikTok / Stories' },
  { value: AspectRatio.PORTRAIT_3_4, label: 'Portrait (3:4)', icon: '▯', desc: 'Pinterest' },
];

export const InputSection: React.FC<InputSectionProps> = ({ config, onChange, onGenerate, isLoading }) => {

  const handleChange = (field: keyof AdConfig, value: string) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="font-semibold text-slate-800 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-indigo-600" />
          Ad Configuration
        </h2>
      </div>

      <div className="p-5 space-y-6 flex-1 overflow-y-auto">
        
        {/* Visual Settings */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Product Description
          </label>
          <textarea
            value={config.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe your product and the desired setting (e.g., 'Premium leather sneakers on a city street', 'Organic skincare bottle with botanical elements')"
            className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none h-24 bg-slate-50 hover:bg-white transition-colors"
          />
          <p className="text-xs text-slate-400">The AI will generate the background based on this description.</p>
        </div>

        {/* Aspect Ratio */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Format Size
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => handleChange('aspectRatio', ratio.value)}
                className={`
                  flex items-center gap-3 p-3 rounded-lg border text-left transition-all
                  ${config.aspectRatio === ratio.value 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-slate-50'}
                `}
              >
                <span className="text-xl font-mono">{ratio.icon}</span>
                <div>
                  <div className="text-xs font-semibold">{ratio.label}</div>
                  <div className="text-[10px] opacity-70">{ratio.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Text Overlay Settings */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
           <label className="block text-sm font-medium text-slate-700 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Ad Content
          </label>
          
          <div className="grid grid-cols-1 gap-3">
            <div>
               <label className="text-xs text-slate-500 mb-1 block">Product/Brand Name</label>
              <input
                type="text"
                value={config.productName}
                onChange={(e) => handleChange('productName', e.target.value)}
                placeholder="e.g., Nike Air Max"
                className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-slate-500 mb-1 block">Headline</label>
              <input
                type="text"
                value={config.headline}
                onChange={(e) => handleChange('headline', e.target.value)}
                placeholder="e.g., Summer Sale 50% Off"
                className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                 <label className="text-xs text-slate-500 mb-1 block">CTA Button</label>
                <input
                  type="text"
                  value={config.ctaText}
                  onChange={(e) => handleChange('ctaText', e.target.value)}
                  placeholder="e.g., Shop Now"
                  className="w-full p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              
              <div>
                 <label className="text-xs text-slate-500 mb-1 block">Target URL</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <LinkIcon className="h-3.5 w-3.5 text-slate-400" />
                   </div>
                   <input
                    type="text"
                    value={config.targetUrl || ''}
                    onChange={(e) => handleChange('targetUrl', e.target.value)}
                    placeholder="example.com"
                    className="w-full pl-9 p-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                   />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 border-t border-slate-100 bg-white sticky bottom-0">
        <button
          onClick={onGenerate}
          disabled={isLoading || !config.description}
          className={`
            w-full py-3 px-4 rounded-lg text-white font-medium text-sm
            flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20
            transition-all transform active:scale-[0.98]
            ${isLoading || !config.description 
              ? 'bg-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-indigo-600 hover:bg-indigo-700'}
          `}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Generating Asset...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              Generate Banner Ad
            </>
          )}
        </button>
      </div>
    </div>
  );
};