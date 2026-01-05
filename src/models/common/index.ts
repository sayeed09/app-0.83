import { StackNavigationProp } from '@react-navigation/stack';

export interface IBaseProps {
  navigation: StackNavigationProp<any, string>;
  route: any;
}
