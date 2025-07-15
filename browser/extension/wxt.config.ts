import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    "manifest_version": 3,
    "name": "CDP Relay Extension",
    "version": "1.0",
    "description": "Relays CDP messages via WebSocket",
    "permissions": [
      "debugger",
      "tabs",
      "activeTab"
    ],
    "host_permissions": [
      "http://localhost:8000/*"
    ]
  }
});
