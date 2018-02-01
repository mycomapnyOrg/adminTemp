import React, { Component, PropTypes } from 'react';

import {
    View,
    ScrollView,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Alert,
    AsyncStorage
} from 'react-native';
import { Container, Navbar } from 'navbar-native';
import Icon from 'react-native-vector-icons/Ionicons';
colors = require('../Styles/Colors');

export default class MyCustomizedNavBar extends Component {
    
    static contextTypes = {
    drawer: PropTypes.object.isRequired,
    };
    constructor(props) {
        super(props);
this.state = { initroute:'' };
        this.navigateTo = this.navigateTo.bind(this);
    }
	async componentDidMount(){
		var initroute = await AsyncStorage.getItem("themerouting");
		this.setState({initroute:initroute,});
	}
    async navigateTo(index,type) {
        
        if(type=='Home'){
            var  index=await AsyncStorage.getItem("themerouting");
        }
        var  themebgcolor=await AsyncStorage.getItem("themebgcolor");
        var  menuLable=await AsyncStorage.getItem("menuLable");
        var applogo =await AsyncStorage.getItem("applogo");
	if(type=="Resources"){

         AsyncStorage.setItem("comid","");
         AsyncStorage.setItem("programid","");
	}
       if(type=="Evaluate")
        {
            var ProgramExit =  await AsyncStorage.getItem("ProgramExit");
            var empid = await AsyncStorage.getItem("empid");
            var  programid=await AsyncStorage.getItem("programid");
            var empid = await AsyncStorage.getItem("empid");
            var companyid = await AsyncStorage.getItem("companyid");
            var url =  await AsyncStorage.getItem("url");
            var Typeofprogarm =  await AsyncStorage.getItem("Typeofprogarm");
            AsyncStorage.setItem("overall"," ");
            await AsyncStorage.setItem("postsatusquestion","no");
            await AsyncStorage.setItem("PostStatusMainTainExam","no");
            if(Typeofprogarm=='pre')
            {
                //alert(url+'manageappajax?type=PostQuestionStatus&companyid='+companyid+'&programid='+programid+'&empid='+empid+'&Typeofprogarm='+Typeofprogarm);
                fetch(url+'manageappajax?type=PostQuestionStatus&companyid='+companyid+'&programid='+programid+'&empid='+empid+'&Typeofprogarm='+Typeofprogarm, {
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
                
            }
            if(ProgramExit=="Yes")
            {
                var _this = this;
                Alert.alert('YokuPro', 'Do you want to exit the test? You will forfeit your score. ',  [
                                                                                                        { text: 'Ok',onPress: ()=>this.presed(index,type,themebgcolor) },
                                                                                                        {text: 'Cancel', onPress: this.noPressed, style: 'cancel'},
                                                                                                        ]);
            }
            else {
                this.props.navigate(index,type,themebgcolor,menuLable,applogo);
            }
        }
        else{
            this.props.navigate(index,type,themebgcolor,menuLable,applogo);
        }
    }
    async nav(rout){
        var type="";
        var themebgcolor = await AsyncStorage.getItem("themebgcolor");
        var  menuLable=await AsyncStorage.getItem("menuLable");
        var applogo =await AsyncStorage.getItem("applogo");
        if(rout=='GroupMemebers'){
            var initroute = rout;
            
        }else{
            var initroute = await AsyncStorage.getItem("themerouting");

        }
        this.props.navigate(initroute,type,themebgcolor,menuLable,applogo);
        
    }
    
    async presed(index,type,themebgcolor)
    {
        
        var empid = await AsyncStorage.getItem("empid");
        var companyid = await AsyncStorage.getItem("companyid");
        var url =  await AsyncStorage.getItem("url");
        var Typeofprogarm =  await AsyncStorage.getItem("Typeofprogarm");
        var  programid=await AsyncStorage.getItem("programid");
        fetch(url+'manageappajax?type=ManageEvalProgramStop&companyid='+companyid+'&programid='+programid+'&empid='+empid+'&Typeofprogarm='+Typeofprogarm, {
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
              AsyncStorage.setItem("Typeofprogarm","");
              AsyncStorage.setItem("ProgramExit","No");
              this.props.navigate(index,type,themebgcolor);
              })
        
    }
    
    render() {
        var onback=this.props.onBack;
        var route=this.props.type;

        if(this.props.bgcolor==undefined){
           var  bgColor=this.props.backgroundColor;
        }
        else{
        var bgColor= this.props.bgcolor
        }
        
        if(this.props.imageLocation!=undefined){
            var applogo=this.props.imageLocation;
        }
        else{
           var  applogo=this.props.applogo;
        }
        //alert(this.props.ColorIcon);
        if(this.props.ColorIcon==undefined){
            var ColorIcon=this.props.Iconcolor;
            
        }
        else{
            var  ColorIcon=this.props.ColorIcon;
        }
	if(this.props.type=='Document'){
		var onback=this.props.onBack;
	}else{
        	var onback=this.props.onBack;
        }

		if(this.state.initroute=='MainMenu'){
			var backArrow= "md-arrow-round-back";
			if(route=='Amigos'){
			    var icon=this.props.icon;
			    var rout=this.props.home;
			    var Drawer="ios-menu";
			}
			else if(route=='Evaluate'){
			    var icon='';
			    var rout=this.props.home;
			    var Drawer='';
			}
			else if(this.props.routing=='ProgramDetails' || this.props.routing=='Quotes'){
			    var icon="ios-home";
			    var rout=this.props.home;
			    var Drawer="ios-menu";
			}
			else{
			    var icon="ios-home";
			    var rout=this.props.routing;
			    var Drawer="ios-menu";
			}
			
		}
		else if(this.state.initroute=='Theme1'){
			 backArrow= "md-arrow-round-back";
			 if(route=='Amigos'){
			    var icon=this.props.icon;
			    var rout=this.props.home;
			    var Drawer="ios-menu";
			}
			else if(route=='Evaluate'){
			    var icon='';
			    var rout=this.props.home;
			    var Drawer='';
			}
			else if(this.props.routing=='ProgramDetails' || this.props.routing=='Quotes'){
			    var icon="ios-home";
			    var rout=this.props.home;
			    var Drawer="ios-menu";
			}
			else{
			    var icon="ios-home";
			    var rout=this.props.routing;
			    var Drawer="ios-menu";
			}
		}
        else if(this.state.initroute=='Theme2'){
            backArrow= "ios-backspace";
            ColorIcon="gray";
            if(route=='Amigos'){
                var icon=this.props.icon;
                var rout=this.props.home;
                var Drawer="md-switch";
            }
            else if(route=='Evaluate'){
                var icon='';
                var rout=this.props.home;
                var Drawer='';
            }
            else if(this.props.routing=='ProgramDetails' || this.props.routing=='Quotes'){
                var icon="md-apps";
                var rout=this.props.home;
                var Drawer="md-switch";
            }
            else{
                var icon="md-apps";
                var rout=this.props.routing;
                var Drawer="md-switch";
            }
        }
		else if(this.state.initroute=='Theme3'){


			if(route=='Amigos'){
			    var icon=this.props.icon;
			    var rout=this.props.home;
			    var Drawer="md-list";
			}
			else if(route=='Evaluate'){
			    var icon='';
			    var rout=this.props.home;
			    var Drawer='';
			}
			else if(this.props.routing=='ProgramDetails' || this.props.routing=='Quotes'){
			    var icon="ios-grid";
			    var rout=this.props.home;
			    var Drawer="md-list";
			}
			else{
			    var icon="ios-grid";
			    var rout=this.props.routing;
			    var Drawer="md-list";
			}
			 backArrow= "ios-arrow-back";
			 	
		}


        return (
                
                <Navbar
                bgColor = {bgColor}
                user={true}
                image={{
                source: applogo,
                type: 'remote',
                resizeMode: 'contain',
                style: {width: 150, height: 44},
                }}
                left={<Icon
                style={{paddingTop:10}}
                name={backArrow}
                size={32}
                color={ColorIcon}
                onPress={this.navigateTo.bind(this, onback,this.props.type)}/>}
                
                
                right={[{
                        icon: icon,
                        iconColor: ColorIcon,
                        onPress: () => {this.nav(this.props.home)}
                        },{
                        icon: Drawer,
                        iconColor: ColorIcon,
                        onPress: () => {this.context.drawer.open()}
                        }]}
                style = {{height:60}}
                
                />
                
                
                )
    }
}
