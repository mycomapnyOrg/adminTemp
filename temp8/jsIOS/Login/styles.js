
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FBFAFA',
  },
  shadow: {
    flex: 1,
    width: null,
    height: null,
  },
  bg: {

    marginTop: deviceHeight / 2.1,
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 30,
    bottom: 0,
  },
  input: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
	borderColor: '#4253f4',
	shadowColor: 'blue',
	backgroundColor: '#FBFAFA',
  },
		
  btn: {
    marginTop: 20,
    alignSelf: 'center',
	width: 100,	
  },
                                   cardStyle:{
                                   marginRight:15,
                                   marginLeft:15,
                                   paddingTop:20,
                                   paddingBottom:20,
                                   backgroundColor:'#ffffff',
                                   borderRadius:4,
                                   borderWidth: 1,
                                   borderColor: '#e3e5e8',
                                   shadowColor: '#000',
                                   shadowOffset: { width: 0, height: 2 },
                                   shadowOpacity: 0.8,
                                   shadowRadius: 2,
                                   elevation: 1,
                                   
                                   },Password:{
                                   width:deviceWidth/1.25,
                                   marginRight:5,
                                   },
                                   icons:{
                                   color: '#5087C8',
                                   alignSelf:"flex-end",
                                   fontSize:20,
                                   paddingBottom:20,
                                   }
});
