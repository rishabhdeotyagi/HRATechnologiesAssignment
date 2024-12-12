import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal,
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import useFetch from './Fetch';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const {data, loading, error} = useFetch();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredData, setFilteredData] = useState(data);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  const categories = [
    'All',
    'history',
    'american',
    'english',
    'crime',
    'french',
    'magical',
  ];

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredData(data);
    } else {
      const filtered =
        data &&
        data.filter(item => item.tags && item.tags.includes(selectedCategory)); //Filter posts by tags
      setFilteredData(filtered);
    }
  }, [selectedCategory, data]);

  const listItemHorizontal = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PostDetails', {item});
        }}>
        <View style={styles.cardContainer}>
          <Image
            source={{uri: item.thumbnail}}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          <Text style={styles.titleStyle}>{item.title}</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.userIdStyle}>User ID: {item.userId}</Text>
            <Text style={styles.viewsStyle}>
              Views: {item.views ? item.views : 0}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const listItemVertical = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PostDetails', {item});
        }}>
        <View style={styles.verticalCardContainer}>
          <Image
            source={{uri: item.thumbnail}}
            style={styles.verticalImageStyle}
            resizeMode="cover"
          />
          <View style={styles.verticalContentContainer}>
            <View style={styles.titleTagContainer}>
              {item.tags &&
                item.tags.map((tag, index) => (
                  <Text key={index} style={styles.tagStyle}>
                    #{tag}{' '}
                  </Text>
                ))}
              <Text style={styles.viewsStyle}>Views: {item.views || 0}</Text>
            </View>
            <Text style={styles.verticalTitleStyle}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleCategoryPress = category => {
    setSelectedCategory(category);
  };

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem,
      ]}>
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const handleSearch = () => {
    console.log('Search');
  };

  const handleFilter = () => {
    setModalVisible(true);
  };

  const handleNotification = () => {
    console.log('Notification');
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.searchContainerStyle}>
        <View style={styles.searchInputContainer}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Icons name="search" size={24} color={'#ccc'} />
            <Text style={styles.searchText}> Search...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFilter}
            style={styles.filterIconContainer}>
            <Icons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleNotification}>
          <Icons
            name="bell"
            size={24}
            color="black"
            style={styles.notificationIcon}
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalBackText}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Filter By</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.filterOptionsContainer}>
              <Text style={styles.filterOptionText}>Date</Text>
              <Text style={styles.filterOptionText}>Author</Text>
              <Text style={styles.filterOptionText}>Tags</Text>
            </View>
          </View>
        </View>
      </Modal>

      <View>
        <Text style={styles.sectionTitle}>Recommended</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={listItemHorizontal}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{paddingHorizontal: 14}}
          />
        )}
      </View>

      <View>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContainer}
        />
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text>Error: {error.message}</Text>
        ) : (
          <FlatList
            data={selectedCategory === 'All' ? data : filteredData}
            renderItem={listItemVertical}
            keyExtractor={item => item.id.toString()}
            style={{paddingHorizontal: 14}}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainerStyle: {
    marginTop: 22,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 8,
    padding: 12,
    flex: 1,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchText: {
    marginLeft: 8,
    color: 'gray',
  },
  filterIconContainer: {
    marginLeft: 'auto',
  },
  notificationIcon: {
    marginLeft: 16,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 14,
  },
  sectionTitle: {
    paddingHorizontal: 14,
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  cardContainer: {
    width: 300,
    marginRight: 14,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  imageStyle: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  titleStyle: {
    fontWeight: 'bold',
    padding: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  userIdStyle: {
    fontSize: 12,
    color: 'gray',
  },
  viewsStyle: {
    fontSize: 12,
    color: 'gray',
  },

  categoryListContainer: {
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  categoryItem: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 8,
    backgroundColor: 'white',
  },
  selectedCategoryItem: {
    backgroundColor: 'black',
    borderColor: 'black',
  },

  categoryText: {
    color: 'black',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: 'white',
  },

  verticalCardContainer: {
    flexDirection: 'row',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'flex-start',
  },
  verticalImageStyle: {
    width: 100,
    height: 80,
    marginRight: 14,
    borderRadius: 4,
  },
  verticalContentContainer: {
    flex: 1,
  },
  titleTagContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tagStyle: {
    fontSize: 12,
    color: 'gray',
    marginRight: 4,
  },
  verticalTitleStyle: {
    fontWeight: 'bold',
    marginTop: 4,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 40,
    height: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalBackText: {
    fontSize: 16,
    color: 'blue',
  },
  modalDoneText: {
    fontSize: 16,
    color: 'blue',
  },
  filterOptionsContainer: {
    padding: 10,
  },
  filterOptionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});

export default HomeScreen;
