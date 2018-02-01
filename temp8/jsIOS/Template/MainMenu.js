const React = require('react');
const retryImg = require('../images/retryw.png');
var ReactNative = require('react-native');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF,Alert, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,AsyncStorage, ListView,NetInfo,Platform,ActivityIndicator} = ReactNative;
import Modal from 'react-native-modal'
var { Component } = React;
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
const background = require('../images/mobileUi_bg1.png');
import { Card, ListItem, Button } from 'react-native-elements'
import FCM, {FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType} from "react-native-fcm";

module.exports = class MainMenu extends Component {
    state = {
    checkvar:0,
    mainMenuArray:[],imagewidth:'', active: 'true',padding:40,activeFab:false, visible: false,retry:false,logout:false,isModalVisible: false,isConnected:"", token: "",
    tokenCopyFeedback: "",
        initNotif : "",animating:true
        
    };
    
    async componentDidMount(){
        FCM.requestPermissions();
        var _this = this;
        NetInfo.addEventListener('connectionChange',
                                 (isConnected)=> {
                                 _this.setState({isConnected : isConnected});
                                 }
                                 )
        var empid =  await AsyncStorage.getItem("empid");
        var customerid = await AsyncStorage.getItem("customerid");
        var companyid = await AsyncStorage.getItem("companyid");
        var initroute = await AsyncStorage.getItem("themerouting");
       // alert(mainMenuArray);
        var applogo =await AsyncStorage.getItem("applogo");
        var weburl = await AsyncStorage.getItem("weburl");
        var themeid = await AsyncStorage.getItem("themeid");
        var  mainMenuArray=JSON.parse(await AsyncStorage.getItem("mainMenuArray"));
        var url =  await AsyncStorage.getItem("url");
        this.setState({ url:url,empid:empid,companyid:companyid,initroute:initroute,applogo:applogo,weburl:weburl});
        
        this.mainMenu(themeid,companyid);
        
        if(companyid!=null){
            if(Platform.OS === 'ios'){
                this.localnotification(customerid,url,companyid,empid);
            }
            this.getFCMTokenfunction(companyid,url);
        }
        
    }
    getFCMTokenfunction(companyid,url){
        if(Platform.OS === 'ios'){
            
            FCM.getAPNSToken().then(token => {
                                    console.log("APNS TOKEN (getFCMToken)", token);
                                    });
        }
        
        FCM.getFCMToken().then(token => {
                               
                               NetInfo.isConnected.fetch().then(isConnected => {
                                                                
                                                                if(isConnected){
                                                                
                                                                var _this=this;
                                                               //alert(token);
                                                                fetch(url+'manageappajax?type=gcmDetails&gcmRegisterId='+token+'&companyid='+companyid, {
                                                                      method: 'POST',
                                                                      headers: {
                                                                      'Accept': 'application/json',
                                                                      'Content-Type': 'application/json'
                                                                      }
                                                                      })
                                                                
                                                                .then(response => {
                                                                      setTimeout(() => null, 0);  // workaround for issue-6679
                                                                      return response.json();
                                                                      })
                                                                .then((responseData) => {
                                                                      setTimeout(() => null, 0);
                                                                      console.log(
                                                                                  "POST Response",
                                                                                  "Response Body -> " + JSON.stringify(responseData)
                                                                                  )
                                                                      
                                                                      })
                                                                .done();
                                                                }else{
                                                                this.setState({retry:true,isVisible:false,logout:false});
                                                                
                                                                }
                                                                })
                               
                               });
        
        
        
        this.notificationListner = FCM.on(FCMEvent.Notification, (notif) => {
                                          
                                          //alert("Notification"+ JSON.stringify(notif));
                                          if(notif.local_notification){
                                          return;
                                          }
                                          if(notif.opened_from_tray){
                                          
                                          return;
                                          }
                                          this.sendRemote(notif);
                                          
                                          if(Platform.OS ==='ios'){
                                          //optional
                                          //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
                                          //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
                                          //notif._notificationType is available for iOS platfrom
                                          switch(notif._notificationType){
                                          case NotificationType.Remote:
                                          notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                                          break;
                                          case NotificationType.NotificationResponse:
                                          notif.finish();
                                          break;
                                          case NotificationType.WillPresent:
                                          notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                                          break;
                                          }
                                          }
                                          
                                          this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
                                                                             console.log("TOKEN (refreshUnsubscribe)", token);
                                                                             this.props.onChangeToken(token);
                                                                             });
                                          
                                          // direct channel related methods are ios only
                                          // directly channel is truned off in iOS by default, this method enables it
                                          FCM.enableDirectChannel();
                                          this.channelConnectionListener = FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
                                                                                  //alert(data);
                                                                                  console.log('direct channel connected' + data);
                                                                                  });
                                          setTimeout(function() {
                                                     FCM.isDirectChannelEstablished().then(d => console.log(d));
                                                     }, 1000);
                                          })
        
        
    }
    componentWillUnmount() {
        this.notificationListner.remove();
        
    }
    sendRemote(notif) {
        FCM.presentLocalNotification({
                                     title: notif.title,
                                     body: notif.message,
                                     priority: "high",
                                     sound: "default",
                                     click_action: notif.click_action,
                                     show_in_foreground: true,
                                     large_icon:"ic_launcher",     // Android only
                                     icon: "ic_launcher",
                                     color: "red",
                                     lights: true,
                                     });
    }
    
    localnotification(customerid,url,companyid,empid){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         
                                         fetch(url+'manageappajax?type=pushmessage&customerid='+customerid+'&companyid='+companyid+'&empid='+empid, {
                                               method: 'POST',
                                               headers: {
                                               'Accept': 'application/json',
                                               'Content-Type': 'application/json'
                                               }
                                               })
                                         .then(response => {
                                               setTimeout(() => null, 0);  // workaround for issue-6679
                                               return response.json();
                                               })
                                         .then((responseData) => {
                                               setTimeout(() => null, 0);
                                               console.log(
                                                           "POST Response",
                                                           "Response Body -> " + JSON.stringify(responseData)
                                                           )
                                               //alert(JSON.stringify(responseData));
                                               
                                               if(responseData!=""){
                                               var readid='';
                                               var contentTitle='';
                                               var readidnew="";
                                               for(var i=0;i<responseData.length;i++){
                                               if(responseData[i].wordaday!=''){
                                               contentTitle='Word a day';
                                               bodyText=responseData[i].wordaday;
                                               }
                                               if(responseData[i].questionaday!=''){
                                               contentTitle='Quote a day';
                                               bodyText=responseData[i].questionaday;
                                               }
                                               readid+=responseData[i].readid+",";
                                               FCM.presentLocalNotification({
                                                                            title: contentTitle,
                                                                            body:bodyText,
                                                                            priority: "high",
                                                                            sound: "default",
                                                                            click_action: "MYACTION",
                                                                            show_in_foreground: true,
                                                                            large_icon:"ic_launcher",     // Android only
                                                                            icon: "ic_launcher",
                                                                            color: "red",
                                                                            lights: true,
                                                                            });
                                               }
                                               readidnew = readid.replace(/,\s*$/, "");
                                               this.updatenotificationStatus(customerid,url,companyid,readidnew,empid);
                                               }
                                               })
                                         .catch((error) => {
                                                this.setState({retry:true,animating:false,});
                                                })
                                         
                                         .done();
                                         }else{
                                         this.setState({retry:true,animating:false,logout:false});
                                         
                                         }
                                         })
        
    }
    
    updatenotificationStatus(customerid,url,companyid,readidnew,empid){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         
                                         fetch(url+'manageappajax?type=updatenotificationStatus&companyid='+companyid+'&readid='+readidnew+'&customerid='+customerid+'&empid='+empid, {
                                               method: 'POST',
                                               headers: {
                                               'Accept': 'application/json',
                                               'Content-Type': 'application/json'
                                               }
                                               })
                                         
                                         .then(response => {
                                               setTimeout(() => null, 0);  // workaround for issue-6679
                                               return response.json();
                                               })
                                         .then((responseData) => {
                                               console.log(
                                                           "POST Response",
                                                           "Response Body -> " + JSON.stringify(responseData)
                                                           )
                                               //alert(JSON.stringify(responseData));
                                               })
                                         .catch((error) => {
                                                this.setState({retry:true,animating:false,});
                                                })
                                         
                                         .done();
                                         }else{
                                         this.setState({retry:true,animating:false,logout:false});
                                         
                                         }
                                         })
    }
    
    
    
    async mainMenu(empid,customerid){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         var _this=this;
                                         _this.setState({animating:true,retry:false});
                                         var url =_this.state.url;
                                         fetch(url+'manageappajax?type=mainMenu&customerid='+customerid+'&empid='+empid, {
                                               method: 'POST',
                                               headers: {
                                               'Accept': 'application/json',
                                               'Content-Type': 'application/json'
                                               }
                                               })
                                         
                                         
                                         .then(response => {
                                               setTimeout(() => null, 0);  // workaround for issue-6679
                                               return response.json();
                                               })
                                         .then((responseData) => {
                                               setTimeout(() => null, 0);
                                               console.log(
                                                           "POST Response",
                                                           "Response Body -> " + JSON.stringify(responseData)
                                                           )
                                               AsyncStorage.setItem('mainMenuArray',JSON.stringify(responseData)+"");
                                               _this.setState({
                                                              mainMenuArray:responseData,animating:false,retry:false,logout:true
                                                              });
                                               
                                               })
                                         .catch((error) => {
                                                this.setState({retry:true,animating:false,});
                                                })
                                         
                                         .done();
                                         
                                         }else{
                                         this.setState({retry:true,animating:false,logout:false});
                                         
                                         }
                                         })
    }
    async handleLayoutChange(event:Event){
        
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;
        if(width>height){
            
            await this.setState({screenType: 'Landscape',
                                height : height,width : width,
                                imagewidth:width/15,imageheight:height/5.6,
                                menuiconwidth:width/7.5,menuiconheight:height/6.5,
                                imagewidthicon:width/3.5 ,imageheighticon:height/7,
                                shadowwidth:width/5.5,shadowheight:height/2.5,
                                backgroundwidth:width/2.2,backgroundheight:height/1.0,padding:width/9,imagepadding:width/4,
                                retrypadding:height/2,
                                Listpadding:width/10.5,overpadding:width/5, modalBody:width/2});
            
            
            
        } else {
            
            await this.setState({screenType: 'Portrait',
                                height : height,width : width,
                                imagewidth:width/6 ,imageheight:height/7,
                                menuiconwidth:width/7.5,menuiconheight:height/12.7,
                                imagewidthicon:width/1.5 ,imageheighticon:height/8.5,
                                shadowwidth:width/4,shadowheight:height/7,
                                backgroundwidth:width/1,backgroundheight:height/1.2,
                                retrypadding:height/1.9,
                                imagepadding:0,Listpadding:width/5,overpadding:width/10,modalBody:width/2});
            
        }
        
    };
    async rowPressedLogout(val) {
        await AsyncStorage.setItem("companyid", "");
        await AsyncStorage.setItem("empid", "");
        await AsyncStorage.setItem("imagepath", "");
        await AsyncStorage.setItem("employeename","");
        await AsyncStorage.setItem("customerid", "");
        await AsyncStorage.setItem("url","");
        await AsyncStorage.setItem("programid","");
        await AsyncStorage.setItem("menuoption", "");
        await AsyncStorage.setItem("themeid","");
        await AsyncStorage.setItem("weburl","");
       	await AsyncStorage.setItem("themerouting", "");
        await AsyncStorage.setItem("themebgcolor", "");
        await AsyncStorage.setItem("bgcolor", "");
        await AsyncStorage.setItem("mainMenuArray", "");
        //await AsyncStorage.setItem("applogo", "");
        await AsyncStorage.setItem("menuLable", "");
        await AsyncStorage.setItem("compentencystatus", "");       
        
        var _this = this;
        if (val != '') {
            _this.navigate(val);
        }
        
    }
    
    
    rowPressed(val,menuLable) {
        var _this = this;
        if(_this.state.isModalVisible==true){
            _this.setState({isModalVisible: false});
        }
        if (val != '') {
            _this.navigate(val,menuLable);
        }
        
    }
    
    logoutFunction(){
        var _this=this
        Alert.alert('YokuPro', 'Do you wish to logout? ',  [
                                                            { text: 'Ok',onPress: ()=>_this.rowPressedLogout('Login') },
                                                            {text: 'Cancel', onPress: ()=>_this.noPressed, style: 'cancel'},
                                                            ]);
    }
    
    
    navigate(route,menuLable){

        var headerImage="";
        if(route=='Resources'){
            routepage='ProgramDetails';
        }
        else if(route=='Synopsis'){
            routepage='ProgramDetails';
        }
        else if(route=='Evaluate'){
            routepage='ProgramDetails';
        }
        else if(route=='Amigos'){
            routepage='ProgramDetails';
        }
        else if(route=='Quotes')
        {
            menuLable='Nuggets'
            var empid = this.state.empid;
            var companyid = this.state.companyid;
            var url =this.state.url;
            var Devicename=Platform.OS;
            fetch(url+'manageappajax?type=readingHistory&empid='+empid+'&companyid='+companyid+'&programtype=Nuggets&Devicename='+Devicename, {
                  method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  }
                  })
            .then(response => {
                  setTimeout(() => null, 0);  // workaround for issue-6679
                  return response.json();
                  })
            .then((responseData) => {
                  setTimeout(() => null, 0);
                  console.log(
                              "POST Response",
                              "Response Body -> " + JSON.stringify(responseData)
                              )
                  
                  
                  })
            .catch((error) => {
                   this.setState({retry:true,isVisible:false,});
                   })
            .done();
            routepage=route;
        }
        else{
            routepage=route;
        }
       // alert(this.state.initroute);

        
        this.props.navigator.push({
                                  name: routepage,
                                  initroute:this.state.initroute,
                                  themebgcolor:this.state.themebgcolor,applogo:this.state.applogo,
                                  passProps: {
                                  routName:route,menuLable:menuLable,weburl:this.state.weburl
                                  
                                  }
                                  })
    }
    
    groupItems(items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function(item) {
                      if (group.length === itemsPerRow) {
                      itemsGroups.push(group);
                      group = [item];
                      } else {
                      group.push(item);
                      }
                      });
        
        if (group.length > 0) {
            itemsGroups.push(group);
        }
        
        return itemsGroups;
    }
    renderGroup(group) {
        var that = this;
        var imageurl="http://yokupro.com/MenuIcons/";
        var items = group.map(function(menuarray, index) {
                              var newurl= imageurl+menuarray.filename;
                              
                              return <View key={index}>
                              
                              <View style={styles.avatarContainerhead}>
                              <TouchableOpacity activeOpacity={.3}   onPress={() => that.rowPressed(menuarray.menu,menuarray.menu)} >
                              <View style={{ width: that.state.imagewidth,height: that.state.imageheight, alignItems: 'center', justifyContent: 'center'}}  color="Black"  >
                              
                              
                              </View>
                              <View>
                              
                              </View>	
                              </TouchableOpacity>  		
                              </View>
                              </View>;
                              });
        return (
                <View style={styles.group}>
                {items}
                </View>
                );
    }
    
    render() {
        var _this=this;
        var groups = _this.groupItems(_this.state.mainMenuArray, 3);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        
        if(_this.state.retry==true){
            var retry=<View style={{alignSelf:"center",flex:1,paddingTop:this.state.retrypadding}}>
            <Text style={{color:"#000000",fontWeight: 'bold',}}>You seem to be offline</Text>
            <Button
            raised
            style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}}
            backgroundColor="#EC9B64"
            onPress={()=>this.componentDidMount()}
            title="Go Online"/>
            </View>;			
        }
        var logoutnew=null;
        
        if(_this.state.screenType=='Landscape'){
            
            logoutnew=<View style={{alignSelf:'flex-start'}}>
            <Icon name='sign-out' size={25} style={{color:'#ffffff',paddingLeft:20 }} onPress={() =>this.logoutFunction()}/>
            </View>
        }
        
        var logout="";
        if(_this.state.mainMenuArray!=''){
            
            logout=<View style={{alignSelf:'flex-start'}}>
            <Icon name='sign-out' size={32} style={{color:'#ffffff',paddingTop:50,paddingLeft:20 }} onPress={() =>this.logoutFunction()}/>
            </View>;
        }
        else{
            logout=<View></View>;
        }
        const animating = this.state.animating
        
        
        
        return (
                
                
                <LinearGradient colors={['#5BB9FF','#AFEEFF', '#23A9FF']}  style={{flex:1}} onLayout={(event) => this.handleLayoutChange(event)}>
                
                <View style={styles.headercontentimagenew}>
                
                <Image source={require('../images/logo-3.png')} style={{width:this.state.imagewidthicon,height:this.state.imageheighticon,}}/>
                </View>
                {logoutnew}
                <View style={{paddingLeft:this.state.imagepadding}}>
                <Image source={background} style={{width:this.state.backgroundwidth,height:this.state.backgroundheight,}}>
                <View style={{paddingLeft:this.state.Listpadding}}> 	
                <ListView
                {...this.props}
                renderRow={this.renderGroup.bind(this)}
                dataSource={ds.cloneWithRows(groups)}
                enableEmptySections={true}
                />	
                </View>
                {logout}
                {retry}
                
                </Image>	
                
                </View>
                <Modal isVisible={animating} >
                <ActivityIndicator
                animating = {animating}
                color = '#ffffff'
                size = "large"
                style = {styles.activityIndicator}
                />
                <Text style={{alignSelf:"center",fontSize:20,color:"#ffffff",paddingTop:20}}>Loading...</Text>
                </Modal>
                
                <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,    backgroundColor: this.state.themebgcolor,}}><Text style={{ color: '#000000',
                                   alignSelf:"flex-end",
                                   fontSize:12,paddingRight:5}}>Powered by YokuPro</Text></View>
                </LinearGradient>
                
                
                );
        
    }
}
var styles = StyleSheet.create({
                               
                               avatarContainerhead: {
                               alignItems: 'center',
                               justifyContent: 'space-between',
                               paddingHorizontal: 12,
                               paddingVertical: 5,
                               },
                               
                               headercontentimage: {
                               flexDirection: 'row',
                               alignItems: 'center',
                               justifyContent: 'space-between',
                               paddingHorizontal: 25,
                               
                               alignSelf: 'center',	 
                               
                               },
                               headercontentimagenew: {
                               flexDirection: 'row',
                               alignItems: 'center',
                               justifyContent: 'space-between',
                               paddingHorizontal: 10,
                               alignSelf: 'center',
                               paddingTop:40
                               
                               
                               
                               },
                               headercontent : {
                               alignSelf: 'center'
                               
                               },
                               background:{
                               backgroundColor: '#FBFAFA',
                               },
                               
                               linearGradient: {
                               
                               paddingLeft: 15,
                               paddingRight: 15,
                               borderRadius: 35,
                               
                               
                               },
                               buttonText: {
                               fontSize: 18,
                               fontFamily: 'Gill Sans',
                               textAlign: 'center',
                               margin: 10,
                               color: '#ffffff',
                               backgroundColor: 'transparent',
                               },
                               group: {
                               flexDirection: 'row',
                               alignItems: 'center',
                               justifyContent: 'center',
                               overflow: 'hidden'
                               }
                               
                               
                               });

