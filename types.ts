export interface AdConfig {
  productName: string;
  description: string;
  headline: string;
  ctaText: string;
  aspectRatio: AspectRatio;
  targetUrl?: string;
}

export enum AspectRatio {
  SQUARE = '1:1',
  LANDSCAPE_4_3 = '4:3',
  LANDSCAPE_16_9 = '16:9',
  PORTRAIT_3_4 = '3:4',
  PORTRAIT_9_16 = '9:16',
}

export interface GeneratedAd {
  id: string;
  imageUrl: string;
  config: AdConfig;
  createdAt: number;
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
}
