class FireServices {
    getTokenForUniversalApi = (callback) => {
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
                'Bearer ' + token,
            },
        })
            .then(async (res) => {
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
