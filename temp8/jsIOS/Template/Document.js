const React = require('react');
var ReactNative = require('react-native');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,Linking} = ReactNative;
var { Component } = React;
import {Grid, Col,Row,Button} from 'react-native-elements';
import Video from 'react-native-video';


module.exports = class Document extends Component {
    
    onNavigationStateChange(navState) {
        this.setState({
                      canGoBack: navState.canGoBack
                      });
    }
    
    
    state = {
    loginempid:[],
    loadmoduleid:[],
        screenType : '',
        height : Dimensions.get('window').height,
    isVisible:true,types:'CircleFlip', color: "#0000FF", size: 100,isModalVisible: false,programid:'',retry:false,timePassed: true
    };
    
    async handleLayoutChange(event:Event){
        
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;
        if(width>height){
            await this.setState({screenType: 'Landscape', height : height,modalBody:0});
            
        } else {
            
            await this.setState({screenType: 'Portrait', height : height,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
        }
        
    };
    
    async componentDidMount(){
        var _this = this;
        if(this.props.filetype=='story'|| this.props.filetype=='url' ){
            _this._interval = setInterval(() => {
                                          
                                          
                                          _this.loadcontent();
                                          
                                          },2000);
        }
        var url =  await AsyncStorage.getItem("url");
        var empid = await AsyncStorage.getItem('empid');
        var moduleid = await AsyncStorage.getItem('moduleid');
        var clear = await AsyncStorage.getItem('clear');
        
        var path=_this.props.path;
        var filename=_this.props.filename;
        var filetype=_this.props.filetype;
        var sessionname=_this.props.sessionname;
        var extension=_this.props.extension;
        var programid=_this.props.programid;
        _this.setState({
                       loginempid:empid,
                       loadmoduleid:moduleid,path:path,extension:extension,
                       programid:programid,filename:filename,filetype:filetype,url:url,sessionname:sessionname
                       });
    }
    loadcontent()
    {

        var _this = this;
        if(this.state.timePassed) {
            
            _this.navigate('Resources');
            
        }
        _this.setState({
                       timePassed:false,
                       });
        
    }
   async navigate(route){
        
        if(this.state.isModalVisible==true){
            this.setState({isModalVisible: false});
        }
                var menuLable = await AsyncStorage.getItem('menuLable');
        this.props.navigator.push({
                                  name: route,
                                  passProps: {
                                  programid:this.state.programid,                                      
				  menuLable:menuLable,
                                  }
                                  })
    }
    
    render() {
        var module= this.state.path;
        var filename= this.state.filename;
        var extension= this.state.extension;
        var filetype= this.state.filetype;
        var returnarray=null;
        var openarray=null;
        
        if(module==undefined ){
            var resultData=<View style={{alignSelf:"center",padding:15}}>
            <Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Documents available</Text>
            </View>;
        }
        if(filetype=='url'){
            openarray= <ScrollView>
            <WebView
            ref={(ref) => { this.webview = ref; }}
            source={{ uri:filename }}
            onNavigationStateChange={(event) => {
                if (event.url !== filename) {
                    this.webview.stopLoading();
                    Linking.openURL(event.url);
                }
            }}
            />
            </ScrollView>;
        }
        else if(filetype=='story'){
            var storyPath="https://yokupro.com/uploadfiles/"+module;
            openarray= <ScrollView>
            <WebView
            ref={(ref) => { this.webview = ref; }}
            source={{ uri:storyPath }}
            onNavigationStateChange={(event) => {
                if (event.url !== filename) {
                    this.webview.stopLoading();
                    Linking.openURL(event.url);
                }
            }}
            />
            </ScrollView>;
        }
        else if(extension=='odt' || extension=='odp' || extension=='ods' || extension=='mp3' ||extension=='jpg' || extension=='png' || extension=='gif'){
            returnarray= <ScrollView>
            <WebView source={{uri: "http://34.225.214.153/viewJsInYokupro/loadfile.php?type=yokuproSession&path="+module+"&extension="+extension+"&filename="+filename+"&sessionname="+this.state.sessionname}}  mediaPlaybackRequiresUserAction={true} style={{height:this.state.height/1.2 }} />
            </ScrollView>;
            
        }
        
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
        
        return (
                <View onLayout={(event) => this.handleLayoutChange(event)}>
                
                {returnarray}
                {openarray}
                {resultData}
                {retry}
                </View>
                
                );
        
    }
}
var styles = StyleSheet.create({
                               
                               backgroundVideo: {
                               position: 'absolute',
                               top: 0,
                               left: 0,
                               bottom: 0,
                               right: 0,
                               },
                               
                               
                               });

