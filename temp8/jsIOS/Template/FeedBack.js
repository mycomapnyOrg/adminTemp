const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';

var ReactNative = require('react-native');
import { Container, Content, InputGroup, Input, List,ListItem,Picker,Header,Button,Icon,Title,Left,Body,Right,Card,CardItem,Thumbnail} from 'native-base';
var {  StyleSheet, Text, View,ScrollView,WEBVIEW_REF, AsyncStorage, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
export default class FeedBack extends Component {
constructor(props) {
    super(props);
    this.state = {
   screenType: '',
	sucessMsg:false,isModalVisible: false,
	 active: true

    };
}
showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
async sendDetails(){
	var _this = this;
	var name = _this.state.name;
	var email = _this.state.email;
	var mobile = _this.state.mobile;
	var address = _this.state.address;

	var url="http://yokupro.com/manage/";

		fetch(url+'manageappajax?type=registerDetails&name='+name+'&email='+email+'&mobile='+mobile+'&address='+address, {
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
					sucessMsg:true,
				});

			}
			
			
					
		
		})
		.done();
	
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

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/2.4,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/3});
		}

	};

  render() {
		
		if(this.state.sucessMsg==true)
			{	
			var sucMsg=<View style={{alignSelf:'center',}}><Text style={{color:'#6Bddd2', fontSize: 15,}}>Request Submitted Sucessfully...!</Text></View>; 	
			}
		
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

	
      <Content onLayout={(event) => this.handleLayoutChange(event)}>
                     <Card>
                        <CardItem header>
                            <Text>Feedback Form</Text>

	
                        </CardItem>
                        <CardItem>
                            <Body>
				{sucMsg}
				<InputGroup regular>
				<Input placeholder="Type your feedback..." onChangeText={(description) => this.setState({description})}/>
				</InputGroup>
				
												
                            </Body>
					

                        </CardItem>
                        <CardItem header>                             
				<Body>

				<Button  rounded info onPress={() => this.sendDetails()} style={{alignSelf:'flex-end' }}>
				<Text style={{color:'white'}}>Submit</Text>
				</Button>
				  </Body>
                        </CardItem>
                   </Card>


                    
                </Content>	

 <Modal isVisible={this.state.isModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	
         <Card>
                        
 			<CardItem onPress={() => this.navigate('AskHelp')}>
                       <Icon active name="md-help" />
                       <Text>Ask for Help</Text>
                       <Right>
                          <Icon name="arrow-forward" />
                       </Right>
                     </CardItem>
 			<CardItem onPress={() =>this.navigate('Login')}>
                       <Icon active name="md-log-out" />
                       <Text>Logout</Text>
                       <Right>
                          <Icon name="arrow-forward" />
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
    backgroundColor: '#f7f7f7',
  },

});


