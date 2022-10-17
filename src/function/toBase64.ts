import RNFS from 'react-native-fs';

export default async (uri: string, withMimeType?: boolean): Promise<string> => {
  const response = await fetch(uri);
  const base64 = await RNFS.readFile(uri, 'base64').then(res => {
    if (withMimeType) {
      return `data:${response.headers.get('content-type')};base64,${res}`;
    }
    return res;
  });

  return base64;
};
