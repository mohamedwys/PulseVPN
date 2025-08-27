# SecureVPN MVP - Expo Mobile App

A secure and private VPN mobile application built with Expo React Native.

## Features

- **Clean Authentication**: JWT-based login and registration
- **Beautiful UI**: Modern design with smooth animations
- **Connection Management**: Simple connect/disconnect with visual feedback
- **Server Selection**: Choose from available VPN servers
- **Settings**: Dark mode, auto-connect, and security preferences

## Technology Stack

- **Frontend**: Expo React Native with TypeScript
- **Navigation**: Expo Router with tab-based navigation
- **Animations**: React Native Reanimated
- **Styling**: React Native StyleSheet with custom design system
- **Fonts**: Inter font family for clean typography

## Project Structure

```
app/
├── (auth)/          # Authentication screens
├── (tabs)/          # Main app with tab navigation
├── _layout.tsx      # Root layout
└── index.tsx        # Entry point

services/
├── auth.ts          # Authentication service
└── vpn.ts           # VPN connection service

api/
├── auth.ts          # Auth API endpoints
└── vpn.ts           # VPN API endpoints

types/
└── vpn.ts           # TypeScript interfaces

utils/
└── vpnNative.ts     # Native VPN integration
```

## Important Notes

### VPN Functionality Limitations

This MVP provides the complete UI/UX foundation for a VPN app, but actual VPN functionality requires:

1. **Native Modules**: Expo managed workflow doesn't support VPN APIs
2. **Custom Development Build**: You'll need to eject or use a custom development build
3. **Native Implementation**: 
   - iOS: Network Extension with NEPacketTunnelProvider
   - Android: VpnService implementation
4. **System Permissions**: Special entitlements and permissions for VPN access

### Production Implementation

To implement actual VPN functionality:

1. **Eject from Expo Managed Workflow** or use EAS Build with custom native code
2. **Implement Native VPN Modules**:
   - Create native bridges for WireGuard or OpenVPN
   - Handle system VPN permissions
   - Manage tunnel configuration and routing
3. **Backend Infrastructure**:
   - Deploy VPN servers (WireGuard/OpenVPN)
   - Implement key exchange and session management
   - Set up monitoring and analytics
4. **Security Considerations**:
   - Implement proper key generation and rotation
   - Add kill switch functionality
   - Ensure DNS leak protection

### Testing

The current implementation provides:
- Complete UI/UX flow
- Authentication simulation
- Connection state management
- Server selection interface
- Settings configuration

## Development

```bash
npm run dev
```

## Deployment

This app includes the complete foundation for a VPN service. To deploy with actual VPN functionality, you'll need to implement the native VPN modules and backend infrastructure as outlined above.