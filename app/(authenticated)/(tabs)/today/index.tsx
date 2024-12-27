import { View, Text, StyleSheet } from 'react-native';
import Fab from '@/components/Fab';
const Page = () => {
  return (
    <View style={styles.container}>
      <Fab />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 82,
  },
});