const React = require('react');
import Modal from 'react-native-modal';
import ActionButton from 'react-native-action-button';
var ReactNative = require('react-native');
var { AppRegistry, StyleSheet, Image,Text,AsyncStorage, ScrollView,ToolbarAndroid, ListView, View, TouchableHighlight,Dimensions,TouchableOpacity,TextInput } = ReactNative;
var { Component } = React;
var {height, width} = Dimensions.get('window');
module.exports = class Askforhelp extends Component {
state = {
    successmsg:[],loading:true,query:'',isModalVisible: false

  };

async onPress(){
		
		var _this=this;
		_this.setState({loading:false});
		
	var empid = await AsyncStorage.getItem('empid');
	var companyid = await AsyncStorage.getItem("companyid");
	var customerid = await AsyncStorage.getItem("customerid");
		var query=_this.state.query;	

			var url="http://yokupro.com/manage/";
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
						loading:true,query:"",sucessmessage:true
					});
				}
				
				
		
			})
			.done();
		
	}

showModal(){
	 this.setState({ isModalVisible: true });
	 }
hideModal(){ 
	this.setState({ isModalVisible: false });
	 }
navigate(route){

if(this.state.isModalVisible==true){
		this.setState({isModalVisible: false});		
	}
	  this.props.navigator.push({
	    name: route, // Matches route.name
	  })
	}

  onChange(value) {
    		Query:this.setState({value});
  };		
async handleLayoutChange(event:Event){

		var width = Dimensions.get('window').width;
		var height = Dimensions.get('window').height;
		if(width>height){

			await this.setState({screenType: 'Landscape', height : height,width : width,imagewidth:width/1.7 ,imageheight:height/1.4,modalBody:0 });
			

		} else {

			await this.setState({screenType: 'Portrait', height : height,width : width,imagewidth:width/1.1 ,imageheight:height/2.4,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,modalBody:width/2});
		}

	};
render() {

			var content=null;
			var submitQuery=null;
			if(this.state.loading!=true){
				content= <Spinner color='blue' />;	
			}
			else{
			
			content=<Button rounded info onPress={() => this.onPress()} style={{alignSelf:'center' }}>
                                                <Text style={{color:'white'}}>Submit</Text>
                    	</Button>;	
			}

			if(this.state.sucessmessage==true){
				submitQuery=<View>
				<Text style={{color: 'red',alignSelf: 'center',fontSize: 20,}}>Query Submitted...!</Text>			
				</View>;
			}


    return ( 
	<Container >
 <Header style={{backgroundColor: '#64BFFF',}}>
                <Left>
                    <Button transparent onPress={() => this.navigate('MainMenu')}>
                       <Icon name='md-arrow-round-back' />
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
                <Content  onLayout={(event) => this.handleLayoutChange(event)}>
		 <View style={{backgroundColor:'#e3ebfc'}}>
	<Text style={styles.titleViewText}>Ask For Help</Text>
	</View>
		{submitQuery}

		<Form style={{marginBottom:20}}>   
		<TextInput
		style={{borderTopColor:"red"}}
	    multiline={true}
    	numberOfLines={4}
	onChangeText={(query) => this.setState({query})}
   	 placeholder="Type here..." 
	value={this.state.query}	
/>

                    </Form>
			{content}

                </Content>

   <Modal isVisible={this.state.isModalVisible} onBackButtonPress={()=>this.hideModal()} style={{paddingTop:this.state.modalBody,paddingBottom:this.state.modalBody}}>
	<View style={{flex:1}}>	
         <Card>
                          <CardItem>
                       <Icon active name="md-text" />
                     	<TouchableOpacity onPress={() =>this.navigate('YokuPro')}>  
                       <Text>Feed Back</Text>
			</TouchableOpacity>	
                       <Right>
                       </Right>
                     </CardItem >
 			<CardItem >
                       <Icon active name="md-help" />
                     	<TouchableOpacity onPress={() =>this.navigate('YokuPro')}>  
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

