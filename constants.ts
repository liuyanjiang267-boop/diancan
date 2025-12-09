
import { MenuItem, QuickCard } from "./types";

export const MOCK_MENU_ITEMS: MenuItem[] = [
  { id: 1, orig: "宫保鸡丁", trans: "Kung Pao Chicken", price: "38.00" },
  { id: 2, orig: "松鼠桂鱼", trans: "Squirrel-Shaped Mandarin Fish", price: "128.00" },
  { id: 3, orig: "麻婆豆腐", trans: "Mapo Tofu (Spicy)", price: "22.00" },
  { id: 4, orig: "蒜泥空心菜", trans: "Stir-fried Water Spinach", price: "18.00" },
  { id: 5, orig: "扬州炒饭", trans: "Yangzhou Fried Rice", price: "28.00" },
  { id: 6, orig: "番茄炒蛋", trans: "Scrambled Eggs with Tomato", price: "20.00" },
];

export const QUICK_CARDS: QuickCard[] = [
  { label: "不要香菜", subLabel: "No Cilantro", icon: "🚫" },
  { label: "少放辣", subLabel: "Less Spicy", icon: "🌶️" },
  { label: "打包带走", subLabel: "Take Away", icon: "🛍️" },
  { label: "洗手间在哪?", subLabel: "Restroom?", icon: "🚻" },
  { label: "请给我水", subLabel: "Water Please", icon: "💧" },
  { label: "买单", subLabel: "Check Please", icon: "🧾" },
];

export const ACCESSIBILITY_CARDS: QuickCard[] = [
  { label: "请写字交流", subLabel: "Please Write", icon: "🦻" },
  { label: "请读菜单", subLabel: "Read Menu", icon: "👁️" },
  { label: "请多耐心", subLabel: "Be Patient", icon: "⏳" },
  { label: "需要帮助", subLabel: "Need Help", icon: "🙋" },
];

export const DEFAULT_ALBUM_IMAGES: string[] = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=800"
];

export const TARGET_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];
