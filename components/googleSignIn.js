// GoogleSignIn.js
import React, { useEffect, useContext } from 'react';
import { Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { AuthContext } from '../context/auth';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const [state, setState] = useContext(AuthContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'YOUR_EXPO_CLIENT_ID',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID',
    iosClientId: 'YOUR_IOS_CLIENT_ID',
    webClientId: 'YOUR_WEB_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      // Optionally, fetch additional user info from Google APIs here
      setState({
        token: authentication.accessToken,
        user: {}, // Populate with user info if needed
      });
      // Optionally, persist the auth state with AsyncStorage here
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Sign in with Google"
      onPress={() => promptAsync()}
    />
  );
}
