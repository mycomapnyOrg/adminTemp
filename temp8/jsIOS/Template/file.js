const React = require('react');
var ReactNative = require('react-native');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,Linking} = ReactNative;
var { Component } = React;
import {Grid, Col,Row,Button} from 'react-native-elements';

module.exports = class Document extends Component {

onNavigationStateChange(na  vState) {
  this.setState({
    canGoBack: navState.canGoBack
  });
}


state = {
    loginempid:[],
    loadmoduleid:[],
	screenType : '',
	height : Dimensions.get('window').height,
	isVisible:true,types:'CircleFlip', color: "#0000FF", size: 100,isModalVisible: false,programid:'',ClearArray:false,retry:false
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

	
	var details=_this.props.details;
	_this.setState({
	details:details
	});
			 
}

navigate(route){

if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	
	  this.props.navigator.push({
	    name: route,
		passProps: {
      		}
	  })
	}

  render() {
      var array =details.split('/');
      var filelength=array.length;
      filelength--;
      var filename =array[filelength];
      var exten=filename.split('/');
      var extenlength=filename.length;

      extenlength--;
	if(exten[extenlength]==undefined ){
		var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Documents available</Text>		
			</View>;
	}	
	
	
	else if(exten[extenlength]=='pdf'){
        

		returnarray= <ScrollView>  
 			<WebView source={{uri:details}}  style={{height:this.state.height/1.2 }} />
		</ScrollView>;
	
	}
	
	if(this.state.ClearArray==true){
		returnarray=<ScrollView>
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
           
		<View style={{height:this.state.height}}>	
		{returnarray}
		{openarray}
		{resultData}
		{retry}
	     	</View>  
	</View>

    );
	
  }
}
var styles = StyleSheet.create({

	


});


