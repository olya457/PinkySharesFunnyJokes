import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

jest.mock('react-native-webview', () => {
  const MockReact = require('react');
  const { View } = require('react-native');
  return {
    WebView: () => MockReact.createElement(View),
  };
});

jest.mock('@react-native-async-storage/async-storage', () => {
  const store: Record<string, string> = {};
  const mockStorage = {
    getItem: jest.fn((key: string) => Promise.resolve(store[key] ?? null)),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
      return Promise.resolve();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      Object.keys(store).forEach(key => delete store[key]);
      return Promise.resolve();
    }),
  };

  return {
    __esModule: true,
    default: mockStorage,
    ...mockStorage,
  };
});

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
