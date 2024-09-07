/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/cropImage.ts
export const getCroppedImg = (imageSrc: string, croppedAreaPixels: any): Promise<string> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        if (!ctx) {
          return reject(new Error('Failed to create 2D context'));
        }
  
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
  
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
  
        canvas.toBlob((blob) => {
          if (!blob) {
            return reject(new Error('Canvas is empty'));
          }
          const url = URL.createObjectURL(blob);
          resolve(url);
        }, 'image/jpeg');
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
  };
  