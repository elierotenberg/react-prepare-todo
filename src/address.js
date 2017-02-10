const BROWSER = (typeof window === 'object');

export const address = BROWSER ? {
  protocol: window.location.protocol,
  hostname: window.location.hostname,
  port: window.location.port,
} : {};
