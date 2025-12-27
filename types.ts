
export interface MenuItem {
  id: number;
  orig: string;
  trans: string;
  price: string;
  image?: string;
  category?: string;
}

export interface MerchantConfig {
  storeName: string;
  wifiSsid: string;
  wifiPass: string;
  alipayMerchantId?: string;
  wechatMerchantId?: string;
  currencySymbol: string;
  albumImages: string[];
  password: string; // Store admin password
  apiProxyUrl?: string; // Optional: Reverse proxy for users in restricted regions
  useBuiltInProxy?: boolean; // Use the developer-provided fallback proxy
}

export interface QuickCard {
  label: string;
  subLabel: string;
  icon: string;
}

export type TargetLanguage = 'en' | 'fr' | 'de' | 'ja' | 'ko';
