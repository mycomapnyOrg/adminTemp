const React = require('react');
var ReactNative = require('react-native');
var { NetInfo, StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity ,ActivityIndicator} = ReactNative;
import ThemeStyles from '../Styles/ThemeStyles';
var { Component } = React;
import { List, ListItem,Card,Button,Grid,Row } from 'react-native-elements'
module.exports = class ProgramDetails extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',programDetails:[],
	isVisible:true,types:'Circle', color: "#64BFFF", size: 50,isModalVisible: false,retry:false,resultData:false,routeName:'',results : [],animating: true,menuLable:this.props.menuLable
    };

  }
async componentDidMount(){
       	var initroute = await AsyncStorage.getItem("themerouting");
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var url =  await AsyncStorage.getItem("url");
	//this.resourseload(empid,companyid);
    var themebgcolor = await AsyncStorage.getItem("themebgcolor");
    this.setState({routeName:this.props.routName,url:url,empid:empid,initroute:initroute,themebgcolor:themebgcolor});
    this.closeActivityIndicator();
    
}

    closeActivityIndicator(){
        setTimeout(()=>this.setState({ animating: false }), 3500);
    
    }
navigate(route){

if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}

	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}	

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4 ,modalBody:0});
			

		} else {

            await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/3,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2,paddingTop:height/13});
		}

	};
onPress(route,programid){
    
     AsyncStorage.setItem("programid", programid+"");
    
	if(route=='Amigos'){
		var empid=this.state.empid;
	}

	 this.props.navigator.push({
	    name: route, 
		passProps: {
          	programid: programid,
		empid:empid
      		}
	  });
		
}
_handleResults(results) {
  this.setState({ results });
}

  render() {
      var microAppList = null;
      var empid=this.state.empid;
      var url=this.state.url;
      if(url!=undefined){
      var microAppList=<WebView source={{uri: url+"agendaviews?type=progDate&empid="+empid}} style={{height: 500}}/>;
      }
      else{
          
        }
      const animating = this.state.animating
      if(this.state.animating==true){
          var result=<ActivityIndicator
          animating = {animating}
          color = '#23A9FF'
          size = "large"
          style = {styles.activityIndicator}
          />;
          
      }
      else{
          result=microAppList;
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
				<Text style={ThemeStyles.titleTextTheme3}>{this.state.menuLable}</Text>
			</View>;
		}
    return (
            <View style={ThemeStyles.container}>
           {headerTab}
            
            {result}
            </View>
    );
    
  }
}
var styles = StyleSheet.create({
 
   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
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
                               height: 350
                               },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },	
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
    },

                               activityIndicator: {
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               height: 80
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
  }
});


