const React = require('react');
var ReactNative = require('react-native');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage,NetInfo, Dimensions,Image,WebView,TouchableOpacity,Linking} = ReactNative;
var { Component } = React;
import {Grid, Col,Row,Button} from 'react-native-elements';
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-player';

module.exports = class VideoPage extends Component {
    
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
    isVisible:true,types:'CircleFlip', color: "#0000FF", size: 100,isModalVisible: false,programid:'',retry:false,video: { width: undefined, height: undefined, duration: undefined },
    thumbnailUrl: undefined,
    videoUrl: undefined,

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
        var url =  await AsyncStorage.getItem("url");
        var empid = await AsyncStorage.getItem('empid');
        var path=_this.props.path;
        var filename=_this.props.filename;
        var filetype=_this.props.filetype;
        var sessionname=_this.props.sessionname;
        var extension=_this.props.extension;
        var programid=_this.props.programid;
        var contentId=_this.props.contentId;
        _this.setState({
                       empid:empid,
                       path:path,extension:extension,
                       programid:programid,filename:filename,filetype:filetype,url:url,sessionname:sessionname,contentId:contentId
                       });

	this.videoHistory(empid,programid,contentId)
    }
    videoHistory(empid,programid,moduleid){
		var url=this.state.url;
		var _this=this;
		NetInfo.isConnected.fetch().then(isConnected => {
	if (isConnected) {
		var _this=this;                                 
		fetch(url+'manageappajax?type=videoLastHistory&moduleid='+moduleid+'&programid='+programid+'&empid='+empid, {
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
		  if(responseData!="")
		{	
			_this.setState({progress:responseData[0].currentdurationtime});	
		}
		else{
				_this.setState({progress:0});	
		}	
			})
			.catch((error) => {

			})
			.done();
		
		}else{

	}

	})	


	}	

    navigate(route){
        
        if(this.state.isModalVisible==true){
            this.setState({isModalVisible: false});
        }
        
        this.props.navigator.push({
                                  name: route,
                                  passProps: {
                                  programid:this.state.programid
                                  }
                                  })
    }
    
    render() {
        
        var module='http://yokupro.com/uploadfiles/'+this.props.path.replace(/ /g,'%20');
        var filename= this.state.filename;
        var extension= this.state.extension;
        var filetype= this.state.filetype;
        var returnarray=null;
        var openarray=null;
        return (
                <View style={{flex:1,backgroundColor:'#000' }} onLayout={(event) => this.handleLayoutChange(event)} >
                
                <View style={{marginTop:this.state.modalBody,}}>
                <Text style={{alignSelf:'center',color:'#ffffff'}}>{this.state.filename}</Text>
                <VideoPlayer
                endWithThumbnail
                title={this.props.filename}
                thumbnail={{ uri: this.state.thumbnailUrl }}
                video={{ uri: module }}
                videoWidth={this.state.video.width}
                videoHeight={this.state.video.height}
                navigator={this.props.navigator}
                resizeMode={'contain'}
                progress={this.state.progress}
                moduleid={this.state.contentId}
                programid={this.state.programid}
                empid={this.state.empid}
                url={this.state.url}
                />
                </View>
                <Text style={{ fontSize: 15, marginTop: 22,color:'#000' }}>{this.props.filename}</Text>
                
                
                </View>
                
                );
        
    }
}
var customStyles = StyleSheet.create({
                                     
                                     wrapper: {
                                     marginTop:150,
                                     backgroundColor:'#000'
                                     },
                                     
                                     
                                     });
