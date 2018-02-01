const React = require('react');
var ReactNative = require('react-native');
const retryImg = require('../images/retry.png');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF,Platform, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,NetInfo,ActivityIndicator } = ReactNative;
var { Component } = React;
const logo = require('../images/TrainingPrograms.png');
const michelin = require('../images/services-bib.png');
import ThemeStyles from '../Styles/ThemeStyles';
import { List, ListItem,Card,Button,Grid,Row } from 'react-native-elements'
import PTRView from 'react-native-pull-to-refresh'
import Icon from 'react-native-vector-icons/FontAwesome';
module.exports = class Archive extends Component {
 constructor(props) {
    super(props);
    this.state = {
    screenType: '',eventsDetails:[],isVisible:true,types:'Circle', color: "#F4282D", size: 50,isModalVisible: false,retry:false,resultData:false,animating:true,menuLable:this.props.menuLable

    };
     this._refresh = this._refresh.bind(this);

  }

async componentDidMount(){
    
        NetInfo.addEventListener('connectionChange',
                             (isConnected)=> {
                             this.setState({isConnected : isConnected});
                             }
                             )
		var empid = await AsyncStorage.getItem('empid');
		var url =  await AsyncStorage.getItem("url");
		var initroute = await AsyncStorage.getItem("themerouting");
		var companyid = await AsyncStorage.getItem("companyid");
        var themebgcolor = await AsyncStorage.getItem("themebgcolor");
        var colorArray = JSON.parse(await AsyncStorage.getItem("colorArray"));
    this.setState({url:url,initroute:initroute,themebgcolor:themebgcolor,colorArray:colorArray,menuLable:this.state.menuLable});
		this.quotes(empid,companyid);
}
    
    _refresh () {
        this.componentDidMount();
    }
    

    
quotes(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	
	if(isConnected){
	var _this = this;
	var url =_this.state.url;
                                     _this.setState({isVisible:true,retry:false,animating:true});
		fetch(url+'manageappajax?type=readingQuotes&empid='+empid+'&customerid='+companyid+'&dataType=Archive', {
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
			if(responseData!="" && responseData!=null){
									
				_this.setState({
                               eventsDetails:responseData,isVisible:false,retry:false,resultData:false,animating:false
				});

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
	    name: route, // Matches route.name
	  })
	}	

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,
imageheight:height/2.4,width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};

  render() {

		var details=null;
		var _this=this;
	if(this.state.initroute=='MainMenu'){
		var microAppList = _this.state.eventsDetails.map((eventsDetails, index) => {

				if(eventsDetails.texttype=='wordaday'){
			   	return (
				<View style={ThemeStyles.cardStyle}>
				<View style={{padding:10}}>
				
				<View style={ThemeStyles.contenttitleView}>
				<Image style={ThemeStyles.nuggiconImage} source={require('./../images/TrainingPrograms.png')} />
				<Text style={ThemeStyles.contenttitle}>{eventsDetails.contenttitle}</Text>
				</View>
				<Text style={styles.questionaday}> Word a day</Text>
				<Text style={ThemeStyles.wordaday}>{'\n'}{eventsDetails.wordaday}</Text>
				
				<Text style={ThemeStyles.date}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIcon} /></Text>
				</View>
				</View>
				
				   )
				}

				if(eventsDetails.texttype=='questionaday'){
	
				return (
			    <View style={ThemeStyles.cardStyle}>
			    <View style={{padding:10}}>
			    <View style={ThemeStyles.contenttitleView}>
			    <Image style={ThemeStyles.nuggiconImage} source={require('./../images/TrainingPrograms.png')} />
			    <Text style={ThemeStyles.contenttitle}>{eventsDetails.contenttitle}</Text>
			    </View>
			    <Text style={styles.questionaday}> Quote for the day</Text>
			    <Text style={ThemeStyles.wordaday}>{'\n'}{eventsDetails.questionaday}</Text>
			    <Text style={ThemeStyles.date}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIcon} /></Text>
			    </View>
			    </View>

			    
				   )
				}
		});
	}
	else if(this.state.initroute=='Theme1'){	
	microAppList = _this.state.eventsDetails.map((eventsDetails, index) => {

			if(eventsDetails.texttype=='wordaday'){
	           	return (
                        
                        <View style={ThemeStyles.cardStyleTheme1}>
                        <View style={{padding:10}}>
                        
                        <View style={ThemeStyles.contenttitleViewTheme1}>

                            <Text style={ThemeStyles.contenttitleTheme1}>{eventsDetails.contenttitle}</Text>
                        </View>
                        <Text style={ThemeStyles.questionadayTheme1}> Word a day</Text>
                        <Text style={ThemeStyles.wordadayTheme1}>{'\n'}{eventsDetails.wordaday}</Text>

                        <Text style={ThemeStyles.dateTheme1}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIconTheme1} /></Text>
                        </View>
                        </View>
                       
                        
                        
                        
        		   )
			}

			if(eventsDetails.texttype=='questionaday'){
		
			return (
                    
                    <View style={ThemeStyles.cardStyleTheme1}>
                    <View style={{padding:10}}>
                    <View style={ThemeStyles.contenttitleViewTheme1}>
                    <Text style={ThemeStyles.contenttitleTheme1}>{eventsDetails.contenttitle}</Text>
                    </View>
                    <Text style={ThemeStyles.questionadayTheme1}> Quote for the day</Text>
                    <Text style={ThemeStyles.wordadayTheme1}>{'\n'}{eventsDetails.questionaday}</Text>
                    <Text style={ThemeStyles.dateTheme1}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIconTheme1} /></Text>
                    </View>
                    </View>
                    
                    
        		   )
			}
	});

	}
    else if(this.state.initroute=='Theme2'){
        var colorArray=this.state.colorArray;
        
        microAppList = _this.state.eventsDetails.map((eventsDetails, index) => {
                                                     var ImageColor=colorArray[index%9];
                                                     if(eventsDetails.texttype=='wordaday'){
                                                     return (
                                                             
                                                             <View style={{marginRight:15,
                                                             marginLeft:15,
                                                             marginTop:15,
                                                             paddingBottom:10,
                                                             backgroundColor:'#ffffff',
                                                             borderBottomLeftRadius:70,
                                                             ...Platform.select({
                                                                                ios: {
                                                                                borderWidth: 1,
                                                                                },
                                                                                android: {
                                                                                borderWidth: 0.5,
                                                                                },
                                                                                }),
                                                             borderColor: ImageColor,
                                                             shadowColor: '#000000',
                                                             shadowRadius: 10,
                                                             elevation: 2,}}>
                                                             
                                                             <View style={{backgroundColor: 'transparent',
                                                             borderBottomWidth: this.state.width/10,
                                                             borderLeftWidth: this.state.width/1.1,
                                                             borderTopColor: 'transparent',
                                                             borderBottomColor: 'transparent',
                                                             borderRightColor: 'transparent',
                                                             borderLeftColor:ImageColor}} />
                                                             
                                                             
                                                             <Text style={ThemeStyles.contenttitleTheme2}>{eventsDetails.contenttitle}</Text>
                                                             
                                                             <View style={{padding:10}}>
                                                             <Text style={ThemeStyles.questionadayTheme22}> Word a day</Text>
                                                             <Text style={ThemeStyles.wordadayTheme2}>{'\n'}{eventsDetails.wordaday}</Text>
                                                             
                                                             <Text style={ThemeStyles.dateTheme2}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIconTheme3} /></Text>
                                                             </View>
                                                             </View>
                                                             
                                                             
                                                             
                                                             
                                                             )
                                                     }
                                                     
                                                     if(eventsDetails.texttype=='questionaday'){
                                                     
                                                     return (
                                                             
                                                             <View style={{marginRight:15,
                                                             marginLeft:15,
                                                             marginTop:15,
                                                             paddingBottom:10,
                                                             backgroundColor:'#ffffff',
                                                             borderBottomRightRadius:70,
                                                             ...Platform.select({
                                                                                ios: {
                                                                                borderWidth: 1,
                                                                                },
                                                                                android: {
                                                                                borderWidth: 0.5,
                                                                                },
                                                                                }),                                                              borderColor: ImageColor,
                                                             shadowColor: '#000000',
                                                             shadowRadius: 10,
                                                             elevation: 2,}}>
                                                             
                                                             <View style={{backgroundColor: 'transparent',
                                                             borderBottomWidth: this.state.width/10,
                                                             borderRightWidth: this.state.width/1.1,
                                                             borderTopColor: 'transparent',
                                                             borderBottomColor: 'transparent',
                                                             borderLeftColor: 'transparent',
                                                             borderRightColor:ImageColor}} />
                                                             
                                                             <Text style={ThemeStyles.contenttitleTheme2}>{eventsDetails.contenttitle}</Text>
                                                             
                                                             <View style={{padding:10}}>
                                                             <Text style={ThemeStyles.questionadayTheme2}> Quote for the day</Text>
                                                             <Text style={ThemeStyles.wordadayTheme22}>{'\n'}{eventsDetails.questionaday}</Text>
                                                             <Text style={ThemeStyles.dateTheme22}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIconTheme3} /></Text>
                                                             </View>
                                                             </View>
                                                             
                                                             
                                                             )
                                                     }
                                                     });
    }
	else if(this.state.initroute=='Theme3'){
        var colorArray=this.state.colorArray;


		microAppList = _this.state.eventsDetails.map((eventsDetails, index) => {
				var ImageColor=colorArray[index%9];			
			if(eventsDetails.texttype=='wordaday'){
	           	return (
                        
                        <View style={ThemeStyles.cardStyleTheme3}>			  

                        <View style={{flex: 1,
                                   flexDirection: 'row',
                                   backgroundColor:ImageColor,
                                   padding:2,
					borderRadius:0.1,
                                   alignItems:'center'	}}>

                            <Text style={ThemeStyles.contenttitleTheme3}>{eventsDetails.contenttitle}</Text>
                        </View>
                        <View style={{padding:10}}>                        
                        <Text style={ThemeStyles.questionadayTheme3}> Word a day</Text>
                        <Text style={ThemeStyles.wordadayTheme3}>{'\n'}{eventsDetails.wordaday}</Text>

                        <Text style={ThemeStyles.dateTheme3}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIconTheme3} /></Text>
                        </View>
                        </View>
                       
                        
                        
                        
        		   )
			}

			if(eventsDetails.texttype=='questionaday'){
		
			return (
                    
                    <View style={ThemeStyles.cardStyleTheme3}>

 			<View style={{flex: 1,
                                   flexDirection: 'row',
                                   backgroundColor:ImageColor,
                                   padding:2,
				   borderRadius:0.1,
                                   alignItems:'center'	}}>
                    <Text style={ThemeStyles.contenttitleTheme3}>{eventsDetails.contenttitle}</Text>
                    </View>
                    <View style={{padding:10}}>
                    <Text style={ThemeStyles.questionadayTheme3}> Quote for the day</Text>
                    <Text style={ThemeStyles.wordadayTheme3}>{'\n'}{eventsDetails.questionaday}</Text>
                    <Text style={ThemeStyles.dateTheme3}>{'\n'}{eventsDetails.date}<Icon active name='calendar' style={ThemeStyles.dateIconTheme3} /></Text>
                    </View>
                    </View>
                    
                    
        		   )
			}
	});
	}
