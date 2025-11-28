import { useCallback } from 'react';
import { useInstanceMutation } from '@/entities/uiInstance';
import { BooleanValue } from './BooleanValue';
import { NumberValue } from './NumberValue';
import { StringValue } from './StringValue';
import { ColorValue } from './ColorValue';
import { DataValue } from './DataValue';
import { OneOfValue } from './OneOfValue';
import { ImageValue } from './ImageValue';
import { useInstancePropControl } from '../../model';
import { ENTITY_KINDS, VARIABLE_TYPES } from '@/shared/constants';

export const OverridingInstanceProp = (({ prop, instanceId }) => {

  const { updateInstanceProp } = useInstanceMutation();
  const { getCurrentPropValue, getVariablesTypeDataByPropTypeData } = useInstancePropControl();

  const currentPropValue = getCurrentPropValue(prop.id, instanceId);
  const dataModels = getVariablesTypeDataByPropTypeData(prop.id);

  const handleUpdateInstanceProp = useCallback((propId, updates) => {
    updateInstanceProp(instanceId, propId, updates);
  }, [updateInstanceProp]);

  const handleUpdateInstancePropValue = useCallback((value) => {
    const model = dataModels.find(model => model.id === value);
    if (model) {
      updateInstanceProp(instanceId, prop.id, {
        value: {
          id: model.id,
          type: ENTITY_KINDS.DATA_VARIABLE,
        },
      });
    }
  }, [dataModels, updateInstanceProp, instanceId, prop.id]);

  if (prop.values?.length > 0) {
    return <OneOfValue
      propValues={prop.values}
      currentPropValue={currentPropValue}
      onChange={(value, propValueId) => handleUpdateInstanceProp(prop.id, {
        value: {
          id: propValueId,
          type: ENTITY_KINDS.PROP_VALUE,
        },
      })}
    />;
  }

  switch (prop.type) {
  case VARIABLE_TYPES.DATA:
    return <DataValue
      dataModels={dataModels}
      currentModelId={currentPropValue}
      onChange={handleUpdateInstancePropValue}
    />;
  case VARIABLE_TYPES.STRING:
    return <StringValue
      value={currentPropValue}
      onChange={value => handleUpdateInstanceProp(prop.id, { value: value })}
      instanceId={instanceId}
      propId={prop.id}
    />;

  case VARIABLE_TYPES.BOOLEAN:
    return <BooleanValue
      value={currentPropValue}
      onChange={value => handleUpdateInstanceProp(prop.id, { value: value })}
    />;


  case VARIABLE_TYPES.COLOR:
    return <ColorValue
      value={currentPropValue}
      onChange={value => handleUpdateInstanceProp(prop.id, { value: value })}
      instanceId={instanceId}
      propId={prop.id}
    />;

  case VARIABLE_TYPES.IMAGE:
    return <ImageValue
      value={currentPropValue}
      onChange={value => handleUpdateInstanceProp(prop.id, { value: value })}
      instanceId={instanceId}
      propId={prop.id}
    />;

  case VARIABLE_TYPES.DATE:
    return <>Date</>;

  case VARIABLE_TYPES.NUMBER:
    return <>Number</>;

  case VARIABLE_TYPES.VIDEO:
    return <>Video</>;

  case VARIABLE_TYPES.JSON:
    return <>Json</>;

  default:
    return null;
  }
});
