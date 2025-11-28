/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Preview } from '../Preview/Preview';
import PropTypes from 'prop-types';

export const TokenAlias = ({
  color = '#000000',
  children,
  dataValue,
},
) => {

  const style = css`
        display: flex;
        align-items: center;
        height: 28px;
        gap: 8px;
        padding: 0 8px;
        border-radius: 8px;
    `;

  return (
    <div css={style}>
      {color && <Preview backgroundColor={color} size='small' />}
      <p
        data-value={dataValue}>
        {children
          ? children
          : '#000000'}
      </p>
    </div>
  );
};

TokenAlias.propTypes = {
  children: PropTypes.node.isRequired,
};

