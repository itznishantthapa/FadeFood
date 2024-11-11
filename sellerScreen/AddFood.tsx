import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import Price from '../components/viewScreens/Price';
import { scaleHeight, scaleWidth } from '../Scaling';
import { styles } from '../style/style';
import { FontAwesome6 } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import TopBar from '../components/viewScreens/TopBar';

const PreviewFoodCard = ({ foodName, price, images }) => {
  return (
    <View style={styles.food_container}>
      <View style={{ flexDirection: 'row' }}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            resizeMode="cover"
            style={styles.foodImage}
          />
        ))}
        {[...Array(3 - images.length)].map((_, index) => (
          <View key={`empty-${index}`} style={[styles.foodImage, { backgroundColor: '#E1E1E1' }]} />
        ))}
      </View>

      <View style={styles.infoSection}>
        <View style={styles.namePriceRow}>
          <Text style={styles.foodName}>{foodName || 'Food Name'}</Text>
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

const AddFood = ({ navigation }) => {
  const [foodName, setFoodName] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to upload images!');
      return;
    }

    if (images.length >= 3) {
      alert('You can only upload up to 3 images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const handleUpload = () => {
    // Here you would implement the upload logic
    console.log('Uploading:', { foodName, price, images });
    alert('Food item ready for upload!');
  };

  const handleDeleteLastImage = () => {
    setImages(images.slice(0, -1));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F0F4F8" }}>
      <StatusBar hidden={false} backgroundColor="#F0F4F8" style="dark" />
      <TopBar navigation={navigation} top_title='Add/Edit' />
      <View style={{ padding: 10 }}>
        <PreviewFoodCard
          foodName={foodName}
          price={Number(price)}
          images={images}
        />

        <View style={localStyles.inputContainer}>
          <Text style={localStyles.label}>Food Name</Text>
          <TextInput
            style={localStyles.input}
            value={foodName}
            onChangeText={setFoodName}
            placeholder="Enter food name"
          />

          <Text style={localStyles.label}>Price</Text>
          <TextInput
            style={localStyles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={localStyles.label}>Images ({images.length}/3)</Text>
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
              <Text style={localStyles.uploadButtonText}>Upload Food Item</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[localStyles.uploadButton, { backgroundColor: 'red' }]} onPress={handleUpload}>
              <Text style={localStyles.uploadButtonText}> Delete Item</Text>
            </TouchableOpacity>
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