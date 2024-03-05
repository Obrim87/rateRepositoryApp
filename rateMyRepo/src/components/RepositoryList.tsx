import { FlatList, View } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Repository, SortDropdownData, SortTypes } from '../types';
import { SelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import { SearchBar } from '@rneui/base';
import theme from '../theme';
import { useDebounce } from 'use-debounce';
// import repositories from '../data/repositories';

export const RepositoryListContainer = ({
  repositories,
  setSort,
  searchValue,
  setSearchValue,
  onEndReach
}: {
  repositories: Repository[];
  setSort: React.Dispatch<React.SetStateAction<SortTypes | undefined>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onEndReach: () => void;
}) => {
  const data: SortDropdownData[] = [
    { key: '1', value: 'Latest Repositories' },
    { key: '2', value: 'Highest Rated Repositories' },
    { key: '3', value: 'Lowest Rated Repositories' }
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <View>
            <SearchBar
              placeholder='Search'
              onChangeText={(value) => {
                setSearchValue(value);
              }}
              value={searchValue}
              inputContainerStyle={{ backgroundColor: 'white' }}
              containerStyle={{
                backgroundColor: theme.colors.mainBackground,
                borderBlockEndColor: theme.colors.mainBackground,
                borderBlockStartColor: theme.colors.mainBackground
              }}
              round={true}
            />
            <View style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}>
              <SelectList
                setSelected={(value: SortTypes) => setSort(value)}
                data={data}
                save='value'
                search={false}
                placeholder='Sort by:'
              />
            </View>
          </View>
        }
        ListHeaderComponentStyle={{ padding: 10 }}
        data={repositories ? repositories : []}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <RepositoryItem item={item} showGithubButton={false} />
        )}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.05}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [sort, setSort] = useState<SortTypes | undefined>();
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue] = useDebounce(searchValue, 500);
  const { repositories, fetchMore } = useRepositories(5, sort, debouncedValue);

  const onEndReach = () => {
    fetchMore && fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories ? repositories.edges : []}
      setSort={setSort}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
