import { Colors } from '@/constants/Colors'
import { Stack } from 'expo-router'
import MoreButton from '@/components/MoreButton'
const Layout = () => {
  return ( 
    <Stack>
      <Stack.Screen 
      name='index' 
      options={{ title: 'Upcoming', headerShadowVisible: false,
      headerRight: () => <MoreButton pageName='Upcoming' />
      }} 
    />
    </Stack>
  )
}
export default Layout