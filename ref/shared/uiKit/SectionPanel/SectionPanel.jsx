/** @jsxImportSource @emotion/react */
import React, { Children } from 'react';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';
import { lineColors } from '../../styles';
import { SectionPanelHeader } from './SectionPanelHeader';
import { SectionPanelBody } from './SectionPanelBody';

export const SectionPanel = ({
  children,
  dividerTop = false,
  dividerBottom = false,
}) => {
  const theme = useTheme();

  const hasHeader = Children.toArray(children).some(child => child?.type === SectionPanelHeader);

  const modifiedChildren = React.Children.toArray(children)
    .map(child => {
      if (child?.type === SectionPanelBody) {
        return React.cloneElement(child, { hasHeader });
      }
      return child;
    })
    .filter(Boolean);

  return (
    <StyledWrapper className='section-panel-wrapper'>
      {dividerTop && <Divider top color={theme.sys.color.outline.light1} />}
      {modifiedChildren}
      {dividerBottom && <Divider bottom color={theme.sys.color.outline.light1} />}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

SectionPanel.propTypes = {
  children: PropTypes.node.isRequired,
  dividerTop: PropTypes.bool,
  dividerBottom: PropTypes.bool,
};
