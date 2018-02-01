const React = require('react');
var ReactNative = require('react-native');
import {Grid, Col,Row,Button} from 'react-native-elements';
var { AppRegistry, StyleSheet, Image,Text,AsyncStorage, ScrollView,ToolbarAndroid, ListView, View, TouchableHighlight,Dimensions,TouchableOpacity,WebView, Linking } = ReactNative;
var { Component } = React;
var {height, width} = Dimensions.get('window');

 

module.exports = class ESSLink extends Component {
state = {
    successmsg:[],
  timePassed: true

  };

componentDidMount() {
var _this = this;
  
_this._interval = setInterval(() => {


_this.loadcontent();
 
 },2000);


}

async loadcontent()
{
var _this = this;
if(this.state.timePassed) {
    var initroute = await AsyncStorage.getItem("themerouting");

_this.navigate(initroute);

}
_this.setState({
	timePassed:false,
	});

}
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4 });
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/2.4,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7});
		}

	};
navigate(route){

	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}

  onChange(value) {
    this.setState({value});
  };		

render() {
    const uri = this.props.weburl;
    return ( 
	<View onLayout={(event) => this.handleLayoutChange(event)}>
	         
        
	<ScrollView>
    <WebView
        ref={(ref) => { this.webview = ref; }}
        source={{ uri }}
        onNavigationStateChange={(event) => {
          if (event.url !== uri) {
            this.webview.stopLoading();
            Linking.openURL(event.url);
          }
        }}
      />
</ScrollView>
	</View>
		)
   
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#85AF5D",
    paddingVertical: 7,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 75,
    width:200,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#D8D8D8",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  },
headerTitleView: {
	alignItems: "center",
    	justifyContent: "center",
  },
titleViewText: {
    fontSize: 23,
    color: '#000',
    marginTop: 20,

  },
Viewinput:
{
    marginTop: 20,
    marginBottom: 20,
    width:330,
    marginLeft: 15,
    justifyContent: "flex-start",
}
});
