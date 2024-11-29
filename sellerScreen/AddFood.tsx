import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import Price from '../components/viewScreens/Price';
import { scaleHeight, scaleWidth } from '../Scaling';
import { styles } from '../style/style';
import { FontAwesome6 } from '@expo/vector-icons';
import TopBar from '../components/viewScreens/TopBar';
import { myContext } from '../context/AppProvider';
import { baseURL, delete_data, delete_data_with_id, post_data, post_data_with_img, update_data } from '../service';
import { useFocusEffect } from '@react-navigation/native';

const PreviewFoodCard = ({ food_name, price, images }) => {
  return (
    <View style={styles.food_container}>
      <View style={{ flexDirection: 'row' }}>
        {
            images.map((imageObj, index) => (
              <Image
                key={index}
                source={{ uri: imageObj.image.startsWith('file') ? imageObj.image : `${baseURL}${imageObj.image}` }}
                // source={{ uri: imageObj.image }}
                resizeMode="cover"
                style={styles.foodImage}
              />
            ))
        
        }
        {
            [...Array(3 - images.length)].map((_, index) => (
              <View key={`empty-${index}`} style={[styles.foodImage, { backgroundColor: '#E1E1E1' }]} />
            ))
        }
      </View>

      <View style={styles.infoSection}>
        <View style={styles.namePriceRow}>
          <Text style={styles.foodName}>{food_name || 'Food Name'}</Text>
          <Price priceFontSize={18} price={price || 0} />
        </View>

        <View style={styles.restaurantRow}>
          <View style={styles.restaurantInfo}>
            <View style={styles.restaurantLogo}></View>
            <Text style={styles.restaurantName}>Delicious Restaurant</Text>
          </View>

          <View style={styles.addToListButton}>
            <Text style={styles.buttonText}>Add to List</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const AddFood = ({ navigation, route }) => {
  const { food_state, food_dispatch } = useContext(myContext);

  const [food_name, setfood_name] = useState('');
  const [food_price, setPrice] = useState('');
  const [food_image, setImages] = useState([]);
  const [id, setid] = useState(null)
  const [isgoingToUpdate, setisgoingToUpdate] = useState(false)

  // Update state when route.params changes
  useEffect(() => {
    const { food_id_params = null, food_name_params = '', food_price_params = '', food_image_params = null } = route.params || {};
    if (food_name_params && food_price_params) {
      setisgoingToUpdate(true);
    }
    setid(food_id_params);
    setfood_name(food_name_params);
    setPrice(food_price_params.toString() || '');

    if (food_image_params) {
      const newImages = food_image_params.map((item) => ({ image: item.image }));
      setImages(newImages);
    } else {
      setImages([]);
    }
  }, [route.params]);

  // Clear the state on focus out
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setid(null);
        setfood_name('');
        setPrice('');
        setImages([]);
        setisgoingToUpdate(false);
      };
    }, [])
  );

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload images!');
      return;
    }

    if (food_image.length >= 3) {
      alert('You can only upload up to 3 images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...food_image, { image: result.assets[0].uri }]);
      // setImages([...food_image, result.assets[0].uri]);
    }
  };



  const handleUpload = async () => {
    //Validate the input
    if (!food_name || !food_price) {
      alert('Please fill all the fields');
      return;
    }
    const imageUris = food_image.map((item) => item.image);
    console.log('imageUris:-->', imageUris);
    if (!isgoingToUpdate) {
      console.log('Going to POST');
      const response = await post_data_with_img(
        'add_food', 
        { food_name, food_price }, 
        imageUris, 
        'POST' 
      );
      if (response.success) {
        food_dispatch({ type: "ADD_FOOD", payload: response.data });
        navigation.navigate('Menu');
        response.data.images.forEach((img, index) => {
          console.log(`Image ${index + 1}:`, img);
          console.log('Image URL:', img.image);
          console.log('Image ID:', img.id);
        });
      }
    } else if (isgoingToUpdate) {
      console.log('Going to PUT');
      // const response = await update_data('edit_food', { food_name: food_name, food_price: food_price, id: id });
      const response = await post_data_with_img('edit_food',{ food_name, food_price, id },imageUris, 'PUT');
      if (response.success) {
        food_dispatch({ type: 'UPDATE_FOOD', payload: response.data });
        navigation.navigate('Menu');
        console.log('Food updated successfully');
      }
    }

  };

  const handleDeleteLastImage = () => {
    setImages(food_image.slice(0, -1));
  };

  const handleDeleteFood = async () => {
    const response = await delete_data_with_id('delete_food', { id: id });
    if (response.success) {
      food_dispatch({ type: 'REMOVE_FOOD', payload: id });
      navigation.navigate('Menu');
      console.log('Food deleted successfully');
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F8" }}>
      <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
      <TopBar navigation={navigation} top_title='Add/Edit' withSettingIcons={undefined} handleSettingIcon={undefined} />
      <View style={{ padding: 10 }}>
        <PreviewFoodCard
          food_name={food_name}
          price={Number(food_price)}
          images={food_image}
        />

        <View style={localStyles.inputContainer}>
          <Text style={localStyles.label}>Food Name</Text>
          <TextInput
            style={localStyles.input}
            value={food_name}
            onChangeText={setfood_name}
            placeholder="Enter food name"
          />

          <Text style={localStyles.label}>Price</Text>
          <TextInput
            style={localStyles.input}
            value={food_price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={localStyles.label}>Images ({food_image.length}/3)</Text>
            <TouchableOpacity onPress={handleDeleteLastImage}>
              <FontAwesome6 name="delete-left" size={20} color='red'></FontAwesome6>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={localStyles.imagePickerButton}
            onPress={pickImage}
          >
            <Text style={localStyles.imagePickerButtonText}> Pick an Image </Text>
          </TouchableOpacity>

          <View style={{ gap: 10, marginTop: 80 }}>
            <TouchableOpacity
              style={localStyles.uploadButton}
              onPress={handleUpload}
            >
              <Text style={localStyles.uploadButtonText}>{isgoingToUpdate ? 'Update' : 'Upload'} Food Item</Text>
            </TouchableOpacity>
            {
              isgoingToUpdate && (

                <TouchableOpacity style={[localStyles.uploadButton, { backgroundColor: 'red' }]} onPress={handleDeleteFood}>
                  <Text style={localStyles.uploadButtonText}> Delete Item</Text>
                </TouchableOpacity>
              )
            }
          </View>


        </View>
      </View>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  inputContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: '#E1E1E1',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default AddFood;