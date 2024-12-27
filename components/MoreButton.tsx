import { View, Text } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'

type MoreButtonProps = {
  pageName: string;
};

const MoreButton = ({ pageName }: MoreButtonProps ) => {
  return (
    <View>
      <Text>{pageName}</Text>
    </View>
  )
}

export default MoreButton