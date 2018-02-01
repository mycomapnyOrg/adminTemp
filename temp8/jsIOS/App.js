import React, { Component, PropTypes } from 'react';
import {
    View,
    Text,
    DrawerLayoutAndroid,
    ToolbarAndroid,
    TouchableOpacity,
    Image,
    Plaform,
    BackHandler,
    StyleSheet, AsyncStorage, ToastAndroid,Alert
} from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatPage from './Template/ChatPage';
import Login from './Login';
import DrawerMenu from './Menu/DrawerMenu';
import MyCustomizedNavBar from './Menu/MyCustomizedNavBar';
import ProgramDetails from './Template/ProgramDetails';
import MainMenu from './Template/MainMenu';
import UnderConstruction from './Template/UnderConstruction';
import YokuPro from './Template/YokuPro';
import PDF from './Template/PDF';
import Resource from './Template/Resource';
import Document from './Template/Document';
import ListPage from './Template/ListPage';
import Synopsis from './Template/Synopsis';
import IAFWorld from './Template/IAFWorld';
import GroupMemebers from './Template/GroupMemebers';
import Quotes from './Template/Quotes';
import Home from './Template/Home';
import ProgramEvaluate from './Template/ProgramEvaluate';
import Amigos from './Template/Amigos';
import Archive from './Template/Archive';
import EventDetails from './Template/EventDetails';
import VideoPage from './Template/VideoPage';
import Theme1 from './Template/Theme1';
import Theme2 from './Template/Theme2';
import Theme3 from './Template/Theme3';
var backButton = 0;

