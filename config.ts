import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';


//export const BASE_URL = 'https://krossbirdsapp-production.up.railway.app/api';
export const BASE_URL = 'http://127.0.0.1:9000/api';
//export const URL = 'https://krossbirdsapp-production.up.railway.app/'
export const EMPTY_URL = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=is&k=20&c=_o_WQ-NIhIyiDOBe5kEHl9QAyUNeYxWz0d-oJkC2znk=';
export const URL = 'http://127.0.0.1:9000/'
export const TOP_STORIES_IDS = '/topstories.json?print=pretty';
export const EMAIL_AND_PHONE_LOGIN = '/user';
export const VERIFY_OTP = '/verify-otp';
export const RESEND_OTP = '/resend-otp';
export const SETUP_PROFILE = '/setup-profile';
export const UPLOAD_IMAGE_PROFILE = '/upload-image';
export const USER = '/user';
export const USER_LIST = '/user-list';
export const USER_MATCHES = '/user-match';
export const CONVERSATIONS = '/conversations';
export const LIKES = '/likes';

export const CATEGORY = (name: string) => `/category/${name}`

export const STORIES_DETAIL = (id: number) =>  `/item/${id}.json`;

export const UPLOAD_IMAGE =  async(url: string, type: any, body: any = null) => {
  try {

    const uploadResult = await FileSystem.uploadAsync(`${BASE_URL}${url}`, body, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      headers: {
        'authorization': await AsyncStorage.getItem('token') || '',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      fieldName: 'name'
    });
    return JSON.parse(uploadResult.body);
  } catch (error){
    return error;
}
}
export const SERVER_REQUEST = async (url: string, type: string, body: any = null, image:boolean = false) => {
    try {
        const response = type.toLowerCase() === 'post' ?
            await fetch(`${BASE_URL}${url}`,
                {
                    method: 'POST',
                  headers: {
                    'Authorization': await AsyncStorage.getItem('token') || '',
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                }
            )
                : await fetch(`${BASE_URL}${url}`,
                {
                    method: 'GET',
                    headers: {
                      'Authorization': await AsyncStorage.getItem('token') || '',
                      'Content-Type': 'application/json',
                      },
                }
                )
            const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
}


export const FONT_CONFIG = {
    web: {
      regular: {
        fontFamily: 'sans-serif',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'sans-serif-medium',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'sans-serif-thin',
        fontWeight: 'normal',
      },
    },
    ios: {
      regular: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
    },
    android: {
      regular: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Averta',
        fontWeight: 'normal',
      },
    }
  };