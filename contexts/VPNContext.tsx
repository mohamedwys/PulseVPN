import React, { createContext, useContext, useState, useEffect } from 'react';
import { VPNServer, ConnectionStatus } from '@/types/vpn';

interface VPNContextType {
  selectedServer: VPNServer | null;
  connectionStatus: ConnectionStatus;
  servers: VPNServer[];
  setSelectedServer: (server: VPNServer) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setServers: (servers: VPNServer[]) => void;
}

const VPNContext = createContext<VPNContextType | undefined>(undefined);

const defaultServers: VPNServer[] = [
  {
    id: 'us-east-1',
    name: 'New York',
    location: 'United States',
    country: 'US',
    flag: '🇺🇸',
    endpoint: '104.248.45.23:51820',
    publicKey: 'server_public_key_us_east_1',
    latency: 24,
    load: 45,
    premium: false,
  },
  {
    id: 'eu-west-1',
    name: 'London',
    location: 'United Kingdom',
    country: 'GB',
    flag: '🇬🇧',
    endpoint: '178.62.85.134:51820',
    publicKey: 'server_public_key_eu_west_1',
    latency: 67,
    load: 32,
    premium: false,
  },
  {
    id: 'ap-southeast-1',
    name: 'Singapore',
    location: 'Singapore',
    country: 'SG',
    flag: '🇸🇬',
    endpoint: '165.22.98.45:51820',
    publicKey: 'server_public_key_ap_southeast_1',
    latency: 156,
    load: 28,
    premium: false,
  },
  {
    id: 'eu-central-1',
    name: 'Frankfurt',
    location: 'Germany',
    country: 'DE',
    flag: '🇩🇪',
    endpoint: '142.93.45.78:51820',
    publicKey: 'server_public_key_eu_central_1',
    latency: 89,
    load: 55,
    premium: false,
  },
  {
    id: 'eu-west-2',
    name: 'Paris',
    location: 'France',
    country: 'FR',
    flag: '🇫🇷',
    endpoint: '159.89.145.67:51820',
    publicKey: 'server_public_key_eu_west_2',
    latency: 72,
    load: 38,
    premium: false,
  },
];

export function VPNProvider({ children }: { children: React.ReactNode }) {
  const [servers, setServers] = useState<VPNServer[]>(defaultServers);
  const [selectedServer, setSelectedServer] = useState<VPNServer | null>(defaultServers[0]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');

  return (
    <VPNContext.Provider
      value={{
        selectedServer,
        connectionStatus,
        servers,
        setSelectedServer,
        setConnectionStatus,
        setServers,
      }}
    >
      {children}
    </VPNContext.Provider>
  );
}

export function useVPN() {
  const context = useContext(VPNContext);
  if (context === undefined) {
    throw new Error('useVPN must be used within a VPNProvider');
  }
  return context;
}