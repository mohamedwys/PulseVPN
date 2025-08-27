export interface VPNServer {
  id: string;
  name: string;
  location: string;
  country: string;
  flag: string;
  endpoint: string;
  publicKey: string;
  country: string;
  latency: number;
  load: number;
  premium: boolean;
}

export interface VPNConfiguration {
  serverPublicKey: string;
  clientPrivateKey: string;
  clientPublicKey: string;
  endpoint: string;
  allowedIPs: string[];
  dns: string[];
}

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'disconnecting';

export interface UserSession {
  id: string;
  email: string;
  token: string;
  createdAt: string;
  expiresAt: string;
}

export interface VPNSession {
  id: string;
  userId: string;
  serverId: string;
  startTime: string;
  endTime?: string;
  bytesTransferred: number;
  status: ConnectionStatus;
}