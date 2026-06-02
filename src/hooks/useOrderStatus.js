import { useEffect, useRef, useState } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;

const RECONNECT_DELAY_MS = 3000;

export function useOrderStatus(orderId, initialStatus) {
  const [currentStatus, setCurrentStatus] = useState(initialStatus ?? null);
  const [isConnected, setIsConnected] = useState(false);
  const eventSourceRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const unmountedRef = useRef(false);

  useEffect(() => {
    if (initialStatus) {
      setCurrentStatus(initialStatus);
    }
  }, [initialStatus]);

  useEffect(() => {
    if (!orderId) return undefined;

    unmountedRef.current = false;

    function connect() {
      if (unmountedRef.current) return;

      const url = `${BASE_URL}/orders/${orderId}/stream`;
      const es = new EventSource(url);
      eventSourceRef.current = es;

      es.onopen = () => {
        if (!unmountedRef.current) setIsConnected(true);
      };

      es.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.status) {
            setCurrentStatus(data.status);
          }
        } catch {
          /* ignore malformed events */
        }
      };

      es.onerror = () => {
        setIsConnected(false);
        es.close();
        eventSourceRef.current = null;

        if (!unmountedRef.current) {
          reconnectTimerRef.current = setTimeout(connect, RECONNECT_DELAY_MS);
        }
      };
    }

    connect();

    return () => {
      unmountedRef.current = true;
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
      }
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
      setIsConnected(false);
    };
  }, [orderId]);

  return { currentStatus, isConnected };
}
