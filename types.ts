export interface MenuItem {
  id: number;
  orig: string;
  trans: string;
  price: string;
}

export interface MerchantConfig {
  storeName: string;
  wifiSsid: string;
  wifiPass: string;
  alipayMerchantId?: string; // Simplified from raw code
  wechatMerchantId?: string; // Simplified from raw code
  currencySymbol: string;
  albumImages: string[]; // List of image URLs for the merchant album
  password: string; // Merchant login PIN/Password
}

export interface QuickCard {
  label: string;
  subLabel: string;
  icon: string;
}

export type TargetLanguage = 'en' | 'fr' | 'de' | 'ja' | 'ko';