import canvasSketch, { CanvasSketchManager } from 'canvas-sketch';
import type { SceneObject } from '../../app/store/editorSlice';

interface CanvasState {
    objects: SceneObject[];
    width: number;
    height: number;
    selectedId: string | null;
}

export class CanvasService {
    private manager: CanvasSketchManager | null = null;
    private currentState: CanvasState | null = null;

    public async init(canvas: HTMLCanvasElement, initialState: CanvasState) {
        this.currentState = initialState;

        const settings = {
            canvas,
            dimensions: [initialState.width, initialState.height],
            scaleToView: true,
            animate: false,
        };

        this.manager = await canvasSketch(this.createSketch(), settings);
    }

    private createSketch = () => {
        return (
            { context, width, height }: {
                context: CanvasRenderingContext2D,
                width: number,
                height: number
            }) => {
            if (!this.currentState) return;

            const { objects, selectedId } = this.currentState;

            // Очистка
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, width, height);

            // Отрисовка объектов
            objects.forEach((obj) => {
                context.save();

                const cx = obj.x + obj.width / 2;
                const cy = obj.y + obj.height / 2;

                context.translate(cx, cy);
                context.rotate((obj.rotation * Math.PI) / 180);
                context.translate(-cx, -cy);

                context.fillStyle = obj.fill;

                context.beginPath();
                if (obj.type === 'rect') {
                    context.rect(obj.x, obj.y, obj.width, obj.height);
                } else if (obj.type === 'circle') {
                    context.ellipse(cx, cy, obj.width / 2, obj.height / 2, 0, 0, Math.PI * 2);
                }
                context.fill();

                // Обводка выделения
                if (obj.id === selectedId) {
                    context.lineWidth = 2;
                    context.strokeStyle = '#0099ff';
                    context.stroke();
                }

                context.restore();
            });
        };
    };

    public updateState(newState: CanvasState) {
        this.currentState = newState;

        if (this.manager) {
            // Примечание: Изменение размеров динамически в canvas-sketch может потребовать больше логики,
            // но пока мы предполагаем, что просто перерисовываем контент.
            if (this.manager.props.width !== newState.width || this.manager.props.height !== newState.height) {
                // Если бы нам нужно было изменить размер, мы могли бы переинициализировать или обновить настройки,
                // но давайте пока оставим все как есть, так как изменение размера холста - более тяжелая операция.
                // this.manager.update({ dimensions: [newState.width, newState.height] });
            }
            this.manager.render();
        }
    }

    public getObjectAt(x: number, y: number): string | null {
        if (!this.currentState) return null;

        for (let i = this.currentState.objects.length - 1; i >= 0; i--) {
            const obj = this.currentState.objects[i];

            // Простая проверка границ (bounding box).
            // Для точной поддержки вращения нам нужно будет выполнить обратное преобразование точки.
            if (
                x >= obj.x &&
                x <= obj.x + obj.width &&
                y >= obj.y &&
                y <= obj.y + obj.height
            ) {
                return obj.id;
            }
        }

        return null;
    }

    public destroy() {
        if (this.manager) {
            this.manager.unload();
            this.manager = null;
        }
    }
}
