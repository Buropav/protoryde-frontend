import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard, TopBar } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { NotificationCategory, notificationItems } from '../../src/data/prototype-data';

const categories: NotificationCategory[] = ['All', 'Weather', 'Claims', 'Payments'];

export default function NotificationsCenterScreen() {
  const [selected, setSelected] = useState<NotificationCategory>('All');

  const items = useMemo(() => {
    if (selected === 'All') {
      return notificationItems;
    }
    return notificationItems.filter((item) => item.category === selected);
  }, [selected]);

  return (
    <View style={styles.container}>
      <TopBar title="Notifications" onBack={() => router.back()} />
      <AppPage contentContainerStyle={styles.content}>
        <View style={styles.chipsRow}>
          {categories.map((category) => {
            const active = category === selected;
            return (
              <TouchableOpacity
                key={category}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setSelected(category)}
                activeOpacity={0.85}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{category}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {items.map((item) => (
          <SectionCard key={item.id} style={styles.noticeCard}>
            <View style={styles.noticeIcon}>
              {item.unread ? <View style={styles.unreadDot} /> : null}
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
            <View style={styles.noticeBody}>
              <View style={styles.noticeHeader}>
                <Text style={styles.noticeTitle}>{item.title}</Text>
                <Text style={styles.noticeTime}>{item.time}</Text>
              </View>
              <Text style={styles.noticeText}>{item.body}</Text>
            </View>
          </SectionCard>
        ))}
      </AppPage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    paddingTop: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  chip: {
    borderRadius: 12,
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '600',
  },
  chipTextActive: {
    color: colors.onPrimary,
  },
  noticeCard: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  noticeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: -3,
    left: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    zIndex: 2,
    borderWidth: 2,
    borderColor: colors.surfaceContainerLowest,
  },
  iconText: {
    fontSize: 20,
  },
  noticeBody: {
    flex: 1,
    gap: 6,
  },
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  noticeTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
    flex: 1,
  },
  noticeTime: {
    color: colors.onSurfaceVariant,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  noticeText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
});
