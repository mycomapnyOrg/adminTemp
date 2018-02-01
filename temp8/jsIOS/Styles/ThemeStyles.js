
const React = require('react-native');

const { StyleSheet, Dimensions,Platform } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
                                   container: {
                                   flex: 1,
                                   backgroundColor: '#f9f9f9',
                                   },
                                   listView:{
                                   flex: 1,
                                   flexDirection: 'row',
                                   borderBottomWidth:0.5,
                                   borderColor:"#d6d7da",
                                   backgroundColor:"#ffffff",
                                   padding:2,
                                   },
 					listViewTheme3:{
                                   flex: 1,
                                   flexDirection: 'row',
                                   borderColor:"#EEEEEE",
				   borderBottomWidth:1,
                                   backgroundColor:"#ffffff",
                                   marginTop:1,
				padding:5,	
                                   },
                                   listViewTheme2:{
                                   borderWidth: 5,
                                   borderColor: '#ffffff',
                                   shadowColor: '#000',
                                   shadowOffset: { width: 0, height: 0 },
                                   shadowOpacity: 1,
                                   shadowRadius: 2,
                                   elevation: 3,
                                   marginLeft: 5,
                                   marginRight: 10,
                                   marginTop: 8,backgroundColor: '#ffffff',flexDirection:'row'
                                   },
				questionadayTheme1: {
				color: '#6c6f70',
				fontSize: 20,
				alignSelf: 'center',


				},
				questionadayTheme3: {
				color: '#606060',
				fontSize: 20,
				alignSelf: 'center',
				...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

				},
                                   questionadayTheme2: {
                                   color: '#606060',
                                   fontSize: 20,
                                   alignSelf: 'flex-start',
                                   }, questionadayTheme22: {
                                   color: '#606060',
                                   fontSize: 20,
                                   alignSelf: 'flex-end',
                                   },

				listViewTheme1:{
                                   flex: 1,
                                   flexDirection: 'row',
                                   borderBottomWidth:1,
                                   borderColor:"#ffffff",
                                   backgroundColor:"#5ea9b5",
                                   padding:5,
                                   borderRadius:3,
				   marginRight:1,
                                   marginLeft:1,
                                   marginTop:1,
                                   },
                                   groupMemberList:{
                                   flexDirection: 'row',
                                   borderBottomWidth:0.5,
                                   borderColor:"#d6d7da",
                                   backgroundColor:"#ffffff",
                                   padding:2,
                                   },
                                   contenttitleView:{
                                   flex: 1,
                                   flexDirection: 'row',
                                   backgroundColor:"#d86c77",
                                   padding:2,
                                   },
				 contenttitleViewTheme1:{
                                   flex: 1,
                                   flexDirection: 'row',
                                   backgroundColor:"#2a393d",
                                   padding:2,
					borderRadius:4,
                                   alignItems:'center'				
                                   },
				contenttitleViewTheme3:{
                                   flex: 1,
                                   flexDirection: 'row',
                                   backgroundColor:"#2a393d",
                                   padding:2,
					borderRadius:4,
                                   alignItems:'center'	,			
                                   },
                                   imageView: {
                                   width: 50,
                                   height: 50
                                   },imageViewTheme1: {
		                        marginTop:5,
		                        marginRight:2,
					backgroundColor:'#42707c',
					borderRadius:50,
					borderWidth: 0.2,
					borderColor: '#fff',
					width: 50,
                                  	height: 50
                                   },
				imageViewTheme3: {
		                        marginTop:5,
		                        marginRight:2,
					backgroundColor:'#000000',
					borderWidth: 0.2,
					borderColor: '#fff',
					width: 50,
                                  	height: 50
                                   },
 				roundTextTheme1:{
					color:'#ffffff',
					fontSize:17,
					alignSelf:'center',
					marginTop:10,	
                                   },
				roundTextTheme3:{
					color:'#ffffff',
					fontSize:19,
					alignSelf:'center',
					marginTop:8,				
					...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),
						
                                   },
                                   resourceimageView: {
                                   width: 60,
                                   height: 50
                                   },
                                   resourceimageView2: {
                                   width: 40,
                                   height: 50
                                   },
                                   wordaday:{
                                   color:"#494340",
                                   fontSize: 15,},
                                   iconImage: {
                                   width: 30,
                                   height: 30,
                                   alignSelf:"center",
                                   marginTop:10
                                   },
 				wordadayTheme1:{
                                   color:"#05404c",
                                   fontSize: 15,

					},
				wordadayTheme3:{
                                   color:"#7f7c7c",
                                   fontSize: 17,
	                           ...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },wordadayTheme22:{
                                   color:"#7f7c7c",
                                   fontSize: 17,
                                   
                                   },
                                   wordadayTheme2:{
                                   color:"#7f7c7c",
                                   fontSize: 17,alignSelf:'flex-end'
                                                                    },
				 iconImageTheme1: {
                                   width: 30,
                                   height: 30,
                                   alignSelf:"center",
                                   marginTop:18
                                   }, iconImageTheme3: {
                                   width: 43,
                                   height: 40,
                                   alignSelf:"center",
                                   marginTop:6
                                   },
                                   nuggiconImage: {
                                   width: 30,
                                   height: 30,
                                   alignSelf:"center",
                                   marginTop:5,
                                   marginBottom:5
                                   },
                                   centerText:{
                                   marginTop:5,
                                   alignItems:'center'
                                   },
                                   contenttitle:{
                                   color:'#FFFFFF',
                                   fontSize:20,
                                   paddingLeft:15,
                                   alignSelf:"center"
                                   },
				 contenttitleTheme1:{
                                   color:'#FFFFFF',
                                   fontSize:20,
					marginTop:5,
					marginBottom:5
                                   },
				contenttitleTheme3:{
					color:'#FFFFFF',
					fontSize:21,
					marginTop:5,
					marginBottom:5,			
					...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },
                                   contenttitleTheme2:{
                                   color:'gray',alignSelf:'center',
                                   fontSize:25,marginLeft:5,marginRight:5
                                   
                                   
                                   },
                                   batchname:{
                                   color:'#000000',
                                   fontSize:15,
                                   },
				batchnameTheme1:{
                                   color:'#ffffff',
                                   fontSize:17,
                                   },
				batchnameTheme3:{
                                   color:'#606060',
                                   fontSize:17,	
			...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },
                                   batchnameTheme2:{
                                   color:'gray',
                                   fontSize:18,
                                   ...Platform.select({
                                                      
                                                      android: {
                                                      fontFamily: 'OpenSans-SemiBoldItalic'      },
                                                      }),
                                   
                                   },
                                   groupMembernumber:{
                                   color:'#000000',
                                   fontSize:15,
                                   },
				groupMembernumberTheme1:{
                                   color:'#2a4b51',
                                   fontSize:14,
                                   },
                                   programname:{
                                   color:'red',
                                   fontSize:13
                                   },
				 programnameTheme1:{
                                   color:'#2a4b51',
                                   fontSize:14
                                   },
				programnameTheme3:{
                                   color:'#7f7c7c',
                                   fontSize:14,
				...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },
                                   programnameTheme2:{
                                   color:'#7f7c7c',
                                   fontSize:14,
                                   },  groupMembername:{
                                   color:'red',
                                   fontSize:13,marginTop:20
                                   },
  				groupMembernameTheme1:{
                                   color:'#ffffff',
                                   fontSize:15,
				   marginTop:15
                                   },
                                   sessionname:{
                                   color:'green',
                                   fontSize:13
                                   },sessionnameTheme1:{
                                   color:'#2a4b51',
                                   fontSize:13
                                   },backgroundVideo: {
                                   position: 'absolute',
                                   top: 0,
                                   left: 0,
                                   bottom: 0,
                                   right: 0,
                                   borderRadius:6,
                                   },
                                   programdate:{
                                   color:'#000000',
                                   fontSize:14,
                                   },
 				programdateTheme1:{
                                   color:'#2a4b51',
                                   fontSize:15,
                                   },
				programdateTheme3:{
                                   color:'#adabab',
                                   fontSize:13,
				...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },programdateTheme2:{
                                   color:'gray',
                                   fontSize:14,
                                   
                                   },
                                   filename:{
                                   flex:1,
                                   color:'#000000',
                                   fontSize:14,flexWrap: 'wrap'
                                   },filenameTheme1:{
                                   flex:1,
                                   color:'#ffffff',
                                   fontSize:14,flexWrap: 'wrap'
                                   },
                                   countView:{
                                   flex:1,
                                   alignItems:'flex-end'
                                   ,marginTop:13,
                                   padding:5,
                                   marginRight:5
                                   },
                                   date:{
                                   color:"#5087C8",fontSize: 12,alignSelf:"flex-end"
                                   },
                                   dateIcon:{
                                   color: '#5087C8',alignSelf:"flex-end",fontSize:12,paddingBottom:12
                                   },
				 dateTheme1:{
                                   color:"#05404c",fontSize: 12,
					alignSelf:"flex-end"
                                   },dateTheme3:{
                                  	color:"#adabab",
					fontSize: 12,
					alignSelf:"flex-start",
				...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },
                                   dateTheme2:{
                                  	color:"#adabab",
                                   fontSize: 12,
                                   alignSelf:"flex-end",
                                   
                                   },
                                   dateTheme22:{
                                  	color:"#adabab",
                                   fontSize: 12,
                                   alignSelf:"flex-start",
                                   
                                   },
                                   dateIconTheme1:{
                                   color: '#05404c',alignSelf:"flex-end",fontSize:12,paddingBottom:12
                                   },
				headerIconTheme3: {
				width: 70,
				height: 70,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: '#ffffff'
				},
				 dateIconTheme3:{
                                   color: '#7f7c7c',alignSelf:"flex-end",fontSize:12,paddingBottom:12,				
				   ...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },
 				listItemTitleTheme3:{
                                   color: '#fcfcfc',fontSize:18,			
				   ...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },
                                   listItemTitleTheme2:{
                                   color: 'gray',fontSize:18,
                                   },
                                   status:{
                                   backgroundColor:'#6242f4'
                                   },
				statusTheme1:{
                                   backgroundColor:'#05404c'
                                   },
				statusTheme3:{
                                   backgroundColor:'#67B0D6'
                                   },
                                   statusColor:{
                                   color:'#ffffff',
                                   },
                                   statusTheme2:{
                                   backgroundColor:'#ffffff'
                                   },
                                   statusColor2:{
                                   color:'#ffffff',
                                   },
                                   hederBG:{
                                   backgroundColor:'#e3ebfc',
                                   padding:12
                                   },
				hederBGTheme1:{
                                   backgroundColor:'#b1d6dd',
                                   padding:12
                                   },hederBGTheme3:{
                                   backgroundColor:'#67B0D6',
				borderColor: '#ddd',
				shadowColor: '#000',
				shadowRadius: 20,
				elevation: 15,
                                   padding:5
                                   },
                                   Myresources:{
                                   color: '#5087C8',
                                   fontSize: 13,
                                   alignSelf: 'flex-end',
                                   },
                                   titleText:{
                                   color: '#3b5998',
                                   fontSize: 23,
                                   alignSelf: 'center',
                                   },
 				 titleTextTheme1:{
                                   color: '#05404c',
                                   fontSize: 23,
                                   alignSelf: 'center',
                                   },titleTextTheme2:{
                                   color: 'gray',
                                   fontSize: 23,
                                   alignSelf: 'center',
                                   }, titleTextTheme3:{
                                   color: '#ffffff',
                                   fontSize: 20,
                                   alignSelf: 'center',
				...Platform.select({
    
      android: {
fontFamily: 'sans-serif-condensed'      },
    }),

                                   },
                                   activityIndicator: {
                                   flex: 1,
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   height: 250
                                   },
                                   resourceViewText:{
                                   color:"#6BCAE2",
                                   flexDirection:"row"
                                   },
				resourceViewTextTheme1:{
                                   color:"#0d252b",
                                   flexDirection:"row"
                                   },
                                   extension:{
                                   fontSize:10,
                                   color:"#000000"
                                   },extensionTheme1:{
                                   fontSize:10,
                                   color:"#ffffff"
                                   },
 				cardStyleTheme1:{
                                   marginRight:15,
                                   marginLeft:15,
                                   marginTop:15,
                                   paddingTop:10,
                                   paddingBottom:10,
                                   backgroundColor:'#efefef',
                                   borderRadius:3,
                                   borderWidth: 1,
                                   borderColor: '#d7dbe5'

                                   },
                                   cardStyleTheme22:{
                                   marginRight:15,
                                   marginLeft:15,
                                   marginTop:15,
                                   paddingTop:10,
                                   paddingBottom:10,
                                   backgroundColor:'#ffffff',
                                   borderRadius:3,
                                   borderWidth: 1,
                                   borderColor: '#d7dbe5'
                                   
                                   },
				cardStyleTheme3:{
                                   marginRight:15,
                                   marginLeft:15,
                                   marginTop:15,
                                   paddingBottom:10,
                                   backgroundColor:'#ffffff',
                                   borderRadius:3,
                                   borderWidth: 0.2,
                                   borderColor: '#ffffff',
					shadowColor: '#000000',
					shadowRadius: 10,
					elevation: 2,

                                   },
                                   cardStyleTheme2:{
                                   marginRight:15,
                                   marginLeft:15,
                                   marginTop:15,
                                   paddingBottom:10,
                                   backgroundColor:'#ffffff',
                                   borderBottomRightRadius:20,
                                   borderBottomWidth: 0.2,
                                   borderColor: '#ffffff',
                                   shadowColor: '#000000',
                                   shadowRadius: 10,
                                   elevation: 2,
                                   
                                   },
                                   cardStyle:{
                                   marginRight:15,
                                   marginLeft:15,
                                   marginTop:15,
                                   paddingTop:10,
                                   paddingBottom:10,
                                   backgroundColor:'#ffffff',
                                   borderRadius:3,
                                   borderWidth: 1,
                                   borderColor: '#d7dbe5'

                                   }
                                   });








