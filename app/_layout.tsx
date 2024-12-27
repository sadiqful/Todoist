import { router, Stack, usePathname, useRouter, useSegments } from 'expo-router'
import { ClerkProvider, ClerkLoaded, useAuth } from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import { tokenCache } from '@/utils/cache'
import { Colors } from '@/constants/Colors';
import React, { useEffect } from 'react';
import { ActivityIndicator, LogBox, View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Toaster} from 'sonner-native'


LogBox.ignoreLogs(['Clerk: Clerk has been loaded with development keys'])

Sentry.init({
  dsn: 'https://396e61d26d72bd049a1bb0861aec229b@o4508538587906048.ingest.us.sentry.io/4508538593804288',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

const InitialLayout = () => {
  const { isLoaded, isSignedIn} = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const pathName = usePathname();

  useEffect(() => {
    if (!isLoaded) return 

    const inAuthGroup = segments[0] === '(authenticated)'

    if (isSignedIn && !inAuthGroup) {
      router.replace('/(authenticated)/(tabs)/today')
    } else if (!isSignedIn && pathName !== '/') {
      router.replace('/')
    }
  },[isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    )
  }

  return (
    <Stack screenOptions={{headerShown: false, contentStyle: {backgroundColor: Colors.background}} }>
      <Stack.Screen name='index' />
    </Stack>
  )
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{ flex: 1}}>
          <Toaster />
        <InitialLayout /> 
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  )
}

export default RootLayout