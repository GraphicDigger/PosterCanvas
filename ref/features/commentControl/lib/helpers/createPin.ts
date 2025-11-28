import { PinModel } from '@/entities/comment';


export const createScreenPin = (
  x: number,
  y: number,
): PinModel => {
  return {
    targetId: 'viewport',
    relativeToParent: false,
    x,
    y,
  };
};

export const createElementPin = (
  targetId: string,
  relativeToParent: boolean = true,
  x: number,
  y: number,
): PinModel => {
  return {
    targetId,
    relativeToParent,
    x,
    y,
  };
};
