import {
  createContext,
  JSX,
  onCleanup,
  useContext,
} from 'solid-js';
import * as ably from 'ably';

const AblyClientOptionsContext = createContext<ably.Types.ClientOptions | string>();

export interface AblyClientOptionsProviderProps {
  options: string | ably.Types.ClientOptions;
  children: JSX.Element;
}

export function AblyClientOptionsProvider(props: AblyClientOptionsProviderProps): JSX.Element {
  return (
    <AblyClientOptionsContext.Provider value={props.options}>
      {props.children}
    </AblyClientOptionsContext.Provider>
  );
}

export function useAblyClientOptions(): ably.Types.ClientOptions | string {
  const ctx = useContext(AblyClientOptionsContext);

  if (ctx) {
    return ctx;
  }
  throw new Error('Missing <AblyRealtimeProvider />');
}

const AblyRealtimeContext = createContext<ably.Types.RealtimePromise>();

export interface AblyRealtimeProviderProps {
  children: JSX.Element;
}

export function AblyRealtimeProvider(props: AblyRealtimeProviderProps): JSX.Element {
  const options = useAblyClientOptions();
  const client = new ably.Realtime.Promise(options);

  onCleanup(() => {
    client.close();
  });

  return (
    <AblyRealtimeContext.Provider value={client}>
      {props.children}
    </AblyRealtimeContext.Provider>
  );
}

export function useAblyRealtime(): ably.Types.RealtimePromise {
  const ctx = useContext(AblyRealtimeContext);

  if (ctx) {
    return ctx;
  }
  throw new Error('Missing <AblyRealtimeProvider />');
}

const AblyRESTContext = createContext<ably.Types.RestPromise>();

export interface AblyRESTProviderProps {
  children: JSX.Element;
}

export function AblyRESTProvider(props: AblyRESTProviderProps): JSX.Element {
  const options = useAblyClientOptions();
  const client = new ably.Rest.Promise(options);

  return (
    <AblyRESTContext.Provider value={client}>
      {props.children}
    </AblyRESTContext.Provider>
  );
}

export function useAblyREST(): ably.Types.RestPromise {
  const ctx = useContext(AblyRESTContext);

  if (ctx) {
    return ctx;
  }
  throw new Error('Missing <AblyRealtimeProvider />');
}
