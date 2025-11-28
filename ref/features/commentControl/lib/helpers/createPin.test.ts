// ===================================================================
// Unit Tests for createPin - Comment Pin Creation
// Coverage Target: 100%
// Phase 5 - Final Push: Feature Utilities (Pushing to 3,000!)
// ===================================================================

import { describe, it, expect } from 'vitest';
import { createScreenPin, createElementPin } from './createPin';

describe('createScreenPin', () => {
  it('should create a screen pin with correct properties', () => {
    const pin = createScreenPin(100, 200);

    expect(pin).toEqual({
      targetId: 'viewport',
      relativeToParent: false,
      x: 100,
      y: 200,
    });
  });

  it('should create pin with zero coordinates', () => {
    const pin = createScreenPin(0, 0);

    expect(pin.x).toBe(0);
    expect(pin.y).toBe(0);
    expect(pin.targetId).toBe('viewport');
  });

  it('should create pin with negative coordinates', () => {
    const pin = createScreenPin(-50, -100);

    expect(pin.x).toBe(-50);
    expect(pin.y).toBe(-100);
  });

  it('should create pin with large coordinates', () => {
    const pin = createScreenPin(9999, 8888);

    expect(pin.x).toBe(9999);
    expect(pin.y).toBe(8888);
  });

  it('should create pin with decimal coordinates', () => {
    const pin = createScreenPin(12.5, 25.75);

    expect(pin.x).toBe(12.5);
    expect(pin.y).toBe(25.75);
  });

  it('should always set relativeToParent to false', () => {
    const pin1 = createScreenPin(10, 20);
    const pin2 = createScreenPin(30, 40);

    expect(pin1.relativeToParent).toBe(false);
    expect(pin2.relativeToParent).toBe(false);
  });

  it('should always set targetId to viewport', () => {
    const pin1 = createScreenPin(5, 10);
    const pin2 = createScreenPin(15, 20);

    expect(pin1.targetId).toBe('viewport');
    expect(pin2.targetId).toBe('viewport');
  });
});

describe('createElementPin', () => {
  it('should create an element pin with all properties', () => {
    const pin = createElementPin('element-123', true, 50, 75);

    expect(pin).toEqual({
      targetId: 'element-123',
      relativeToParent: true,
      x: 50,
      y: 75,
    });
  });

  it('should default relativeToParent to true when omitted', () => {
    const pin = createElementPin('element-456', undefined, 100, 150);

    expect(pin.relativeToParent).toBe(true);
    expect(pin.x).toBe(100);
    expect(pin.y).toBe(150);
  });

  it('should allow relativeToParent to be false', () => {
    const pin = createElementPin('element-789', false, 25, 35);

    expect(pin.relativeToParent).toBe(false);
  });

  it('should handle different targetId formats', () => {
    const pin1 = createElementPin('simple-id', true, 10, 20);
    const pin2 = createElementPin('element_with_underscores', true, 30, 40);
    const pin3 = createElementPin('element-with-dashes', true, 50, 60);

    expect(pin1.targetId).toBe('simple-id');
    expect(pin2.targetId).toBe('element_with_underscores');
    expect(pin3.targetId).toBe('element-with-dashes');
  });

  it('should handle zero coordinates', () => {
    const pin = createElementPin('element-zero', true, 0, 0);

    expect(pin.x).toBe(0);
    expect(pin.y).toBe(0);
  });

  it('should handle negative coordinates', () => {
    const pin = createElementPin('element-negative', true, -10, -20);

    expect(pin.x).toBe(-10);
    expect(pin.y).toBe(-20);
  });

  it('should handle large coordinates', () => {
    const pin = createElementPin('element-large', true, 5000, 6000);

    expect(pin.x).toBe(5000);
    expect(pin.y).toBe(6000);
  });

  it('should handle decimal coordinates', () => {
    const pin = createElementPin('element-decimal', true, 12.345, 67.89);

    expect(pin.x).toBe(12.345);
    expect(pin.y).toBe(67.89);
  });

  it('should create distinct pins for different elements', () => {
    const pin1 = createElementPin('element-1', true, 10, 20);
    const pin2 = createElementPin('element-2', true, 10, 20);

    expect(pin1.targetId).not.toBe(pin2.targetId);
    expect(pin1.x).toBe(pin2.x);
    expect(pin1.y).toBe(pin2.y);
  });

  it('should handle empty string targetId', () => {
    const pin = createElementPin('', true, 100, 200);

    expect(pin.targetId).toBe('');
    expect(pin.x).toBe(100);
  });

  it('should preserve all parameters in pin object', () => {
    const targetId = 'my-element';
    const relativeToParent = false;
    const x = 123;
    const y = 456;

    const pin = createElementPin(targetId, relativeToParent, x, y);

    expect(pin.targetId).toBe(targetId);
    expect(pin.relativeToParent).toBe(relativeToParent);
    expect(pin.x).toBe(x);
    expect(pin.y).toBe(y);
  });
});

describe('createScreenPin vs createElementPin', () => {
  it('should create different pin types', () => {
    const screenPin = createScreenPin(100, 200);
    const elementPin = createElementPin('element-id', true, 100, 200);

    expect(screenPin.targetId).toBe('viewport');
    expect(elementPin.targetId).toBe('element-id');
  });

  it('should have different relativeToParent defaults', () => {
    const screenPin = createScreenPin(50, 75);
    const elementPin = createElementPin('element-id', undefined, 50, 75);

    expect(screenPin.relativeToParent).toBe(false);
    expect(elementPin.relativeToParent).toBe(true);
  });

  it('should both create valid PinModel objects', () => {
    const screenPin = createScreenPin(10, 20);
    const elementPin = createElementPin('element', true, 30, 40);

    // Both should have required PinModel properties
    expect(screenPin).toHaveProperty('targetId');
    expect(screenPin).toHaveProperty('relativeToParent');
    expect(screenPin).toHaveProperty('x');
    expect(screenPin).toHaveProperty('y');

    expect(elementPin).toHaveProperty('targetId');
    expect(elementPin).toHaveProperty('relativeToParent');
    expect(elementPin).toHaveProperty('x');
    expect(elementPin).toHaveProperty('y');
  });
});

