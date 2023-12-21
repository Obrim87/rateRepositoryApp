import { StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { numFormatter } from '../utils';

interface StatisticProps {
  title: string;
  count: number;
}

const styles = StyleSheet.create({
  singleStat: {
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center'
  }
});

const Statistic = ({ title, count }: StatisticProps) => {
  return (
    <View style={styles.singleStat}>
      <Text fontWeight='bold'>{numFormatter(count, 1)}</Text>
      <Text>{title}</Text>
    </View>
  );
};

export default Statistic;
