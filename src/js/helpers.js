import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            //Precise the type of DATA we would like to send
            'Content-Type': 'application/json',
          },
          //Sends the data in the JSON format
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} STATUS CODE:${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} STATUS CODE:${res.status}`);
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
// try {
//Makes the POST request
// const fetchPro = fetch(url, {
//   method: 'POST',
//   headers: {
//Precise the type of DATA we would like to send
// 'Content-Type': 'application/json',
//     },
// Sends the data in the JSON format
//     body: JSON.stringify(uploadData),
//   });

//   //

//   const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

//   const data = await res.json();

//   if (!res.ok) throw new Error(`${data.message} STATUS CODE:${res.status}`);
//   return data;
// } catch (error) {
//   throw error;
// }
// };
