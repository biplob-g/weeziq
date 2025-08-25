// Clerk Edge Runtime Compatibility Wrapper
// This file provides fallbacks for Node.js modules that Clerk tries to use in Edge Runtime

// Mock fs module for Edge Runtime
export const fs = {
  promises: {
    readFile: async () => {
      throw new Error('File system operations not available in Edge Runtime');
    },
    writeFile: async () => {
      throw new Error('File system operations not available in Edge Runtime');
    },
    mkdir: async () => {
      throw new Error('File system operations not available in Edge Runtime');
    },
    stat: async () => {
      throw new Error('File system operations not available in Edge Runtime');
    },
  },
  readFileSync: () => {
    throw new Error('File system operations not available in Edge Runtime');
  },
  writeFileSync: () => {
    throw new Error('File system operations not available in Edge Runtime');
  },
  existsSync: () => false,
  mkdirSync: () => {
    throw new Error('File system operations not available in Edge Runtime');
  },
};

// Mock path module for Edge Runtime
export const path = {
  dirname: (filePath: string) => {
    const parts = filePath.split('/');
    return parts.slice(0, -1).join('/') || '.';
  },
  join: (...paths: string[]) => {
    return paths.join('/').replace(/\/+/g, '/');
  },
  resolve: (...paths: string[]) => {
    return paths.join('/').replace(/\/+/g, '/');
  },
  extname: (filePath: string) => {
    const match = filePath.match(/\.[^.]*$/);
    return match ? match[0] : '';
  },
  basename: (filePath: string, ext?: string) => {
    const parts = filePath.split('/');
    const basename = parts[parts.length - 1];
    if (ext && basename.endsWith(ext)) {
      return basename.slice(0, -ext.length);
    }
    return basename;
  },
};

// Mock os module for Edge Runtime
export const os = {
  platform: () => 'edge',
  homedir: () => '/tmp',
  tmpdir: () => '/tmp',
  cpus: () => [],
  freemem: () => 0,
  totalmem: () => 0,
  uptime: () => 0,
  hostname: () => 'edge-runtime',
  type: () => 'Edge',
  release: () => '1.0.0',
  arch: () => 'wasm',
  userInfo: () => ({
    username: 'edge-user',
    uid: 0,
    gid: 0,
    shell: '/bin/sh',
    homedir: '/tmp',
  }),
};

// Export all as default for compatibility
export default {
  fs,
  path,
  os,
};
