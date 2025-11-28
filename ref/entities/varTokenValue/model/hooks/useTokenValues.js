import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import {
  selectAllTokenValues,
  selectSelectedTokenValue,
  selectTokenValuesByIds,
  selectTokenValuesByVariableModeIdAndTokenIds,
  selectTokenValuesByTokenIds,
  selectTokenValueByTokenIdAndVariableModeId,
  selectTokenValueById,
  selectTokenValueByTokenId,
} from '../store';


export const useTokenValues = () => {

  const allTokenValues = useSelector(selectAllTokenValues);
  const selectedTokenValue = useSelector(selectSelectedTokenValue);
  const tokenValuesByVariableModeIdAndTokenIds = useSelector(selectTokenValuesByVariableModeIdAndTokenIdsFn);
  const tokenValuesByTokenIds = useSelector(selectTokenValuesByTokenIdsFn);
  const getTokenValueByTokenIdAndVariableModeId = useSelector(selectTokenValueByTokenIdAndVariableModeIdFn);
  const tokenValueById = useSelector(selectTokenValueByIdFn);
  const tokenValueByTokenId = useSelector(selectTokenValueByTokenIdFn);

  return {
    allTokenValues,
    selectedTokenValue,
    tokenValuesByTokenIds,
    tokenValuesByVariableModeIdAndTokenIds,
    getTokenValueByTokenIdAndVariableModeId,
    tokenValueById,
    tokenValueByTokenId,
  };
};

const selectTokenValuesByVariableModeIdAndTokenIdsFn = createSelector(
  [(state) => state],
  (state) => (variableModeId, tokenIds) => selectTokenValuesByVariableModeIdAndTokenIds(state, variableModeId, tokenIds),
);

const selectTokenValuesByTokenIdsFn = createSelector(
  [(state) => state],
  (state) => (tokenIds) => selectTokenValuesByTokenIds(state, tokenIds),
);

const selectTokenValueByTokenIdAndVariableModeIdFn = createSelector(
  [(state) => state],
  (state) => (tokenId, variableModeId) => selectTokenValueByTokenIdAndVariableModeId(state, tokenId, variableModeId),
);

const selectTokenValueByIdFn = createSelector(
  [(state) => state],
  (state) => (id) => selectTokenValueById(state, id),
);

const selectTokenValueByTokenIdFn = createSelector(
  [(state) => state],
  (state) => (tokenId) => selectTokenValueByTokenId(state, tokenId),
);

const selectDefaultTokenValueFn = createSelector(
  [(state) => state],
  (state) => (tokenId) => selectDefaultTokenValue(state, tokenId),
);

