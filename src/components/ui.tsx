import { ReactNode } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  ScrollViewProps,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';

interface AppPageProps extends ScrollViewProps {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function AppPage({ children, contentContainerStyle, ...rest }: AppPageProps) {
  return (
    <ScrollView
      style={styles.page}
      contentContainerStyle={[styles.pageContent, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

interface TopBarProps {
  title: string;
  onBack?: () => void;
  rightSlot?: ReactNode;
}

export function TopBar({ title, onBack, rightSlot }: TopBarProps) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topBarLeft}>
        {onBack ? (
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.topBarTitle}>{title}</Text>
      </View>
      {rightSlot ?? <View style={styles.avatarStub}><Text style={styles.avatarText}>PN</Text></View>}
    </View>
  );
}

interface PrimaryButtonProps {
  label: string;
  subLabel?: string;
  onPress: () => void;
  rightSlot?: ReactNode;
}

export function PrimaryButton({ label, subLabel, onPress, rightSlot }: PrimaryButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
      <View style={styles.primaryButton}>
        <View>
          <Text style={styles.primaryLabel}>{label}</Text>
          {subLabel ? <Text style={styles.primarySubLabel}>{subLabel}</Text> : null}
        </View>
        {rightSlot}
      </View>
    </TouchableOpacity>
  );
}

interface SectionCardProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function SectionCard({ children, style }: SectionCardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

interface StatusChipProps {
  label: string;
  tone?: 'default' | 'active' | 'warning' | 'error';
  style?: StyleProp<ViewStyle>;
}

export function StatusChip({ label, tone = 'default', style }: StatusChipProps) {
  const toneStyle = chipToneMap[tone];
  return (
    <View style={[styles.chip, toneStyle.container, style]}>
      <Text style={[styles.chipText, toneStyle.text]}>{label}</Text>
    </View>
  );
}

const chipToneMap: Record<NonNullable<StatusChipProps['tone']>, { container: ViewStyle; text: TextStyle }> = {
  default: {
    container: { backgroundColor: colors.surfaceContainerHigh },
    text: { color: colors.onSurfaceVariant },
  },
  active: {
    container: { backgroundColor: colors.tertiaryContainer + '24' },
    text: { color: colors.tertiaryFixedDim },
  },
  warning: {
    container: { backgroundColor: colors.secondary + '26' },
    text: { color: colors.secondary },
  },
  error: {
    container: { backgroundColor: colors.error + '26' },
    text: { color: colors.error },
  },
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  pageContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface + 'F0',
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '700',
  },
  topBarTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
  },
  avatarStub: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.onSurface,
    fontSize: 12,
    fontWeight: '700',
  },
  primaryButton: {
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
  },
  primaryLabel: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  primarySubLabel: {
    color: colors.onPrimaryContainer,
    marginTop: 2,
    fontSize: 11,
    fontWeight: '500',
  },
  card: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
  },
  chip: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
