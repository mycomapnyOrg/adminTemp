const React = require('react');
var ReactNative = require('react-native');
//import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
var {  StyleSheet, NetInfo,Text, View,ScrollView,WEBVIEW_REF, Picker ,AsyncStorage, Dimensions,Image,WebView,TouchableOpacity,TextInput,ActivityIndicator } = ReactNative;
const retryImg = require('../images/retry.png');
var { Component } = React;
import ThemeStyles from '../Styles/ThemeStyles';
import FacebookTabBar from './FacebookTabBar';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import { Card, ListItem, FormInput,Button,Col } from 'react-native-elements';
import  Rating from 'react-native-easy-rating'

module.exports = class Resource extends Component {
 constructor(props) {
    super(props);
    this.state = {
    screenType: '',eventsDetails:[],isModalVisible: false,sucessMsg:false, successmsg:[],loading:true,query:'',programDetails:[],retry:false,programId:'',url:'',responce:false,description:'',feeErrMsg:false,feedloading:true, index: 0,isConnected:'',Ratingcolor:'red',animating:false,loading:false,
    routes: [
             { key: '1', title: 'About us' },
             { key: '2', title: 'Feedback' },
             { key: '3', title: 'Help' }
             ],

    };

  }

async componentDidMount(){
    
    var that = this;
    NetInfo.addEventListener('connectionChange',
                             (isConnected)=> {
                             that.setState({isConnected : isConnected});
                             }
                             )
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
    var customerid = await AsyncStorage.getItem("customerid");

	var url =  await AsyncStorage.getItem("url");
    
	//this.programDetails(empid,companyid);
   this.onValueChange(url,companyid,empid);
    this.setState({routeName:this.props.routName,url:url,empid:empid,companyid:companyid ,customerid:customerid});
}

programDetails(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
	var _this = this;
		var url =_this.state.url;
		_this.setState({isVisible:true,retry:false});
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
					programDetails:responseData,isVisible:false,retry:false
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



async onPressaskforhelp(){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
		var _this=this;
		_this.setState({loading:true});
		var url =_this.state.url;
		var empid = _this.state.empid;
		var companyid = _this.state.companyid;
		var query=_this.state.query;	
		var customerid='';
        if(query==""){
			_this.setState({loading:true,formerrorMsg:"Field cannot be blank"});
		}
		else{	
			fetch(url+'manageappajax?type=askforhelp&empid='+empid+'&customerid='+customerid+'&companyid='+companyid+'&message='+query+'&passtype=query', {
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
						loading:false,query:"",Ratingcolor:"#63c655",formerrorMsg:"Query submitted."
					});
				}
				
				
		
			})
			.catch((error) => {
				this.setState({retry:true,loading:false});
			})
			.done();
		}
		}else{
			this.setState({retry:true,loading:false});
		}
	})
					

	}

    async sendDetails(){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         var _this = this;
                                         _this.setState({animating:true});
                                         var empid = _this.state.empid;
                                         var companyid = _this.state.companyid;
                                         var customerid = _this.state.customerid;
                                         var rating = _this.state.rating;
                                         var url =_this.state.url;
                                         if(rating==''){
                                         _this.setState({errorMsg:"Please select a Program Rating.",isVisible:false});
                                         return false;
                                         }
                                         else{
                                            _this.setState({errorMsg:"",isVisible:false});
                                         
                                         fetch(url+'manageappajax?type=rateApplication&companyid='+companyid+'&empid='+empid+'&rating='+rating+'&customerid='+customerid, {
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
                                               if(responseData[0].msg=='success')
                                               {				
                                               _this.setState({
                                                              Ratingcolor:"#63c655",sucessMsg:true,description:'',errorMsg:"Feedback submitted",animating:false,UpdateMsg:false
                                                              });
                                               }
                                               if(responseData[0].msg=='Updated'){
                                               _this.setState({
                                                              feeErrMsg:false,UpdateMsg:true,description:'',errorMsg:"Feedback Updated",animating:false,sucessMsg:false
                                                              });
                                               }
                                               }else{
                                               
                                               }		
                                               })
                                         .catch((error) => {
                                                this.setState({retry:true,animating:false});
                                                })
                                         .done();
                                         }
                                         
                                         }else{
                                         this.setState({retry:true,animating:false});
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

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.5,imageheight:height/3.3,modalBody:0});
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.3 ,imageheight:height/8,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};
    
   async onValueChange(url,companyid,empid) {
        var _this = this;
        this.setState({rating:0 });
        fetch(url+'manageappajax?type=programFeedBackList&companyid='+companyid+'&empid='+empid+'&rateType=app', {
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
              if(responseData!=''||responseData!=null)
              {
              this.setState({rating:responseData.rating});
              }
              else
              {
              this.setState({rating:0});
              }
              })
       .catch((error) => {
              this.setState({retry:true});
              })
       .done();

    }
    
    _handleChangeTab = (index) => {
        this.setState({ index });
    };
    
    _renderHeader = (props) => {
        return <TabBar {...props} />;
    };
    
    _renderScene = ({ route }) => {
        var _this=this;
        switch (route.key) {
            case '1':
                return <ScrollView>
                <View style={ThemeStyles.cardStyle}>
                <View style={{margin:10}} >
                <Text style={{marginLeft:10}}>YokuPro, where learning is just a touch away!</Text>
                <View>
                <Text style={{alignSelf: 'center',fontWeight:"bold"}} >{"\n"}Welcome to the world of YokuPro! </Text>
                <Text style={{textAlign: "justify"}}> {"\n"}YokuPro is a feature-rich, first of it's kind Learning and Development (L&D) mobile application. The mobile app is integrated with an intuitive web-based admin console that is designed to manage and deliver structured content in a blended format.{"\n"}</Text>
                <Text style={{fontWeight: 'bold'}}> The YokuPro platform features the following:  {"\n"}</Text>
                <View style={{ flexDirection: 'row'}}>
                <View style={{padding:5}}><Image
                style={{width:10,height:10}}
                source={require('../images/TrainingPrograms.png')}
                ></Image></View>
                <Text style={{marginRight:5}}>Distribution of Learning Content over a range of devices {"\n"}  </Text></View>
                
                <View style={{    flexDirection: 'row'}}>
                <View style={{padding:5}}><Image
                style={{width:10,height:10}}
                source={require('../images/TrainingPrograms.png')}
                ></Image></View>
                <Text style={{marginRight:5}}>Student / Trainee Management in groups, just as you'd do in a classroom{"\n"}  </Text></View>
                
                <View style={{    flexDirection: 'row'}}>
                <View style={{padding:5}}><Image
                style={{width:10,height:10}}
                source={require('../images/TrainingPrograms.png')}
                ></Image></View>
                <Text style={{marginRight:5}}>Content Management that makes it faster for the Trainer to access and push content to learner groups {"\n"}</Text></View>
                <View style={{ flexDirection: 'row',}}>
                <View style={{padding:5}}><Image
                style={{width:10,height:10,}}
                source={require('../images/TrainingPrograms.png')}
                ></Image></View><Text style={{marginRight:5}}>Competency Management through an in-built assessment engine {"\n"}</Text></View>
                <View style={{    flexDirection: 'row',}}>
                <View style={{padding:5}}><Image
                style={{width:10,height:10,}}
                source={require('../images/TrainingPrograms.png')}
                ></Image></View><Text style={{marginRight:5}}>Organise and Manage Learning Events through a global calendar{"\n"}</Text></View>
                <View style={{    flexDirection: 'row',}}>
                <View style={{padding:5}}>
                <Image
                style={{width:10,height:10,}}
                source={require('../images/TrainingPrograms.png')}
                ></Image></View><Text style={{marginRight:5}}>Facilitates User Interactions through Real-time Chat {"\n"}</Text></View>
                <View style={{    flexDirection: 'row',}}>
                <View style={{padding:5}}>
                <Image
                style={{width:10,height:10,}}
                source={require('../images/TrainingPrograms.png')}
                ></Image></View><Text style={{marginRight:5}}>Collects Feedback - both on training programs attended and other areas where you want to solicit feedback or learner inputs {"\n"}</Text></View>
                <Text >
                We wish you the best as you use YokuPro! As the tool is designed for both efficiency and effectiveness in L&D, do let us know what more you'd need from YokuPro to take your L&D initiatives to the next level. {"\n"}</Text>
                    
                    </View>
                    <View>
                   
                    <Text style={{fontWeight: 'bold'}}>About the design of our interface {"\n"}</Text>
                <Text style={{textAlign: 'justify'}}>The 'Magic Cube' has fascinated people of all ages for several decades now and still remains to most bought puzzle in the world! If you've never 'fixed' a cube (logically!), it is mind boggling trying to get it right. However, those who have learnt to 'fix' the Magic Cube know that there is a science and an algorithm to it. YokuPro is that algorithm to meet the learning needs of the present day context - away yet connected. Our philosophy and approach to L&D is reflected in the timeless Magic Cube. As you use this, may you unravel faster and better ways of solving your 'Learning Cube'!{"\n"}
                    
                    </Text>
                    
                    </View>
                    <View>
                    <Text style={{fontWeight:'bold'}}>Konnect{"\n"}</Text>
                <Text style={{textAlign: "justify"}}>           Konnect is the directory of your learning community. It is sorted alphabetically, like a phone book, so that with just a few touches you can get to the person whom you'd like to be in contact with. This is a very useful feature for both trainers and organizations.{"\n"}
                    
                    </Text>
                    </View>
                    <View>
                    <Text style={{fontWeight:'bold'}}>Resources {"\n"}</Text>
                <Text style={{   textAlign: "justify"}}>           Find all content related to the trainings you've attended or have been assigned to. Just select the Training Program and you will have access to all content you'd need to revisit and strengthen what you learnt in the Training Program{"\n"}
                
                
                </Text>
                </View>
                <View>
                <Text style={{fontWeight:'bold'}}>Evaluate {"\n"}</Text>
                <Text style={{   textAlign: "justify"}}>          Use this link to collect feedback on training programs. This is a fundamental and most popular use of this tool. Advanced users can configure this tool to conduct competency assessments before and after a training program.{"\n"}
                
                
                </Text>
                </View>
                <View>
                <Text style={{fontWeight:'bold'}}>Events{"\n"}</Text>
                <Text style={{   textAlign: "justify"}}>           Your global learning calendar goes here. Learners can see what programs are on offer and then choose to nominate themselves for various events. When linked to your company's Learning Management System, a learner can directly apply from YokuPro, and all your data is captured in your company's own Learning Management System. If you don't yet have one, YokuPro fills up that space, so you won't need one!{"\n"}
                    
                    
                    </Text>
                    </View>
                    <View>
                    <Text style={{fontWeight:'bold'}}>Amigos{"\n"}</Text>
                <Text style={{   textAlign: "justify"}}>           One of the powerful ways to learn is to team up with someone with similar learning needs or with someone who knows and wants to share his / her expertise with you. Amigos is that link that puts you in contact with your learning buddy. All buddy assignments appear in this link and are usually related to the training programs that you have attended. Again, the buddy teams are listed under the programs you've attended. Just touch the program name and you are in touch with your Amigo!{"\n"}
                
                
                </Text>
                </View>
                <View>
                <Text style={{fontWeight:'bold'}}>Synopsis{"\n"}</Text>
                <Text style={{   textAlign: "justify"}}>           If you are looking for a quick summary of what you learnt in a training program, this is the link to touch. You will find content that can help revisit the learning, in less than 10 minutes. So if you want to brush up, real quick, this is the place{"\n"}
                    
                    
                    </Text>
                    </View>
                    
                    <View>
                    <Text style={{fontWeight:'bold'}}>Nuggets {"\n"}</Text>
                <Text style={{   textAlign: "justify"}}>           This is the 'Today's Special' of the L&D world. Here you will find useful messages related to the current learning focus of your organization. Spend 5 minutes a day here, and you'd assimilate a significant portion of knowledge as you use this each day. Fresh Nuggets, every single day!{"\n"}
                
                
                </Text>                               
                </View>
                
                </View>
                </View>
                
                </ScrollView>;
            case '2':
                return <ScrollView>
                <View style={{backgroundColor:'#e3ebfc',padding:12}}>
                <Text style={styles.titleViewText}>Rate YokuPro</Text>
                </View>
                <View style={ThemeStyles.cardStyle}>
                <View>
                <Text style={{color:this.state.Ratingcolor,fontSize: 15,alignSelf:"center"}}>{this.state.errorMsg}</Text>
                
               
                </View>
                <View style={{alignSelf:"center"}}>
            {rating}
                </View>
                <View style={{paddingTop:20}}>
            {submit}
               
            </View>
                </View>
                </ScrollView> ;
                
            case '3':
                return <ScrollView>
                <View style={{backgroundColor:'#e3ebfc',padding:12}}>
                <Text style={styles.titleViewText}>Ask For Help</Text>
                </View>
                <View style={ThemeStyles.cardStyle}>
                <Text style={{color:this.state.Ratingcolor,fontSize: 15,alignSelf:"center"}}>{this.state.formerrorMsg}</Text>
                <FormInput
                placeholder='Type here...'
                ref='forminput'
                textInputRef='email'
                
                multiline={true}
                numberOfLines={4}
                style={{height:50}}
                onChangeText={(query) => this.setState({query})}
                value={this.state.query}
                               />
                <View style={{paddingTop:30}}>
            {content}
                </View>
                </View>
                </ScrollView>;
            default:
                return null;
        }
    };
  render() {
      var details=null;
      var _this=this;
      
      if(this.state.feedloading==true){
          feedbackContent=<View>
          
          </View>;
      }
      if(this.state.animating==true){
          submit=<ActivityIndicator
          animating = {this.state.animating}
          color = '#63c655'
          size = "large"
          style = {styles.activityIndicator}
          />;
      }
      else{
          submit=<View style={{alignItems:'flex-end'}}><Button
          raised
          onPress={() => this.sendDetails()}
          style={{alignSelf:'center',paddingTop:20 }}
          backgroundColor="#63c655"
          title="Submit"/></View>;
      }
      if(this.state.sucessMsg==true)
      {
           sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'#63c655', fontSize: 15,}}>Feedback submitted</Text></View>;
      }
      if(this.state.feeErrMsg==true){
           sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Please enter a Program Feedback.</Text></View>;
          
      }
      if(this.state.feeprogErrMsg==true){
           sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Please select a Program.</Text></View>;
          
      }
      
      var submitQuery=null;
      
     
      if(this.state.loading==true){
          content=<ActivityIndicator
          animating = {this.state.loading}
          color = '#63c655'
          size = "large"
          style = {styles.activityIndicator}
          />;
      }else{
          content=<View style={{alignItems:'flex-end'}}><Button
          raised
          onPress={() => this.onPressaskforhelp()}
          style={{alignSelf:'center' }}
          backgroundColor="#63c655"
          title="Submit"/></View>;
      }
      
      if(this.state.responce==true){
          submitQuery=<View>
          <Text style={{color: '#63c655',alignSelf: 'center',fontSize: 15,}}>Query submitted.</Text>
          </View>;
      }
      if(this.state.errMsg==true){
          submitQuery=<View>
          <Text style={{color: 'red',alignSelf: 'center',fontSize: 15,}}>Field cannot be blank</Text>
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
      if(this.state.rating!=0){
          
          rating=<Rating
          rating={this.state.rating}
          iconWidth={30}
   			    iconHeight={30}
          max={5}
          onRate={(rating) => this.setState({rating:rating})}
          />;
      }
      else{
          rating=<View><Rating
          rating={this.state.rating}
          iconWidth={30}
   			    iconHeight={30}
          max={5}
          onRate={(rating) => this.setState({rating:rating})}
          /></View>;
      }
      
		 return (
                 <View style={{flex:1}}>
		<TabViewAnimated
                 style={styles.container}
                 navigationState={this.state}
                 renderScene={this._renderScene}
                 renderHeader={this._renderHeader}
                 onIndexChange={this._handleChangeTab}
                 />
                 <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,marginTop:10}}><Text style={{ color: '#000000',
                                   alignSelf:"flex-end",
                                   fontSize:12,paddingRight:5}}>Powered by YokuPro</Text></View>
            </View>

    );
  }
}
var styles = StyleSheet.create({
 
   container: {
    flex: 1,
   backgroundColor: '#f7f7f7',
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


