import { getAsyncStore } from './getAsyncStore';
import type { TConfig, TFn, TContextKeyAndArgs } from './types';

export function getDeferredAsyncStore({ mutate = false }) {
  return <TResponse, TError>(
    contextKeyAndArgsOrFn: TContextKeyAndArgs | TFn<TResponse>,
    fnOrConfig?: TFn<TResponse> | TConfig<TResponse, TError>,
    maybeConfig?: TConfig<TResponse, TError>
  ) => {
    let contextKeyAndArgs = contextKeyAndArgsOrFn as TContextKeyAndArgs | null;
    let config = maybeConfig;

    let fn = fnOrConfig as TFn<TResponse>;
    if (typeof contextKeyAndArgsOrFn === 'function') {
      contextKeyAndArgs = null;
      fn = contextKeyAndArgsOrFn;
    }

    if (typeof fnOrConfig === 'object') {
      config = fnOrConfig;
    }

    return getAsyncStore<TResponse, TError>(contextKeyAndArgs, fn, { ...config, defer: true, mutate });
  };
}
