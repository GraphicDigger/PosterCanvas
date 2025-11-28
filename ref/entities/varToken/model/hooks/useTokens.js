import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { selectAllTokens } from '../store/selectors';
import { selectIsColorToken } from '../store/selectors';
import { TOKEN_TYPES } from '../constants/tokenTypes';
import { selectTokensByType, selectTokenById, selectSelectedToken } from '../store/selectors';


export const useAllTokens = () => {
  const allTokens = useSelector(selectAllTokens);
  const selectedToken = useSelector(selectSelectedToken);
  return { allTokens, selectedToken };
};

export const useTokenById = (id) => {
  const token = useSelector(state => selectTokenById(state, id));
  const tokenById = useSelector(selectTokenByIdFn);
  return { token, tokenById };
};

export const useColorTokens = (color) => {
  const colorTokens = useSelector(state => selectTokensByType(state, TOKEN_TYPES.COLOR));
  const isColorToken = useSelector(state => selectIsColorToken(state, color));

  return {
    colorTokens,
    isColorToken,
  };
};

const selectTokenByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectTokenById(state, id),
);
