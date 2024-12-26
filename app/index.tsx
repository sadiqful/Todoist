import { useOAuth } from "@clerk/clerk-expo";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from "@/constants/Colors";

export default function Index() {
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_apple'});
  const { startOAuthFlow: googleOAuth} = useOAuth({ strategy: 'oauth_google'});
  const { top } = useSafeAreaInsets();

  const handleAppleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      console.log("🚀 ~ handleAppleOAuth ~ createdSessionId:", createdSessionId)

      if (createdSessionId) {
        setActive!({session: createdSessionId})
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleGoogleOAuth = async () => {
    try {
      const { createdSessionId, setActive } = await googleOAuth();
      console.log("🚀 ~ handleGoogleOAuth ~ createdSessionId:", createdSessionId)

      if (createdSessionId) {
        setActive!({session: createdSessionId})
      }
    } catch (error) {
      console.log(error)
    }
  };

  const openLink = async () => {
    WebBrowser.openBrowserAsync('http://github.com/sadiqful');
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <Image source={require('@/assets/images/todoist-logo.png')} style={styles.loginImage} />
      <Image source={require('@/assets/images/login.png')} style={styles.bannerImage} />
      <View style={[styles.buttonContainer]}>
        <TouchableOpacity style={styles.button} onPress={handleAppleOAuth}>
          <Ionicons name="logo-apple" size={24} />
          <Text style={[styles.buttonText]}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGoogleOAuth}>
          <Ionicons name="logo-google" size={24} />
          <Text style={[styles.buttonText]}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="mail" size={24} />
          <Text style={[styles.buttonText]}>Continue with Email</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          By Continuing you agree to Todoist's{' '}
          <Text style={styles.link} onPress={openLink}>
            Terms of service
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={openLink}> 
            Privacy policy
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 40,
    marginTop: 20,
  },
  loginImage: {
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  bannerImage: {
    height: 280,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonContainer: {
    gap: 20,
    marginHorizontal: 40
},
  button: {
    flexDirection: 'row',
    borderRadius: 6,
    padding: 12,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightBorder,
    borderWidth: StyleSheet.hairlineWidth
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
  },
  link: {
    color: Colors.lightText,
    fontSize: 12,
    textAlign: 'center',
    textDecorationLine: 'underline',
  }
});