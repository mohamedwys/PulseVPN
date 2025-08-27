import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { Shield, MapPin, Zap } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useVPN } from '@/contexts/VPNContext';


export default function HomeScreen() {
  const { colors, isDark } = useTheme();
  const { selectedServer, connectionStatus, setConnectionStatus } = useVPN();
  const [ipAddress, setIpAddress] = useState('192.168.1.100');
  const [connectedIp, setConnectedIp] = useState('104.248.45.23');

  const pulseAnimation = useSharedValue(0);
  const scaleAnimation = useSharedValue(1);

  useEffect(() => {
    if (connectionStatus === 'connected') {
      pulseAnimation.value = withRepeat(
        withTiming(1, { duration: 2000 }),
        -1,
        true
      );
    } else {
      pulseAnimation.value = withTiming(0, { duration: 300 });
    }
  }, [connectionStatus]);

  const animatedPulseStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnimation.value, [0, 1], [1, 1.3]);
    const opacity = interpolate(pulseAnimation.value, [0, 1], [0.7, 0.3]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleAnimation.value }],
    };
  });

  const handleConnect = async () => {
    if (connectionStatus === 'connected') {
      setConnectionStatus('disconnected');
      scaleAnimation.value = withTiming(0.95, { duration: 100 }, () => {
        scaleAnimation.value = withTiming(1, { duration: 100 });
      });
    } else {
      setConnectionStatus('connecting');
      scaleAnimation.value = withTiming(0.95, { duration: 100 }, () => {
        scaleAnimation.value = withTiming(1, { duration: 100 });
      });
      
      // Simulate connection process
      setTimeout(() => {
        setConnectionStatus('connected');
      }, 2000);
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return '#10b981';
      case 'connecting':
        return '#f59e0b';
      default:
        return '#ef4444';
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'connecting':
        return 'Connecting...';
      default:
        return 'Not Connected';
    }
  };

  const getButtonText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Disconnect';
      case 'connecting':
        return 'Connecting...';
      default:
        return 'Connect';
    }
  };

  return (
    <LinearGradient
      colors={isDark ? ['#0f172a', '#1e293b'] : ['#f8fafc', '#e2e8f0']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>PulseVPN</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={[styles.statusText, { color: '#ffffff' }]}>{getStatusText()}</Text>
        </View>
      </View>

      <View style={styles.connectionSection}>
        <View style={styles.connectionVisual}>
          {connectionStatus === 'connected' && (
            <Animated.View style={[styles.pulseRing, animatedPulseStyle]} />
          )}
          
          <Animated.View style={[styles.connectionButton, animatedButtonStyle]}>
            <TouchableOpacity
              style={[
                styles.connectButton,
                { backgroundColor: connectionStatus === 'connected' ? '#10b981' : '#3b82f6' }
              ]}
              onPress={handleConnect}
              disabled={connectionStatus === 'connecting'}
            >
              <Shield
                size={48}
                color="#ffffff"
                strokeWidth={connectionStatus === 'connected' ? 2 : 1.5}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Text style={[styles.connectButtonText, { color: colors.text }]}>{getButtonText()}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <View style={styles.infoRow}>
            <MapPin size={20} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Server Location</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {selectedServer ? `${selectedServer.name}, ${selectedServer.location}` : 'No server selected'}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <View style={styles.infoRow}>
            <Zap size={20} color={colors.textSecondary} />
            <View style={styles.infoContent}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Your IP Address</Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {connectionStatus === 'connected' ? connectedIp : ipAddress}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {connectionStatus === 'connected' && (
        <View style={styles.securityBadge}>
          <Shield size={16} color="#10b981" />
          <Text style={[styles.securityText, { color: colors.success }]}>Your connection is secure</Text>
        </View>
      )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  connectionSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  connectionVisual: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  pulseRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#10b981',
  },
  connectionButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    elevation: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  connectButton: {
    flex: 1,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
  infoSection: {
    paddingHorizontal: 24,
    gap: 16,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});