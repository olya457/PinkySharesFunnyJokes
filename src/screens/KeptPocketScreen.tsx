import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { ActionButton } from '../components/ActionButton';
import { PinkyNote } from '../components/PinkyNote';
import { SaveHeart } from '../components/SaveHeart';
import { ShareButton } from '../components/ShareButton';
import { Stage } from '../components/Stage';
import { DockRoute } from '../navigation/paths';
import { KeepsakeItem, KeepsakeKind } from '../storage/keepsakeStore';
import { useCompactLayout } from '../theme/layout';
import { palette, round } from '../theme/palette';

type KeptPocketScreenProps = {
  items: KeepsakeItem[];
  goToDock: (route: DockRoute) => void;
  toggleKeep: (item: KeepsakeItem) => void;
};

const tabs: Array<{ key: KeepsakeKind; label: string; route: DockRoute }> = [
  { key: 'joke', label: 'Jokes', route: 'quipHarbor' },
  { key: 'story', label: 'Stories', route: 'taleLantern' },
  { key: 'fact', label: 'Facts', route: 'factGlow' },
];

const cardTint = {
  pink: { card: palette.blush, border: palette.blushLine },
  yellow: { card: palette.banana, border: '#fff0bd' },
  violet: { card: palette.grape, border: '#ffd2ff' },
};

export function KeptPocketScreen({ items, goToDock, toggleKeep }: KeptPocketScreenProps) {
  const [tab, setTab] = useState<KeepsakeKind>('joke');
  const compact = useCompactLayout();
  const activeItems = useMemo(
    () => items.filter(item => item.kind === tab).sort((a, b) => b.createdAt - a.createdAt),
    [items, tab],
  );
  const activeTab = tabs.find(item => item.key === tab) ?? tabs[0];

  return (
    <Stage title="Saved">
      <PinkyNote message="All your favorite jokes, stories and facts in one place!" />
      <View style={[styles.segment, compact.isShort && styles.compactSegment]}>
        {tabs.map(item => (
          <Pressable
            accessibilityRole="button"
            key={item.key}
            onPress={() => setTab(item.key)}
            style={[styles.segmentButton, compact.isShort && styles.compactSegmentButton, tab === item.key && styles.segmentActive]}
          >
            <Text style={[styles.segmentText, tab === item.key && styles.segmentActiveText]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
      {activeItems.length === 0 ? (
        <View style={[styles.emptyWrap, compact.isShort && styles.compactEmptyWrap]}>
          <View style={[styles.emptyCard, compact.isShort && styles.compactEmptyCard]}>
            <Text style={styles.emptyText}>
              You do not have anything saved yet. Save a joke, story, or fact and it will appear here.
            </Text>
          </View>
          <ActionButton onPress={() => goToDock(activeTab.route)} style={[styles.emptyButton, compact.isShort && styles.compactEmptyButton]} title={activeTab.label} />
        </View>
      ) : (
        <View style={[styles.list, compact.isShort && styles.compactList]}>
          {activeItems.map(item => (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  backgroundColor: cardTint[item.accent].card,
                  borderColor: cardTint[item.accent].border,
                },
                compact.isShort && styles.compactCard,
              ]}
            >
              <View style={styles.heartPlace}>
                <SaveHeart active onPress={() => toggleKeep(item)} />
              </View>
              {item.kind === 'story' ? (
                <Text style={styles.cardTitle}>{item.title}</Text>
              ) : null}
              <Text style={[styles.cardText, item.kind === 'story' && styles.storyText]}>{item.body}</Text>
              <View style={styles.shareWrap}>
                <ShareButton message={`${item.title}\n${item.body}`} />
              </View>
            </View>
          ))}
        </View>
      )}
    </Stage>
  );
}

const styles = StyleSheet.create({
  segment: {
    minHeight: 54,
    borderRadius: round.pill,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blushSoft,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginTop: 16,
  },
  compactSegment: {
    minHeight: 46,
    marginTop: 12,
  },
  segmentButton: {
    flex: 1,
    minHeight: 38,
    borderRadius: round.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  compactSegmentButton: {
    minHeight: 32,
  },
  segmentActive: {
    backgroundColor: palette.rose,
    borderWidth: 4,
    borderColor: '#ff7da5',
  },
  compactEmptyWrap: {
    marginTop: 12,
    gap: 16,
  },
  segmentText: {
    color: palette.ink,
    fontSize: 16,
    fontWeight: '500',
  },
  compactEmptyCard: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  compactEmptyButton: {
    width: '78%',
  },
  segmentActiveText: {
    color: palette.white,
    fontWeight: '800',
  },
  compactList: {
    gap: 12,
    marginTop: 12,
  },
  emptyWrap: {
    marginTop: 16,
    gap: 24,
  },
  compactCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyCard: {
    borderRadius: round.panel,
    borderWidth: 4,
    borderColor: palette.blushLine,
    backgroundColor: palette.blush,
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  emptyText: {
    color: palette.ink,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '500',
  },
  emptyButton: {
    alignSelf: 'center',
    width: '86%',
  },
  list: {
    gap: 16,
    marginTop: 16,
  },
  card: {
    borderRadius: round.panel,
    borderWidth: 4,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heartPlace: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 2,
  },
  cardTitle: {
    color: palette.ink,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    marginBottom: 14,
    paddingRight: 28,
  },
  cardText: {
    color: palette.ink,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
    paddingRight: 28,
  },
  storyText: {
    textAlign: 'center',
    paddingRight: 0,
  },
  shareWrap: {
    alignItems: 'center',
    marginTop: 16,
  },
});
