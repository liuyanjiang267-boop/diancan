
import { MenuItem, TargetLanguage } from "../types";
import { MOCK_MENU_ITEMS } from "../constants";

/**
 * 扫描菜单图片服务 - 演示模式
 * 由于网络环境限制，此处不再调用远程 API，而是模拟 AI 识别流程并返回演示数据。
 */
export const scanMenuImage = async (
  imageBase64: string, 
  targetLang: TargetLanguage,
  currencySymbol: string,
  proxyUrl?: string
): Promise<MenuItem[]> => {
  console.log(`[Demo Mode] Received image of length ${imageBase64.length}. Target language: ${targetLang}`);

  // 1. 模拟网络延迟和 AI 处理时间（2秒），确保前端“扫描动画”正常展示
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 2. 根据目标语言调整演示数据的描述（可选，这里保持原有演示数据以符合用户要求）
  // 返回演示数据，并为每一项生成新的 ID 以防冲突
  return MOCK_MENU_ITEMS.map((item, idx) => ({
    id: Date.now() + idx,
    orig: item.orig,
    trans: item.trans,
    price: item.price,
    category: item.category
  }));
};
