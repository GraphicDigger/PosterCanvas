import React, { useState } from 'react';
import { ThemeProvider, GlobalTokenProvider, useGlobalToken } from '../../../app/providers';
import { Table } from './Table';
import { TableHeader } from './TableHeader';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableRow } from './TableRow';
import { PlusIcon } from '../../../shared/assets/icons';
import { TableText } from './TableText';
import { Preview } from '../Preview';
import { VariableColorIcon } from '../../../shared/assets/icons';


const ThemeWrapper = (story) => (
  <ThemeProvider>
    {story()}
  </ThemeProvider>
);

export default {
  title: 'uiKit/Table',
  component: Table,
  decorators: [ThemeWrapper],
};

export const TableDefault = () => {
  return (
    <div style={{ width: '500px', height: '100%' }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
                            Header 1
            </TableHead>
            <TableHead>
                            Header 2
            </TableHead>
            <TableHead>
                            Header 3
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
                            Body 1
            </TableCell>
            <TableCell>
                            Body 2
            </TableCell>
            <TableCell>
                            Body 3
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>
                            Body 1
            </TableCell>
            <TableCell>
                            Body 1
            </TableCell>
            <TableCell>
                            Body 3
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export const TokenTable = () => {
  return (
    <GlobalTokenProvider>
      <TokenColor />
    </GlobalTokenProvider>
  );
};

const TokenColor = () => {

  const { variables } = useGlobalToken();
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedColorName, setSelectedColorName] = useState('#ffffff');

  const handleColorSelect = (color, nameColor) => {
    setSelectedColor(color);
    setSelectedColorName(nameColor);
  };

  return (
    <div style={{ width: '500px', height: '100%' }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
                            Name
            </TableHead>
            <TableHead>
                            Value
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <VariableColorIcon /> White
            </TableCell>
            <TableCell>
              <Preview backgroundColor='#ffffff' size='small' /><TableText editable text='#FFFFFF' />
            </TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow>
            <TableCell>
              <VariableColorIcon /> Black
            </TableCell>
            <TableCell>
              <Preview backgroundColor='#000' size='small' /><TableText editable text='#000000' />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

