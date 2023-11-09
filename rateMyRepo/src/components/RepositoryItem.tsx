import { Image, StyleSheet, View } from 'react-native';
import { Repository } from '../types';
import { Text } from './Text';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50
  }
});

const RepositoryItem = ({ item }: { item: Repository }) => {
  return (
    <View>
      <Image style={styles.tinyLogo} source={{ uri: item.ownerAvatarUrl }} />
      <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>
        Full name: {item.fullName}
      </Text>
      <Text color='textPrimary'>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;

// image showing
// work on getting larger numbers to show either k or m
