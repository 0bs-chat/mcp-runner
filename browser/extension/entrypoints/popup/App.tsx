import React, { useEffect, useState } from 'react';
import type { ExtensionConfig, ExtensionMessage } from '../../../shared/types';

export default function App() {
  const [config, setConfig] = useState<ExtensionConfig>({ serverUrl: 'ws://localhost:3000/ws' });
  const [connected, setConnected] = useState(false);
  const [tabs, setTabs] = useState<Record<string, number>>({});
  const [inputUrl, setInputUrl] = useState(config.serverUrl);
  const [newName, setNewName] = useState('');

  const send = async (msg: ExtensionMessage) =>
    chrome.runtime.sendMessage<ExtensionMessage, any>(msg);

  const refresh = async () => {
    const res = await send({ type: 'connection.status' });
    setConnected(res.connected);
    setConfig(res.config);
    setTabs(res.tabs);
    setInputUrl(res.config.serverUrl);
  };

  const connect = async () => {
    await send({ type: 'config.update', payload: { serverUrl: inputUrl } });
    await send({ type: 'connection.connect' });
    await refresh();
  };

  const disconnect = () => send({ type: 'connection.disconnect' });

  const attach = async (name: string) => {
    await send({ type: 'tab.attach', payload: { name } });
    await refresh();
  };

  const remove = async (name: string) => {
    await send({ type: 'tab.remove', payload: { name } });
    await refresh();
  };

  useEffect(() => { refresh(); }, []);

  return (
    <div className="p-4 w-80 space-y-3 text-sm">
      <label className="block">
        <span className="font-semibold">WebSocket URL</span>
        <input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="w-full mt-1 border rounded px-2 py-1 text-xs"
        />
      </label>

      <button
        onClick={connected ? disconnect : connect}
        className={`w-full rounded py-1 text-white text-xs ${connected ? 'bg-red-500' : 'bg-green-500'
          }`}
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>

      <div className="font-semibold">Tabs</div>
      {Object.entries(tabs).map(([name, id]) => (
        <div key={name} className="flex items-center justify-between">
          <span>{name}</span>
          <div className="space-x-1">
            <button
              onClick={() => chrome.tabs.update(id, { active: true })}
              className="text-xs underline"
            >
              view
            </button>
            <button
              onClick={() => remove(name)}
              className="text-xs underline text-red-600"
            >
              remove
            </button>
          </div>
        </div>
      ))}

      <div className="flex items-center space-x-1">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="tab name"
          className="flex-1 border rounded px-2 py-1 text-xs"
        />
        <button
          onClick={() => {
            if (!newName.trim()) return;
            attach(newName.trim());
            setNewName('');
          }}
          className="bg-blue-500 text-white rounded px-2 py-1 text-xs"
        >
          add
        </button>
      </div>
    </div>
  );
}