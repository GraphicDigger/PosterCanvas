// Получаем все зависимости из package.json
export const getDependencies = (codes) => {

  const packageJson = codes.find((code) =>
    code.name === 'package.json' || code.name.includes('package-json'),
  );

  if (packageJson) {
    try
    {
      const parsed = JSON.parse(packageJson.content);
      return parsed.dependencies || {};
    } catch (error) {
      console.error('Error parsing package.json:', error);
      return {};
    }
  }

  return {};
};
