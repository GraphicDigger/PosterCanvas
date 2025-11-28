import { InteractionStrategyInterface } from '../IFrameInteractionService';

// IFrame -> Redux

// Default Selection Strategy / Стратегия выделения по умолчанию
export class FocusInteraction implements InteractionStrategyInterface {
    private focusAction: (ids: string[]) => void;
    private clearFocusAction: () => void;

    private isDevMode: boolean = process.env.NODE_ENV === 'development';
    private LOG = {
        info: (...msg: any[]) => this.isDevMode && console.log('[SEL-STR] I', ...msg),
        warn: (...msg: any[]) => this.isDevMode && console.warn('[SEL-STR] W', ...msg),
        error: (...msg: any[]) => this.isDevMode && console.error('[SEL-STR] E', ...msg),
    };
  
    constructor(
      focusAction: (ids: string[]) => void,
      clearFocusAction: () => void
    ) {
      this.focusAction = focusAction;
      this.clearFocusAction = clearFocusAction;
    }
  
    onElementFocused(elementId: string): void {
      // this.LOG.info('Selecting element', elementId);
      // In standard selection, we replace the selection
      // Multi-selection logic (Shift/Ctrl) would go here or be a different strategy
      this.focusAction([elementId]);
    }
  
    onCanvasClick(): void {
      // this.LOG.info('Deselecting all');
      this.clearFocusAction();
    }
  }
  