import { Image, StyleSheet, View } from 'react-native';
import { Repository } from '../types';
import { Text } from './Text';
import theme from '../theme';
import Statistic from './Statistic';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15
  },
  details: {
    flexDirection: 'row'
  },
  stats: {
    flexDirection: 'row'
  },
  singleStat: {
    flexDirection: 'column',
    flexGrow: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center'
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 20
  },
  language: {
    color: 'white',
    borderRadius: 4,
    padding: 5,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    overflow: 'hidden'
  },
  separator: {
    marginBottom: 8
  }
});

const RepositoryItem = ({ item }: { item: Repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
        <View>
          <Text
            color='textPrimary'
            fontWeight='bold'
            fontSize='subheading'
            style={styles.separator}>
            {item.fullName}
          </Text>
          <Text color='textPrimary' style={styles.separator}>
            {item.description}
          </Text>
          <Text style={styles.language}>{item.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Statistic title='Stars' count={item.stargazersCount} />
        <Statistic title='Forks' count={item.forksCount} />
        <Statistic title='Reviews' count={item.reviewCount} />
        <Statistic title='Rating' count={item.ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;
