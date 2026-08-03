import { Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

function imageSize(uri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
  });
}

/** Recorte central quadrado usado na tela de aprovação da foto. */
export async function cropPhotoSquare(uri: string): Promise<string> {
  const { width, height } = await imageSize(uri);
  const side = Math.min(width, height);
  const cropped = await ImageManipulator.manipulateAsync(uri, [{
    crop: {
      originX: Math.max(0, Math.round((width - side) / 2)),
      originY: Math.max(0, Math.round((height - side) / 2)),
      width: side,
      height: side,
    },
  }], { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG });
  return cropped.uri;
}
