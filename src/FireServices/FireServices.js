import firestore from '@react-native-firebase/firestore';

class FireServices {
  getTockenForUniversalApi = (callback) => {
    console.log('hre');
    fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer PSjAYmhK5ANj9aU0bu4N41gB0idOzOUVILqKe5SgWFh_srv54kfvddjSRSxjYkD08CY',
      },
    })
      .then(async (res) => {
        const data = await res.json();
        callback({isSuccess: true, token: data.auth_token});
      })
      .catch((err) => {
        console.log('error ---', err);
        callback({isSuccess: false, err: err});
      });
  };
  fetchCountries = (token, callback) => {
    console.log('token', token);
    fetch('https://www.universal-tutorial.com/api/countries', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzeWVkdGVocmltYWJiYXNAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiUFNqQVltaEs1QU5qOWFVMGJ1NE40MWdCMGlkT3pPVVZJTHFLZTVTZ1dGaF9zcnY1NGtmdmRkalNSU3hqWWtEMDhDWSJ9LCJleHAiOjE1ODg1MDA4NDl9.Flf1WW5FgN4u2WVkHTdJaTGcAy60NQAVAHSz4M7xlSU',
      },
    })
      .then(async (res) => {
        console.log('res ---', res.json());
        const data = await res.json();
        console.log('data ---', data);

        callback({isSuccess: true, token: data});
      })
      .catch((err) => {
        console.log('error ---', err);
      });
  };
  //   updateUserProfile = () => {
  //       firestore().
  //   };
}
const Services = new FireServices();
export default Services;
