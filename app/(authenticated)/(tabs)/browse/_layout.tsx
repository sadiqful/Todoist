import { Colors } from '@/constants/Colors'
import { Link, Stack } from 'expo-router'
import { Image, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons';
const Layout = () => {
  return ( 
    <Stack screenOptions={{
      headerShadowVisible: false, 
      contentStyle: { backgroundColor: Colors.backgroundAlt}
      }}>
      <Stack.Screen 
      name='index' 
      options={{ title: 'Browse',
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight />
      }} 
    />
    </Stack>
  )
}

const HeaderLeft = () => {
  const  { user } = useUser();
  return <Image source={{ uri: user?.imageUrl }} style={styles.image} />
}

const HeaderRight = () => {
  return (
    // <Link href='/browse/settings'>
    <Ionicons name='settings-outline' size={24} color={Colors.primary} />
    // </Link>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
  }
})
export default Layout