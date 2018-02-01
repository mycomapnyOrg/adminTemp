const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
var {  NetInfo,StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;

const getRandomInt = () =>  Math.floor(Math.random() * 27 + 1);
const generateRandomEvents = date => new Array(5)
    .fill(1)
    .map(() => new Date(date.getFullYear(), date.getMonth(), getRandomInt()));
import LinearGradient from 'react-native-linear-gradient';

import RNMaterialCalendar from 'react-native-material-calendar';
module.exports = class Calendar extends Component {
 constructor(props) {
    super(props);
    this.state = {
   screenType: '',
	width:'',
 currentMonth: new Date(),
    selectedDate: null,
    eventsDates: [],
    eventsDate: [],
	eventType: null,isVisible:true,types:'Circle', color: "#6BCAE2", size: 70,isModalVisible: false
    };

  }
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
async componentWillMount(){
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
		this.resourseload(empid,companyid);
}
resourseload(empid,companyid){
	NetInfo.isConnected.fetch().then(isConnected => {
	if(isConnected){
	var _this = this;
	_this.setState({eventType:'TrainingProgramDate'})
	var url="http://yokupro.com/manage/";
		fetch(url+'manageappajax?type=TrainingProgramDate&empid='+empid+'&customerid='+companyid, {
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
				
				var dateArray = new Array(responseData.length);
				for(var i=0;i<responseData.length;i++){
					dateArray[i]=new Date(responseData[i]['programdate']);
					}	
				_this.setState({
					eventsDates:dateArray,isVisible:false
				});

			}
			
		
		})
		.done();
		}else{
				Toast.show({
					      text: 'No Internet Connection!',
					      position: 'bottom',
					      buttonText: 'Okay',

					    });
		
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
eventdetails(date,type){

	var _this=this;
	var route="ListPage";
	this.props.navigator.push({
	    name: route, 
		passProps: {
          	date: date,
		type:type
      		}
	  })	
}
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,calwidth:width/3,eventHeight:height/11,modalBody:0});

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,calwidth:width/3,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,eventHeight:width/11,modalBody:width/2});
		}

	};

  render() {


		
    return (
	<Container >
  <Header style={{backgroundColor: '#64BFFF',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
                       <Icon name='md-arrow-round-back'/>
                    </Button>
                </Left>
              <Body style={{paddingLeft:this.state.paddingBody}}>
                  <TouchableOpacity onPress={() => this.navigate('MainMenu')} > 
				<Image
				style={{alignSelf:"center",width:110,height:30 }}
				source={require('../images/logo_w.png')}

				></Image> 
		</TouchableOpacity>

                </Body>
		 <Right>
 			
	           </Right >
            </Header>
	<View style={{backgroundColor:'#e3ebfc'}}>
	<Text style={styles.titleViewText}>Events</Text>
	</View>
	        <ScrollView>
        <View style={styles.container} onLayout={(event) => this.handleLayoutChange(event)}>
          <View style={{height:this.state.eventHeight,
                        backgroundColor: "#f9f9f9",
                       }}>
            	
            <View style={{flex: 1,
                        flexDirection: "row"}}>
<LinearGradient colors={['#00AB6B','#00AB6B','#00AB6B']} >
              <TouchableOpacity
                  style={{flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 3,
	borderColor: "white",
width:this.state.calwidth}}
                  onPress={() => {
                  this.setState({currentMonth: new Date(
                    this.state.currentMonth.getFullYear(),
                    this.state.currentMonth.getMonth() - 1
                  )});
                  this.calendar && this.calendar.goToPrevious();
                }}>
                <Text style={styles.Text}>
                  Prev
                </Text>
              </TouchableOpacity>
		           			</LinearGradient>
<LinearGradient colors={['#00AB6B','#00AB6B','#00AB6B']} >
              <TouchableOpacity
                  style={{flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 3,
	borderColor: "white",
width:this.state.calwidth}}
                  onPress={() => {
                  this.setState({currentMonth: new Date()});
                  this.calendar && this.calendar.setCurrentDate(new Date());
                }}>
                <Text style={styles.Text}>
                  Today
                </Text>
              </TouchableOpacity>
              		           			</LinearGradient>
<LinearGradient colors={['#00AB6B','#00AB6B','#00AB6B']} >
              <TouchableOpacity
                  style={{flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 3,
	borderColor: "white",
width:this.state.calwidth}}
                  onPress={() => {
                  this.setState({currentMonth: new Date(
                    this.state.currentMonth.getFullYear(),
                    this.state.currentMonth.getMonth() + 1
                  )});
                  this.calendar && this.calendar.goToNext();
                }}>
                <Text style={styles.Text}>
                  Next
                </Text>
              </TouchableOpacity>
              		           			</LinearGradient>
            </View>

          </View>
          <RNMaterialCalendar
              ref={calendar => this.calendar = calendar}
              width={this.state.width-2}
              showDate="all"
              selectionMode="single"
              initDecorator={true}
             eventsDates={this.state.eventsDates}
              weekDayFormatter={["SUN","MON","TUE","WED","THU","FRI","SAT"]}
              topbarVisible={false}
              onDateSelect={(event) => {this.eventdetails(new Date(event.date),this.state.eventType)}
              }
              onMonthChange={(event) => {
                this.setState({currentMonth: new Date(event.date)})}
              }
          />
        </View>
		
	       </ScrollView>	
<Modal isVisible={this.state.isModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	
         <Card>
                          <CardItem>
                       <Icon active name="md-text" />
                     	<TouchableOpacity onPress={() =>this.navigate('FeedBackForm')}>  
                       <Text>Feed Back</Text>
			</TouchableOpacity>	
                       <Right>
                       </Right>
                     </CardItem >
 			<CardItem >
                       <Icon active name="md-help" />
                     	<TouchableOpacity onPress={() =>this.navigate('AskHelp')}>  
                       <Text>Ask for Help</Text>
			</TouchableOpacity>	
                       <Right>
                       </Right>
                     </CardItem>
 			<CardItem >
                      	<Icon active name="md-log-out" />
                     	<TouchableOpacity onPress={() =>this.navigate('Login')}>  
			<Text>Logout</Text>
			</TouchableOpacity>	
                       <Right>
                       </Right>
			
                     </CardItem>
                    </Card>
		</View>
        </Modal>
        <ActionButton buttonColor="rgba(231,76,60,1)"  onPress={()=>this.showModal()}>
       
        </ActionButton>
	</Container>

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
    color: '#3b5998',
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
 
});


