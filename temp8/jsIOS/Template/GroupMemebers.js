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
  View,Dimensions,
  AsyncStorage,TouchableOpacity,Image,NetInfo,ActivityIndicator
} from 'react-native';
import PTRView from 'react-native-pull-to-refresh'
import ThemeStyles from '../Styles/ThemeStyles';
import { List, ListItem,Card,Button,Grid,Row } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ChatGroups extends Component {

  constructor(props) {
    super(props);
      this.state = {groups: [],empid:null,groupUsers:[],isVisible:true,types:'Circle', color: "#6BCAE2", size: 50,retry:false,resultData:false,programid:'',animating:true };

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

 async componentDidMount() {
		var _this = this;
        NetInfo.addEventListener('connectionChange',
                              (isConnected)=> {
                              _this.setState({isConnected : isConnected});
                              }
                              )
		var empid=await AsyncStorage.getItem('empid');
		var companyid=await AsyncStorage.getItem('companyid');
		var  programid=await AsyncStorage.getItem("programid");
		var initroute = await AsyncStorage.getItem("themerouting");
     var themebgcolor = await AsyncStorage.getItem("themebgcolor");

		var url =  await AsyncStorage.getItem("url");
        var colorArray = JSON.parse(await AsyncStorage.getItem("colorArray"));
     

     this.setState({url:url,programid:programid ,empid:empid,initroute:initroute,menuLable:this.props.menuLable,themebgcolor:themebgcolor,colorArray:colorArray});

_this.groupMemberFunction(empid,companyid,programid);

}
_refresh () {

	}

groupMemberFunction(empid,companyid,programid){
		var _this = this;
		var url =_this.state.url;
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
                                     _this.setState({animating:true});
    fetch(url+'manageappajax?type=GroupMembers&empid='+empid+'&programid='+programid+'&companyid='+companyid, {
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
		if(responseData!=null){
              this.setState({	groupUsers:responseData,isVisible:false,resultData:false,retry:false,animating:false });
		}
		else{
			_this.setState({
                           isVisible:false,resultData:true,animating:false
				});

		}
		})	
		 .catch((error) => {
                _this.setState({retry:true,isVisible:false,animating:false});
		})
		.done();
		}else{
                                     _this.setState({retry:true,isVisible:false,animating:false});
		}
		})
  }
 navigate(route){
	  this.props.navigator.push({
	    name: route, 
		passProps: 
			{ programid: this.state.programid,empid:this.state.empid
				}
	
	  })
	}
  render() {


	var _this=this;

if(this.state.initroute=='MainMenu'){
 		var microAppList = _this.state.groupUsers.map((groupUsers, index) => {

		var fileUrl = {};
		fileUrl["uri"] = groupUsers.filename;
            return (
                    
                    <View style={ThemeStyles.groupMemberList}>
                    
                    <View style={ThemeStyles.imageView} >
                    <Image style={ThemeStyles.iconImage} source={fileUrl} />
                    </View>
                    <View>
                    <Text style={ThemeStyles.groupMembername}>{groupUsers.employeename}</Text>
                    <Text style={ThemeStyles.groupMembernumber}>{groupUsers.mobileno}</Text>
                    
                    </View>
                    
                    </View>
                    
                   
                    
            )
	});
	}
		else if(this.state.initroute=='Theme1'){
			microAppList = _this.state.groupUsers.map((groupUsers, index) => {

			var fileUrl = {};
			fileUrl["uri"] = groupUsers.filename;
			return (

			<View style={ThemeStyles.listViewTheme1}>

			<View style={ThemeStyles.imageView} >
			<Image style={ThemeStyles.iconImageTheme1} source={fileUrl} />
			</View>
			<View>
			<Text style={ThemeStyles.groupMembernameTheme1}>{groupUsers.employeename}</Text>
			<Text style={ThemeStyles.groupMembernumberTheme1}>{groupUsers.mobileno}</Text>

			</View>

			</View>
                                      
                    
            )
	});
	}
        else if(this.state.initroute=='Theme2'){
            
            var colorArray=this.state.colorArray;
            microAppList = _this.state.groupUsers.map((groupUsers, index) => {
                                                      
                                                      var fileUrl = {};
                                                      fileUrl["uri"] = groupUsers.filename;
                                                      var ImageColor=colorArray[index%9];
                                                      return (
                                                              
                                                              <View style={ThemeStyles.listViewTheme2}>
                                                              
                                                              <View style={{marginTop:5,
                                                              marginRight:2,
                                                              backgroundColor: ImageColor,
                                                              borderWidth: 1,
                                                              borderColor: '#fff',
                                                              width: 50,
                                                              height: 50}} >
                                                              <Image resizeMode={"contain"}  style={ThemeStyles.iconImage} source={fileUrl} />
                                                              </View>
                                                              <View>
                                                              <Text style={ThemeStyles.batchnameTheme2}>{groupUsers.employeename}</Text>
                                                              <Text style={ThemeStyles.programdateTheme2}>{groupUsers.mobileno}</Text>
                                                              
                                                              </View>
                                                              <View style={{flex:1,alignItems:'flex-end',marginTop:20}}>
                                                              <Icon name={'phone'} size={25} color={this.state.themebgcolor} />
                                                              </View>
                                                              </View>
                                                              
                                                              
                                                              )
                                                      });
        }

	else if(this.state.initroute=='Theme3'){

			var colorArray=this.state.colorArray;
			microAppList = _this.state.groupUsers.map((groupUsers, index) => {

			var fileUrl = {};
			fileUrl["uri"] = groupUsers.filename;
				var ImageColor=colorArray[index%9];
			return (

			<View style={ThemeStyles.listViewTheme3}>

			<View style={{marginTop:5,
		                        marginRight:2,
					backgroundColor: ImageColor,
					borderWidth: 0.2,
					borderColor: '#fff',
					width: 50,
                                  	height: 50}} >
			<Image style={ThemeStyles.iconImage} source={fileUrl} />
			</View>
			<View>
			<Text style={ThemeStyles.batchnameTheme3}>{groupUsers.employeename}</Text>
			<Text style={ThemeStyles.programdateTheme3}>{groupUsers.mobileno}</Text>

			</View>

			</View>
                                      
                    
            )
	});
	}
	if(this.state.resultData==true){

		var resultData=<View style={{alignSelf:"center",padding:15}}>
			<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Amigos available</Text>		
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
          restult=microAppList;
      }

if(this.state.initroute=='MainMenu'){

			var headerTab= <View style={ThemeStyles.hederBG}>
				<Text style={ThemeStyles.titleText}>{this.state.menuLable} Members</Text>
			</View>;
		}
		else if(this.state.initroute=='Theme1'){
			headerTab= <View style={ThemeStyles.hederBGTheme1}>
				<Text style={ThemeStyles.titleTextTheme1}>{this.state.menuLable} Members</Text>
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
				<Text style={ThemeStyles.titleTextTheme3}>{this.state.menuLable} Members</Text>
			</View>;
		}
    return (
            <View onLayout={(event) => this.handleLayoutChange(event)} style={ThemeStyles.container}>
           {headerTab}
            <PTRView  onRefresh={this._refresh} >
			{restult}
		</PTRView>
            {resultData}
            {retry}
		 </View>
  	);
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    margin:10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#4B87C8',
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
titleViewText: {
    fontSize: 23,
    color: '#3b5998',
alignSelf:'center'	
   
  },
                                 activityIndicator: {
                                 flex: 1,
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 height: 250
                                 },
spinner: {
alignSelf: 'center',
    marginBottom: 50,
    marginTop: 150
  },		
});

