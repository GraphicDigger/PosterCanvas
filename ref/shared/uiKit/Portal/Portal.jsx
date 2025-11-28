/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

export const Portal = ({ children, container }) => {
  const [mounted, setMounted] = useState(false);
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    setMounted(true);
    // Используем переданный контейнер или document.body по умолчанию
    setPortalContainer(container || document.body);
    return () => setMounted(false);
  }, [container]);

  // Ждем монтирования на клиенте и наличия контейнера
  if (!mounted || !portalContainer) {return null;}
  // Проверяем наличие document
  if (typeof document === 'undefined') {return null;}

  return createPortal(
    children,
    portalContainer,
  );
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  container: PropTypes.instanceOf(Element),
  className: PropTypes.string,
  style: PropTypes.object,
};
