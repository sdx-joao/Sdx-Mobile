import { Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

function imageSize(uri: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
  });
}

export type CropRegion = { originX: number; originY: number; width: number; height: number };

export async function getPhotoSize(uri: string) {
  return imageSize(uri);
}

/** Recorta exatamente a região escolhida pelo operador na imagem original. */
export async function cropPhotoRegion(uri: string, region: CropRegion): Promise<string> {
  const { width, height } = await imageSize(uri);
  const originX = Math.max(0, Math.min(width - 1, Math.round(region.originX)));
  const originY = Math.max(0, Math.min(height - 1, Math.round(region.originY)));
  const cropWidth = Math.max(1, Math.min(width - originX, Math.round(region.width)));
  const cropHeight = Math.max(1, Math.min(height - originY, Math.round(region.height)));
  const cropped = await ImageManipulator.manipulateAsync(uri, [{
    crop: { originX, originY, width: cropWidth, height: cropHeight },
  }], { compress: 0.9, format: ImageManipulator.SaveFormat.JPEG });
  return cropped.uri;
}
