import { v4 as uuidv4 } from 'uuid';
import { useToken } from '../../../../entities/varToken';
import { useTokenValueMutation } from '../../../../entities/varTokenValue';
import { TOKEN_TYPES } from '../../../../entities/varToken';

export const useTokens = () => {

  const { addToken } = useToken();
  const { addTokenValue } = useTokenValueMutation();

  const handleAddToken = (modes, token) => {
    const tokenId = uuidv4();
    let config ={};
    switch (token.type) {
    case TOKEN_TYPES.COLOR:
      config.value = '#FFFFFF';
      config.name = 'Color';
      break;
    case TOKEN_TYPES.NUMBER:
      config.value = '0';
      config.name = 'Number';
      break;
    case TOKEN_TYPES.STRING:
      config.value = 'String value';
      config.name = 'String';
      break;
    case TOKEN_TYPES.BOOLEAN:
      config.value = 'False';
      config.name = 'Boolean';
      break;
    default:
      config = null;
    }
    const newToken = {
      ...token,
      id: tokenId,
      name: config.name,
    };
    addToken(newToken);
    modes.forEach(mode => {
      addTokenValue({
        tokenId,
        variableModeId: mode.id,
        value: mode.isDefault && config.value,
      });
    });
  };

  return {
    addToken: handleAddToken,
  };
};