if(_this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Archived {this.props.menuLable} available</Text>
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
				<Text style={ThemeStyles.titleText}>Archived {this.state.menuLable}</Text>
			</View>;
		}
		else if(this.state.initroute=='Theme1'){
			headerTab= <View style={ThemeStyles.hederBGTheme1}>
				<Text style={ThemeStyles.titleTextTheme1}>Archived {this.state.menuLable}</Text>
			</View>;
		}
        else if(this.state.initroute=='Theme2'){
            headerTab= <View style={{backgroundColor:this.state.themebgcolor,
            shadowColor: '#000',
            shadowRadius: 20,
            elevation: 8,
                padding:5}}>
            <Text style={ThemeStyles.titleTextTheme2}>Archived {this.state.menuLable}</Text>
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
				<Text style={ThemeStyles.titleTextTheme3}>Archived {this.state.menuLable}</Text>
			</View>;
		}
		if(this.state.footer==true){
		var footer = <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,marginTop:10}}><Text style={{ color: '#000000',
                                   alignSelf:"flex-end",
                                   fontSize:12,paddingRight:5}}>Powered by YokuPro</Text></View>; 
	}
    return (
            <View onLayout={(event) => this.handleLayoutChange(event)} style={ThemeStyles.container}>
            {headerTab}
	    {resultData}
            {retry}
            <PTRView  onRefresh={this._refresh} onScroll={() =>this.setState({footer:true})} scrollEventThrottle={16}>
			{restult}
			
           </PTRView> 		
                	{footer}	
	</View>

    );
  }
}
var styles = StyleSheet.create({
 
   container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9',
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
contentText: {
    color: '#E21414',
    fontSize: 18,
    paddingTop:8,
    paddingLeft:10,
   
  },
wordaday: {
    color: '#328CFD',
    fontSize: 20,
alignSelf: 'center',

   
  },
questionaday: {
    color: '#328CFD',
    fontSize: 20,
alignSelf: 'center',

   
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
  }
});


