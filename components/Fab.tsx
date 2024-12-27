import { Colors } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { toast } from 'sonner-native'
import * as Haptics from 'expo-haptics'

const Fab = () => {
  const router = useRouter()

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/task/new');
  };

  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <Ionicons name="add" size={28} color="White" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    borderRadius: 50,
    zIndex: 1000,
    bottom: 24,
    right: 24,
    height: 56,
    width: 56,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.2)'
  },
});

export default Fab