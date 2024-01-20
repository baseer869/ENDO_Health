import axios, {AxiosRequestConfig} from 'axios';
import {Image as ImageType} from 'react-native-image-crop-picker';
import {api} from './apiConstants';

export const imageUpload = async (
  title: string,
  description: string,
  images?: ImageType[],
): Promise<any> => {
  const formData = new FormData();

  if (images && (images?.length ?? 0) > 0) {
    for (let i = 0; i < images.length; i += 1) {
      const obj = {
        uri: '',
        type: '',
        name: '',
      };
      obj.uri = images[i].path!;
      obj.type = images[i].mime!;
      // obj.name = Platform.OS === 'android' ? images[i].modificationDate + '.jpg' : images[i].filename;
      obj.name = images[i].filename! ?? 'contactUploadImg';

      if (images[i]) {
        formData.append('imgs', JSON.parse(JSON.stringify(obj)));
      }
    }
    // formData.append('imgs', imgs);
  }
  formData.append('title', title);
  formData.append('description', description);

  const options: AxiosRequestConfig = {
    url: `${api.common.upload}`,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      type: 'formData',
    },
    method: 'POST',
    data: formData,
  };

  try {
    const result = await axios.request(options);

    return result.data;
  } catch (error: any) {
    return Promise.resolve(error);
  }
};

export default writeInquiry;
