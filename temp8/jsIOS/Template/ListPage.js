const React = require('react');
var ReactNative = require('react-native');
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage,NetInfo, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
import { List, ListItem,Card,Button } from 'react-native-elements'
module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
    screenType: '',eventsDetails:[],isVisible:false,types:'Circle', color: "#6BCAE2", size: 50,isModalVisible: false,resultData:false,retry:false,isConnected:'',isVisible:true

    };

  }
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
async componentDidMount(){
	var _this = this;
    NetInfo.addEventListener('connectionChange',
                             (isConnected)=> {
                             _this.setState({isConnected : isConnected});
                             }
                             )
    
	var url =  await AsyncStorage.getItem("url");
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var programid=this.props.programid;
	this.setState({programid:programid,url:url});
	_this.EventFunction(empid,companyid,programid);
}
EventFunction(empid,companyid,programid){
NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
		var _this = this;
		var url =_this.state.url;
                              
		fetch(url+'manageappajax?type=ModuleDetails&empid='+empid+'&customerid='+companyid+'&programid='+programid, {
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
					eventsDetails:responseData,isVisible:false
				});

			}
			else{
			_this.setState({
						isVisible:false,resultData:true
					});
			}
					
			
		})
		 .catch((error) => {
			this.setState({retry:true,isVisible:false,});
		})
		.done();
		}else{
		this.setState({retry:true,isVisible:false,});
		}
		})
}

	
navigate(route){
if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	  var routeNma='Events';
	this.props.navigator.push({
	    name: route, 
		passProps: {
		routName:routeNma
      		}
	  })
	}	

async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4,imageheightnew:height/1.4 ,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/2.4,imageheightnew:height/3,headerimagewidth:width/3 ,
			headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};

  render() {
		var details=null;
		var _this=this;

		if(_this.state.eventsDetails!=null){
			for (var i = 0; i <_this.state.eventsDetails.length; i++) {
				
				details= <Card >
                        <View>
                <Image square source={require('./../images/TrainingPrograms.png')} style={{width:40,height:40}}/>
                                    <Text>{_this.state.eventsDetails[i].batchname}</Text>
                                    <Text note>{_this.state.eventsDetails[i].programname}</Text>
								
                          </View>
                         
                          <View content>
                              <Text>{_this.state.eventsDetails[i].description}</Text>
                          </View>
                          <View>
                                <Text style={styles.welcome}> In {_this.state.eventsDetails[i].location}</Text>
                                <Text style={{fontSize:17}}>{_this.state.eventsDetails[i].programdate}</Text>
                        </View>
                   </Card>;
			}
		}
		else{
			details="";
			}

	if(this.state.resultData==true){
	
			var resultData=<View style={{alignSelf:"center",padding:15}}>
				<Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Events available</Text>		
			</View>;			
		}

if(_this.state.retry==true){
	
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
	  	    
            <View style={{backgroundColor:'#e3ebfc',padding:12}}>
           	<Text style={styles.titleViewText}>Program Details</Text>
</View>
	        <ScrollView>
					{resultData}
						{details}
		{retry}
   </ScrollView>	
         <Spinner visible={this.state.isVisible} textContent={"Loading..."} textStyle={{color: '#FFF'}} type={this.state.types}/>
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
    fontSize: 18,
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


