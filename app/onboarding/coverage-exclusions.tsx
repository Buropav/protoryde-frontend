import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { AppPage, PrimaryButton, SectionCard } from '../../src/components/ui';
import { colors } from '../../src/constants/colors';
import { coverageItems, exclusionItems } from '../../src/data/prototype-data';

export default function CoverageExclusionsScreen() {
  const [accepted, setAccepted] = useState(false);

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
        {exclusionItems.map((item) => (
          <SectionCard key={item.id} style={styles.exclusionCard}>
            <Text style={styles.exclusionIcon}>⛔</Text>
            <View style={styles.exclusionTextContainer}>
              <Text style={styles.exclusionTitle}>{item.title}</Text>
              <Text style={styles.exclusionText}>{item.detail}</Text>
            </View>
          </SectionCard>
        ))}

        <TouchableOpacity style={styles.checkRow} onPress={() => setAccepted((value) => !value)} activeOpacity={0.8}>
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]}>
            {accepted ? <Text style={styles.checkboxTick}>✓</Text> : null}
          </View>
          <Text style={styles.checkText}>I acknowledge these coverage terms and exclusions.</Text>
        </TouchableOpacity>

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
  exclusionCard: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.surfaceContainer,
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
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginTop: 10,
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
