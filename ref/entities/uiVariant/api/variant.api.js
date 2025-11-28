import { variants } from './variants.data';

export const variantApi = {
  getVariants: async () => {
    try {
      const variantsArray = Object.values(variants);
      return variantsArray;
    } catch (error) {
      throw error;
    }
  },
};
