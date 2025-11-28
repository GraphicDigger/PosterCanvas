import { IFrameBridgeService } from './IFrameBridgeService';
import { IFrameMessageType } from './constants';
import { SerializedElement } from './types';

// Redux -> IFrame

//  Service for synchronizing UI elements with IFrame Editor
//  Сервис для синхронизации UI элементов с IFrame Editor

export class IFrameSyncService {
    private bridge: IFrameBridgeService;
    private callback: () => SerializedElement[];
    private isInitialized = false;

    private isDevMode: boolean = process.env.NODE_ENV === 'development';
    private LOG = {
        info: (...msg: any[]) => this.isDevMode && console.log('[🧰 REDUX-SYNC] I:', ...msg),
        warn: (...msg: any[]) => this.isDevMode && console.warn('[🧰 REDUX-SYNC] W:', ...msg),
        error: (...msg: any[]) => this.isDevMode && console.error('[🧰 REDUX-SYNC] E:', ...msg),
    };

    constructor(
        bridge: IFrameBridgeService,
        callback: () => SerializedElement[]
    ) {
        this.bridge = bridge;
        this.callback = callback;
    }

    // Initialize the sync service / Инициализация сервиса синхронизации
    initialize(): void {
        if (this.isInitialized) {
            this.LOG.warn('Already initialized');
            return;
        }

        // Wait for sandbox to be ready before syncing / Ждем готовности sandbox перед синхронизацией
        this.bridge.on(IFrameMessageType.SANDBOX_READY, () => {
            this.LOG.info('Sandbox ready, syncing elements');
            this.syncElements();
        });

        this.isInitialized = true;
        this.LOG.info('Initialized');
    }

    // Manually trigger elements sync / Ручной запуск синхронизации элементов
    syncElements(): void {
        try {
            const elements = this.callback();
            this.LOG.info('Syncing elements to iframe', elements);

            this.bridge.send(IFrameMessageType.SYNC_ELEMENTS, { elements })
                .then(() => {
                    this.LOG.info('Elements synced successfully');
                })
                .catch((error) => {
                    this.LOG.error('Failed to sync elements', error);
                });
        } catch (error) {
            this.LOG.error('Error getting elements', error);
        }
    }

    // Cleanup / Очистка
    destroy(): void {
        this.isInitialized = false;
        this.LOG.info('🧹 Destroyed');
    }
}
