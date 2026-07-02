import AsyncStorage from '@react-native-async-storage/async-storage';

export type KeepsakeKind = 'joke' | 'story' | 'fact';

export type KeepsakeItem = {
  id: string;
  kind: KeepsakeKind;
  title: string;
  body: string;
  accent: 'pink' | 'yellow' | 'violet';
  createdAt: number;
};

const keepsakeKey = '@funmosaic/keepsakes-v1';

export async function readKeepsakes(): Promise<KeepsakeItem[]> {
  const raw = await AsyncStorage.getItem(keepsakeKey);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function writeKeepsakes(items: KeepsakeItem[]) {
  await AsyncStorage.setItem(keepsakeKey, JSON.stringify(items));
}
