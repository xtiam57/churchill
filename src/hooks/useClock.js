import { useEffect, useState } from 'react';

export function useClock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return date.toLocaleTimeString('en-us', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
