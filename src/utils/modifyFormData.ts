
// import { FieldValues } from "react-hook-form";

// export const modifyPayload = (values:FieldValues)=>{
//     const obj = {...values}
//     const file = obj['file']
//     delete obj['file']
//      const data = JSON.stringify(obj)
//       const formData = new FormData()
//       formData.append("data", data)
//       formData.append("file", file as Blob)
//      return formData
// }

import { FieldValues } from 'react-hook-form';

export const modifyPayload = (values: FieldValues) => {
  const obj = { ...values };
  const file = obj['file'];
  delete obj['file'];
  const data = JSON.stringify(obj);
  const formData = new FormData();
  formData.append('data', data);
  if (file && file[0]) {
    formData.append('file', file[0]); // Ensure that `file` is appended correctly
  }
  return formData;
};