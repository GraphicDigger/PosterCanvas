import React, { useState } from 'react';
import { ButtonTool } from '../ButtonTool';

import { DropdownPopover } from './DropdownPopover';
import { DropdownTrigger } from './DropdownTrigger';
import { Dropdown } from './Dropdown';
import { MenuLabel } from '../Menu/MenuLabel';
import { MenuItem } from '../Menu/MenuItem';
import { MenuItemCheckbox } from '../Menu/MenuItemCheckbox';
import { MenuItemRadio } from '../Menu/MenuItemRadio';
import { PlusIcon } from '../../assets/icons';


export default {
  title: 'uiKit/Dropdown',
  component: DropdownPopover,
};

export const Default = () => {

  return (
  // placement: https://floating-ui.com/docs/useFloating
    <DropdownPopover placement='bottom-end'>
      <DropdownTrigger>
        <ButtonTool>
          <PlusIcon />
        </ButtonTool>
      </DropdownTrigger>
      <Dropdown>
        <MenuItem onClick={() => { console.log('New'); }}>New</MenuItem>
        <MenuItem onClick={() => { console.log('New Page'); }}>New Page</MenuItem>
        <MenuItem onClick={() => { console.log('Duplicate'); }}>Duplicate</MenuItem>
        <MenuItem onClick={() => { console.log('Subscription'); }}>Subscription</MenuItem>
        <MenuItem onClick={() => { console.log('Publish'); }}>Publish</MenuItem>
        <MenuItem onClick={() => { console.log('Invite Collaborators'); }}>Invite Collaborators</MenuItem>
        <MenuItem onClick={() => { console.log('Copy link'); }}>Copy link</MenuItem>
        <MenuItem onClick={() => { console.log('Version History'); }}>Version History</MenuItem>
        <MenuItem onClick={() => { console.log('Import from Figma'); }}>Import from Figma</MenuItem>
        <MenuItem onClick={() => { console.log('Upload Image'); }}>Upload Image</MenuItem>
        <MenuItem onClick={() => { console.log('Upload Video'); }}>Upload Video</MenuItem>
      </Dropdown>
    </DropdownPopover>
  );
};


export const RadioWithLabel = () => {
  const [isRadio, setIsRadio] = useState('all');
  const [isProject, setIsProject] = useState('all-project');
  const [isWorkspace, setIsWorkspace] = useState('all-workspace');

  return (
    <DropdownPopover closeOnSelect={false}>
      <DropdownTrigger>
        <ButtonTool focus />
      </DropdownTrigger>
      <Dropdown preventClose>
        <MenuItemRadio checked={isRadio === 'all'} onChange={() => setIsRadio('all')} name={'options'}>All</MenuItemRadio>
        <MenuItemRadio checked={isRadio === 'project'} onChange={() => setIsRadio('project')} name={'options'}>Project</MenuItemRadio>
        <MenuItemRadio checked={isRadio === 'workspace'} onChange={() => setIsRadio('workspace')} name={'options'}>Workspace</MenuItemRadio>
        {isRadio !== 'all' && (
          <>
            {isRadio === 'project' && (
              <>
                <MenuLabel>Project</MenuLabel>
                <MenuItemRadio checked={isProject === 'all-project'} onChange={() => { setIsProject('all-project'); console.log('All'); }} name={'options'}>All</MenuItemRadio>
                <MenuItemRadio checked={isProject === 'comments'} onChange={() => { setIsProject('comments'); console.log('Comments'); }} name={'options'}>Comments</MenuItemRadio>
                <MenuItemRadio checked={isProject === 'text'} onChange={() => { setIsProject('text'); console.log('Text'); }} name={'options'}>Text</MenuItemRadio>
                <MenuItemRadio checked={isProject === 'image'} onChange={() => { setIsProject('image'); console.log('Image'); }} name={'options'}>Image</MenuItemRadio>
                <MenuItemRadio checked={isProject === 'component'} onChange={() => { setIsProject('component'); console.log('Component'); }} name={'options'}>Component</MenuItemRadio>
                <MenuItemRadio checked={isProject === 'instance'} onChange={() => { setIsProject('instance'); console.log('Instance'); }} name={'options'}>Instance</MenuItemRadio>
              </>
            )}
            {isRadio === 'workspace' && (
              <>
                <MenuLabel>Workspace</MenuLabel>
                <MenuItemRadio checked={isWorkspace === 'all-workspace'} onChange={() => { setIsWorkspace('all-workspace'); console.log('All'); }} name={'options'}>All</MenuItemRadio>
                <MenuItemRadio checked={isWorkspace === 'tasks'} onChange={() => { setIsWorkspace('tasks'); console.log('Tasks'); }} name={'options'}>Tasks</MenuItemRadio>
                <MenuItemRadio checked={isWorkspace === 'documents'} onChange={() => { setIsWorkspace('documents'); console.log('Documents'); }} name={'options'}>Documents</MenuItemRadio>
                <MenuItemRadio checked={isWorkspace === 'chat'} onChange={() => { setIsWorkspace('chat'); console.log('Chat'); }} name={'options'}>Chat</MenuItemRadio>
              </>
            )}
          </>
        )}
      </Dropdown>
    </DropdownPopover>
  );
};

export const Radio = () => {
  const [isRadio, setIsRadio] = useState('tasks');
  return (
    <DropdownPopover closeOnSelect={false} placement='bottom-end'>
      <DropdownTrigger>
        <ButtonTool focus />
      </DropdownTrigger>
      <Dropdown>
        <MenuItemRadio checked={isRadio === 'free'} onChange={() => { setIsRadio('free'); console.log('Free'); }} name={'options'}>Free</MenuItemRadio>
        <MenuItemRadio checked={isRadio === 'pro'} onChange={() => { setIsRadio('pro'); console.log('Pro'); }} name={'options'}>Flex</MenuItemRadio>
        <MenuItemRadio checked={isRadio === 'grid'} onChange={() => { setIsRadio('grid'); console.log('Grid'); }} name={'options'}>Grid</MenuItemRadio>
        <MenuItemRadio checked={isRadio === 'block'} onChange={() => { setIsRadio('block'); console.log('Block'); }} name={'options'}>Block</MenuItemRadio>
      </Dropdown>
    </DropdownPopover>
  );
};

export const Checkbox = () => {
  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(true);

  return (
    <DropdownPopover closeOnSelect={false}>
      <DropdownTrigger>
        <ButtonTool focus />
      </DropdownTrigger>
      <Dropdown>
        <MenuItemCheckbox
          checked={isCheckedOne}
          onChange={() => setIsCheckedOne(!isCheckedOne)}
        >
                    Enable Notifications
        </MenuItemCheckbox>
        <MenuItemCheckbox
          checked={isCheckedTwo}
          onChange={() => setIsCheckedTwo(!isCheckedTwo)}
        >
                    Dark Mode
        </MenuItemCheckbox>
      </Dropdown>
    </DropdownPopover>
  );
};

export const WithIcon = () => {
  const [isCheckedOne, setIsCheckedOne] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(true);

  return (
    <DropdownPopover>
      <DropdownTrigger>
        <ButtonTool focus />
      </DropdownTrigger>
      <Dropdown>
        <MenuItem onClick={() => { console.log('Option with icon'); }}>
          <PlusIcon />
                    Option with icon
        </MenuItem>
        <MenuItem onClick={() => { console.log('Option with icon and arrow'); }}>
          <PlusIcon />
                    Option with arrow
        </MenuItem>
      </Dropdown>
    </DropdownPopover>
  );
};

