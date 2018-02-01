const React = require('react');
var ReactNative = require('react-native');
var { NetInfo, StyleSheet,Platform, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableHighlight,TouchableOpacity,ActivityIndicator } = ReactNative;
var { Component } = React;
import SearchBar from 'react-native-searchbar';
import ThemeStyles from '../Styles/ThemeStyles';
import PTRView from 'react-native-pull-to-refresh'
import Badge from 'react-native-smart-badge';
import { List, ListItem,Card,Button,Grid,Row } from 'react-native-elements'
module.exports = class ProgramDetails extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',programDetails:[],
    isVisible:true,types:'Circle', color: "#64BFFF", size: 50,isModalVisible: false,retry:false,resultData:false,routeName:'',results : [],animating:true,footer:false
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
		var companyid = await AsyncStorage.getItem("companyid");
		var url =  await AsyncStorage.getItem("url");
		var initroute = await AsyncStorage.getItem("themerouting");
		var themebgcolor = await AsyncStorage.getItem("themebgcolor");
        var colorArray = JSON.parse(await AsyncStorage.getItem("colorArray"));

		var applogo = await AsyncStorage.getItem("applogo");
		var compentencystatus = await AsyncStorage.getItem("compentencystatus");     

		if(this.props.routName=='Resources')
		{
		this.resourseprogrmload(empid,companyid);
		}
		else if(this.props.routName=='Evaluate')
		{
		this.Evaluateload(empid,companyid);
		}
		else if(this.props.routName=='Synopsis'){
		this.SynopsisLoad(empid,companyid);
		}
		else
		{
		    this.resourseload(empid,companyid);
		}
	this.setState({routeName:this.props.routName,menuLable:this.props.menuLable,url:url,empid:empid,
		companyid:companyid,initroute:initroute,
                  themebgcolor:themebgcolor,applogo:applogo,compentencystatus:compentencystatus,footer:false,colorArray:colorArray});
}

showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
    
    
resourseprogrmload(empid,companyid){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         
                                         var _this = this;
                                         var url =_this.state.url;
                                         _this.setState({animating:true,retry:false});
                                         fetch(url+'manageappajax?type=ProgramDetailsNotification&empid='+empid+'&companyid='+companyid, {
                                               method: 'POST',
                                               headers: {
                                               'Accept': 'application/json',
                                               'Content-Type': 'application/json'
                                               }
                                               })
                                         
                                         .then((response) => response.json())
                                         .then((responseData) => {
                                               setTimeout(() => null, 0);
                                               console.log(
                                                           "POST Response",
                                                           "Response Body -> " + JSON.stringify(responseData)
                                                           )

                                               if(responseData!=""){
                                               
                                               _this.setState({
                                                              programDetails:responseData,isVisible:false,retry:false,animating:false,resultData:false
                                                              });
                                               
                                               }
                                               else{
                                               _this.setState({
                                                              isVisible:false,resultData:true,animating:false,label:this.props.menuLable
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
    
    Evaluateload(empid,companyid){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         
                                         var _this = this;
                                         var url =_this.state.url;
                                         _this.setState({animating:true,retry:false});
                                         fetch(url+'manageappajax?type=ProgramDetailsEvaluateload&empid='+empid+'&companyid='+companyid, {
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
                                               
                                               if(responseData!=""){
                                               
                                               _this.setState({
                                                              programDetails:responseData,isVisible:false,retry:false,animating:false
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
    
resourseload(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

		var _this = this;
		var url =_this.state.url;
		_this.setState({animating:true,retry:false});
		fetch(url+'manageappajax?type=ProgramDetails&empid='+empid+'&companyid='+companyid, {
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

			if(responseData!=""){
				
				_this.setState({
                               programDetails:responseData,isVisible:false,retry:false,animating:false,resultData:false
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
    SynopsisLoad(empid,companyid){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         
                                         var _this = this;
                                         var url =_this.state.url;
                                         _this.setState({animating:true,retry:false});
                                         fetch(url+'manageappajax?type=SynopsisProgramDetails&empid='+empid+'&companyid='+companyid, {
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
                                               if(responseData!=""){
                                               
                                               _this.setState({
                                                              programDetails:responseData,isVisible:false,retry:false,animating:false
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

            await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/3,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2,paddingTop:height/10});
		}

	};
   async onPress(routing,programid,extension,filename,filepath,compentencystatus){
	if(compentencystatus=='Active'){
        		await AsyncStorage.setItem("comid", programid+"");
		}else{
        		await AsyncStorage.setItem("programid", programid+"");
		}
        AsyncStorage.setItem("menuLable",this.props.menuLable+"");

        if(routing=='Synopsis')
        {
            var empid = this.state.empid;
            var programid=programid;
            var companyid = this.state.companyid;
            var url =this.state.url;
            var Devicename=Platform.OS;
            fetch(url+'manageappajax?type=readingHistory&empid='+empid+'&companyid='+companyid+'&programid='+programid+'&programtype=Synopsis&Devicename='+Devicename, {
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
                  
                  
                  })
            .catch((error) => {
                   this.setState({retry:true,isVisible:false,animating:false});
                   })
            .done();
            
            
            if(extension=="mp4" || extension=="mp3" ||extension=="mkv" || extension=="flv"||extension=='webm'){
                var route='VideoPage';
            
            }
            else{
                var route=routing;
            }
            this.props.navigator.push({
                                      name: route,
                                      initroute:this.state.initroute,
                                      themebgcolor:this.state.themebgcolor
                                      ,applogo:this.state.applogo,
                                      passProps: {
                                      programid: programid,
                                      menuLable:this.props.menuLable,
                                      empid:empid,
                                      path: filepath,
                                      extension:extension,
                                      filename:filename,
                                      
                                      }
                                      });
            

       		}else{
       		
        this.props.navigator.push({
                                  name: routing,
                                  initroute:this.state.initroute,
                                  themebgcolor:this.state.themebgcolor
                                  ,applogo:this.state.applogo,
                                  passProps: {
                                  programid: programid,
                                  menuLable:this.props.menuLable,
                                  empid:empid
                                  
                                  }
                                  });
        }
    }
	_handleResults(results) {
	this.setState({ results });
	}
	_refresh () {
	this.componentDidMount();
	}

handleScroll(){
	var _this=this;
	_this.setState({footer:true});
}

myResourceLoading(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){

		var _this = this;
		var url =_this.state.url;
		_this.setState({animating:true,retry:false ,programDetails:[]});

		fetch(url+'manageappajax?type=MyResourceDetails&empid='+empid+'&companyid='+companyid, {
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

			if(responseData!=""){
				
				_this.setState({
                               		programDetails:responseData,isVisible:false,retry:false,animating:false,resultData:false
				});

			}
			else{
			_this.setState({
					isVisible:false,resultData:true,animating:false,label:'My Learning'
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

	onLoading(type){
		if(type=='MyResources'){
			this.myResourceLoading(this.state.empid,this.state.companyid);
		}else{
			this.componentDidMount();
		}	
	}
    
    
  render() {
		var details=null;
		var _this=this;
		var microAppList=<View></View>;

if( _this.state.programDetails!=''){


		if(this.state.initroute=='MainMenu'){
	 	    	 microAppList = _this.state.programDetails.map((programDetails, index) => {
		                                                  
		            var status=<Text></Text>;
		            if(programDetails.countResourceNotification==0)
		            {
		                status=<Text></Text>;
		            }
		            else
		            {
		                status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor} style={ThemeStyles.status}>
		                {programDetails.countResourceNotification}
		                </Badge>;
		            }
		    return (
		            <TouchableHighlight  onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
		            <View style={ThemeStyles.listView}>
		            
		            <View style={ThemeStyles.imageView} >
		            <Image style={ThemeStyles.iconImage} source={require('./../images/TrainingPrograms.png')} />
		            </View>
		            <View >
		            <Text style={ThemeStyles.batchname}>{programDetails.batchname}
		                <Text style={ThemeStyles.programname}>{"\n"}{programDetails.programname}
		            </Text>
		            <Text style={ThemeStyles.programdate}>{"\n"}{programDetails.programdate}</Text>
		            </Text>
		           
		            </View>
		            <View style={ThemeStyles.countView}>
		            {status}
		            </View>

		            </View>
		            </TouchableHighlight>

		            )
			});
		}
		else if(this.state.initroute=='Theme1'){
	 	    	 microAppList = _this.state.programDetails.map((programDetails, index) => {
		                                                  
		            var status=<Text></Text>;
		            if(programDetails.countResourceNotification==0)
		            {
		                status=<Text></Text>;
		            }
		            else
		            {
		                status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor} style={ThemeStyles.statusTheme1}>
		                {programDetails.countResourceNotification}
		                </Badge>;
		            }
				var text=programDetails.batchname.charAt(0)+""+programDetails.programname.charAt(0);

		    return (
		            <TouchableHighlight  underlayColor='#e5e5e5' onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
		            <View style={ThemeStyles.listViewTheme1}>
		            
		            <View style={ThemeStyles.imageViewTheme1} >
		           	<Text style={ThemeStyles.roundTextTheme1}>{text}</Text>
		            </View>
		            <View >
		            <Text style={ThemeStyles.batchnameTheme1}>{programDetails.batchname}
		                <Text style={ThemeStyles.programnameTheme1}>{"\n"}{programDetails.programname}
		            </Text>
		            <Text style={ThemeStyles.programdateTheme1}>{"\n"}{programDetails.programdate}</Text>
		            </Text>
		           
		            </View>
		            <View style={ThemeStyles.countView}>
		            {status}
		            </View>

		            </View>
		            </TouchableHighlight>

		            )
			});
		}
        else if(this.state.initroute=='Theme2'){
            var colorArray=this.state.colorArray;
            microAppList = _this.state.programDetails.map((programDetails, index) => {
                                                          var ImageColor=colorArray[index%9];
                                                          var status=<Text></Text>;
                                                          if(programDetails.countResourceNotification==0)
                                                          {
                                                          status=<Text></Text>;
                                                          }
                                                          else
                                                          {
                                                          status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor2} style={{backgroundColor:ImageColor}}>
                                                          {programDetails.countResourceNotification}
                                                          </Badge>;
                                                          }
                                                          var text=programDetails.batchname.charAt(0)+""+programDetails.programname.charAt(0);
                                                          
                                                          
                                                          return (
                                                                  <TouchableHighlight  underlayColor='#e5e5e5'  onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
                                                                  <View style={ThemeStyles.listViewTheme2}>
                                                                  
                                                                  <View style={{backgroundColor: 'transparent',
                                                                  borderBottomWidth: 15,
                                                                  borderLeftWidth: 15,
                                                                  borderTopColor: 'transparent',
                                                                  borderBottomColor: 'transparent',
                                                                  borderRightColor: 'transparent',
                                                                  borderLeftColor:ImageColor}} />
                                                                  
                                                                  <View style={{marginLeft:5}}>
                                                                  <Text style={ThemeStyles.batchnameTheme2}>{programDetails.batchname}
                                                                  <Text style={ThemeStyles.programnameTheme2}>{"\n"}{programDetails.programname}
                                                                  </Text>
                                                                  <Text style={ThemeStyles.programdateTheme2}>{"\n"}{programDetails.programdate}</Text>
                                                                  </Text>
                                                                  
                                                                  </View>
                                                                  <View style={ThemeStyles.countView}>
                                                                  {status}
                                                                  </View>
                                                                  
                                                                  </View>
                                                                  </TouchableHighlight>
                                                                  
                                                                  )
                                                          });
        }
		else if(this.state.initroute=='Theme3'){

			var colorArray=this.state.colorArray;
	 	    	 microAppList = _this.state.programDetails.map((programDetails, index) => {
		                                                  
		            var status=<Text></Text>;
		            if(programDetails.countResourceNotification==0)
		            {
		                status=<Text></Text>;
		            }
		            else
		            {
		                status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor} style={ThemeStyles.statusTheme3}>
		                {programDetails.countResourceNotification}
		                </Badge>;
		            }
				var text=programDetails.batchname.charAt(0)+""+programDetails.programname.charAt(0);
				
				var ImageColor=colorArray[index%9];
		    return (
		            <TouchableHighlight  underlayColor='#e5e5e5'  onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
		            <View style={ThemeStyles.listViewTheme3}> 		            
		            <View style={{  marginTop:5,
		                        marginRight:2,
					backgroundColor: ImageColor,
					borderWidth: 0.2,
					borderColor: '#fff',
					width: 50,
                                  	height: 50}} >
					<Text style={ThemeStyles.roundTextTheme3 }>{text}</Text>
		            </View>
		            <View style={{marginLeft:5}}>
		            <Text style={ThemeStyles.batchnameTheme3}>{programDetails.batchname}
		                <Text style={ThemeStyles.programnameTheme3}>{"\n"}{programDetails.programname}
		            </Text>
		            <Text style={ThemeStyles.programdateTheme3}>{"\n"}{programDetails.programdate}</Text>
		            </Text>
		           
		            </View>
		            <View style={ThemeStyles.countView}>
		            {status}
		            </View>

		            </View>
		            </TouchableHighlight>

		            )
			});
		}
	}else{


		microAppList=<View></View>;
	}


	if(_this.state.results!=""){
			
 			if(this.state.initroute=='MainMenu'){
	 	    	 microAppList = _this.state.results.map((programDetails, index) => {
		                                                  
		            var status=<Text></Text>;
		            if(programDetails.countResourceNotification==0)
		            {
		                status=<Text></Text>;
		            }
		            else
		            {
		                status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor} style={ThemeStyles.status}>
		                {programDetails.countResourceNotification}
		                </Badge>;
		            }
		    return (
		            <TouchableHighlight  onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
		            <View style={ThemeStyles.listView}>
		            
		            <View style={ThemeStyles.imageView} >
		            <Image style={ThemeStyles.iconImage} source={require('./../images/TrainingPrograms.png')} />
		            </View>
		            <View >
		            <Text style={ThemeStyles.batchname}>{programDetails.batchname}
		                <Text style={ThemeStyles.programname}>{"\n"}{programDetails.programname}
		            </Text>
		            <Text style={ThemeStyles.programdate}>{"\n"}{programDetails.programdate}</Text>
		            </Text>
		           
		            </View>
		            <View style={ThemeStyles.countView}>
		            {status}
		            </View>

		            </View>
		            </TouchableHighlight>

		            )
			});
		}
		else if(this.state.initroute=='Theme1'){
	 	    	 microAppList = _this.state.results.map((programDetails, index) => {
		                                                  
		            var status=<Text></Text>;
		            if(programDetails.countResourceNotification==0)
		            {
		                status=<Text></Text>;
		            }
		            else
		            {
		                status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor} style={ThemeStyles.statusTheme1}>
		                {programDetails.countResourceNotification}
		                </Badge>;
		            }
		    return (
		            <TouchableHighlight  underlayColor='#e5e5e5' onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
		            <View style={ThemeStyles.listViewTheme1}>
		            
		            <View style={ThemeStyles.imageView} >
		            <Image style={ThemeStyles.iconImageTheme1} source={require('./../images/TrainingPrograms.png')} />
		            </View>
		            <View >
		            <Text style={ThemeStyles.batchnameTheme1}>{programDetails.batchname}
		                <Text style={ThemeStyles.programnameTheme1}>{"\n"}{programDetails.programname}
		            </Text>
		            <Text style={ThemeStyles.programdateTheme1}>{"\n"}{programDetails.programdate}</Text>
		            </Text>
		           
		            </View>
		            <View style={ThemeStyles.countView}>
		            {status}
		            </View>

		            </View>
		            </TouchableHighlight>

		            )
			});
		}
        else if(this.state.initroute=='Theme2'){
            
            var colorArray=this.state.colorArray;
            microAppList = _this.state.programDetails.map((programDetails, index) => {
                                                          var ImageColor=colorArray[index%9];
                                                          var status=<Text></Text>;
                                                          if(programDetails.countResourceNotification==0)
                                                          {
                                                          status=<Text></Text>;
                                                          }
                                                          else
                                                          {
                                                          status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor2} style={{backgroundColor:ImageColor}}>
                                                          {programDetails.countResourceNotification}
                                                          </Badge>;
                                                          }
                                                          var text=programDetails.batchname.charAt(0)+""+programDetails.programname.charAt(0);
                                                          
                                                          
                                                          return (
                                                                  <TouchableHighlight  underlayColor='#e5e5e5'  onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
                                                                  <View style={{borderWidth: 5,
                                                                  borderColor: '#ffffff',
                                                                  shadowColor: '#000',
                                                                  shadowOffset: { width: 0, height: 0 },
                                                                  shadowOpacity: 1,
                                                                  shadowRadius: 2,
                                                                  elevation: 3,
                                                                  marginLeft: 5,
                                                                  marginRight: 10,
                                                                  marginTop: 8,backgroundColor: '#ffffff',flexDirection:'row' }}>
                                                                  
                                                                  <View style={{backgroundColor: 'transparent',
                                                                  borderBottomWidth: 15,
                                                                  borderLeftWidth: 15,
                                                                  borderTopColor: 'transparent',
                                                                  borderBottomColor: 'transparent',
                                                                  borderRightColor: 'transparent',
                                                                  borderLeftColor:ImageColor}} />
                                                                  
                                                                  <View style={{marginLeft:5}}>
                                                                  <Text style={ThemeStyles.batchnameTheme2}>{programDetails.batchname}
                                                                  <Text style={ThemeStyles.programnameTheme2}>{"\n"}{programDetails.programname}
                                                                  </Text>
                                                                  <Text style={ThemeStyles.programdateTheme2}>{"\n"}{programDetails.programdate}</Text>
                                                                  </Text>
                                                                  
                                                                  </View>
                                                                  <View style={ThemeStyles.countView}>
                                                                  {status}
                                                                  </View>
                                                                  
                                                                  </View>
                                                                  </TouchableHighlight>
                                                                  
                                                                  )
                                                          });
        }
		else if(this.state.initroute=='Theme3'){

			 var colorArray=this.state.colorArray;
	 	    	 microAppList = _this.state.results.map((programDetails, index) => {
		                                                  
		            var status=<Text></Text>;
		            if(programDetails.countResourceNotification==0)
		            {
		                status=<Text></Text>;
		            }
		            else
		            {
		                status=<Badge minWidth={18} minHeight={18} textStyle={ThemeStyles.statusColor} style={ThemeStyles.statusTheme3}>
		                {programDetails.countResourceNotification}
		                </Badge>;
		            }
				var text=programDetails.batchname.charAt(0)+""+programDetails.programname.charAt(0);
				
				var ImageColor=colorArray[index%9];
		    return (
		            <TouchableHighlight  underlayColor='#e5e5e5'  onPress={() => _this.onPress(_this.state.routeName,programDetails.scheduleid,programDetails.extension,programDetails.filename,programDetails.filepath,programDetails.comstatus) } >
		            <View style={ThemeStyles.listViewTheme3}> 		            
		            <View style={{  marginTop:5,
		                        marginRight:2,
					backgroundColor: ImageColor,
					borderWidth: 0.2,
					borderColor: '#fff',
					width: 50,
                                  	height: 50}} >
					<Text style={ThemeStyles.roundTextTheme3 }>{text}</Text>
		            </View>
		            <View style={{marginLeft:5}}>
		            <Text style={ThemeStyles.batchnameTheme3}>{programDetails.batchname}
		                <Text style={ThemeStyles.programnameTheme3}>{"\n"}{programDetails.programname}
		            </Text>
		            <Text style={ThemeStyles.programdateTheme3}>{"\n"}{programDetails.programdate}</Text>
		            </Text>
		           
		            </View>
		            <View style={ThemeStyles.countView}>
		            {status}
		            </View>

		            </View>
		            </TouchableHighlight>

		            )
			});
		}
        
        
	}

	if(this.state.resultData==true){
			var resultData=<View style={{alignSelf:"center",padding:15,marginTop:50}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No {this.state.label} available</Text>		
			</View>;			
		}
      if(this.state.retry==true){
          
          var retry=<View style={{alignSelf:"center",flex:1,paddingTop:10,marginTop:50}}>
          <Text style={{color:"#000000"}}>You seem to be offline</Text>
          
          <Button
          raised
          style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}}
          backgroundColor="#EC9B64"
          onPress={()=>this.componentDidMount()}
          title="Go Online"/>
          </View>;
          

      }
	var headerTab=<View></View>
     	if(this.props.routName=='Resources' && this.state.compentencystatus=='Active'){
		headerTab=<View style={ThemeStyles.hederBG}>
								<View> 
				<TouchableOpacity onPress={() => this.onLoading('Resources') }>
				<Text style={ThemeStyles.titleText}>{this.state.menuLable}</Text>
				 </TouchableOpacity>
				<View>	
				<TouchableOpacity onPress={() => this.onLoading('MyResources') }>
				<Text style={ThemeStyles.Myresources}>My Learning</Text>
				 </TouchableOpacity>
				</View>		
				</View>
				
			</View>;
	}
	else{
		if(this.state.initroute=='MainMenu'){

			headerTab= <View style={ThemeStyles.hederBG}>
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
	} 

if(this.state.isVisible!=true){
	var search=<SearchBar
		  ref={(ref) => this.searchBar = ref}
		  data={this.state.programDetails}
		  handleResults={(results)=>this._handleResults(results)}
		  showOnLoad
		/>;
	}
      var restult="";
      if(this.state.animating==true){
          restult= <ActivityIndicator
          animating = {this.state.animating}
          color = '#23A9FF'
          size = "large"
          style = {ThemeStyles.activityIndicator}
          />;
      }
      else{
          restult=microAppList;
      }
	if(this.state.footer==true){
        var footer = <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,backgroundColor:this.state.themebgcolor  }}><Text style={{ color: '#000000',
                                   alignSelf:"flex-end",
                                   fontSize:12,paddingRight:5}}>Powered by YokuPro</Text></View>; 
	}

    return (
            <View onLayout={(event) => this.handleLayoutChange(event)} style={ThemeStyles.container}>
           	{headerTab}
            <View>
            {search}
            </View>
  	{resultData}
            {retry}
            <View style={{marginTop:70,flex:1 }} >

            <PTRView  onRefresh={this._refresh} onScroll={() =>this.setState({footer:true})} scrollEventThrottle={16}>
		<View style={{marginBottom:15}}>
		{restult}
	</View>		
		

		</PTRView>
            </View>
          
	{footer}	
            
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
   
                               },activityIndicator: {
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
 hasEventDaySelectedCircle: {
      backgroundColor: '#30dbdb',
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


