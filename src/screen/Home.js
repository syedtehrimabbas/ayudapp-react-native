import {
    CheckBox,
    KeyboardAvoidingView,
    Picker,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {Component} from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';

import CommmonButton from './CommonButton';
import Geolocation from '@react-native-community/geolocation';
import Loader from '../screen/Loader';
import {ScrollView} from 'react-native-gesture-handler';
import Services from '../FireServices/FireServices';

let helpType = '';
let coronaDiseaseType = '';
let eggs = '';
let soap = '';
let Medications = '';
let currentTime = 0;
let tomorrowTime = 0;
let tomorrowNextTime = 0;

let diabetesText = '';
let hipertensiónText = '';
let cancerText = '';
let otherText = '';
let WashingsoapText = '';
let CloroText = '';
let BathsoapText = '';
let DisinfectantText = '';
let AlcoholText = '';
let ToothpasteText = '';
let DeodorantText = '';
let BabydiapersText = '';
let riceText = '';
let grainsText = '';

let FlourText = '';
let EggsText = '';
let PastasText = '';
let VegetablesText = '';
let FruitText = '';
let SugarText = '';
let SaltText = '';
let cannedfoodText = '';

let OilText = '';
let MeatText = '';
let BreadText = '';
let CheeseText = '';
let HamText = '';
let WaterText = '';
let CreamsText = '';
let MilkText = '';
let babymilkText = '';
let DogfoodText = '';
let CatfoodText = '';
let HypertensionText = '';
let DiabetesText = '';
let FluColdText = '';
let GastrointestinalText = '';
let AnxietyText = '';
let InsomniaText = '';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValue: '',
            individual: false,
            family: false,
            ong: false,
            name: '',
            ageRange1: '',
            ageRange2: '',
            ageRange3: '',
            ageRange4: '',
            ageRange5: '',
            coronaDisease: false,
            soap: false,
            egg: false,
            medicine: false,
            employment: '',
            accountDetail: '',
            userType: this.props.navigation.state.params.type,
            loading: false,
            latitude: 0,
            longitude: 0,
            textToShow: '',
            withinTime: false,
            diabetes: false,
            hipertensión: false,
            cancer: false,
            other: false,
            Washingsoap: false,
            Cloro: false,
            Bathsoap: false,
            Disinfectant: false,
            Alcohol: false,
            Toothpaste: false,
            Deodorant: false,
            Babydiapers: false,
            rice: false,
            grains: false,

            Flour: false,
            Eggs: false,
            Pastas: false,
            Vegetables: false,
            Fruit: false,
            Sugar: false,
            Salt: false,
            cannedfood: false,

            Oil: false,
            Meat: false,
            Bread: false,
            Cheese: false,
            Ham: false,
            Water: false,
            Creams: false,
            Milk: false,
            babymilk: false,
            Dogfood: false,
            Catfood: false,
            Hypertension: false,
            Diabetes: false,
            FluCold: false,
            Gastrointestinal: false,
            Anxiety: false,
            Insomnia: false,
        };
    }

    setOrderRistriction = () => {
        this.setState({loading: true});
        Services.getUserProfile((user) => {
            if (user.isSuccess) {
                console.log('userrrrrrr', user.user._data.requestId);
                Services.getRequestedOrder(user.user._data.requestId, (order) => {
                    this.setState({loading: false});
                    console.log('order', order);
                    currentTime = new Date(order.order._data.orderTime).getTime();
                    tomorrowTime = new Date(
                        new Date(order.order._data.orderTime).getTime() +
                        24 * 60 * 60 * 1000,
                    ).getTime();
                    tomorrowNextTime = new Date(
                        new Date(order.order._data.orderTime).getTime() +
                        24 * 60 * 60 * 1000 +
                        24 * 60 * 60 * 1000,
                    ).getTime();
                    if (currentTime <= tomorrowTime) {
                        this.setState({
                            withinTime: true,
                            textToShow: 'You will be elligible for help after 2 days',
                            loading: false,
                        });
                    } else if (
                        currentTime >= tomorrowTime &&
                        currentTime <= tomorrowNextTime
                    ) {
                        console.log('this.is tomorow time');
                        this.setState({
                            withinTime: true,
                            loading: false,
                            textToShow: 'You will be elligible for help after 1 days',
                        });
                    } else {
                        this.setState({loading: false});
                    }
                });
            }
        });
    };

    componentDidMount() {
        this.focusListner = this.props.navigation.addListener('didFocus', () => {
            this.setOrderRistriction();
        });

        Geolocation.getCurrentPosition((info) => {
            console.log('info', info);
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
            });
        });
    }

    onButtonPress = () => {
        let currentDate = new Date().toString();
        this.setState({loading: true});
        const {
            name,
            ageRange1,
            ageRange2,
            ageRange3,
            ageRange4,
            ageRange5,
            employment,
            accountDetail,
            latitude,
            longitude,
            diabetes,
            hipertensión,
            cancer,
            other,
            Washingsoap,
            Cloro,
            Bathsoap,
            Disinfectant,
            Alcohol,
            Toothpaste,
            Deodorant,
            Babydiapers,
            rice,
            grains,

            Flour,
            Eggs,
            Pastas,
            Vegetables,
            Fruit,
            Sugar,
            Salt,
            cannedfood,

            Oil,
            Meat,
            Bread,
            Cheese,
            Ham,
            Water,
            Creams,
            Milk,
            babymilk,
            Dogfood,
            Catfood,
            Hypertension,
            Diabetes,
            FluCold,
            Gastrointestinal,
            Anxiety,
            Insomnia,
        } = this.state;
        if (this.state.individual) {
            helpType = 'individual help';
        } else if (this.state.family) {
            helpType = 'want family help';
        } else if (this.state.ong) {
            helpType = 'ong';
        }
        if (this.state.coronaDisease) {
            coronaDiseaseType = 'corona positive';
        } else {
            coronaDiseaseType = 'corona negitive';
        }
        if (this.state.soap) {
            soap = 'require';
        } else {
            soap = 'not require';
        }
        if (this.state.egg) {
            eggs = 'eggs require';
        } else {
            eggs = 'not require';
        }
        if (this.state.medicine) {
            Medications = 'require medications';
        } else {
            Medications = 'not require medications';
        }
        if (diabetes) {
            diabetesText = 'positive diabetes';
        } else {
            diabetesText = 'negitive diabetes';
        }
        if (Hypertension) {
            HypertensionText = 'positive Hypertension';
        } else {
            HypertensionText = 'negitive Hypertension';
        }
        if (cancer) {
            cancerText = 'positive cancer';
        } else {
            cancerText = 'negitive cancer';
        }
        if (cancer) {
            cancerText = 'positive cancer';
        } else {
            cancerText = 'negitive cancer';
        }
        if (other) {
            otherText = 'positive other';
        } else {
            otherText = 'negitive other';
        }
        if (Washingsoap) {
            WashingsoapText = ' Washingsoap require';
        } else {
            WashingsoapText = ' Washingsoap not require';
        }
        if (Cloro) {
            CloroText = ' Cloro require';
        } else {
            CloroText = ' Cloro not require';
        }
        if (Bathsoap) {
            BathsoapText = ' Bath soap require';
        } else {
            BathsoapText = ' Bath soap not require';
        }
        if (Disinfectant) {
            DisinfectantText = ' Disinfectant require';
        } else {
            DisinfectantText = ' Disinfectant not require';
        }
        if (Alcohol) {
            AlcoholText = ' Alcohol require';
        } else {
            AlcoholText = ' Alcohol not require';
        }
        if (Toothpaste) {
            ToothpasteText = ' Toothpaste require';
        } else {
            ToothpasteText = ' Toothpaste not require';
        }

        if (Deodorant) {
            DeodorantText = ' Deodorant require';
        } else {
            DeodorantText = ' Deodorant not require';
        }
        if (Babydiapers) {
            BabydiapersText = ' Baby diapers require';
        } else {
            BabydiapersText = ' Baby diapers not require';
        }

        if (rice) {
            riceText = ' rice require';
        } else {
            riceText = ' rice not require';
        }
        if (grains) {
            grainsText = ' grains require';
        } else {
            grainsText = ' grains not require';
        }
        if (Flour) {
            FlourText = ' Flour require';
        } else {
            FlourText = ' Flour not require';
        }
        if (Eggs) {
            EggsText = ' Eggs require';
        } else {
            EggsText = ' Eggs not require';
        }
        if (Pastas) {
            PastasText = ' Pastas require';
        } else {
            PastasText = ' Pastas not require';
        }
        if (Vegetables) {
            VegetablesText = ' Vegetables require';
        } else {
            VegetablesText = ' Vegetables not require';
        }
        if (Fruit) {
            FruitText = ' Fruit require';
        } else {
            FruitText = ' Fruit not require';
        }
        if (Sugar) {
            SugarText = ' Sugar require';
        } else {
            SugarText = ' Sugar not require';
        }
        if (Salt) {
            SaltText = ' Salt require';
        } else {
            SaltText = ' Salt not require';
        }
        if (cannedfood) {
            cannedfoodText = ' cannedfood require';
        } else {
            cannedfoodText = ' cannedfood not require';
        }
        if (Washingsoap) {
            WashingsoapText = ' Washingsoap require';
        } else {
            WashingsoapText = ' Washingsoap not require';
        }
        if (Oil) {
            OilText = ' Oil require';
        } else {
            OilText = ' Oil not require';
        }
        if (Meat) {
            MeatText = ' Meat require';
        } else {
            MeatText = ' Meat not require';
        }
        if (Bread) {
            BreadText = ' Bread require';
        } else {
            BreadText = ' Bread not require';
        }
        if (Cheese) {
            CheeseText = ' Cheese require';
        } else {
            CheeseText = ' Cheese not require';
        }
        if (Ham) {
            HamText = ' Ham require';
        } else {
            HamText = ' Ham not require';
        }
        if (Water) {
            WaterText = ' Water require';
        } else {
            WaterText = ' Water not require';
        }
        if (Creams) {
            CreamsText = ' Creams require';
        } else {
            CreamsText = ' Creams not require';
        }
        if (Milk) {
            MilkText = ' Milk require';
        } else {
            MilkText = ' Milk not require';
        }
        if (babymilk) {
            babymilkText = ' babymilk require';
        } else {
            babymilkText = ' babymilk not require';
        }
        if (Dogfood) {
            DogfoodText = ' Dogfood require';
        } else {
            DogfoodText = ' Dogfood not require';
        }
        if (Catfood) {
            CatfoodText = ' Catfood require';
        } else {
            CatfoodText = ' Catfood not require';
        }
        if (Hypertension) {
            HypertensionText = ' Hypertension positive';
        } else {
            HypertensionText = ' Hypertension negitave';
        }
        if (Diabetes) {
            DiabetesText = ' Diabetes positive';
        } else {
            DiabetesText = ' Diabetes negitave';
        }
        if (Bathsoap) {
            BathsoapText = ' Bathsoap positive';
        } else {
            BathsoapText = ' Bathsoap negitave';
        }
        if (FluCold) {
            FluColdText = ' FluCold positive';
        } else {
            FluColdText = ' FluCold negitave';
        }
        if (Gastrointestinal) {
            GastrointestinalText = ' Gastrointestinal positive';
        } else {
            GastrointestinalText = ' Gastrointestinal negitave';
        }
        if (Anxiety) {
            AnxietyText = ' Anxiety positive';
        } else {
            AnxietyText = ' Anxiety negitave';
        }
        if (Deodorant) {
            DeodorantText = ' Deodorant positive';
        } else {
            DeodorantText = ' Deodorant negitave';
        }
        if (Insomnia) {
            InsomniaText = ' Insomnia positive';
        } else {
            InsomniaText = ' Insomnia negitave';
        }

        Services.needyUserForm(
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
            this.state.userType,
            latitude,
            longitude,
            currentDate,

            diabetesText,
            hipertensiónText,
            cancerText,
            otherText,
            WashingsoapText,
            CloroText,
            BathsoapText,
            DisinfectantText,
            AlcoholText,
            ToothpasteText,
            DeodorantText,
            BabydiapersText,
            riceText,
            grainsText,

            FlourText,
            EggsText,
            PastasText,
            VegetablesText,
            FruitText,
            SugarText,
            SaltText,
            cannedfoodText,
            OilText,
            MeatText,
            BreadText,
            CheeseText,
            HamText,
            WaterText,
            CreamsText,
            MilkText,
            babymilkText,
            DogfoodText,
            CatfoodText,
            HypertensionText,
            DiabetesText,
            FluColdText,
            GastrointestinalText,
            AnxietyText,
            InsomniaText,

            (response) => {
                console.log('hererer in home response ', response);
                this.setState({loading: false});
                alert('successfully submitted');
                this.props.navigation.navigate('UserCategory');
            },
        );
    };
    setSelectedValue = () => {
    };

    render() {
        return (
            <View>
                {this.state.withinTime ? (
                    <View
                        style={{
                            height: hp(100),
                            width: wp(100),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                            {this.state.textToShow}
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                            <Text
                                style={{fontSize: wp(4), fontWeight: 'bold', marginTop: hp(5)}}>
                                GO BACK
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <View style={styles.headerStyle}>
                            <Text style={styles.headerStyleText}>
                                Completa Ios siguientes datos
                            </Text>
                        </View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
                            <ScrollView style={{height: hp(93)}}>
                                <View style={{paddingLeft: wp(5), borderBottomWidth: 1}}>
                                    <Text>Usted necesita</Text>
                                    <View style={styles.oPtioncontainer}>
                                        <CheckBox
                                            value={this.state.individual}
                                            onValueChange={() =>
                                                this.setState({
                                                    individual: !this.state.individual,
                                                    family: false,
                                                    ong: false,
                                                })
                                            }
                                            style={styles.checkbox}
                                        />
                                        <Text style={{width: wp(80), fontSize: wp(5)}}>
                                            Ayuda individual (individual help)
                                        </Text>
                                    </View>
                                    <Loader loading={this.state.loading}/>
                                    <View style={styles.oPtioncontainer}>
                                        <CheckBox
                                            value={this.state.family}
                                            onValueChange={() =>
                                                this.setState({
                                                    family: !this.state.family,
                                                    individual: false,
                                                    ong: false,
                                                })
                                            }
                                            style={styles.checkbox}
                                        />
                                        <Text style={{width: wp(80), fontSize: wp(5)}}>
                                            Ayuda familiar (family help)
                                        </Text>
                                    </View>
                                    <View style={styles.oPtioncontainer}>
                                        <CheckBox
                                            value={this.state.ong}
                                            onValueChange={() =>
                                                this.setState({
                                                    ong: !this.state.ong,
                                                    family: false,
                                                    individual: false,
                                                })
                                            }
                                            style={styles.checkbox}
                                        />
                                        <Text style={{width: wp(80), fontSize: wp(5)}}>ong</Text>
                                    </View>
                                </View>
                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Nombre de la familia, individuo o ONG (Name or family) Este
                                        dato aparecera publico (public data)
                                    </Text>
                                    <TextInput
                                        value={this.state.name}
                                        onChangeText={(name) => this.setState({name})}
                                        placeholder={'Familia Perez'}
                                        style={styles.placeholderStyle}
                                    />
                                </View>
                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Cantidad de personas por rangos de edades en su familia
                                        (Number of people by age ranges)
                                    </Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{width: wp(30)}}>Menos de 1 ano:</Text>
                                        <TextInput
                                            value={this.state.ageRange1}
                                            keyboardType="number-pad"
                                            onChangeText={(ageRange1) => this.setState({ageRange1})}
                                            style={styles.inPUTminiStyle}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{width: wp(30)}}>De 1 a 12 anos:</Text>
                                        <TextInput
                                            value={this.state.ageRange2}
                                            keyboardType="number-pad"
                                            onChangeText={(ageRange2) => this.setState({ageRange2})}
                                            style={styles.inPUTminiStyle}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{width: wp(30)}}>De 13 a 17 anos:</Text>
                                        <TextInput
                                            value={this.state.ageRange3}
                                            keyboardType="number-pad"
                                            onChangeText={(ageRange3) => this.setState({ageRange3})}
                                            style={styles.inPUTminiStyle}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{width: wp(30)}}>De 18 a 60 anos:</Text>
                                        <TextInput
                                            value={this.state.ageRange4}
                                            keyboardType="number-pad"
                                            onChangeText={(ageRange4) => this.setState({ageRange4})}
                                            style={styles.inPUTminiStyle}
                                        />
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={{width: wp(30)}}>De 61 a o mas:</Text>
                                        <TextInput
                                            value={this.state.ageRange5}
                                            keyboardType="number-pad"
                                            onChangeText={(ageRange5) => this.setState({ageRange5})}
                                            style={styles.inPUTminiStyle}
                                        />
                                    </View>
                                </View>
                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        ?Enfermedades cronicas en usted o algun familiar?(Chronic
                                        disease in you or a family member?)
                                    </Text>
                                    <View style={styles.boxContainerSTyle}>
                                        <Text>Chronic disease</Text>
                                        <CheckBox
                                            value={this.state.coronaDisease}
                                            onValueChange={() =>
                                                this.setState({
                                                    coronaDisease: !this.state.coronaDisease,
                                                })
                                            }
                                            style={styles.checkbox}
                                        />
                                    </View>
                                    {/* ------------- option container -------------- */}
                                    {this.state.coronaDisease && (
                                        <View style={styles.optionContainerSTyle}>
                                            <View
                                                style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <CheckBox
                                                    value={this.state.diabetes}
                                                    onValueChange={() =>
                                                        this.setState({
                                                            diabetes: !this.state.diabetes,
                                                        })
                                                    }
                                                    style={styles.checkbox}
                                                />
                                                <Text>Diabetes</Text>
                                            </View>
                                            <View
                                                style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <CheckBox
                                                    value={this.state.hipertensión}
                                                    onValueChange={() =>
                                                        this.setState({
                                                            hipertensión: !this.state.hipertensión,
                                                        })
                                                    }
                                                    style={styles.checkbox}
                                                />
                                                <Text>Hipertensión - (Hypertension)</Text>
                                            </View>
                                            <View
                                                style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <CheckBox
                                                    value={this.state.cancer}
                                                    onValueChange={() =>
                                                        this.setState({
                                                            cancer: !this.state.cancer,
                                                        })
                                                    }
                                                    style={styles.checkbox}
                                                />
                                                <Text>Cancer</Text>
                                            </View>
                                            <View
                                                style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <CheckBox
                                                    value={this.state.other}
                                                    onValueChange={() =>
                                                        this.setState({
                                                            other: !this.state.other,
                                                        })
                                                    }
                                                    style={styles.checkbox}
                                                />
                                                <Text>Otras - (Others)</Text>
                                            </View>
                                        </View>
                                    )}
                                    {/* ------------- option container -------------- */}
                                </View>
                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Seleccion Ios articulos de aseo personal y limieza de hogar
                                        que necesita- (Cleaning)
                                    </Text>
                                    <View style={styles.boxContainerSTyle}>
                                        <Text>jabon de lavar - (Washing soap)</Text>
                                        <CheckBox
                                            value={this.state.soap}
                                            onValueChange={() =>
                                                this.setState({soap: !this.state.soap})
                                            }
                                            style={styles.checkbox}
                                        />
                                    </View>
                                </View>
                                {/* ----------------------------- Cleaning option --------------------------- */}
                                {this.state.soap && (
                                    <View style={styles.optionContainerSTyle}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Washingsoap}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Washingsoap: !this.state.Washingsoap,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Jabón de lavar - (Washing soap)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Cloro}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Cloro: !this.state.Cloro,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Cloro</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Bathsoap}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Bathsoap: !this.state.Bathsoap,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Jabón de baño- Bath soap</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Disinfectant}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Disinfectant: !this.state.Disinfectant,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Desinfectante - (Disinfectant)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Alcohol}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Alcohol: !this.state.Alcohol,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Alcohol</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Toothpaste}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Toothpaste: !this.state.Toothpaste,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Pasta de diente - (Toothpaste)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Deodorant}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Deodorant: !this.state.Deodorant,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Desodorante - (Deodorant)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Babydiapers}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Babydiapers: !this.state.Babydiapers,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Pañales de bebé - (Baby diapers)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.other}
                                                onValueChange={() =>
                                                    this.setState({
                                                        other: !this.state.other,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Otras - (Others)</Text>
                                        </View>
                                    </View>
                                )}
                                {/* ----------------------------- Cleaning option --------------------------- */}

                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Seleccione Ios alimentos que necesita - (Food)
                                    </Text>

                                    <View style={styles.boxContainerSTyle}>
                                        <Text>Huevos - (Eggs)</Text>
                                        <CheckBox
                                            value={this.state.egg}
                                            onValueChange={() =>
                                                this.setState({egg: !this.state.egg})
                                            }
                                            style={styles.checkbox}
                                        />
                                    </View>
                                </View>

                                {/* ----------------------------- Food option --------------------------- */}
                                {this.state.egg && (
                                    <View style={styles.optionContainerSTyle}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.rice}
                                                onValueChange={() =>
                                                    this.setState({
                                                        rice: !this.state.rice,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Arroz - (Rice)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.grains}
                                                onValueChange={() =>
                                                    this.setState({
                                                        grains: !this.state.grains,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>granos: frijoles, lentejas - (Grains)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Flour}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Flour: !this.state.Flour,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Harina - (Flour)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Eggs}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Eggs: !this.state.Eggs,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Huevos - (Eggs)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Pastas}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Pastas: !this.state.Pastas,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Spaghetti - (Pastas)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Vegetables}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Vegetables: !this.state.Vegetables,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Vegetales - (Vegetables)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Fruit}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Fruit: !this.state.Fruit,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Frutas - (Fruit)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Sugar}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Sugar: !this.state.Sugar,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Azucar - (Sugar)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Salt}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Salt: !this.state.Salt,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Sal - (Salt)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.cannedfood}
                                                onValueChange={() =>
                                                    this.setState({
                                                        cannedfood: !this.state.cannedfood,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Comida enlatada - (canned food)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Washingsoap}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Washingsoap: !this.state.Washingsoap,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Jabón de lavar - (Washing soap)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Oil}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Oil: !this.state.Oil,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Aceite - (Oil)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Meat}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Meat: !this.state.Meat,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Carnes: Pollo, ganado o puerco - (Meat)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Bread}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Bread: !this.state.Bread,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Pan - (Bread)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Cheese}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Cheese: !this.state.Cheese,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Queso - (Cheese)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Ham}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Ham: !this.state.Ham,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Jamón - (Ham)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Water}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Water: !this.state.Water,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Agua - (Water)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Creams}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Creams: !this.state.Creams,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Cremas - (Creams)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Milk}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Milk: !this.state.Milk,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Leche - (Milk)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.babymilk}
                                                onValueChange={() =>
                                                    this.setState({
                                                        babymilk: !this.state.babymilk,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Leche de bebe - (baby milk)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Dogfood}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Dogfood: !this.state.Dogfood,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Comida para perros (Dog food)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Catfood}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Catfood: !this.state.Catfood,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Comida para gatos (Cat food)</Text>
                                        </View>
                                    </View>
                                )}
                                {/* ----------------------------- Food option --------------------------- */}

                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Medicamentos que necesita - (Medications)
                                    </Text>

                                    <View style={styles.boxContainerSTyle}>
                                        <Text>Malestar gastrointestinal - (Gastrointestinal)</Text>
                                        <CheckBox
                                            value={this.state.medicine}
                                            onValueChange={() =>
                                                this.setState({medicine: !this.state.medicine})
                                            }
                                            style={styles.checkbox}
                                        />
                                    </View>
                                </View>

                                {/* ----------------------------- Medications option --------------------------- */}
                                {this.state.medicine && (
                                    <View style={styles.optionContainerSTyle}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Hypertension}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Hypertension: !this.state.Hypertension,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Hipertensión - (Hypertension)</Text>
                                        </View>

                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Diabetes}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Diabetes: !this.state.Diabetes,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Diabetes </Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Bathsoap}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Bathsoap: !this.state.Bathsoap,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Jabón de baño- Bath soap</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.FluCold}
                                                onValueChange={() =>
                                                    this.setState({
                                                        FluCold: !this.state.FluCold,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Influenza (Malestar general) - (Flu-Cold)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Gastrointestinal}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Gastrointestinal: !this.state.Gastrointestinal,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>
                                                Malestar gastrointestinal - (Gastrointestinal upset)
                                            </Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Anxiety}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Anxiety: !this.state.Anxiety,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Ansiedad - (Anxiety)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Deodorant}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Deodorant: !this.state.Deodorant,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Desodorante - (Deodorant)</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <CheckBox
                                                value={this.state.Insomnia}
                                                onValueChange={() =>
                                                    this.setState({
                                                        Insomnia: !this.state.Insomnia,
                                                    })
                                                }
                                                style={styles.checkbox}
                                            />
                                            <Text>Insomnio - (Insomnia)</Text>
                                        </View>
                                    </View>
                                )}
                                {/* ----------------------------- Medications option --------------------------- */}

                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Estatus laboral para recibir bono o Bolsa solidria del
                                        gobiemo (Employment status)
                                    </Text>

                                    <View style={styles.boxContainerSTyle}>
                                        <Picker
                                            selectedValue={this.state.employment}
                                            style={styles.placeholderStyle}
                                            onValueChange={(itemValue, itemIndex) =>
                                                this.setState({employment: itemValue})
                                            }>
                                            <Picker.Item
                                                label="Soy independiente - (I'm independent)"
                                                value="Soy independiente - (I'm independent)"
                                            />
                                            <Picker.Item
                                                label="Estoy desempleado -  (I'm unemployed)"
                                                value="Estoy desempleado -  (I'm unemployed)"
                                            />
                                            <Picker.Item
                                                label="Me despidieron - (I got fired)"
                                                value="Me despidieron - (I got fired)"
                                            />
                                            <Picker.Item
                                                label="Estoy de vacaciones - (I'm on vacation)"
                                                value="Estoy de vacaciones - (I'm on vacation)"
                                            />
                                            <Picker.Item
                                                label="Mi empleador se acogió al decreto - (My employer accepted the decree)"
                                                value="Mi empleador se acogió al decreto - (My employer accepted the decree)"
                                            />
                                            <Picker.Item
                                                label="Soy Jubilado - (I'm retired)"
                                                value="Soy Jubilado - (I'm retired)"
                                            />
                                            <Picker.Item
                                                label="Sigo laborando - (I keep working)"
                                                value="Sigo laborando - (I keep working)"
                                            />
                                        </Picker>
                                    </View>
                                </View>
                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Cuenta bancaria para ayuda en dinero (Bank account number
                                        for aid)
                                    </Text>

                                    <TextInput
                                        value={this.state.accountDetail}
                                        onChangeText={(accountDetail) =>
                                            this.setState({accountDetail})
                                        }
                                        placeholder={'Familia Perez'}
                                        style={styles.placeholderStyle}
                                    />
                                </View>
                                <View style={styles.subContainerStyle}>
                                    <Text style={styles.detailTextStyle}>
                                        Banco, número de cuenta y nombre (Bank, account number and
                                        name)
                                    </Text>
                                </View>

                                <CommmonButton
                                    onPress={this.onButtonPress}
                                    style={{
                                        paddingTop: hp(2),
                                        backgroundColor: 'tomato',
                                        alignSelf: 'center',
                                        justifyContant: 'center',
                                        alignItems: 'center',
                                        paddingBottom: hp(2),
                                        paddingLeft: wp(15),
                                        paddingRight: wp(15),
                                        marginTop: hp(5),
                                        borderRadius: wp(1),
                                    }}
                                    Text="SUBMIT"
                                />
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'black',
        width: wp(100),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerStyleText: {
        color: '#fff',
        fontSize: wp(6),
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    oPtioncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    placeholderStyle: {
        borderWidth: 1,
        marginTop: hp(1),
        width: wp(90),
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: wp(2),
    },
    detailTextStyle: {width: wp(80), fontSize: wp(3), marginTop: hp(1)},
    subContainerStyle: {
        paddingLeft: wp(5),
        borderBottomWidth: 1,
        paddingBottom: hp(1),
    },
    inPUTminiStyle: {
        borderWidth: 1,
        marginTop: hp(1),
        width: wp(90),
        alignSelf: 'center',
        height: hp(5),
        width: wp(50),
        paddingLeft: wp(2),
        marginLeft: wp(2),
    },
    boxContainerSTyle: {
        borderWidth: 1,
        marginTop: hp(1),
        width: wp(90),
        alignSelf: 'center',
        height: hp(5),
        paddingLeft: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionContainerSTyle: {
        backgroundColor: '#f3f3f3',
        width: wp(90),
        alignSelf: 'center',
        paddingLeft: wp(5),
        borderWidth: 0.4,
        elevation: 1,
        borderColor: '#f4f4f4',
    },
});
