import React, { Component, PropTypes } from 'react';

import {
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,Plaform,
  TouchableOpacity,
  StyleSheet,AsyncStorage,Alert
} from 'react-native';
import ThemeStyles from '../Styles/ThemeStyles';
import Icon from 'react-native-vector-icons/Ionicons';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.state={route: 0,customername:''}
    this.navigateTo = this.navigateTo.bind(this);

  }   
	async componentDidMount(){
        
	var customername = await AsyncStorage.getItem("employeename");
	var imagepath = await AsyncStorage.getItem("imagepath");
	var  themebgcolor=await AsyncStorage.getItem("themebgcolor");
	var  mainMenuArray=JSON.parse(await AsyncStorage.getItem("mainMenuArray"));
        var initroute = await AsyncStorage.getItem("themerouting");

        if(Plaform=="ios"){
            var path="https://yokupro.com/"+imagepath;
        }
        else{
            var path="http://yokupro.com/"+imagepath;
        }
        this.setState({customername : customername,imagepath:path,themebgcolor:themebgcolor,mainMenuArray:mainMenuArray,initroute:initroute})
        
    }

  async navigateTo(index,type,color,menuLable) {
      var applogo = await AsyncStorage.getItem("applogo");
      if(index=="Logout"){
          
          Alert.alert('YokuPro', 'Do you wish to logout? ',  [
                                                                { text: 'Ok',onPress: this.navigateTo.bind(this,'Login') },
                                                                {text: 'Cancel', onPress: this.noPressed, style: 'cancel'},
                                                                ]);
      }
      else{
          
         this.props.navigate(index,type,color,menuLable,applogo);
      }

      
    
  }

  render() {
      
      if(this.props.bgcolor==undefined){
          var top='#1E88E5';
          var bottom='#64BFFF';
      }else{
          top=this.props.bgcolor;
          bottom=this.props.bgcolor;

      }
      var _this=this;
      if(_this.state.mainMenuArray!="" && _this.state.mainMenuArray!=undefined){
		var imageurl="http://yokupro.com/";
		var themebgcolor=this.props.bgcolor;
		var microAppList = _this.state.mainMenuArray.map((MenuArray, index) => {
		var newurl= imageurl+MenuArray.filename;
		if(MenuArray.menuurl=='Resources' || MenuArray.menuurl=='Evaluate' ||MenuArray.menuurl=='Amigos'||MenuArray.menuurl=='Synopsis'){
		var Menutype='ProgramDetails';
		}else{
		Menutype=MenuArray.menuurl;
		}
		if(_this.state.initroute=='Theme1'){
		return (
		<View>
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this,Menutype,MenuArray.menuurl,themebgcolor,MenuArray.menu)}
		>
		<Image style={{width:25,height:25}}  source={{uri:newurl }} />
		<Text style={styles.listItemTitle}> {MenuArray.menu}</Text>

		</TouchableOpacity>
		</View>
		)

		}else if(_this.state.initroute=='Theme2'){
		return (
		<View>
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this,Menutype,MenuArray.menuurl,themebgcolor,MenuArray.menu)}
		>
		<Image style={{width:25,height:25}} resizeMode={"contain"} source={{uri:newurl }} />
		<Text style={ThemeStyles.listItemTitleTheme2}> {MenuArray.menu}</Text>

		</TouchableOpacity>
		</View>
		)

		
                                                         }else if(_this.state.initroute=='Theme3'){
                                                         return (
                                                                 <View>
                                                                 <TouchableOpacity
                                                                 style={styles.listItem}
                                                                 onPress={this.navigateTo.bind(this,Menutype,MenuArray.menuurl,themebgcolor,MenuArray.menu)}
                                                                 >
                                                                 <Image style={{width:25,height:25}}  source={{uri:newurl }} />
                                                                 <Text style={ThemeStyles.listItemTitleTheme3}> {MenuArray.menu}</Text>
                                                                 
                                                                 </TouchableOpacity>
                                                                 </View>
                                                                 )
                                                         
                                                         
                                                         }
		else{
		return (
		<View>
		<TouchableOpacity
		style={styles.listItem}
		onPress={this.navigateTo.bind(this,Menutype,MenuArray.menuurl,themebgcolor,MenuArray.menu)}
		>
		<Image style={{width:25,height:25}}  source={{uri:newurl }} />
		<Text style={styles.listItemTitle}> {MenuArray.menu}</Text>

		</TouchableOpacity>
		</View>
		)
		}
      });
      }     
	if(_this.state.initroute=='Theme1'){
		var version=<View>
			<Text style={styles.listItemTitle}>v10.25</Text>
		</View>;

		var Drawer =  <View style={{ flex: 1,padding: 16,backgroundColor: top,borderBottomColor:'#FFFFFF', borderWidth: 0.5, }} key={0}>
          <View style={styles.headerIcon} key={0}>
		<Image resizeMode={"contain"}   style={{width:50,height:50}} source={{uri:this.state.imagepath}}/>	
          </View>
          <View style={styles.headerInfo} key={1}>
		  <Text style={styles.headerEmail} key={1}>{this.state.customername}</Text>        
          
          </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, this.state.initroute)} >
        <Icon name='md-apps' size={25} style={{color:'#ffffff',marginRight:5}} />
        <Text style={ThemeStyles.listItemTitleTheme2}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, 'Logout')} >
        <Icon name='ios-log-out' size={25} style={{color:'#ffffff',marginLeft:10,marginRight:5}} />
        <Text style={ThemeStyles.listItemTitleTheme2}>Logout</Text>
        </TouchableOpacity>
        </View>
        </View>;
	
	}else if(_this.state.initroute=='Theme2'){
		version=<View>
			<Text style={ThemeStyles.listItemTitleTheme3}>v10.25</Text>
		</View>;
		 Drawer= <View style={{ flex: 1,padding: 16,backgroundColor: top,borderBottomColor:'#FFFFFF', borderBottomWidth: 1,  }} key={0}>
          <View>
        <Image style={{width:70,height:70}} resizeMode={"contain"}  source={{uri:this.state.imagepath}}/>
          </View>
          <View style={styles.headerInfo} key={1}>
		  <Text style={ThemeStyles.listItemTitleTheme2} key={1}>{this.state.customername}</Text>
          </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, this.state.initroute)} >
        <Icon name='md-apps' size={25} style={{color:'#ffffff',marginRight:5}} />
                <Text style={ThemeStyles.listItemTitleTheme2}>Home</Text>
        </TouchableOpacity>
         <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, 'Logout')} >
            <Icon name='md-log-out' size={25} style={{color:'#ffffff',marginLeft:10,marginRight:5}} />
                <Text style={ThemeStyles.listItemTitleTheme2}>Logout</Text>
        </TouchableOpacity>
        </View>
                </View>;
    }else if(_this.state.initroute=='Theme3'){
        version=<View>
        <Text style={ThemeStyles.listItemTitleTheme3}>v10.25</Text>
        </View>;
        Drawer= <View style={{ flex: 1,padding: 16,backgroundColor: top,borderBottomColor:'#FFFFFF', borderBottomWidth: 1,  }} key={0}>
        <View>
        <Image resizeMode={"contain"}   style={{width:70,height:70}} source={{uri:this.state.imagepath}}/>
        </View>
        <View style={styles.headerInfo} key={1}>
        <Text style={ThemeStyles.listItemTitleTheme3} key={1}>{this.state.customername}</Text>
        
        </View>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, this.state.initroute)} >
        <Icon name='ios-grid' size={25} style={{color:'#ffffff',marginRight:5}} />
        <Text style={ThemeStyles.listItemTitleTheme3}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, 'Logout')} >
        <Icon name='md-log-out' size={25} style={{color:'#ffffff',marginLeft:10,marginRight:5}} />
        <Text style={ThemeStyles.listItemTitleTheme3}>Logout</Text>
        </TouchableOpacity>
        </View>
        
        </View>;
    }

	else{
		version=<View>
			<Text style={styles.listItemTitle}>v10.25</Text>
		</View>;
		Drawer =  <View style={{ flex: 1,padding: 16,backgroundColor: top,borderBottomColor:'#FFFFFF', borderWidth: 0.5, }} key={0}>
		  <View style={styles.headerIcon} key={0}>
			<Image style={{width:50,height:50}} source={{uri:this.state.imagepath}}/>	
		  </View>
		  <View style={styles.headerInfo} key={1}>
			  <Text style={styles.headerEmail} key={1}>{this.state.customername}</Text>        
		  
		  </View>
        
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, this.state.initroute)} >
        <Icon name='md-home' size={20} style={{color:'#ffffff',marginRight:5}} />
        <Text style={styles.listItemTitle}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={this.navigateTo.bind(this, 'Logout')} >
        <Icon name='md-log-out' size={20} style={{color:'#ffffff',marginLeft:10,marginRight:5}} />
        <Text style={styles.listItemTitle}>Logout</Text>
        </TouchableOpacity>
        </View>
		</View>;
	
	}
      
    return(
      <View style={styles.drawer}>

     {Drawer}
           
           <View style={{flex: 3,
           padding: 16,
           backgroundColor: bottom}} key={1}>
           <ScrollView>
           {microAppList}		
           </ScrollView>
		{version}
        </View>
      </View>
    );
  }
}

DrawerMenu.propTypes = {
  navigate: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
  },
  header: {
    height: 150,
    flex: 1,
    padding: 16,
    backgroundColor: '#1E88E5'
  },
  content: {
    flex: 3,
    padding: 16,
    backgroundColor: '#64BFFF'
  },
  headerInfo: {
    height: 40
  },
  headerIcon: {
    width: 70,
    height: 70,
    borderRadius: 55,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3'
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20
  },
  headerEmail: {
    color: '#fff',
    fontSize: 18
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 30,
    marginBottom: 10,
  },
  listItemTitle: {
    fontSize: 15,
    flexShrink: 1,
    color: '#fff'
  },
  listItemImage: {
    width: 80,
    height: 80,
    borderRadius: 7,
    marginRight: 10,
  }
});

export default DrawerMenu;
