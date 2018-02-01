	 const React = require('react');
	const retryImg = require('../images/retryw.png');
	var ReactNative = require('react-native');
	import styles from './styles';
	const logo = require('../images/logo-3.png');
	var {  StyleSheet, Text,TextInput, View,ScrollView,Platform, AsyncStorage, Dimensions,Image,TouchableOpacity,NetInfo,ActivityIndicator,KeyboardAvoidingView} = ReactNative;
	var { Component } = React;
	import LinearGradient from 'react-native-linear-gradient';
	import Icon from 'react-native-vector-icons/FontAwesome';
	import { Card, ListItem, Button,Grid,Row } from 'react-native-elements'
	import { TextField } from 'react-native-material-textfield';

	module.exports = class Login extends Component {

	constructor(props) {
	super(props);
	this.state = { Username: '',Password: '',userDetails: [],loading:true,checkValidate:false,retry:false,
	showPasswordValue:true, visible: false,
	usernameValidation:false,passwordValidation:false,retry:false,animating:false};

	}

	async componentDidMount(){
	var that = this;
	NetInfo.addEventListener('connectionChange',
	(isConnected)=> {
	that.setState({isConnected : isConnected});
	}
	)
	var bgcolor = await AsyncStorage.getItem("bgcolor"); 
//alert(bgcolor);
	var applogo = await AsyncStorage.getItem("applogo"); 
	that.setState({bgcolor : bgcolor,applogo:applogo});
	}


	async onPress(){
	NetInfo.isConnected.fetch().then(isConnected => {
	if (isConnected) {
	var _this=this;
	_this.setState({animating:true });
	var Username=_this.state.Username;
	var Password =_this.state.Password;

	if(Platform=="ios"){
	var url ="https://yokupro.com/manage/";

	}
	else{
	//var url ="http://192.168.1.5:8088/manage/";
	var url ="http://yokupro.com/manage/";

	}
	if(Username==""){
	_this.setState({
	errorMsgEmail:"Please enter a username",retry:false,animating:false
	});
	return false;
	}
	else{
	_this.setState({
	errorMsgEmail:"",
	});

	}
	if(Password==""){
	_this.setState({
	errorPassword:"Please enter a password",retry:false,animating:false });
	return false;
	}
	else{
	_this.setState({
	errorPassword:"",visible: true,retry:false
	});

	//_this.setState({visible:true,retry:false});
	fetch(url+'manageappajax?type=LoginCheckUsers&username='+Username+'&password='+Password, {
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
	//  alert(JSON.stringify(responseData));
	if(responseData!="" && responseData!=null){
	_this.setState({
	userDetails:responseData,animating: false
	});
	_this.navigate();

	}
	else{
	_this.setState({
	animating: false,errorText:true
	});

	}

	})
	.catch((error) => {
	this.setState({retry:true,animating: false});
	})
	.done();
	}
	}else{
	this.setState({retry:true,animating: false});
	}

	})

	}
	onRegister(route){

	this.props.navigator.push({
	name: route, // Matches route.name
	})
	}
	async handleLayoutChange(event:Event){

	var width = Dimensions.get('window').width;
	var height = Dimensions.get('window').height;
	if(width>height){

	await this.setState({screenType: 'Landscape', height : height,width : width/1.15,imagewidth:width/5,imageheight:height/18,imagewidthicon:width/2.8 ,imageheighticon:height/5.8});


	} else {

	await this.setState({screenType: 'Portrait', height : height,width : width/1.29,imagewidth:width/6.5 ,imageheight:height/6,imagewidthicon:width/1.5 ,imageheighticon:height/8.5,});


	}

	};
	async showPassword(showval){
	var _this = this;
	if(showval == true)
	{
	await _this.setState({
	showPasswordValue:false
	});
	} else {
	await _this.setState({
	showPasswordValue:true
	});
	}

	}

	async navigate(){
	var _this=this;
	var userDetailsList=_this.state.userDetails;
	await AsyncStorage.setItem("empid", userDetailsList['empid']+"");
	await AsyncStorage.setItem("companyid", userDetailsList['companyid']+"");
	await AsyncStorage.setItem("menuoption", userDetailsList['menuoption']+"");
	await AsyncStorage.setItem("applogo", userDetailsList['applogo']+"");
	await AsyncStorage.setItem("themeid", userDetailsList['themeid']+"");
    await AsyncStorage.setItem("weburl", userDetailsList['weburl']+"");
	await AsyncStorage.setItem("compentencystatus", userDetailsList['compentencystatus']+"");
	if(userDetailsList['themerouting']==null){
	await AsyncStorage.setItem("themerouting", "MainMenu");
	}else{
	await AsyncStorage.setItem("themerouting", userDetailsList['themerouting']+"");
	}
	if(userDetailsList['themerouting']!=null){
	await AsyncStorage.setItem("themebgcolor", "#"+userDetailsList['themebgcolor']+"");
	await AsyncStorage.setItem("bgcolor", "#"+userDetailsList['themebgcolor']+"");
	}
	await AsyncStorage.setItem("employeename", userDetailsList['employeename']+"");
	await AsyncStorage.setItem("customerid", userDetailsList['customerid']+"");
	await AsyncStorage.setItem("imagepath", userDetailsList['imagepath']+"");

	if(Platform=="ios"){
	await AsyncStorage.setItem("url", "https://yokupro.com/manage/");
	}
	else{
	await AsyncStorage.setItem("url", "http://yokupro.com/manage/");
	}
	var initroute = await AsyncStorage.getItem("themerouting");
	this.props.navigator.push({
	name: initroute,
	passProps: {
	initroute:initroute
	} // Matches route.name
	})

	}
	render() {

	var content=null;
	var showPasswordrender=null;
	if(this.state.showPasswordValue!=true){

	showPasswordrender=<Icon active name='eye-slash' style={styles.icons} onPress={() => this.showPassword(this.state.showPasswordValue)} />;

	}
	else{
	showPasswordrender=<Icon active name='eye' style={styles.icons} onPress={() => this.showPassword(this.state.showPasswordValue)} />;
	}
	if(this.state.errorText==true){
	var errorMsg=<View style={{alignSelf:'center',}}><Text style={{color:'red', fontSize: 15,}}>Invalid login</Text></View>;
	}
	if(this.state.retry==true){

	var retry=<View style={{alignSelf:"center",flex:1,paddingTop:10}}>
	<Text style={{color:"#FFFFFF"}}>You seem to be offline</Text>

	<Button
	raised
	style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}}
	backgroundColor="#EC9B64"
	onPress={()=>this.onPress()}
	title="Go Online"/>
	</View>;
	}
	const animating = this.state.animating
	var submit="";
	if(this.state.animating==true){

	submit= <ActivityIndicator
	animating = {this.state.animating}
	color = '#078BD5'
	size = "large"
	style = {styles.activityIndicator}
	/>;
	}else{
	submit=<View style={{alignItems:'flex-end'}}><Button
	onPress={() => this.onPress()}
	style={{alignSelf:'flex-end' }}
	backgroundColor="#5087C8"
	raised
	icon={{name: 'cached'}}
	title="Login"/></View>;

	}

	if(this.state.bgcolor!=undefined ){
	var col1=this.state.bgcolor;
	var col2=this.state.bgcolor;
	var col3=this.state.bgcolor;
	var applogo=this.state.applogo;
	var footer=<View style={{position: 'absolute', left: 0, right: 0, bottom: 0,}}><Text style={{ color: '#000000',
	alignSelf:"flex-end",
	fontSize:12,paddingRight:5}}>Powered by YokuPro</Text></View>;
	}else{
	col1="#5BB9FF";	
	col2="#AFEEFF";	
	col3="#23A9FF";
	applogo='http://yokupro.com/Applogo/logo_w.png';
	var footer=<View style={{position: 'absolute', left: 0, right: 0, bottom: 0,}}>
	</View>;
	}

	return (
	<LinearGradient colors={[col1,col2, col3]} style={{flex:1}} onLayout={(event) => this.handleLayoutChange(event)}>

	<KeyboardAvoidingView  behavior="position">
	<View style={{ 	flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
	<Image
            style={{height:85,marginTop:this.state.imageheight, marginBottom:50 ,flex:3  }}
	source={{uri:applogo}} resizeMode={"contain"}
	/>
	</View>
	<View style={styles.cardStyle}>
	<View style={{flexDirection:"row"}}>
	<Icon name='lock' style={{color: '#5087C8',fontSize:20,paddingLeft:10}}/>
	<Text style={{paddingLeft:5,fontSize:15}}>Sign in to start your session</Text>
	</View>
	{errorMsg}
	<View style={{marginLeft:10,marginRight:10}}>
	<TextField
	label='Email'
	autoCapitalize = "none"
	value={this.state.Username}
	onChangeText={(Username) => this.setState({Username,errorMsgEmail:''})}
	error={this.state.errorMsgEmail}
	/>
	</View>
	<View style={{flexDirection:'row'}}>
	<View style={{width:this.state.width,
	marginLeft:10,
	marginRight:10,}} >
	<TextField
	label='Password'
	autoCapitalize = "none"
	value={this.state.Password}
	secureTextEntry={this.state.showPasswordValue}
	error={this.state.errorPassword}
	onChangeText={(Password) => this.setState({Password,errorPassword:''})}/>
	</View>
	{showPasswordrender}
	</View>
	{submit}
	</View>
	</KeyboardAvoidingView>
	{retry}
            
	{footer}
	</LinearGradient>

	);
	}
	}

