import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Settings as SettingsIcon, User, Moon, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, colors, isDark, setTheme } = useTheme();
  const [autoConnect, setAutoConnect] = useState(true);
  const [killSwitch, setKillSwitch] = useState(false);

  const handleThemeToggle = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent,
  }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showArrow?: boolean;
    rightComponent?: React.ReactNode;
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>{icon}</View>
        <View style={styles.settingContent}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>}
        </View>
      </View>
      <View style={styles.settingRight}>
        {rightComponent}
        {showArrow && !rightComponent && (
          <ChevronRight size={20} color={colors.textSecondary} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={isDark ? ['#0f172a', '#1e293b'] : ['#f8fafc', '#e2e8f0']}
      style={styles.container}
    >
      <View style={styles.header}>
        <SettingsIcon size={24} color={colors.text} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
            <SettingItem
              icon={<User size={20} color={colors.primary} />}
              title="Profile"
              subtitle="Manage your account settings"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
            <SettingItem
              icon={<Moon size={20} color={colors.textSecondary} />}
              title="Dark Mode"
              subtitle="Switch between light and dark themes"
              showArrow={false}
              rightComponent={
                <Switch
                  value={isDark}
                  onValueChange={handleThemeToggle}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={'#ffffff'}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>VPN Settings</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
            <SettingItem
              icon={<Shield size={20} color={colors.success} />}
              title="Auto Connect"
              subtitle="Automatically connect when app opens"
              showArrow={false}
              rightComponent={
                <Switch
                  value={autoConnect}
                  onValueChange={setAutoConnect}
                  trackColor={{ false: colors.border, true: colors.success }}
                  thumbColor={'#ffffff'}
                />
              }
            />
            <SettingItem
              icon={<Shield size={20} color={colors.error} />}
              title="Kill Switch"
              subtitle="Block internet if VPN disconnects"
              showArrow={false}
              rightComponent={
                <Switch
                  value={killSwitch}
                  onValueChange={setKillSwitch}
                  trackColor={{ false: colors.border, true: colors.error }}
                  thumbColor={'#ffffff'}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Support</Text>
          <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
            <SettingItem
              icon={<HelpCircle size={20} color={colors.textSecondary} />}
              title="Help & Support"
              subtitle="Get help and contact support"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={[styles.sectionContent, { backgroundColor: colors.card }]}>
            <SettingItem
              icon={<LogOut size={20} color={colors.error} />}
              title="Sign Out"
              onPress={handleLogout}
              showArrow={false}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  sectionContent: {
    marginHorizontal: 24,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});