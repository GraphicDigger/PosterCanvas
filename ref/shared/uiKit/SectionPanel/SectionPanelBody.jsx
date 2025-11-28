/** @jsxImportSource @emotion/react */
import React, { memo, useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { isEmptyReactChildren } from '@/shared/lib/utils';

export const SectionPanelBody = memo(({
  children,
  paddingVertical = 5,
  paddingHorizontal = 8,
  hasHeader = false,
}) => {
  const contentRef = useRef(null);
  const [hasContent, setHasContent] = useState(true);

  // Проверяем результат рендеринга и отслеживаем динамические изменения
  useLayoutEffect(() => {
    const checkContent = () => {
      if (contentRef.current) {
        const hasRealContent = contentRef.current.children.length > 0;
        setHasContent(hasRealContent);
      }
    };

    checkContent();

    // Отслеживаем динамические изменения содержимого
    if (contentRef.current) {
      const observer = new MutationObserver(checkContent);
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
      return () => observer.disconnect();
    }
  }, [children]);

  return (
    <StyledSectionPanelBody
      ref={contentRef}
      $paddingVertical={paddingVertical}
      $paddingHorizontal={paddingHorizontal}
      $hasHeader={hasHeader}
      $hasContent={hasContent}
      className='section-panel-body'
    >
      {children}
    </StyledSectionPanelBody>
  );
});

const StyledSectionPanelBody = styled.div`
    display: ${({ $hasContent }) => $hasContent ? 'flex' : 'none'};
    flex-direction: column;
    padding: ${({ $paddingVertical, $paddingHorizontal }) => $paddingVertical && $paddingHorizontal ? `${$paddingVertical * 2}px ${$paddingHorizontal * 2}px` : 0};
    margin-top: ${({ $hasHeader }) => $hasHeader ? '-10px' : 0};
    gap: 4px;
`;

SectionPanelBody.propTypes = {
  children: PropTypes.node,
  paddingVertical: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  hasHeader: PropTypes.bool,
};

