import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Server, Wifi, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useVPN } from '@/contexts/VPNContext';

export default function ServersScreen() {
  const { colors, isDark } = useTheme();
  const { servers, selectedServer, setSelectedServer } = useVPN();

  const getLoadColor = (load: number) => {
    if (load < 40) return '#10b981';
    if (load < 70) return '#f59e0b';
    return '#ef4444';
  };

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return '#10b981';
    if (latency < 100) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <LinearGradient
      colors={isDark ? ['#0f172a', '#1e293b'] : ['#f8fafc', '#e2e8f0']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Server size={24} color={colors.text} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>VPN Servers</Text>
      </View>

      <ScrollView style={styles.serverList} showsVerticalScrollIndicator={false}>
        {servers.map((server) => (
          <TouchableOpacity
            key={server.id}
            style={[
              styles.serverCard,
              { backgroundColor: colors.card, borderColor: colors.border },
              selectedServer?.id === server.id && { 
                borderColor: colors.primary, 
                backgroundColor: isDark ? '#1e3a8a' : '#f0f9ff' 
              }
            ]}
            onPress={() => setSelectedServer(server)}
          >
            <View style={styles.serverInfo}>
              <View style={styles.serverHeader}>
                <Text style={styles.serverFlag}>{server.flag}</Text>
                <View style={styles.serverDetails}>
                  <Text style={[styles.serverName, { color: colors.text }]}>{server.name}</Text>
                  <Text style={[styles.serverLocation, { color: colors.textSecondary }]}>{server.location}</Text>
                </View>
                {selectedServer?.id === server.id && (
                  <CheckCircle size={20} color={colors.success} />
                )}
              </View>

              <View style={styles.serverMetrics}>
                <View style={styles.metric}>
                  <Wifi size={16} color={getLatencyColor(server.latency)} />
                  <Text style={[styles.metricText, { color: getLatencyColor(server.latency) }]}>
                    {server.latency}ms
                  </Text>
                </View>
                <View style={styles.loadContainer}>
                  <Text style={[styles.loadLabel, { color: colors.textSecondary }]}>Load</Text>
                  <View style={styles.loadBar}>
                    <View
                      style={[
                        styles.loadFill,
                        {
                          width: `${server.load}%`,
                          backgroundColor: getLoadColor(server.load),
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.loadText, { color: getLoadColor(server.load) }]}>
                    {server.load}%
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          {servers.length} servers available • Premium locations coming soon
        </Text>
      </View>
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
  serverList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  serverCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
  },
  serverInfo: {
    gap: 16,
  },
  serverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serverFlag: {
    fontSize: 24,
  },
  serverDetails: {
    flex: 1,
  },
  serverName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  serverLocation: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  serverMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metricText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  loadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'flex-end',
  },
  loadLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  loadBar: {
    width: 60,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  loadFill: {
    height: '100%',
    borderRadius: 3,
  },
  loadText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    minWidth: 30,
    textAlign: 'right',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
  },
});