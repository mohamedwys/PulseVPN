import { VPNServer, VPNConfiguration } from '@/types/vpn';

export const VPN_API_BASE = 'https://your-vpn-api.com/vpn';

export async function getVPNServers(token: string): Promise<VPNServer[]> {
  const response = await fetch(`${VPN_API_BASE}/servers`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch servers');
  }

  return response.json();
}

export async function getVPNConfiguration(serverId: string, token: string): Promise<VPNConfiguration> {
  const response = await fetch(`${VPN_API_BASE}/servers/${serverId}/config`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get VPN configuration');
  }

  return response.json();
}

export async function createVPNSession(serverId: string, token: string): Promise<{ sessionId: string }> {
  const response = await fetch(`${VPN_API_BASE}/sessions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ serverId }),
  });

  if (!response.ok) {
    throw new Error('Failed to create VPN session');
  }

  return response.json();
}

export async function endVPNSession(sessionId: string, token: string): Promise<void> {
  await fetch(`${VPN_API_BASE}/sessions/${sessionId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
}