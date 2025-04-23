import React, { useState } from 'react';
import { 
    View, 
    Image, 
    StyleSheet 
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Button from '../components/Button';

const PhotoContainer: React.FC = () => {
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const takePhotoWithCamera = () => {
        launchCamera(
            {
                mediaType: 'photo',
                saveToPhotos: true,
            },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setPhotoUri(response.assets[0].uri || null);
                }
            }
        );
    };

    const choosePhotoFromLibrary = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            (response) => {
                if (response.assets && response.assets.length > 0) {
                    setPhotoUri(response.assets[0].uri || null);
                }
            }
        );
    };

    return (
        <View style={styles.container}>
            {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
            <Button title="Take Photo with Camera" onPress={takePhotoWithCamera} />
            <Button title="Choose Photo from Library" onPress={choosePhotoFromLibrary} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 16,
        borderRadius: 8,
    },
});

export default PhotoContainer;