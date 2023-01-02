import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';


export const BASE_URL = 'https://krossbirdsapp-production.up.railway.app/api';
//export const BASE_URL = 'http://10.0.2.2:9000/api'
//export const BASE_URL = 'http://127.0.0.1:9000/api';
export const URL = 'https://krossbirdsapp-production.up.railway.app/'
export const EMPTY_URL = 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=is&k=20&c=_o_WQ-NIhIyiDOBe5kEHl9QAyUNeYxWz0d-oJkC2znk=';
//export const URL = 'http://127.0.0.1:9000/'
//export const URL = 'http://10.0.2.2:9000/'
export const TOP_STORIES_IDS = '/topstories.json?print=pretty';
export const EMAIL_AND_PHONE_LOGIN = '/user';
export const VERIFY_OTP = '/verify-otp';
export const RESEND_OTP = '/resend-otp';
export const SETUP_PROFILE = '/setup-profile';
export const UPLOAD_IMAGE_PROFILE = '/upload-image';
export const USER = '/user';
export const UPGRADE_SUBSCRIPTION_PLAN = '/upgrade-plan';
export const USER_LIST = '/user-list';
export const USER_FILTER_LIST = '/filter-user-list';
export const USER_MATCHES = '/user-match';
export const CONVERSATIONS = '/conversations';
export const LIKES = '/likes';
export const DELETE_IMAGE = '/delete-image';
export const DELETE_ACCOUNT = '/delete-account';
export const SAVE_PUSH_NOTIFICATION_TOKEN = '/save-token';
export const UNMATCH_USER = (id: string) => `/unmatch/${id}`;
export const BLOCK_USER = (id: string) => `/block/${id}`;
export const CATEGORY = (name: string) => `/category/${name}`

export const STORIES_DETAIL = (id: number) =>  `/item/${id}.json`;

export const UPLOAD_IMAGE = async (url: string, type: any, body: any = null) => {
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
  } catch (error) {
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

export const CONVERT_IMAGE_TO_BASE64 = async (data: string) => {
  try {
    const base64 = await FileSystem.readAsStringAsync("https://www.lindaikejisblog.com/photos/shares/thumbs/63a74bc5d159a.PNG", { encoding: 'base64' });
    console.log(base64)
  } catch (e) {
    console.log(e)
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
  

export const PLACEHOLDER_IMAGE = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/7QB8UGhvd
G9zaG9wIDMuMAA4QklNBAQAAAAAAGAcAlAAFFBhdHJpY2sgRGF4ZW5iaWNobGVyHAJ4ACVWZWN0b3IgZ3JhcGhpYyBvZiBub
yB0aHVtYm5haWwgc3ltYm9sHAJuABhHZXR0eSBJbWFnZXMvaVN0b2NrcGhvdG//4QB8RXhpZgAASUkqAAgAAAAEAA4BAgAlAAA
APgAAABoBBQABAAAAZAAAABsBBQABAAAAbAAAACgBAwABAAAAAgAAAAAAAABWZWN0b3IgZ3JhcGhpYyBvZiBubyB0aHVtYm5haWwg
c3ltYm9sACwBAAABAAAALAEAAAEAAAD/4QVQaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIg
aWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIj4KCTxyZGY6UkRGIHh
tbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CgkJPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJv
dXQ9IiIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczpJcHRjNHhtcENvcmU9Imh0dH
A6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBDb3JlLzEuMC94bWxucy8iICAgeG1sbnM6R2V0dHlJbWFnZXNHSUZUPSJodHRwOi8veG1wLmdldHR5a
W1hZ2VzLmNvbS9naWZ0LzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGx1cz0iaHR0cDovL
25zLnVzZXBsdXMub3JnL2xkZi94bXAvMS4wLyIgIHhtbG5zOmlwdGNFeHQ9Imh0dHA6Ly9pcHRjLm9yZy9zdGQvSXB0YzR4bXBFeHQvMjAwOC
0wMi0yOS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHBob3Rvc2hvcDpDcmVkaXQ9Ik
dldHR5IEltYWdlcy9pU3RvY2twaG90byIgR2V0dHlJbWFnZXNHSUZUOkFzc2V0SUQ9IjExNDc1NDQ4MDciIHhtcFJpZ2h0czpXZWJTdGF0
ZW1lbnQ9Imh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9sZWdhbC9saWNlbnNlLWFncmVlbWVudD91dG1fbWVkaXVtPW9yZ2FuaWMm
YW1wO3V0bV9zb3VyY2U9Z29vZ2xlJmFtcDt1dG1fY2FtcGFpZ249aXB0Y3VybCIgPgo8ZGM6Y3JlYXRvcj48cmRmOlNlcT48cmRmOm
xpPlBhdHJpY2sgRGF4ZW5iaWNobGVyPC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZ
jpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5WZWN0b3IgZ3JhcGhpYyBvZiBubyB0aHVtYm5haWwgc3ltYm9sPC
9yZGY6bGk+PC9yZGY6QWx0PjwvZGM6ZGVzY3JpcHRpb24+CjxwbHVzOkxpY2Vuc29yPjxyZGY6U2VxPjxyZGY6bGkgcmRmO
nBhcnNlVHlwZT0nUmVzb3VyY2UnPjxwbHVzOkxpY2Vuc29yVVJMPmh0dHBzOi8vd3d3LmlzdG9ja3Bob3RvLmNvbS9waG90b
y9saWNlbnNlLWdtMTE0NzU0NDgwNy0/dXRtX21lZGl1bT1vcmdhbmljJmFtcDt1dG1fc291cmNlPWdvb2dsZSZhbXA7dXRtX2Nh
bXBhaWduPWlwdGN1cmw8L3BsdXM6TGljZW5zb3JVUkw+PC9yZGY6bGk+PC9yZGY6U2VxPjwvcGx1czpMaWNlbnNvcj4KCQk8L3JkZ
jpEZXNjcmlwdGlvbj4KCTwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InciPz7/2wBDAAUDBAQEAwUEBAQFBQUG
BwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAALCAFAAUABAREA/8QAGwABAAMBAQEBAAAA
AAAAAAAAAAQFBgMBAgj/xAA6EAEAAQIDAwcKBgIDAQAAAAAAAQIDBAURIVSSBhIUFTFRkRM1QVJTYYGxwdEiNHFzgqEyMyNCYiT/2gAIAQEA
AD8A/QPTMVvN7jk6Zit5vccnTMVvN7jk6Zit5vccnTMVvN7jk6Zit5vccnTMVvN7jk6Zit5vccnTMVvN7jk6Zit5vccnTMVvN7jk6Zit5vccnTM
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
`;