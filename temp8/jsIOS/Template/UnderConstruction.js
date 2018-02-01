const React = require('react');
var ReactNative = require('react-native');
const logo = require('../images/Under.png');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
import { Card,Container, ListItem, Button } from 'react-native-elements'


module.exports = class UnderConstruction extends Component {
 constructor(props) {
    super(props);
    this.state = {
	height : Dimensions.get('window').height,
	width : Dimensions.get('window').width,isModalVisible: false
    };

  }	
	
navigate(route){
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
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

			await this.setState({screenType: 'Landscape', height : height/6,width : width,imagewidth:width/1.7 ,imageheight:height/1.4 ,imagewidthicon:width/1.5 ,imageheighticon:height/2,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height/3.5,
			width : width,imagewidth:width/1.1 ,
			imageheight:height/2.4,headerimagewidth:width/3 ,
			headerimageheight:height/18,paddingBody:width/7,
			imagewidthicon:width/1.5 ,imageheighticon:height/3.5,modalBody:width/2});
		}

	};

  render() {


    return (
	
	<View style={styles.container} onLayout={(event) => this.handleLayoutChange(event)}>
		<View style={{paddingTop:this.state.height}}> 
			<Text style={styles.titleViewText}>We are Still Working on it </Text>
			<Image 	source={logo}	style={{alignSelf:"center",width:250,height:150,}} />
	    	 </View> 

		</View>
    );
  }
}
var styles = StyleSheet.create({

	
  grad1: {
    height: 530,

  },
   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
	paddingLeft: 30,
    textAlign: 'left',
    margin: 10,
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
    fontSize: 25,
fontStyle:'italic',	
    color: '#000',
alignSelf:'center'	
   
  },	
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
    },

 headerIcon: {
    width: 20,
    height: 20,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#30dbdb'
  },
 headerIconnew: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: 'red',
  },
});


