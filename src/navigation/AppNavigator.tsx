import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FloatDock } from '../components/FloatDock';
import { useStageChrome } from '../components/Stage';
import { FactGlowScreen } from '../screens/FactGlowScreen';
import { GlowGateScreen } from '../screens/GlowGateScreen';
import { KeptPocketScreen } from '../screens/KeptPocketScreen';
import { NameFountainScreen } from '../screens/NameFountainScreen';
import { PunchPatchScreen } from '../screens/PunchPatchScreen';
import { QuipHarborScreen } from '../screens/QuipHarborScreen';
import { SurpriseBeanScreen } from '../screens/SurpriseBeanScreen';
import { TaleLanternScreen } from '../screens/TaleLanternScreen';
import { TrailShowScreen } from '../screens/TrailShowScreen';
import { DockRoute, GateRoute, dockItems } from './paths';
import { KeepsakeItem, readKeepsakes, writeKeepsakes } from '../storage/keepsakeStore';

export function AppNavigator() {
  const [gate, setGate] = useState<GateRoute>('glowGate');
  const [activeDock, setActiveDock] = useState<DockRoute>('quipHarbor');
  const [keepsakes, setKeepsakes] = useState<KeepsakeItem[]>([]);
  const chrome = useStageChrome();
  const keptIds = useMemo(() => new Set(keepsakes.map(item => item.id)), [keepsakes]);

  useEffect(() => {
    readKeepsakes()
      .then(setKeepsakes)
      .catch(() => setKeepsakes([]));
  }, []);

  const isKept = useCallback((id: string) => keptIds.has(id), [keptIds]);

  const toggleKeep = useCallback((item: KeepsakeItem) => {
    setKeepsakes(current => {
      const exists = current.some(saved => saved.id === item.id);
      const next = exists
        ? current.filter(saved => saved.id !== item.id)
        : [{ ...item, createdAt: Date.now() }, ...current];
      writeKeepsakes(next).catch(() => undefined);
      return next;
    });
  }, []);

  const openDock = useCallback((route: DockRoute) => {
    setActiveDock(route);
  }, []);

  if (gate === 'glowGate') {
    return <GlowGateScreen onDone={() => setGate('trailShow')} />;
  }

  if (gate === 'trailShow') {
    return <TrailShowScreen onDone={() => setGate('mainDeck')} />;
  }

  return (
    <View style={styles.fill}>
      {activeDock === 'quipHarbor' ? (
        <QuipHarborScreen isKept={isKept} toggleKeep={toggleKeep} />
      ) : null}
      {activeDock === 'taleLantern' ? (
        <TaleLanternScreen isKept={isKept} toggleKeep={toggleKeep} />
      ) : null}
      {activeDock === 'punchPatch' ? <PunchPatchScreen /> : null}
      {activeDock === 'factGlow' ? (
        <FactGlowScreen isKept={isKept} toggleKeep={toggleKeep} />
      ) : null}
      {activeDock === 'nameFountain' ? <NameFountainScreen /> : null}
      {activeDock === 'surpriseBean' ? <SurpriseBeanScreen /> : null}
      {activeDock === 'keptPocket' ? (
        <KeptPocketScreen goToDock={openDock} items={keepsakes} toggleKeep={toggleKeep} />
      ) : null}
      <FloatDock
        activeKey={activeDock}
        bottom={chrome.dockBottom}
        items={dockItems}
        onChange={key => setActiveDock(key as DockRoute)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
});
