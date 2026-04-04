import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, UIManager, Platform, Animated } from 'react-native';
import { router } from 'expo-router';
import { AppPage, SectionCard } from '../../src/components/ui';
import { ErrorBanner } from '../../src/components/ErrorBanner';
import { colors } from '../../src/constants/colors';
import { coverageItems } from '../../src/data/prototype-data';
import { exclusionsService } from '../../src/services/exclusionsService';
import { useApiCall } from '../../src/hooks/useApiCall';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface ExclusionItemProps {
  text: string;
  originalIndex: number;
}

interface ExclusionAccordionGroupProps {
  groupKey: string;
  label: string;
  items: ExclusionItemProps[];
  isOpen: boolean;
  onToggle: () => void;
  hasBeenOpened: boolean;
}

const ExclusionAccordionGroup = ({ groupKey, label, items, isOpen, onToggle, hasBeenOpened }: ExclusionAccordionGroupProps) => {
  const rotation = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: isOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const chevronRotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.accordionLabel}>{label}</Text>
        <View style={styles.accordionBadge}>
          <Text style={styles.accordionBadgeText}>{items.length} item{items.length !== 1 ? 's' : ''}</Text>
        </View>
        <Animated.Text style={[styles.accordionChevron, { transform: [{ rotate: chevronRotate }] }]}>
          ▼
        </Animated.Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.accordionBody}>
          {items.map((item, index) => (
            <View key={index} style={styles.exclusionItem}>
              <Text style={styles.exclusionIcon}>⛔</Text>
              <View style={styles.exclusionTextContainer}>
                <Text style={styles.exclusionTitle}>Exclusion {item.originalIndex + 1}</Text>
                <Text style={styles.exclusionText}>{item.text}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default function CoverageExclusionsScreen() {
  const [accepted, setAccepted] = useState(false);
  const [openGroupKeys, setOpenGroupKeys] = useState(new Set());
  const [openedOnceGroups, setOpenedOnceGroups] = useState(new Set());
  const [showGateMessage, setShowGateMessage] = useState(false);

  const { data, loading, error, execute, refetch } = useApiCall(
    exclusionsService.getExclusions
  );

  useEffect(() => {
    execute();
  }, [execute]);

  const groupedExclusions = [
    { key: 'bodily_vehicle', label: 'Bodily & Vehicle Harms', items: [] },
    { key: 'platform_account', label: 'Platform & Account Issues', items: [] },
    { key: 'extraordinary', label: 'Extraordinary Events', items: [] },
    { key: 'scope_boundaries', label: 'Scope Boundaries', items: [] },
  ];

  if (data?.items) {
    data.items.forEach((text, i) => {
      const lowerText = text.toLowerCase();
      const itemProps = { text, originalIndex: i };
      if (lowerText.includes('health') || lowerText.includes('vehicle damage')) {
        groupedExclusions[0].items.push(itemProps);
      } else if (lowerText.includes('platform') || lowerText.includes('bans')) {
        groupedExclusions[1].items.push(itemProps);
      } else if (lowerText.includes('pandemic') || lowerText.includes('nuclear') || lowerText.includes('civil unrest')) {
        groupedExclusions[2].items.push(itemProps);
      } else {
        groupedExclusions[3].items.push(itemProps);
      }
    });
  }

  const TOTAL_GROUPS = 4;
  const isGateMet = openedOnceGroups.size === TOTAL_GROUPS;

  const toggleGroup = (key) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    const newOpenKeys = new Set(openGroupKeys);
    if (newOpenKeys.has(key)) {
      newOpenKeys.delete(key);
    } else {
      newOpenKeys.add(key);
    }
    setOpenGroupKeys(newOpenKeys);
    
    if (!openedOnceGroups.has(key)) {
      const newOpenedOnce = new Set(openedOnceGroups).add(key);
      setOpenedOnceGroups(newOpenedOnce);
      
      if (showGateMessage && newOpenedOnce.size === TOTAL_GROUPS) {
        setShowGateMessage(false);
      }
    }
  };

  const handleCheck = () => {
    if (!isGateMet) {
      setShowGateMessage(true);
      return;
    }
    setShowGateMessage(false);
    setAccepted((value) => !value);
  };

  return (
    <View style={styles.container}>
      <AppPage contentContainerStyle={styles.content}>
        <View style={styles.progressSection}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
        </View>

        <View style={styles.heroBlock}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>What ProtoRyde Covers (and Doesn't)</Text>
          </View>
          <Text style={styles.subtitle}>
            Review our structural protections. Understanding these limits ensures you're prepared for any shift scenario.
          </Text>
        </View>

        {error && <ErrorBanner message={error.userMessage} onRetry={refetch} />}

        <Text style={styles.sectionTitle}>What's Covered</Text>
        <View style={styles.grid}>
          {coverageItems.map((item) => (
            <SectionCard key={item.id} style={styles.smallCard}>
              <Text style={styles.cardIcon}>{item.icon}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubTitle}>{item.subtitle}</Text>
            </SectionCard>
          ))}
        </View>

        <Text style={styles.sectionTitle}>What's NOT Covered</Text>
        {loading && !data ? (
          <Text style={styles.subtitle}>Loading exclusions...</Text>
        ) : (
          <View style={styles.accordionList}>
            {groupedExclusions.map((group) => (
              <ExclusionAccordionGroup
                key={group.key}
                groupKey={group.key}
                label={group.label}
                items={group.items}
                isOpen={openGroupKeys.has(group.key)}
                onToggle={() => toggleGroup(group.key)}
                hasBeenOpened={openedOnceGroups.has(group.key)}
              />
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.checkRow} onPress={handleCheck} activeOpacity={0.8}>
          <View style={[styles.checkbox, accepted && styles.checkboxChecked, !isGateMet && styles.checkboxDisabled]}>
            {accepted ? <Text style={styles.checkboxTick}>✓</Text> : null}
          </View>
          <Text style={styles.checkText}>I acknowledge these coverage terms and exclusions.</Text>
        </TouchableOpacity>

        {showGateMessage && (
          <Text style={styles.gateMessageText}>
            Please review all exclusion groups above before acknowledging.
          </Text>
        )}

        <TouchableOpacity
          style={[styles.continueButton, !accepted && styles.continueButtonDisabled]}
          activeOpacity={0.9}
          onPress={() => {
            if (!accepted) return;
            router.push('/onboarding/zone-selection');
          }}
        >
          <Text style={styles.continueText}>I Understand and Accept</Text>
          <Text style={styles.buttonIcon}>✓</Text>
        </TouchableOpacity>
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
    gap: 14,
  },
  heroBlock: {
    marginBottom: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 4,
  },
  backButton: {
    paddingTop: 4,
    paddingRight: 8,
  },
  backIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  progressSection: {
    paddingTop: 25,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  title: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    flex: 1,
  },
  subtitle: {
    marginTop: 8,
    color: colors.onSurfaceVariant,
    lineHeight: 20,
    fontSize: 13,
  },
  sectionTitle: {
    marginTop: 8,
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  smallCard: {
    width: '48%',
    gap: 6,
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 20,
  },
  cardTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  cardSubTitle: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
  },
  accordionList: {
    gap: 12,
  },
  accordionContainer: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: 14,
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  accordionLabel: {
    flex: 1,
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  accordionBadge: {
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accordionBadgeText: {
    color: colors.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '600',
  },
  accordionChevron: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginLeft: 4,
  },
  accordionBody: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 14,
  },
  exclusionItem: {
    flexDirection: 'row',
    gap: 10,
  },
  exclusionIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  exclusionTextContainer: {
    flex: 1,
    gap: 4,
  },
  exclusionTitle: {
    color: colors.onSurface,
    fontSize: 14,
    fontWeight: '700',
  },
  exclusionText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 17,
  },
  checkRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
  checkboxTick: {
    color: colors.onPrimary,
    fontSize: 12,
    fontWeight: '800',
  },
  checkText: {
    color: colors.onSurfaceVariant,
    flex: 1,
    fontSize: 12,
  },
  gateMessageText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    marginLeft: 30,
    marginTop: -4,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 10,
    marginBottom: -15,
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.onPrimary,
  },
  buttonIcon: {
    color: colors.onSurface,
    fontWeight: '800',
    fontSize: 18,
  },
});
