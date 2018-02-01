const React = require('react');
const retryImg = require('../images/retryw.png');
var ReactNative = require('react-native');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF,Alert, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,AsyncStorage, ListView,NetInfo} = ReactNative;
var { Component } = React;
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
const background = require('../images/mobileUi_bg1.png');
import { Card, ListItem, Button } from 'react-native-elements'

module.exports = class MainMenu extends Component {
state = {
	checkvar:0,
	mainMenuArray:[],imagewidth:'', active: 'true',padding:40,activeFab:false, visible: false,retry:false,logout:false,isModalVisible: false,isConnected:""
  };

async componentDidMount(){
    var that = this;
    NetInfo.addEventListener('connectionChange',
                             (isConnected)=> {
                             that.setState({isConnected : isConnected});
                             }
                             )
        var empid =  await AsyncStorage.getItem("empid");
		var customerid = await AsyncStorage.getItem("customerid");
        var companyid = await AsyncStorage.getItem("companyid");
		var url =  await AsyncStorage.getItem("url");
    var themebgcolor = await AsyncStorage.getItem("themebgcolor");
    that.setState({ url:url ,themebgcolor:themebgcolor});
    
		//that.mainMenu(empid,customerid);
       }
    

    
    
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape',
					 height : height,width : width,
					imagewidth:width/7 ,imageheight:height/4.5 ,
					menuiconwidth:width/20,menuiconheight:height/12,
					imagewidthicon:width/3.5 ,imageheighticon:height/8,
					shadowwidth:width/6,shadowheight:height/4.5,
					backgroundwidth:width/2,backgroundheight:height/0.9,padding:width/15,imagepadding:width/4,
					retrypadding:height/2,
					Listpadding:width/6,overpadding:15, modalBody:0});

					

		} else {

			await this.setState({screenType: 'Portrait', 
						height : height,width : width,
						imagewidth:width/6 ,imageheight:height/7,
						menuiconwidth:width/7.5,menuiconheight:height/12.7,
						imagewidthicon:width/1.5 ,imageheighticon:height/8.5,
						shadowwidth:width/4,shadowheight:height/7,
						backgroundwidth:width/1,backgroundheight:height/1.2,					retrypadding:height/1.9,
						imagepadding:0,Listpadding:width/5,overpadding:width/10,imagepadddingheight:width/2,});

		}

	};
    
    
navigate(route){

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
	else if(route=='Events'){
		routepage='ProgramDetails';	
	}
	else{
		routepage=route;
		}
	  this.props.navigator.push({
	    name: routepage,
		passProps: {
			routName:route	
      		} 
	  })
	}

	

  render() {
      
      if(this.state.themebgcolor!=undefined ){
          var col2=this.state.themebgcolor;
          var applogo=this.state.applogo;
       
      }else{
          col1="#5BB9FF";
          col2="#AFEEFF";
          col3="#23A9FF";
          applogo='http://yokupro.com/Applogo/logo_w.png';
         
      }
	   return (
		

               <View style={{backgroundColor:col2, flex:1}} onLayout={(event) => this.handleLayoutChange(event)}>
              
               <View style={styles.headercontentimagenew}>
               <View style={{paddingTop:this.state.imagepadddingheight}}>
               <Image
               style={{height:85,marginTop:this.state.imageheight, marginBottom:50 ,flex:3  }}
               source={{uri:applogo}} resizeMode={"contain"}
               />
               </View>
			</View>

		</View>
	 

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


