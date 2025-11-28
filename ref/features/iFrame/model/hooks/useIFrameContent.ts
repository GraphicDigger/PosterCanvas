import { useState, useEffect } from 'react';

export const useIFrameContent = () => {
  const [iframeContent, setIframeContent] = useState<string>('');

  useEffect(() => {
    fetch('/sandbox.html')
      .then((res) => res.text())
      .then((html) => setIframeContent(html))
      .catch((err) => console.error('Failed to load sandbox.html', err));
  }, []);

  return { iframeContent };
};