const drawerStyles = {
drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
}

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        routes: [0],
            checkLoggedUserType : '',
        drawerClosed: true,
            loginStatus : [ {
                           loggedStatus:'',
                           loggedUserType:''
                           }] ,
            visible : false,
            cancelable : true
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.setDrawerState = this.setDrawerState.bind(this);
        this.handlesBackButton = this.handlesBackButton.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.navigateToMenu = this.navigateToMenu.bind(this);
        
    }
    async componentDidMount(){
        
        var imagepath = await AsyncStorage.getItem("imagepath");
        var companyid = await AsyncStorage.getItem("companyid");
        var initroute = await AsyncStorage.getItem("themerouting");
        if(companyid!=null){
            this.navigateTo('MainMenu');
            
        }
        else{
            this.navigateTo("Login");
        }
        this.setState({imagepath : imagepath,initroute:initroute});
        
    }
    
    toggleDrawer() {
        this.context.drawer.open
    }
    
    setDrawerState() {
        this.setState({
                      drawerClosed: !this.state.drawerClosed
                      });
    }
    
    navigateTo(route,props) {
        
        this._navigator.push(
                             {
                             name: route ,
                             passProps: {
                             value:props
                             }
                             }
                             );
    }
    
    async navigateToMenu(route,type,themebgcolor,menuLable,applogo) {
        //this.DRAWER.closeDrawer();
        var routeNma="";
        var headerImage="";
        if(type=="Amigos"){
            routeNma='Amigos';
                    }
        if(type=="Evaluate"){
            routeNma='Evaluate';
           
        }
        if(type=="Synopsis"){
            routeNma='Synopsis';
           
        }
        if(type=="Resources"|| type=="MyLearning"){
            routeNma='Resources';
            
        }
        if(route=='Login'){
            await AsyncStorage.setItem("companyid", "");
            await AsyncStorage.setItem("empid", "");
            await AsyncStorage.setItem("imagepath", "");
            await AsyncStorage.setItem("employeename","");
            await AsyncStorage.setItem("customerid", "");
            await AsyncStorage.setItem("url","");
            await AsyncStorage.setItem("programid","");
            await AsyncStorage.setItem("menuoption", "");
            await AsyncStorage.setItem("themeid","");
            await AsyncStorage.setItem("themerouting", "");
            await AsyncStorage.setItem("themebgcolor", "");
            //await AsyncStorage.setItem("applogo", "");
            await AsyncStorage.setItem("mainMenuArray", "");
            await AsyncStorage.setItem("menuLable", "");
            await AsyncStorage.setItem("compentencystatus", "");
            await AsyncStorage.setItem("weburl","");
            await AsyncStorage.setItem("colorArray","");

        }
        
        this.setState({initroute:route});
        this._navigator.push(
                             
                             {
                             name: route ,initroute:route,themebgcolor:themebgcolor,applogo:applogo,
                             passProps: {
                             routName:routeNma,menuLable:menuLable
                             }
                             }
                             );
    }
    
    handlesBackButton() {
        if (this._navigator && this._navigator.getCurrentRoutes().length > 0) {
            try {
                Alert.alert('YokuPro', 'Do you wish to exit? ',  [
                                                                  { text: 'Ok',onPress: this.exitApp },
                                                                  {text: 'Cancel', onPress: this.noPressed, style: 'cancel'},
                                                                  ]);
            } catch(e) {}
            return true;
        }
    }
    exitApp(){
        BackHandler.exitApp();
    }
    
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handlesBackButton);
        
        
    }
    
    
    
    
    render() {
        
        
        var initialRoutes = 'Home';
        //var initroute=this.state.initroute;
        return(
               <NavigationExperimental.Navigator
               initialRoute={{ name: initialRoutes }}
               renderScene={(route, navigator) => {
               const routeName = route.name;
               const initroute = route.initroute;
               const themebgcolor = route.themebgcolor;
               const applogo = route.applogo;
               if(themebgcolor!=undefined){
                var ColorIcon='#fff';

               }else{	
                var logowhite='http://yokupro.com/Applogo/logo_w.png';
               var logoblack='http://yokupro.com/Applogo/logo_b.png';
               var ColorIcon=themebgcolor;
               }
               switch (routeName) {
               case 'Login':
               return <Login navigator={navigator} {...route.passProps}  />;
               case 'Home':
               return <Home navigator={navigator}  {...route.passProps}  />;
               case 'MainMenu':
               return <MainMenu navigator={navigator} {...route.passProps}  />;
               case 'Theme1':
               return <Theme1 navigator={navigator} {...route.passProps}  />;
               case 'Theme2':
               return <Theme2 navigator={navigator} {...route.passProps}  />;
		case 'Theme3':
               return <Theme3 navigator={navigator} {...route.passProps}  />;
               case 'YokuPro':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               routing={initroute}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               tweenEasing={'linear'}
               tapToClose={true}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#FFC46A'} bgcolor={themebgcolor} Iconcolor={'#000000'} ColorIcon={ColorIcon} imageLocation={logoblack} applogo={applogo} navigate={this.navigateToMenu} type={'MainMenu'} onBack={initroute} routing={initroute}/>
               <YokuPro navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'PDF':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               routing={initroute}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               tweenEasing={'linear'}
               tapToClose={true}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
                <MyCustomizedNavBar backgroundColor={'#1E88E5'} bgcolor={themebgcolor} imageLocation={logoblack} ColorIcon={ColorIcon} Iconcolor={'#000000'} applogo={applogo} navigate={this.navigateToMenu} type={'PDF'} routing={'Resources'} onBack={'Resources'} />
               <PDF navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'ProgramDetails':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor}
 navigate={this.navigateToMenu} />}
               tapToClose={true}
               side={'right'}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#1E88E5'} bgcolor={themebgcolor} imageLocation={logowhite} ColorIcon={ColorIcon} Iconcolor={'#ffffff'}  applogo={applogo} navigate={this.navigateToMenu} type={'Home'} onBack={initroute} routing={initroute}/>
               <ProgramDetails navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Resources':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#66FF4D'} bgcolor={themebgcolor} imageLocation={logoblack} ColorIcon={ColorIcon} Iconcolor={'#000000'} applogo={applogo} navigate={this.navigateToMenu} type={'Resources'} routing={'ProgramDetails'} onBack={'ProgramDetails'} home={initroute} />
               <Resource navigator={navigator} {...route.passProps}  /></Drawer>;	 
               case 'Document':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor}navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#1E88E5'} bgcolor={themebgcolor} imageLocation={logoblack} ColorIcon={ColorIcon} Iconcolor={'#000000'} applogo={applogo} navigate={this.navigateToMenu} type={'Document'} routing={'Resources'} onBack={'Resources'} />
               <Document navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Events':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#64BFFF'} bgcolor={themebgcolor} imageLocation={logowhite} ColorIcon={ColorIcon} Iconcolor={'#fff'} applogo={applogo} navigate={this.navigateToMenu} onBack={initroute} type={'Events'} routing={initroute}/>
               <EventDetails navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Synopsis':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#FEFF58'} bgcolor={themebgcolor} imageLocation={logoblack} ColorIcon={ColorIcon} Iconcolor={'#000000'} applogo={applogo} navigate={this.navigateToMenu} type={'Synopsis'} onBack={'ProgramDetails'} routing={'ProgramDetails'} home={initroute}/>
               <Synopsis navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Quotes':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#F12A28'} bgcolor={themebgcolor} imageLocation={logowhite} ColorIcon={ColorIcon} Iconcolor={'#fff'} applogo={applogo} navigate={this.navigateToMenu} onBack={initroute} type={'Home'} routing={initroute}/>
               <Quotes navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Archive':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#F12A28'} bgcolor={themebgcolor} imageLocation={logowhite} ColorIcon={ColorIcon} Iconcolor={'#fff'} applogo={applogo} navigate={this.navigateToMenu} type={'Quotes'} onBack={'Quotes'} routing={'Quotes'} home={initroute}/>
               <Archive navigator={navigator} {...route.passProps}  /></Drawer>;
               
               case 'VideoPage':
               return  <VideoPage navigator={navigator} {...route.passProps}  />;
               
               
               case 'Evaluate':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#86FF76'} bgcolor={themebgcolor} Iconcolor={'#000000'} imageLocation={logoblack} ColorIcon={ColorIcon} navigate={this.navigateToMenu} type={'Evaluate'} onBack={'ProgramDetails'} applogo={applogo} routing={'ProgramDetails'} home={initroute}/>
               <ProgramEvaluate navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Amigos':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#1E88E5'} bgcolor={themebgcolor} imageLocation={logowhite} Iconcolor={'#fff'} ColorIcon={ColorIcon} applogo={applogo} navigate={this.navigateToMenu} type={'Amigos'} icon={'ios-person'} onBack={'ProgramDetails'} routing={'ProgramDetails'} home={'GroupMemebers'}/>
               <ChatPage navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'GroupMemebers':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#1E88E5'} bgcolor={themebgcolor} imageLocation={logowhite} Iconcolor={'#fff'} ColorIcon={ColorIcon} applogo={applogo} navigate={this.navigateToMenu} onBack={'Amigos'} type={'MainMenu'} routing={'Amigos'}/>
               <GroupMemebers navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Konnect':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#539DFC'} bgcolor={themebgcolor} imageLocation={logowhite} Iconcolor={'#fff'} ColorIcon={ColorIcon} applogo={applogo} navigate={this.navigateToMenu} onBack={initroute} type={'MainMenu'} routing={initroute}/>
               <Amigos navigator={navigator} {...route.passProps}  /></Drawer>;
               case 'Iaf-World':
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#FFAA3F'} bgcolor={themebgcolor} Iconcolor={'#000000'} imageLocation={logoblack} ColorIcon={ColorIcon} applogo={applogo} navigate={this.navigateToMenu} type={'MainMenu'} routing={initroute}/>
               <IAFWorld navigator={navigator} {...route.passProps}  /></Drawer>;
               default:
               return <Drawer
               type="overlay"
               content={<DrawerMenu bgcolor={themebgcolor} navigate={this.navigateToMenu} />}
               tapToClose={true}
               openDrawerOffset={0.45} // 20% gap on the right side of drawer
               panCloseMask={0.2}
               side={'right'}
               closedDrawerOffset={-3}
               styles={drawerStyles}
               tweenHandler={(ratio) => ({
                                         main: { opacity:(2-ratio)/2 }
                                         })}
               >
               <MyCustomizedNavBar backgroundColor={'#1E88E5'} bgcolor={themebgcolor} imageLocation={logowhite} Iconcolor={'#fff'} ColorIcon={ColorIcon} applogo={applogo} navigate={this.navigateToMenu} type={'MainMenu'} routing={initroute}/>
               <UnderConstruction navigator={navigator} {...route.passProps} /></Drawer>;
               }
               }}
               configureScene={(route, routeStack) =>
               NavigationExperimental.Navigator.SceneConfigs.FadeAndroid
               }
               ref={(nav) => { this._navigator = nav; }}
               />
               
               );
    }
}

const styles = StyleSheet.create({
                                 appBar: {
                                 height: 56,
                                 backgroundColor: '#35B696',
                                 elevation: 4
                                 },
                                 appBarLogo: {
                                 height: 56,
                                 flexDirection: 'row',
                                 justifyContent: 'flex-start',
                                 alignItems: 'center',
                                 backgroundColor: 'transparent'
                                 },
                                 appBarTitle: {
                                 fontSize: 20,
                                 color: '#fff',
                                 paddingLeft: 10
                                 }
                                 });

export default App;
