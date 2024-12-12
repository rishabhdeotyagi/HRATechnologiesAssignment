import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostDetails = ({route}) => {
  const {item} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
      </View>
      <Image source={null} style={styles.detailImage} resizeMode="cover" />
      <Text style={styles.detailTitle}>{item.title}</Text>
      <Text style={styles.detailBody}>{item.body}</Text>

      <View style={styles.detailFooter}>
        <Text style={styles.userIdStyle}>User ID: {item.userId}</Text>
        <Text style={styles.viewsStyle}>Views: {item.views || 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: 16,
  },
  detailHeader: {
    marginBottom: 16,
    alignItems: 'flex-start',
  },

  detailImage: {
    width: '100%',
    height: 200,
    marginBottom: 12,
    borderRadius: 8,
  },

  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  detailBody: {
    fontSize: 16,
    marginBottom: 16,
  },

  detailFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PostDetails;
