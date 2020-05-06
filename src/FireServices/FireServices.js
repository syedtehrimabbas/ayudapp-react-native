import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class FireServices {
  getTockenForUniversalApi = (callback) => {
    console.log('hre');
    fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-token': 'PSjAYmhK5ANj9aU0bu4N41gB0idOzOUVILqKe5SgWFh_srv54kfvddjSRSxjYkD08CY',
            'user-email': 'syedtehrimabbas@gmail.com',
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
          'Bearer '+token,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('data ---', data);
        callback({isSuccess: true, data: data});
      })
      .catch((err) => {
        console.log('error ---', err);
      });
  };
  getStatesFromApi = (cont, callback) => {
    fetch(`https://www.universal-tutorial.com/api/states/${cont}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzeWVkdGVocmltYWJiYXNAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiUFNqQVltaEs1QU5qOWFVMGJ1NE40MWdCMGlkT3pPVVZJTHFLZTVTZ1dGaF9zcnY1NGtmdmRkalNSU3hqWWtEMDhDWSJ9LCJleHAiOjE1ODg2MzI3NDJ9.EY_E6u1cnZKRr3dPbWQglGtVGzwEO2EsNf0G751-Vyg',
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('data ---', data);
        callback({isSuccess: true, data: data});
      })
      .catch((err) => {
        console.log('error ---', err);
      });
  };
  getCitiesFromApi = (state, callback) => {
    fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzeWVkdGVocmltYWJiYXNAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiUFNqQVltaEs1QU5qOWFVMGJ1NE40MWdCMGlkT3pPVVZJTHFLZTVTZ1dGaF9zcnY1NGtmdmRkalNSU3hqWWtEMDhDWSJ9LCJleHAiOjE1ODg2MzI3NDJ9.EY_E6u1cnZKRr3dPbWQglGtVGzwEO2EsNf0G751-Vyg',
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('data ---', data);
        callback({isSuccess: true, data: data});
      })
      .catch((err) => {
        console.log('error ---', err);
      });
  };
  serUserProfile = (user, callback) => {
    firestore()
      .collection('Profile')
      .doc(user.uid)
      .set({
        name: user.displayName,
        email: user.email,
      })
      .then((profile) => {
        callback({isSuccess: true, response: profile});
      })
      .catch((err) => {
        callback({isSuccess: false, err: err});
      });
  };
  updateUserBiodata = (
    fname,
    lname,
    phone,
    otherPhone,
    country,
    province,
    district,
    city,
    town,
    building,
    time,
    image,
    callback,
  ) => {
    firestore()
      .collection('Profile')
      .doc(auth().currentUser.uid)
      .update({
        biodata: {
          firstName: fname,
          lastName: lname,
          phone: phone,
          otherPhone: otherPhone,
          country: country,
          province: province,
          district: district,
          city: city,
          town: town,
          building: building,
          time: time,
          image: image,
        },
      })
      .then((profile) => {
        callback({isSuccess: true, response: profile});
      })
      .catch((err) => {
        callback({isSuccess: false, err: err});
      });
  };
  updateUserStatus = (type, callback) => {
    firestore()
      .collection('Profile')
      .doc(auth().currentUser.uid)
      .update({
        userType: type,
      })
      .then((res) => {
        callback({isSuccess: true});
      });
  };
  getUserProfile = (callback) => {
    firestore()
      .collection('Profile')
      .doc(auth().currentUser.uid)
      .get()
      .then((res) => {
        callback({isSuccess: true, user: res});
      });
  };
  getRequestedOrder = (id, callback) => {
    firestore()
      .collection('userRequests')
      .doc(id)
      .get()
      .then((res) => {
        callback({isSuccess: true, order: res});
      });
  };
  needyUserForm = (
    name,
    ageRange1,
    ageRange2,
    ageRange3,
    ageRange4,
    ageRange5,
    employment,
    accountDetail,
    helpType,
    coronaDiseaseType,
    eggs,
    soap,
    Medications,
    userType,
    latitude,
    longitude,
    currentTime,
    callback,
  ) => {
    firestore()
      .collection('userRequests')
      .add({
        name: name,
        ageRange1: ageRange1,
        ageRange2: ageRange2,
        ageRange3: ageRange3,
        ageRange4: ageRange4,
        ageRange5: ageRange5,
        employment: employment,
        accountDetail: accountDetail,
        helpType: helpType,
        coronaDiseaseType: coronaDiseaseType,
        eggs: eggs,
        soap: soap,
        medications: Medications,
        userType: userType,
        userId: auth().currentUser.uid,
        latitude: latitude,
        longitude: longitude,
        orderTime: currentTime,
      })
      .then((res) => {
        console.log('requestreas', res);
        firestore()
          .collection('Profile')
          .doc(auth().currentUser.uid)
          .update({
            requestId: res.id,
          })
          .then(() => {
            callback({isSuccess: true});
          });
      });
  };
  addBankDetail = (
    name,
    country,
    province,
    district,
    city,
    town,
    buildingAddress,
    time,
    term,
    image,
    userType,
    latitude,
    longitude,
    callback,
  ) => {
    firestore()
      .collection('userRequests')
      .add({
        name: name,
        country: country,
        province: province,
        district: district,
        city: city,
        town: town,
        building: buildingAddress,
        time: time,
        term: term,
        image: image,
        userType: userType,
        latitude: latitude,
        longitude: longitude,
        userId: auth().currentUser.uid,
      })
      .then(() => {
        callback({isSuccess: true});
      })
      .catch((e) => {
        callback({isSuccess: false});
      });
  };
}

const Services = new FireServices();
export default Services;
