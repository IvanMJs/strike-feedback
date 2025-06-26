// Global type declarations for Node.js
declare global {
  var process: {
    env: Record<string, string | undefined>;
  };
  var console: {
    log: (...args: any[]) => void;
    error: (...args: any[]) => void;
  };
}

export {};
