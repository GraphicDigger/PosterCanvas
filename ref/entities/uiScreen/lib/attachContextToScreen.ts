export const attachContextToScreen = (screen: any, contextObjectsMap: any) => {
  if (!screen) {return null;}
  return {
    ...screen,
    context: contextObjectsMap[screen.id] || [],
  };
};
