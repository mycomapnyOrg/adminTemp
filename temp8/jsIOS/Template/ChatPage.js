/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,  Platform,
    AsyncStorage,NetInfo,
    Dimensions,TouchableOpacity,Image,ActivityIndicator,PixelRatio
} from 'react-native';
import Modal from 'react-native-modal'
import ThemeStyles from '../Styles/ThemeStyles';
import CustomActions from './CustomActions';
import CameraActions from './CameraActions';
import Video from 'react-native-video';
import {Grid, Col,Row,Button} from 'react-native-elements';
const retryImg = require('../images/TrainingPrograms.png');
import { GiftedChat,Actions } from 'react-native-gifted-chat';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
const FilePickerManager = require('NativeModules').FilePickerManager;
var ImagePicker = require('react-native-image-picker');

export default class ChatPage extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        messages: [],animating:true,
        useridnew:null,
        userid:"",
        loadEarlier: true,
        isLoadingEarlier: false,
            height : Dimensions.get('window').height,
        width:Dimensions.get('window').width,
            screenType : '',
        groupId:'',programid:'',isVisible:true,types:'Circle', color: "#4376FC", size: 50,interval:'',intervalcount:'',modalstaus:false,paused:false,icons:'play-arrow',menuLable:this.props.menuLable
        };
        this.onSend = this.onSend.bind(this);
        this.renderCustomActions = this.renderCustomActions.bind(this);
        //this.loadMessages = this.loadMessages.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);
        this._isMounted = false;
    }
    async componentDidMount(){
        var url =  await AsyncStorage.getItem("url");
        var customerid =  await AsyncStorage.getItem("customerid");
        var companyid =  await AsyncStorage.getItem("companyid");
         var  programid=await AsyncStorage.getItem("programid");
        var  empid=await AsyncStorage.getItem("empid");
        var initroute = await AsyncStorage.getItem("themerouting");
        var themebgcolor = await AsyncStorage.getItem("themebgcolor");
        var applogo = await AsyncStorage.getItem("applogo");

        var _this=this;
        NetInfo.addEventListener('connectionChange',
                                 (isConnected)=> {
                                 _this.setState({isConnected : isConnected});
                                 }
                                 )
        //var programid=_this.props.programid;
        _this.setState({url:url,customerid:customerid,companyid:companyid,programid:programid,userid:empid,initroute:initroute,themebgcolor:themebgcolor,applogo:applogo});
        _this.componentWillMount();
        
    }
    async componentWillMount() {
        var _this = this;
        var  programid=await AsyncStorage.getItem("programid");
        this._isMounted = true;
        _this.setState({
                       programid: programid,
                       });
        this.testfun();
    }
    testfun()
    
    {
    
        var _interval = setInterval(() => {
                                    this.loadMessages(this._interval);
                                     
                                     }, 3000);
        
        this.setState({
                       interval:_interval
                       });

        

        
    }
    loadMessages(intervalcheck)
    {
        
        this.setState({
                      intervalcount:intervalcheck
                      });
    
        
        //alert(this.state.interval);
       
               NetInfo.isConnected.fetch().then(isConnected => {
                                         
                                         if(isConnected){
                                         var _this = this;
                                         var userid=this.state.userid;
                                         
                                         var programid=_this.state.programid;
                                         var companyid=this.state.companyid;
                                         _this.setState({useridnew:userid,programid:programid});
                                         
                                         var content=new Array();
                                         var msgUserId=null;
                                         var url =_this.state.url;
                                         
                                         fetch(url+'manageappajax?type=chatPage&empid='+userid+'&programid='+programid+'&companyid='+companyid, {
                                               method: 'POST',
                                               headers: {
                                               'Accept': 'application/json',
                                               'Content-Type': 'application/json'
                                               
                                               
                                               }
                                               })
                                         
                                         .then((response) => response.json())
                                         .then((responseData) => {
                                               console.log(
                                                           "POST Response",
                                                           "Response Body -> " + JSON.stringify(responseData)
                                                           )
                                               var msgArray=new Array();
                                               var msgsArr=new Array();
                                               msgArray=responseData;
                                               
                                               
                                               
                                               for(var i=(msgArray.length-1);i>=0;i--)
                                               {
                                               var year=msgArray[i].year;
                                               var day=msgArray[i].day;
                                               var month=msgArray[i].month-1;
                                               var minute=msgArray[i].minute;
                                               var hour=msgArray[i].hour;
                                               if(msgArray[i].userid==_this.state.useridnew)
                                               {
                                               msgUserId=2;
                                               }
                                               else
                                               {
                                               msgUserId=1;
                                               }
                                               
                                               content.push({
                                                            _id: msgArray[i].id,
                                                            text: msgArray[i].msg,
                                                            file:msgArray[i].file,
                                                            createdAt: new Date(Date.UTC(year, month, day, hour, minute, 0)),
                                                            user: {
                                                            _id: msgUserId,
                                                            name: msgArray[i].empName,
                                                            avatar: msgArray[i].imagepath,
                                                            },
                                                            image: msgArray[i].image,
                                                            },
                                                            );
                                               
                                               }
                                               _this.setState({
                                                              messages: content,retry:false,isVisible:false,animating:false
                                                              });
                                               
                                               
                                               })
                                         .catch((error) => {
                                                this.setState({retry:true,isVisible:false,animating:false});
                                                })
                                         .done();
                                         }else{
                                         this.setState({retry:true,isVisible:false,animating:false});
                                         }
                                         })
        
        

        

    }
    
    componentWillUnmount()
    {
        this._isMounted = false;
        
        clearInterval(this.state.interval);
        
        clearInterval(this.state.intervalcount);


    }
    uploadResources(type,filename){
        if(type!='close')
        {
            let file='';
            let data = new FormData()
            if(type=='image'){
                
                file= { uri: this.state.avatarSource.uri, name: 'image.jpg', type: 'multipart/form-data'};
                
            }else if(type=='video'){
                file= { uri: this.state.videoSource, name: 'Video.mov', type: 'multipart/form-data'};
                
            }
            else if(type=='files'){
                file= { uri: this.state.file.uri, path:this.state.file.path,  name: filename, type: 'multipart/form-data'};
                
            }
            else if(type=='Url'){
                data.append('uploadUrl',this.state.uploadUrl);
            }
            else if(type=='Query'){
                data.append('Query',this.state.Query);
                
            }
            var companyid=this.state.companyid;
            var customerid=this.state.customerid;
            var programid=this.state.programid;
            var empid=this.state.userid;
            var url=this.state.url;
            data.append('path',file['path']);
            data.append('file',file);
            data.append('companyid',companyid);
            data.append('customerid',customerid);
            data.append('programid',programid);
            data.append('empid',empid);
            data.append('requestType',type);
            this.setState({isVisible:true});
            fetch('http://yokupro.com/manage/manageappajax?type=uploadfile', {
                  method: 'POST',
                  body:data
                  })
            .then((response) => response.json())
            .then((responseData) => {
                  console.log(
                              "POST Response",
                              "Response Body -> " + JSON.stringify(responseData)
                              )
                  if(responseData!=""){
                  if(responseData.msg!='Query'){
                  this.setState({isVisible:false,avatarSource:'',ImageUpload:'',videoSource:'',retry:false});
                  this.setState({isVisible:false,avatarSource:'',ImageUpload:'',videoSource:'',retry:false});
                  this.hideModal();
                  }
                  else{
                  this.setState({isVisible:false,retry:false,QueryMsg:"Query submitted successfully	",Query:''});
                  this.setState({isVisible:false,avatarSource:'',ImageUpload:'',videoSource:'',retry:false});
                  this.hideModal();
                  
                  }
                  }
                  
                  })
            .catch((error) => {
                   this.setState({retry:true,isVisible:false,});
                   })

            .done();
            this.setState({isVisible:false,avatarSource:'',ImageUpload:'',videoSource:'',retry:false});
            this.hideModal();

        }
        else if(type=='close')
        {
            this.setState({isVisible:false,avatarSource:'',ImageUpload:'',videoSource:'',retry:false});
            this.hideModal();
            
        }
        
        
        
        
    }
    hideModal(){
        this.setState({UploadUrl:false,UploadQuery:false});
    }
    
    
    renderCustomActions(props) {
        
        if (Platform.OS === 'ios') {
            return (
                    <CameraActions
                    {...props}
                    />
                    );
        }
        else{
            return (
                    <CameraActions
                    {...props}
                    />
                    );
        }
    }
    onLoadEarlier() {
        this.setState((previousState) => {
                      return {
                      isLoadingEarlier: true,
                      };
                      });
        setTimeout(() => {
                   if (this._isMounted === true) {
                   this.setState((previousState) => {
                                 return {
                                 messages: GiftedChat.prepend(previousState.messages, require('./old_messages.js')),
                                 loadEarlier: true,
                                 isLoadingEarlier: false,
                                 };
                                 });
                   }
                   }, 1000); // simulating network
    }
    
    async onSend(messages = []) {
        
        var _this = this;
        var groupId=_this.props.groupId;
        var userid=this.state.userid;
        var customerid=_this.state.customerid;
        var companyid=_this.state.companyid;
        var programid=_this.state.programid;
        var msgText=messages[0].text;
        var url =_this.state.url;
        
        if(messages[0].text!=null){
            
            fetch(url+'manageappajax?type=sentMesg&empid='+userid+'&programid='+programid+'&msgText='+msgText+'&customerid='+customerid+'&companyid='+companyid, {
                  method: 'POST',
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  }
                  })
            .then((response) => response.json())
            .then((responseData) => {
                  console.log(
                              "POST Response",
                              "Response Body -> " + JSON.stringify(responseData)
                              )				
                  
                  })
            .catch((error) => {
                   this.setState({retry:false,animating:false});
                   })
            .done();
        }
        else{
            let file= { uri: messages[0].path, name: 'image.jpg', type: 'multipart/form-data'};
            let data = new FormData()
            data.append('file',file);
            data.append('companyid',companyid);
            data.append('customerid',customerid);
            data.append('programid',programid);
            data.append('empid',userid);
            fetch(url+'manageappajax?type=uploadImage', {
                  method: 'POST',
                  body:data
                  })
            .then((response) => response.json())
            .then((responseData) => {
                  console.log(
                              "POST Response",
                              "Response Body -> " + JSON.stringify(responseData)
                              )
                  })
            .catch((error) => {
                   this.setState({retry:false,animating:false});
                   })
            .done();

            
        }
        
    }
    
    async handleLayoutChange(event:Event){
        
        var height = Dimensions.get('window').height;
        var width = Dimensions.get('window').width;
        if(width>height){
            
            await this.setState({screenType: 'Landscape', height : height,width : width});
            
        } else {
            
            await this.setState({screenType: 'Portrait', height : height,width : width,paddingBody:width/7});
        }
        
    };
    navigate(route){
        if(route!="GroupMemebers")
        {
            var routeNma='Amigos';
            this.props.navigator.push({
                                      name: route,themebgcolor:this.state.themebgcolor,applogo:this.state.applogo, // Matches route.name
                                      passProps: 
                                      { programid:this.state.programid,
                                      routName:routeNma	
                                      }
                                      })
        }
        else
        {
            this.props.navigator.push({
                                      name: route,themebgcolor:this.state.themebgcolor,applogo:this.state.applogo,
                                      passProps: 
                                      { programid: this.state.programid,
                                      }
                                      })
        }
    }
    renderCustomActions(props) {
        
        const options = {
            
            'File Upload': (props) => {
                
                            DocumentPicker.show({
                                        filetype: [DocumentPickerUtil.allFiles()],
                                        
                                        },(error,url) => {
                                        this.setState({
                                                      file: url,ImageUpload:"files",modalstaus:true
                                                      });
                                        
                                        });
                
            },
            
            'Image Upload': (props) =>
            {
                const options = {
                quality: 1.0,
                maxWidth: 500,
                maxHeight: 500,
                storageOptions: {
                skipBackup: true
                }
                };
                
                ImagePicker.showImagePicker(options, (response) => {
                                            console.log('Response = ', response);
                                            
                                            if (response.didCancel) {
                                            console.log('User cancelled photo picker');
                                            }
                                            else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                            }
                                            else if (response.customButton) {
                                            console.log('User tapped custom button: ', response.customButton);
                                            }
                                            else {
                                            let source = { uri: response.uri };
                                            
                                            // You can also display the image using data:
                                            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                                            
                                            this.setState({
                                                          avatarSource: source,ImageUpload:"image",modalstaus:true
                                                          });
                                            }
                                            });
                
            },
            
            'Video Upload': (props) =>
            {
                const options = {
                title: 'Video Picker',
                takePhotoButtonTitle: 'Take Video...',
                mediaType: 'video',
                videoQuality: 'medium'
                };
                
                ImagePicker.showImagePicker(options, (response) => {
                                            console.log('Response = ', response);
                                            
                                            if (response.didCancel) {
                                            console.log('User cancelled video picker');
                                            }
                                            else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                            }
                                            else if (response.customButton) {
                                            console.log('User tapped custom button: ', response.customButton);
                                            }
                                            else {
                                            this.setState({
                                                          videoSource: response.uri,ImageUpload:"video",modalstaus:true
                                                          });
                                            }
                                            });
                
            },
            
            'Cancel': () => {},
        };
        
        
        return (
                <Actions
                {...props}
                options={options}
                />
                );
    }
    playVideo(){
        if(this.state.paused==true){
            this.setState({paused:false,icons:'pause'});
        }else{
            this.setState({paused:true,icons:'play-arrow'});
            
        }
    }

    render() {
        var height=this.state.height;
        var width=this.state.width;
        var retry='';
        if(this.state.retry==true){
            
            var retry=<View style={{alignSelf:"center",flex:1,paddingTop:10}}>
            <Text style={{color:"#000000"}}>You seem to be offline</Text>
            
            <Button
            raised
            style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}}
            backgroundColor="#EC9B64"
            onPress={()=>this.componentDidMount()}
            title="Go Online"/>
            </View>;

        }
        
        if(this.state.ImageUpload=="image"){
           
            var ImageUpload=<Modal isVisible={this.state.modalstaus} >
              <View>
            <View style={[styles.avatar, styles.avatarContainer]}>
            {
                <Image style={styles.avatar} source={this.state.avatarSource} />
            }
            </View>
            </View>
                <View style={{marginTop:10,flexDirection:'row',alignSelf:'center' }}>
                <Button
            onPress={()=>this.uploadResources('image')}
            icon={{name: 'upload', type: 'font-awesome'}}
            title='Upload' />
            <Button
            onPress={()=>this.uploadResources('close')}
            icon={{name: 'close', type: 'font-awesome'}}
            title='Cancel' /></View>
            
                </Modal>;
            
                
                
            
        }else if(this.state.ImageUpload=="files"){
            if(this.state.file!=null){
            var filename=this.state.file.fileName;
            ImageUpload=<Modal isVisible={this.state.modalstaus} >
                <View style={ThemeStyles.cardStyle}>
                <View style={{flexDirection:'row',margin:10}}>
                <Image style={ThemeStyles.iconImage} source={require('./../images/Docs-icon.png')} />
                <Text style={{fontSize:15,color:"#3498db",marginTop:20}}>{filename}</Text>
            </View>
                <View style={{marginTop:10,flexDirection:'row',alignSelf:'center' }}>
                <Button
            onPress={()=>this.uploadResources('files',filename)}
            icon={{name: 'upload', type: 'font-awesome'}}
            title='Upload' />
                <Button
            onPress={()=>this.uploadResources('close')}
            icon={{name: 'close', type: 'font-awesome'}}
            title='Cancel' />
                </View>
            </View >
              </Modal>
            }
        }else if(this.state.ImageUpload=="video") {
            
            var array =(this.state.videoSource).split('/');
            var filelength=array.length;
            filelength--;
            var videofile =array[filelength];
            ImageUpload=<Modal isVisible={this.state.modalstaus} >
            <View style={ThemeStyles.container}>
            { this.state.videoSource &&
                <Video
                source={{uri:this.state.videoSource}}
                style={ThemeStyles.backgroundVideo}
                paused={this.state.paused}
                muted={this.state.muted}
                repeat={false}
                />
                
            }
            <View style={{paddingTop:225}}>
            <Button
            backgroundColor="transparent"
            onPress={()=>this.playVideo()}
            icon={{name: this.state.icons, size: 35}}
            />
            </View>
            </View>
            <View style={{marginTop:15,flexDirection:'row',alignSelf:'center'}}>
            <Button
            onPress={()=>this.uploadResources('video')}
            icon={{name: 'upload', type: 'font-awesome'}}
            title='Upload' />
            <Button
            onPress={()=>this.uploadResources('close')}
            icon={{name: 'close', type: 'font-awesome'}}
            title='Cancel' /></View>
            </Modal >;
        }
        var restult="";
        if(this.state.animating==true){
            restult= <ActivityIndicator
            animating = {this.state.animating}
            color = '#23A9FF'
            size = "large"
            style = {styles.activityIndicator}
            />;
        }
        else{
            restult=<GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            onLoadEarlier={this.onLoadEarlier}
            user={{_id: 2,}}
            />;
        }
        
        if(this.state.initroute=='MainMenu'){

			var headerTab= <View style={ThemeStyles.hederBG}>
				<Text style={ThemeStyles.titleText}>{this.state.menuLable}</Text>
			</View>;
		}
		else if(this.state.initroute=='Theme1'){
			headerTab= <View style={ThemeStyles.hederBGTheme1}>
				<Text style={ThemeStyles.titleTextTheme1}>{this.state.menuLable}</Text>
			</View>;
        } else if(this.state.initroute=='Theme2'){
            headerTab= <View style={{backgroundColor:this.state.themebgcolor,
            shadowColor: '#000',
            shadowRadius: 20,
            elevation: 8,
                padding:5}}>
            <Text style={ThemeStyles.titleTextTheme2}>{this.state.menuLable}</Text>
            </View>;
        }
        	else if(this.state.initroute=='Theme3'){
                headerTab= <View style={{backgroundColor:this.state.themebgcolor,
                borderColor: '#ddd',
                shadowColor: '#000',
                shadowRadius: 20,
                elevation: 15,
                padding:5
                }}>

				<Text style={ThemeStyles.titleTextTheme3}>{this.state.menuLable}</Text>
			</View>;
		}
        return (
                <View style={ThemeStyles.container}>
                {headerTab}
                {ImageUpload}
                <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                onLoadEarlier={this.onLoadEarlier}
                user={{_id: 2,}}
                renderActions={this.renderCustomActions}
                enableEmptySections={true}
                />
                </View>
                
                );
    }
}
const styles = StyleSheet.create({
                                 container: {
                                 flex: 1,
                                 backgroundColor: '#F5FCFF'
                                 },
                                 welcome: {
                                 fontSize: 20,
                                 textAlign: 'center',
                                 margin: 10,
                                 color: 'white',
                                 fontWeight: 'bold',
                                 },
                                 titleViewText: {
                                 fontSize: 23,
                                 color: '#3b5998',
                                 alignSelf:'center'	
                                 
                                 },
                                 spinner: {
                                 alignSelf: 'center',
                                 marginTop: 150
                                 },
                                 activityIndicator: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 height: 250
                                 },
                                 backgroundVideo: {
                                 position: 'absolute',
                                 top: 100,
                                 left: 20,
                                 bottom: 30,
                                 right: 50,
                                 padding:30,
                                 borderRadius: 50,
                                 },
                                 avatarContainer: {
                                 borderColor: '#9B9B9B',
                                 borderWidth: 1 / PixelRatio.get(),
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 marginTop:20
                                 },
                                 avatar: {
                                 width: 300,
                                 height: 500,
                                 alignSelf:'center'
                                 },
                                 });
