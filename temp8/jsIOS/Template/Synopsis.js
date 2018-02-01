const React = require('react');
var ReactNative = require('react-native');
var {  NetInfo,StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,ActivityIndicator,
    TouchableHighlight,
 } = ReactNative;
import Pdf from 'react-native-pdf';
import ThemeStyles from '../Styles/ThemeStyles';
var { Component } = React;
import { List, ListItem,Card,Button } from 'react-native-elements'
module.exports = class Document extends Component {

    state = {
	screenType : '',
        height : Dimensions.get('window').height,isVisible:false,types:'Circle', color: "black", size: 50,isModalVisible: false,programid:'',extension:'',path:'',resultData:false,retry:false,animating:true
  };
    constructor(props) {
        super(props);
        this.state = {
            screenType : '',
            height : Dimensions.get('window').height,isVisible:false,types:'Circle', color: "black", size: 50,isModalVisible: false,programid:'',extension:'',path:'',resultData:false,retry:false,animating:true,page: 1,pageCount: 1,

        };
        this.pdf = null;
    }

showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){
            await this.setState({screenType: 'Landscape', height : height,modalBody:0,width:width});
		
		} else {

            await this.setState({screenType: 'Portrait', height : height,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2,width:width});
		}

	};

async componentDidMount(){
    
    NetInfo.addEventListener('connectionChange',
                             (isConnected)=> {
                             this.setState({isConnected : isConnected});
                             }
                             )
    
	var companyid = await AsyncStorage.getItem("companyid");
    var url =  await AsyncStorage.getItem("url");
	var programid=this.props.programid;
            var initroute = await AsyncStorage.getItem("themerouting");
    var themebgcolor = await AsyncStorage.getItem("themebgcolor");

    this.setState({programid:programid,url:url,initroute:initroute,menuLable:this.props.menuLable,themebgcolor:themebgcolor});
	this.synopsisload(companyid,programid);

}
synopsisload(companyid,programid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
	var _this = this;
                                     var url=this.state.url;
                                     _this.setState({isVisible:true,retry:false,animating:true});
                                    
		fetch(url+'manageappajax?type=SynopsisDetails&customerid='+companyid+'&programid='+programid, {
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
			if(responseData!=null){
									
				_this.setState({
                               isVisible:false,retry:false,path:responseData[0].filepath,extension:responseData[0].extension,animating:false,filename:responseData[0].filename
				});
              
			}
			else{
			_this.setState({
                           isVisible:false,resultData:true,animating:false
				});

			}
					
		
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
navigate(route){
    
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	
	  var routeNma='Synopsis';
		this.props.navigator.push({
	    name: route, 
		passProps: {
		routName:routeNma
      		}
	  })
	}
    prePage=()=>{
        if (this.pdf){
            let prePage = this.state.page>1?this.state.page-1:1;
            this.pdf.setNativeProps({page: prePage});
            this.setState({page:prePage});
            console.log(`prePage: ${prePage}`);
        }
    }
    
    nextPage=()=>{
        if (this.pdf){
            let nextPage = this.state.page+1>this.state.pageCount?this.state.pageCount:this.state.page+1;
            this.pdf.setNativeProps({page: nextPage});
            this.setState({page:nextPage});
            console.log(`nextPage: ${nextPage}`);
        }
        
    }
  render() {

var path= this.state.path;
var extension= this.state.extension;
var returnarray=null;
if(path!="" && extension!='pdf' && extension!='mp4'){
	 returnarray= <ScrollView >  
 			<WebView source={{uri: "http://34.225.214.153/viewJsInYokupro/loadfile.php?type=yokuproSession&path="+path+"&extension="+extension}}  style={{height:this.state.height/1.2 }}/>
		</ScrollView>;
}else if(extension=='mp4'){
    var module='http://yokupro.com/uploadfiles/'+path.replace(/ /g,'%20');
    var filename= this.state.filename;
    returnarray=<VideoPlayer source={{uri: module}}   // Can be a URL or a local file.
    ref={(ref) => {
        this.player = ref
    }}
    extension={extension}
    title={filename}
    navigator={ navigator }
    seekColor={ '#FFF' }
    controlTimeout={ 15000 }         // hide controls after ms of inactivity.
    navigator={navigator}          // prop from React Native <Navigator> component
    videoStyle={ {paddingTop:50} }
    style={styles.backgroundVideo}
    navigator={this.props.navigator}
    />;

}

else if(extension=='pdf'){
     let source = {uri:'http://yokupro.com/uploadfiles/'+path,cache:true};
      returnarray=<View style={styles.container}>
    <View><Text>{this.props.filename}</Text></View>
      <View style={{flexDirection:'row'}}>
  
      <TouchableHighlight  disabled={this.state.page==1} style={this.state.page==1?styles.btnDisable:styles.btn} onPress={()=>this.prePage()}>
      <Text style={styles.btnText}>{'<<'}</Text>
      </TouchableHighlight>
    <View ><Text style={{marginTop:10}}>Page no: {this.state.page}</Text></View>
      <TouchableHighlight  disabled={this.state.page==this.state.pageCount} style={this.state.page==this.state.pageCount?styles.btnDisable:styles.btn}  onPress={()=>this.nextPage()}>
      <Text style={styles.btnText}>{'>>'}</Text>
      </TouchableHighlight>
      
      </View>
    
    
      <Pdf ref={(pdf)=>{this.pdf = pdf;}}
      source={source}
      page={1}
      scale={1}
      horizontal={false}
      onLoadComplete={(pageCount)=>{
          this.setState({pageCount: pageCount});
          console.log(`total page count: ${pageCount}`);
      }}
      onPageChanged={(page,pageCount)=>{
          this.setState({page:page});
          console.log(`current page: ${page}`);
      }}
      onError={(error)=>{
          console.log(error);
      }}
    style={{flex:1,width:this.state.width}}/>
      </View>
}
if(this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No {this.props.menuLable} available</Text>
			</View>;
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
          restult=returnarray;
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
		}
        else if(this.state.initroute=='Theme2'){
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
            
				<Text style={ThemeStyles.titleTextTheme3}>{this.state.menuLable} </Text>
			</View>;
		}
      
   return (
	<View onLayout={(event) => this.handleLayoutChange(event)}>
          {headerTab}
		<View style={{height:this.state.height/1.3}}>

		{restult}
		{resultData}
		</View>
	
		{retry}	

	</View>

    );
	
  }
}
var styles = StyleSheet.create({
                               container: {
                               flex: 1,
                               justifyContent: 'flex-start',
                               alignItems: 'center',
                               marginTop: 10,
                               },
  welcome: {
    fontSize: 15,
    color: '#4c1cea',
  },
  welcomeNew: {
	paddingLeft: 30,
    fontSize: 15,
    textAlign: 'left',
    margin: 10,

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
 hasEventCircle: {
      backgroundColor: '#30dbdb',
		
    },
titleViewText: {
    color: '#3b5998',
    fontSize: 23,
alignSelf: 'center',

   
  },
                               activityIndicator: {
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               height: 100
                               },
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
    },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },

 titleContainer: {
    flex: 1,
    alignItems: "center"
  },
  Text: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white"
  },
  titleValue: {
    flex: 1,
    color: "white"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 3,
	borderColor: "white"	
  },
                               btn: {
                               margin: 5,
                               marginTop:5,
                               padding:5,
                               backgroundColor: "#1a90a5",
                               borderRadius:1,
                               borderRadius: 4,
                               borderWidth: 1,
                               borderColor: '#fff'
                               },
                               btnDisable: {
                               margin: 5,
                               marginTop:5,
                               padding:5,
                               backgroundColor: "gray",
                               borderRadius:1,
                               borderRadius: 4,
                               borderWidth: 1,
                               borderColor: '#fff'
                               },
                               btnText: {
                               color: "#FFF",
                               },
                               pdf: {
                               flex:1,
                               width:Dimensions.get('window').width,
                               }
});


