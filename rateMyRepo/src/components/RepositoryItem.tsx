import {
  Image,
  StyleSheet,
  View,
  Pressable,
  Linking,
  Alert
} from 'react-native';
import { Repository } from '../types';
import { Text } from './Text';
import theme from '../theme';
import Statistic from './Statistic';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10
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

const RepositoryItem = ({
  item,
  showGithubButton
}: {
  item: Repository;
  showGithubButton: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <Pressable
      onPress={() => {
        navigate(`/repository/${item.node.id}`);
      }}>
      <View style={styles.container} testID='repositoryItem'>
        <View style={styles.details}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: item.node.ownerAvatarUrl }}
          />
          <View style={{ flexShrink: 1 }}>
            <Text
              color='textPrimary'
              fontWeight='bold'
              fontSize='subheading'
              style={styles.separator}>
              {item.node.fullName}
            </Text>
            <Text color='textPrimary' style={styles.separator}>
              {item.node.description}
            </Text>
            <Text style={styles.language}>
              {item.node.language ? item.node.language : 'Unknown'}
            </Text>
          </View>
        </View>
        <View style={styles.stats}>
          <Statistic title='Stars' count={item.node.stargazersCount} />
          <Statistic title='Forks' count={item.node.forksCount} />
          <Statistic title='Reviews' count={item.node.reviewCount} />
          <Statistic title='Rating' count={item.node.ratingAverage} />
        </View>
        {showGithubButton && (
          <Pressable
            onPress={async () => {
              const supported = await Linking.canOpenURL(item.node.url);

              if (supported) {
                await Linking.openURL(item.node.url);
              } else {
                Alert.alert(`Cannot open this URL: ${item.node.url}`);
              }
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'white' : theme.colors.primary,
                alignItems: 'center',
                margin: 10,
                padding: 15,
                borderRadius: 3,
                shadowRadius: 5
              }
            ]}>
            {({ pressed }) => (
              <Text
                color={pressed ? 'textPrimary' : 'textSecondary'}
                fontWeight='bold'>
                Open in GitHub
              </Text>
            )}
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
