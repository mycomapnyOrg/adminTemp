
const React = require('react');
var ReactNative = require('react-native');
const retryImg = require('../images/retry.png')
import ThemeStyles from '../Styles/ThemeStyles';
var {  StyleSheet, NetInfo,Text, View,ScrollView, AsyncStorage,ActivityIndicator, Dimensions,Image,WebView,TouchableOpacity } = ReactNative;
var { Component } = React;
var AlphabetListView = require('react-native-alphabetlistview');
import { List,Row, Grid,ListItem,Card,Button } from 'react-native-elements'
module.exports = class Amigos extends Component {
 constructor(props) {
    super(props);
    this.state = {
    screenType: '',isConnected:'',animating:false,
   contactList : [],
    width:'',amigosDetails:[],
    isVisible:true,types:'Circle',
    resultArray:[],color: "#539DFC",
    size: 50,isModalVisible: false,
    retry:false,resultData:false,
    };
     this._refresh = this._refresh.bind(this);

  }

async componentDidMount(){
    var that = this;
    NetInfo.addEventListener('connectionChange',
                             (isConnected)=> {
                             that.setState({isConnected : isConnected});
                             }
                             )
    
    var companyid = await AsyncStorage.getItem("companyid");
	var url =  await AsyncStorage.getItem("url");
        var initroute = await AsyncStorage.getItem("themerouting");
    var themebgcolor = await AsyncStorage.getItem("themebgcolor");

    this.setState({url:url,initroute:initroute,menuLable:this.props.menuLable,themebgcolor:themebgcolor });
        this.amigosload(companyid);
    
}
    _refresh () {
        this.componentDidMount();
    }


 amigosload(companyid){
    NetInfo.isConnected.fetch().then(isConnected => {

    if(isConnected){
        var _this = this;
	var url =_this.state.url;
    	_this.setState({animating:true,retry:false});
	fetch(url+'manageappajax?type=amigosDetails&customerid='+companyid, {
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
              
				var resultArray = {};
				for(var i=0; i<responseData.length; i++)
				{

				var jsoninnerData = responseData[i];

				var amigosname = jsoninnerData.employeename;
				var amigoscontactno = jsoninnerData.mobileno;

	
				var char = amigosname.charAt(0);
				var firstChar=char.toUpperCase();
				var existingResultFortheChar = '';
					if(resultArray[firstChar]!=null){
					existingResultFortheChar = resultArray[firstChar];
					}
					if(amigosname!=null){
					existingResultFortheChar = existingResultFortheChar+ '        ' +amigosname+'   -   '+amigoscontactno+',';
					}

				var lastResult = [];

				var lastResultArray = existingResultFortheChar.split(",");
					for(var n=0; n<lastResultArray.length; n++ ){
					lastResult.push(lastResultArray[n]);

					}
				resultArray[firstChar] = lastResult;
				}

				var localContactList = [];
				_this.setState({resultArray:resultArray})
				localContactList.push(resultArray);

			_this.setState({
                           amigosDetails:responseData, contactList : localContactList,animating:false
			});
   		}
            else{
                _this.setState({animating:false,resultData:true });
            }
        })
	   .catch((error) => {
			this.setState({retry:true,animating:false,});
		})	
        .done();
        }else{

                this.setState({retry:true,animating:false,});
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


  render() {



var _this=this;
        if(_this.state.retry==true){

            var retry= <View style={{alignSelf:"center",flex:1,paddingTop:10}}>
            <Text style={{color:"#000000"}}>You seem to be offline</Text>
            
            <Button
            raised
            style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}}
            backgroundColor="#EC9B64"
            onPress={()=>this.componentDidMount()}
            title="Go Online"/>
            </View>;
        }
        if(_this.state.resultData==true){

            var resultData=<View style={{alignSelf:"center",padding:15}}>
                <Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No {this.props.menuLable} avaliable</Text>
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
      }else{
          restult=<AlphabetListView
          data={this.state.resultArray}
          cell={Cell}
          cellHeight={30}
          sectionListItem={SectionItem}
          sectionHeader={SectionHeader}
          sectionHeaderHeight={22.5}
          />;
      }
      if(this.state.initroute=='MainMenu'){

			var headerTab= <View style={ThemeStyles.hederBG}>
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
      
    return (
            <View style={ThemeStyles.container}>
           {headerTab}
            {retry}
            {resultData}
            {restult}
       
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0,marginTop:10}}><Text style={{ color: '#000000',
                                   alignSelf:"flex-end",
                                   fontSize:12,paddingRight:5}}>Powered by YokuPro</Text></View>
</View>
    );
  }
}

class SectionHeader extends Component {
 render() {
   var textStyle = {
    textAlign:'center',
     color:'#3d4144',
     fontWeight:'300',
      fontSize: 15,
   };

    var viewStyle = {
      backgroundColor: '#d4d6d8',
     flex: 1,
    };
    return (
            <View style={viewStyle}>
        <Text  style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
            <Text style={{textAlign:'center',color:'#3b5998',fontSize:12}}>{this.props.title}</Text>
    );
  }
}

class Cell extends Component {
  render() {
    return (
            <View style={{height:30,borderColor:'#d4d6d8',borderWidth:0.5}}>
            <Text >{this.props.item}</Text>
      </View>
    );
  }
}


var styles = StyleSheet.create({

   container: {
    flex: 1,
    paddingTop: 20,
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
    fontSize: 23,
alignSelf: 'center',


  },
                               activityIndicator: {
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               height: 80
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
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    margin: 3,
    borderColor: "white"
  }
});




