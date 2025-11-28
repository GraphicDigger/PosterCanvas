import { useDataVariableControl } from '../model';
import { DataVariableListItemWithSettings } from '@/entities/varVariableData';


export const DataVariableControl = () => {

  const { variables } = useDataVariableControl();

  // console.log('[DataVariableControl] variables', variables);

  return (
    variables.map((variable) => (
      <DataVariableListItemWithSettings
        key={variable.id}
        variable={variable}
      />
    ))
  );
};
