import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
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
                source={{  uri: imageObj.image.startsWith('file') ? imageObj.image : `${baseURL}${imageObj.image}` }}
                resizeMode="cover"
                style={styles.foodImage}
              />
            ))
        
        }
        {
            [...Array(3 - images.length )].map((_, index) => (
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

const foodInitialInfoState={
  food_name: '',
  food_price: '',
  images: []
}

const foodInfoReducer = (state, action) => {
  switch(action.type){
    case 'id':
      return {...state, id: action.payload}
    case 'add_food_name':
      return {...state, food_name: action.payload}
    case 'add_food_price':
      return {...state, food_price: action.payload}
    case 'add_food_image':
      return {...state, images: [...state.images,action.payload]}
    case 'remove_image':
      return {...state, images: state.images.filter(image => image.image !== action.payload) 
      }
      case 'clear_food_images':
        return {
          ...state,
          images: [],
        };
  }
}

const AddFood = ({ navigation, route }) => {

  const { food_state, food_dispatch } = useContext(myContext);

  const [foodInfoState, foodInfo_dispatch] = useReducer(foodInfoReducer, foodInitialInfoState);
  const [isgoingToUpdate, setisgoingToUpdate] = useState(false)

  useEffect(() => {
    const { food_id_params = null, food_name_params = '', food_price_params = '', food_image_params = null } = route.params || {};
    if (food_name_params && food_price_params) {
      setisgoingToUpdate(true);
    }
    foodInfo_dispatch({type: 'id', payload: food_id_params})
    foodInfo_dispatch({type: 'add_food_name', payload: food_name_params})
    foodInfo_dispatch({type: 'add_food_price', payload: food_price_params.toString() || ''})

    if (food_image_params) {
      const newImages = food_image_params.map((item) => ({id:item.id, image: item.image }));
      newImages.forEach((image) => {
        foodInfo_dispatch({type: 'add_food_image', payload: image})
      })
    } else {
      foodInfo_dispatch({ type: 'clear_food_images' });
    }
  }, [route.params]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        foodInfo_dispatch({type: 'id', payload: null})
        foodInfo_dispatch({type: 'add_food_name', payload: ''})
        foodInfo_dispatch({type: 'add_food_price', payload: ''})
        foodInfo_dispatch({ type: 'clear_food_images' });
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


    if (foodInfoState.images.length >= 3) {
      alert('You can only upload up to 3 images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [3, 4],
      // aspect: 2/1,
      quality: 1,
    });

    if (!result.canceled) {
      foodInfo_dispatch({type: 'add_food_image', payload: { image: result.assets[0].uri}})
    }
  };



  const handleUpload = async () => {
    if (!foodInfoState.food_name || !foodInfoState.food_price ) {
      alert('Please fill all the fields');
      return;
    }

    if (!(foodInfoState.images.length === 3)) {
      alert('Please upload 3 images');
      return
    }
    const foodObj = {
      food_name: foodInfoState.food_name,
      food_price: foodInfoState.food_price,
      id: foodInfoState.id,
    }
    console.log('imageUris:-->', foodInfoState.images);
    if (!isgoingToUpdate) {
      console.log('Going to POST');
      const response = await post_data_with_img('add_food', foodObj, foodInfoState.images, 'POST');
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
      const response = await post_data_with_img('edit_food',foodObj, foodInfoState.images , 'PUT');
      if (response.success) {
        food_dispatch({ type: 'UPDATE_FOOD', payload: response.data });
        navigation.navigate('Menu');
        console.log('Food updated successfully');
      }
    }

  };

  const handleDeleteLastImage = () => {

    if (foodInfoState.images.length > 0) {
      foodInfo_dispatch({type: 'remove_image', payload: foodInfoState.images[foodInfoState.images.length - 1].image}) 
    }
  };

  const handleDeleteFood = async () => {
    const response = await delete_data_with_id('delete_food', { id: foodInfoState.id });
    if (response.success) {
      food_dispatch({ type: 'REMOVE_FOOD', payload: foodInfoState.id });
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
          food_name={foodInfoState.food_name}
          price={Number( foodInfoState.food_price)}
          images={ foodInfoState.images}
        />

        <View style={localStyles.inputContainer}>
          <Text style={localStyles.label}>Food Name</Text>
          <TextInput
            style={localStyles.input}
            value={foodInfoState.food_name}
            onChangeText={(text) => foodInfo_dispatch({type: 'add_food_name', payload: text})}
            placeholder="Enter food name"
          />

          <Text style={localStyles.label}>Price</Text>
          <TextInput
            style={localStyles.input}
            value={foodInfoState.food_price}
            onChangeText={(text) => foodInfo_dispatch({type: 'add_food_price', payload: text})}
            placeholder="Enter price"
            keyboardType="numeric"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={localStyles.label}>Images ({foodInfoState.images.length}/3)</Text>
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
    fontFamily: 'montserrat_semibold',
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