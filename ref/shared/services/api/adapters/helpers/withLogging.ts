// Decorator for automatically logging and handling errors for CRUD methods
// Декоратор для автоматического логирования и обработки ошибок CRUD методов

type AsyncMethod<T extends any[], R> = (...args: T) => Promise<R>;

// Main decorator for wrapping methods in try/catch + logging
// Основной декоратор для оборачивания методов в try/catch + логирование

export function withLogging<T extends any[], R>(
  method: AsyncMethod<T, R>,
  methodName: string,
  adapterName: string,
): AsyncMethod<T, R> {
  return async function(...args: T): Promise<R> {
    const startTime = Date.now();

    // Logs the start of the operation
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${adapterName}] ${methodName}`, {
        args: args.length > 0 ? args : undefined,
        timestamp: new Date().toISOString(),
      });
    }

    try {
      // Executes the original method
      // Выполняем оригинальный метод
      const result = await method.apply(this, args);

      // Logs the successful execution
      if (process.env.NODE_ENV === 'development') {
        const duration = Date.now() - startTime;
        console.log(`[${adapterName}] ${methodName} ✅`, {
          duration: `${duration}ms`,
          resultType: Array.isArray(result) ? `array[${result.length}]` : typeof result,
        });
      }

      return result;

    } catch (error) {
      // Logs the error with details
      const duration = Date.now() - startTime;
      console.error(`[${adapterName}] ${methodName} ❌`, {
        error: error instanceof Error ? error.message : error,
        duration: `${duration}ms`,
        stack: error instanceof Error ? error.stack : undefined,
        args: args.length > 0 ? args : undefined,
      });

      // Throws the error further
      throw error;
    }
  };
}

// Utility for automatically wrapping all CRUD methods of the adapter
// Утилита для автоматического оборачивания всех CRUD методов адаптера

export function wrapAdapterMethods<T extends Record<string, any>>(
  adapter: T,
  adapterName: string,
  methodNames: (keyof T)[] = ['getAll', 'getById', 'create', 'update', 'delete'],
): void {
  methodNames.forEach(methodName => {
    const originalMethod = adapter[methodName];

    if (typeof originalMethod === 'function') {
      // Replaces the original method with the wrapped one
      adapter[methodName] = withLogging(
        originalMethod.bind(adapter),
        String(methodName),
        adapterName,
      );
    }
  });
}

// Decorator for automatically wrapping methods
// Декоратор для автоматического оборачивания методов

export function withAutoLogging(methodNames?: string[]) {
  return function<T extends { new(...args: any[]): any }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);

        // Automatically wraps the CRUD methods
        const defaultMethods = ['getAll', 'getById', 'create', 'update', 'delete'];
        const methodsToWrap = methodNames || defaultMethods;

        wrapAdapterMethods(this, constructor.name, methodsToWrap);
      }
    };
  };
}

// Additional utility for logging performance
// Дополнительная утилита для логирования производительности

export function withPerformanceLogging<T extends any[], R>(
  method: AsyncMethod<T, R>,
  methodName: string,
  adapterName: string,
  thresholdMs: number = 1000,
): AsyncMethod<T, R> {
  return async function(...args: T): Promise<R> {
    const startTime = Date.now();

    try {
      const result = await method.apply(this, args);
      const duration = Date.now() - startTime;

      // Logs only slow operations
      if (duration > thresholdMs) {
        console.warn(`[${adapterName}] ${methodName} 🐌 SLOW OPERATION`, {
          duration: `${duration}ms`,
          threshold: `${thresholdMs}ms`,
          args: args.length > 0 ? args : undefined,
        });
      }

      return result;
    } catch (error) {
      throw error;
    }
  };
}

// Combined decorator for full logging
// Комбинированный декоратор для полного логирования

export function withFullLogging<T extends any[], R>(
  method: AsyncMethod<T, R>,
  methodName: string,
  adapterName: string,
  options: {
        performanceThreshold?: number;
        logLevel?: 'basic' | 'detailed' | 'performance';
    } = {},
): AsyncMethod<T, R> {
  const { performanceThreshold = 1000, logLevel = 'basic' } = options;

  let wrappedMethod = method;

  // Базовое логирование
  if (logLevel === 'basic' || logLevel === 'detailed') {
    wrappedMethod = withLogging(wrappedMethod, methodName, adapterName);
  }

  // Логирование производительности
  if (logLevel === 'performance' || logLevel === 'detailed') {
    wrappedMethod = withPerformanceLogging(wrappedMethod, methodName, adapterName, performanceThreshold);
  }

  return wrappedMethod;
}
