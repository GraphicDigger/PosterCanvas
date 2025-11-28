import React from 'react';
import { Button } from '../Button';
import {
  Dialog,
  DialogTrigger,
  DialogWindow,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from './index';

export default {
  title: 'uiKit/Dialog',
  component: Dialog,
};

// Базовый пример
export const Default = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogWindow width={320}>
      <DialogHeader>
        <DialogTitle>Default Dialog</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>Default configuration</p>
      </DialogBody>
    </DialogWindow>
  </Dialog>
);

// Без закрытия по Escape
export const NoEscClose = () => (
  <Dialog closeOnEsc={false}>
    <DialogTrigger asChild>
      <Button>Cannot Close with Escape</Button>
    </DialogTrigger>
    <DialogWindow width={320}>
      <DialogHeader>
        <DialogTitle>No Escape Close</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>This dialog cannot be closed with Escape key</p>
      </DialogBody>
    </DialogWindow>
  </Dialog>
);

// Без закрытия по клику на оверлей
export const NoOverlayClick = () => (
  <Dialog closeOnOverlayClick={false}>
    <DialogTrigger asChild>
      <Button>Cannot Close by Overlay Click</Button>
    </DialogTrigger>
    <DialogWindow width={320}>
      <DialogHeader>
        <DialogTitle>No Overlay Click</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>This dialog cannot be closed by clicking overlay</p>
      </DialogBody>
    </DialogWindow>
  </Dialog>
);

// Пример с кастомным триггером
export const CustomTrigger = () => (
  <Dialog>
    <DialogTrigger asChild>
      <span style={{ cursor: 'pointer' }}>
                Click me
      </span>
    </DialogTrigger>
    <DialogWindow width={320}>
      <DialogHeader>
        <DialogTitle>Custom Trigger Dialog</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>Dialog with custom trigger element</p>
      </DialogBody>
    </DialogWindow>
  </Dialog>
);

// Пример без asChild
export const SimpleButton = () => (
  <Dialog>
    <DialogTrigger>
            Open Dialog
    </DialogTrigger>
    <DialogWindow width={320}>
      <DialogHeader>
        <DialogTitle>Simple Button Dialog</DialogTitle>
      </DialogHeader>
      <DialogBody>
        <p>Dialog with default button trigger</p>
      </DialogBody>
    </DialogWindow>
  </Dialog>
);
