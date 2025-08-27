import { useEffect } from 'react';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    // For MVP, we'll start with auth flow
    router.replace('/(auth)/login');
  }, []);

  return null;
}