const React = require('react');
var ReactNative = require('react-native');
import Modal from 'react-native-modal'
import ThemeStyles from '../Styles/ThemeStyles';
import  Rating from 'react-native-easy-rating'
var { AppRegistry, StyleSheet, Image,Text,AsyncStorage,Animated, ScrollView,Alert,ToolbarAndroid, ListView, View,NetInfo, TouchableHighlight,Dimensions,TouchableOpacity,ActivityIndicator } = ReactNative;
var { Component } = React;
import { List, ListItem,Card,Button,Grid,Row,FormInput,Badge } from 'react-native-elements'
import Message from 'react-native-animated-message';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
var radio_props = [
                   {label: 'Yes', value: 2 },
                   {label: 'No', value: 1 }
                   ];
var {height, width} = Dimensions.get('window');
import SelectMultiple from 'react-native-select-multiple';
module.exports = class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
        checkvar:0,contentdata:[],ratingArray:[], isVisible: true,
        color: "#53FF3B",types:'Circle', size: 70,height:'', width:'', screenType : '',empid:'',QuestionArray:[],isModalVisible: false,resultData:false,showval:'',ratingWidth:0,RatingValue:'', size: 50,employeeName:"",isRatingModalVisible:false,Questiontype:'',QuestionId:"",programid:'',resultPreData:false,PostQuestionArray:[],ischeckBox:false,optionArray:[], selectedFruits: [],fruits:[],tab:1,postStatus:false,retry:false,typeofquestion:'',value:'',preQuestion:true,StatusArray:[],RadioQuestion:true,ChechQuestion:true,SurveyQuestion:true,surveyValue:[],PostRadioQuestions:true,PostCheckQuestions:true,PostSurveyQuestions:true,PreScore:false,PostScore:false,nextstatus:true,submitstatus:false,preAnswerStatus:true,postanswerStatus:true,submitvalue:'Submit',animating:true,animatingpost:false,buttonstatus:true,postQuestionStatus:'',proceedstatus:'',nextsatusmaintain:true,resultPostData:true,overall:"true",AnswerServey:[],stateindex:"",surveystatus:[],surveytype:'',perpagequstion:'',questionidsurvey:[],perpagetitle:[],pagetype:'',pagetitlecount:'',postrunscore:'no',menuLable:this.props.menuLable
        };
    }
    
    async componentDidMount(){
        await AsyncStorage.setItem("ProgramExit","No");
        
        var empid = await AsyncStorage.getItem("empid");
        var companyid = await AsyncStorage.getItem("companyid");
        var overall = await AsyncStorage.getItem("overall");
        var themebgcolor = await AsyncStorage.getItem("themebgcolor");
        if(overall=="false"){
            this.setState({ overall:overall,animating:true});
            
        }
       	var initroute = await AsyncStorage.getItem("themerouting");
        var url =  await AsyncStorage.getItem("url");
        var _this=this;
        NetInfo.addEventListener('connectionChange',
                                 (isConnected)=> {
                                 _this.setState({isConnected : isConnected});
                                 }
                                 )
        var programid=await AsyncStorage.getItem("programid");
        _this.setState({ empid:empid,programid:programid,url:url,initroute:initroute,themebgcolor:themebgcolor,submitvalue:'Submit',StatusArray:[]});
        _this.preProgramFunction(companyid,programid,empid,url);
    }
    preProgramFunction(companyid,programid,empid,url)
    {
        
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         var _this=this;
                                         _this.setState({isVisible:true })
                                         fetch(url+'manageappajax?type=PreProgEvalupdateLeteast&companyid='+companyid+'&programid='+programid+'&empid='+empid, {
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
                                               this.state.perpagequstion=responseData[0].surveyoptionpre;
                                               _this.setState({
                                                              QuestionArray:responseData,isVisible:false,retry:false,animating:false,proceedstatus:true
                                                              });
                                               }else{
                                               _this.setState({
                                                              isVisible:false,resultPreData:true,retry:false,animating:false
                                                              });
                                               }
                                               if(responseData[0].Score==undefined){
                                               _this.setState({
                                                              tab:0,postStatus:false,animating:false
                                                              });
                                               }
                                               else if(responseData[0].Score!=undefined && responseData[0].poststatus==0){
                                               
                                               _this.setState({
                                                              PreScore:true,animating:false,proceedstatus:true
                                                              });
                                               
                                               }
                                               
                                               else if(responseData[0].poststatus==1 && responseData[0].MaintainStatus==null ){
                                               _this.setState({
                                                              
                                                              PreScore:true,animating:true,buttonstatus:false,proceedstatus:true
                                                              
                                                              });
                                               _this.nextQestions();
                                               }
                                               else if(responseData[0].poststatus==1 && responseData[0].MaintainStatus==1 ){
                                               _this.setState({
                                                              
                                                              PreScore:true,animating:true,buttonstatus:false,proceedstatus:false,postrunscore:'yes'
                                                              
                                                              });
                                               _this.nextQestions();
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
    postProgramFunction(companyid,programid,empid,url)
    {
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         
                                         var _this=this;
                                         _this.setState({isVisible:true })
                                         fetch(url+'manageappajax?type=PostProgEvalupdateLeteast&companyid='+companyid+'&programid='+programid+'&empid='+empid, {
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
                                               this.state.perpagequstion=responseData[0].surveyoptionpost;
                                               _this.setState({
                                                              PostQuestionArray:responseData,isVisible:false,retry:false,animatingpost:false,postStatus:true
                                                              });
                                               if(responseData[0].Score!="" && responseData[0].Score!=undefined){
                                               _this.setState({
                                                              PostScore:true,animatingpost:false,postStatus:true,overall:"true"
                                                              });
                                               
                                               this.onValueChange();
                                               }
                                               }else{
                                               if(this.state.postStatus==true){
                                               _this.setState({
                                                              isVisible:false,resultPostData:false,PostScore:true,	animatingpost:false
                                                              });
                                               }
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
    
    
    
    async handleLayoutChange(event:Event){
        
        var width = Dimensions.get('window').width;
        var height = Dimensions.get('window').height;
        if(width>height){
            
            await this.setState({screenType: 'Landscape', height : height,width : width,buttonWidth:width/1.6});
            
        } else {
            
            await this.setState({screenType: 'Portrait', height : height,width : width,headerimagewidth:width/3 ,headerimageheight:height/18,paddingBody:width/7,eventHeight:width/11,modalBody:width/2,MessageWidth:width/1.8,buttonWidth:width/1.6,massageTop:width/5});
        }
        
    };
    
    
    
    onSelectionsChange = (selectedFruits) => {
        this.setState({ selectedFruits,StatusArray:[] })
    }
    
    async nextQestions()
    {
        var postsatusquestion = await AsyncStorage.getItem("postsatusquestion");
        if(this.state.postrunscore=='yes')
        {
            AsyncStorage.setItem("PostStatusMainTainExam","Yes");
            var empid = await AsyncStorage.getItem("empid");
            var companyid = await AsyncStorage.getItem("companyid");
            var _this=this;
            var programid=await AsyncStorage.getItem("programid");
            var url =  await AsyncStorage.getItem("url");
            _this.setState({ proceedstatus:false,animatingpost:true,postStatus:true });
            _this.postProgramFunction(companyid,programid,empid,url);
            
        }
        if(postsatusquestion=='yes')
        {
            AsyncStorage.setItem("PostStatusMainTainExam","Yes");
            var empid = await AsyncStorage.getItem("empid");
            var companyid = await AsyncStorage.getItem("companyid");
            var url =  await AsyncStorage.getItem("url");
            var _this=this;
            var programid=await AsyncStorage.getItem("programid");
            _this.setState({ proceedstatus:false,animatingpost:true,postStatus:true });
            _this.postProgramFunction(companyid,programid,empid,url);
            
        }
    }
    async statuspostQuestions()
    {
        AsyncStorage.setItem("overall","false");
        AsyncStorage.setItem("postsatusquestion","yes");
        var empid = await AsyncStorage.getItem("empid");
        var companyid = await AsyncStorage.getItem("companyid");
        var _this=this;
        var programid=await AsyncStorage.getItem("programid");
            var url =  await AsyncStorage.getItem("url");
        _this.setState({ proceedstatus:false,animatingpost:true,postStatus:true,overall:false });
        _this.postProgramFunction(companyid,programid,empid,url);
        
    }
    check(Answer,indexvalue){
       // alert(Answer);
        this.state.AnswerServey[indexvalue]=Answer;
        
    }
    async submitRating(type,id,Questiontype,status){
        if(status=='Continue')
        {
             this.navigate('Evaluate');
        }
        else
        {
            var answer=null;
            var QuestionId=id;
            var empid = await AsyncStorage.getItem("empid");
            var companyid = await AsyncStorage.getItem("companyid");
            var Questiontype=Questiontype;
            var programid=this.state.programid;
            
            if(type=='radio'){
                if(this.state.value==2){
                    answer='Yes';
                }else if(this.state.value==1){
                    answer='No';
                }
            }
            else if(type=='checkbox'){
                answer="";
                ans=this.state.selectedFruits
                for (var i in ans) {
                    answer += ans[i].value+',';
                }
                answer = answer.replace(/,\s*$/, "");
            }
            else{
                //alert(this.state.AnswerServey[3]);
                answer=this.state.AnswerServey;
                QuestionId=this.state.questionidsurvey;
                //alert(QuestionId);
                for(var j=0;j<=this.state.stateindex;j++)
                {
                    if(this.state.AnswerServey[j]==undefined)
                    {
                        Alert.alert('YokuPro','Please Answered All Questions ',  [
                                                                                  
                                                                                  {text: 'Ok', onPress: ()=>this.noPressed, style: 'cancel'},
                                                                                  ]);
                        return false;
                    }
                }
            }
            var url =this.state.url;
            var type=type;
            
            fetch(url+'manageappajax?type=submitPreAndPostAnswerupdate&QuestionId='+QuestionId+'&answer='+answer+'&empid='+empid+'&companyid='+companyid+'&Questiontype='+Questiontype+'&programid='+programid+'&typeOfQuestion='+type, {
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
                  this.setState({
                                StatusArray:responseData
                                });
                  }
                  
                  });
            if(Questiontype=='post')
            {
                this.setState({ preAnswerStatus:true,postanswerStatus:false });
            }
            else{
                this.setState({ preAnswerStatus:false,postanswerStatus:true });
            }
            this.setState({ preQuestion:true,value:'',Questionpage:false });
        }
    }
    
    navigate(route){
        
        var routeNma='Evaluate';
        this.props.navigator.push({
                                  name: route,
                                  passProps: {
                                  programid:this.state.programid,
                                  routName:routeNma,
                                  menuLable:this.state.menuLable,
                                  themebgcolor:this.state.themebgcolor
                                  }
                                  })
    }
    
    
    
    naviga(competencyid,route){
        var _this=this;
        this.props.navigator.push({
                                  name: route,
                                  passProps: {
                                  competencyid:competencyid,
                                  programid:_this.state.programid
                                  }
                                  })
    }
    
    async onValueChange() {
        var _this = this;
        var url=this.state.url;
        var empid=this.state.empid;
        var companyid=this.state.companyid;
        this.setState({rating:0 });
        
        fetch(url+'manageappajax?type=programFeedBackList&companyid='+companyid+'&empid='+empid+'&rateType=evaluation&programid='+_this.state.programid, {
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
               this.setState({retry:false});
               })
        .done();
        
        
    }
    async onTraineeRating(){
        NetInfo.isConnected.fetch().then(isConnected => {
                                         if(isConnected){
                                         var _this = this;
                                         _this.setState({feedloading:false});
                                         var empid = _this.state.empid;
                                         var programid=_this.state.programid;
                                         var companyid = _this.state.companyid;
                                         var rating = _this.state.rating;
                                         var url =_this.state.url;
                                         if(rating==''){
                                         _this.setState({errorMsg:"Please select a Rating.",isVisible:false});
                                         return false;
                                         }
                                         else{
                                         _this.setState({errorMsg:"",isVisible:false});
                                         
                                         fetch(url+'manageappajax?type=programFeedBack&companyid='+companyid+'&empid='+empid+'&rating='+rating+'&programId='+programid, {
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
                                               
                                               //alert(JSON.stringify(responseData));
                                               if(responseData!=""){
                                               if(responseData[0].msg=='success')
                                               {
                                               _this.setState({
                                                              Ratingcolor:"#63c655",sucessMsg:true,description:'',errorMsg:"Feedback submitted",feedloading:true,UpdateMsg:false
                                                              });
                                               }
                                               if(responseData[0].msg=='Updated'){
                                               _this.setState({
                                                              feeErrMsg:false,UpdateMsg:true,description:'',errorMsg:"Feedback Updated",feedloading:true,sucessMsg:false
                                                              });
                                               }
                                               }else{
                                               
                                               }
                                               // this.onValueChange();
                                               
                                               })
                                         .catch((error) => {
                                                this.setState({retry:false,feedloading:true});
                                                })
                                         .done();
                                         }
                                         
                                         }else{
                                         this.setState({retry:false,feedloading:true});
                                         }
                                         })
        
    }
    statusRadio(value)
    {
        this.setState({value:value,StatusArray:[]});
        
    }
    
    
    render() {
        
        
        if(this.state.resultPreData==true){
            
            var resultpreData=<View style={{alignSelf:"center",padding:15}}>
            <Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Pre-evaluation Questions available</Text>
            </View>;
        }
        
        if(this.state.resultPostData==false){
            
            var resultpostData=<View style={{alignSelf:"center",padding:15}}>
            <Text style={{color: '#4B87C8' , fontWeight:'bold'}}>No Post-evaluation Questions available</Text>
            </View>;
        }
        
        var survey=<Text></Text>;
        var option=<Text></Text>;
        var heading=<Text></Text>;
        var TextScore=<Text></Text>;
        var total=<Text></Text>;
        var Nextcheck=<Text></Text>;
        var TextStatus=<Text></Text>;
        var nextpost=<Text></Text>;
        var QuestionStatus=<Text></Text>;
        var qustionnum=0;
        var titleindex=0;
        var perpagetitle=<Text></Text>;
        var Question = this.state.QuestionArray.map((QuestionArray, index) => {
                                                    //alert(this.state.QuestionArray[0].pagetitlecount);
                                                    if(QuestionArray.programname!='' && QuestionArray.programname!=null){
                                                    heading=<View style={{backgroundColor:'#a4db51'}}>
                                                    <Text style={styles.titleViewText}><Text style={{fontWeight: 'bold' ,color: 'black', fontSize:16 ,marginLeft:25, alignSelf:"center"}}> {QuestionArray.programname}  -  Pre Program Evaluation</Text></Text>
                                                    </View>;
                                                    }
                                                    if(QuestionArray.Score=="" || QuestionArray.Score==undefined ){
                                                    if(QuestionArray.typeofquestion=='survey'){
                                                    this.state.pagetype=QuestionArray.typeofquestion;
                                                    survey=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:13 }}><Text>{this.state.QuestionArray[0].ansCount}/{this.state.QuestionArray[0].pagecount}</Text> </Text>;
                                                    TextScore=<Text></Text>;
                                                    //titleindex=this.state.QuestionArray[0].ansCount-1;
                                                    //alert(titleindex);
                                                    /* if(this.state.QuestionArray[titleindex].pagetitle==undefined)
                                                     {
                                                     this.state.QuestionArray[titleindex].pagetitle=" ";
                                                     }*/
                                                    }
                                                    if(QuestionArray.typeofquestion=='checkbox' || QuestionArray.typeofquestion=='radio'){
                                                    survey=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:13}}><Text>{this.state.QuestionArray[0].ansCount}/{this.state.QuestionArray[0].Totalcount}</Text> </Text>;
                                                    TextScore=<Text></Text>;
                                                    }
                                                    
                                                    if(QuestionArray.questions!='')
                                                    {
                                                    AsyncStorage.setItem("Typeofprogarm","pre");
                                                    AsyncStorage.setItem("ProgramExit","Yes");
                                                    }
                                                    
                                                    
                                                    
                                                    
                                                    if(QuestionArray.questionStatus=="Answered"){
                                                    QuestionStatus=<Text style={{color:'#265299',fontWeight: 'bold',fontSize:13 }}>{QuestionArray.questionStatus}</Text>;
                                                    }
                                                    else{
                                                    
                                                    QuestionStatus=<View style={{height: 30,width: 100,marginTop:5}}><TouchableOpacity style={styles.fullWidthButton} onPress={() =>this.answerFunction(QuestionArray.questionid,'pre',QuestionArray.typeofquestion)} >
                                                    <Text style={styles.fullWidthButtonText}>Click to Answer</Text>
                                                    </TouchableOpacity></View>;
                                                    
                                                    }
                                                    if(QuestionArray.typeofquestion!='survey' || this.state.perpagequstion==null || this.state.perpagequstion=="" || this.state.perpagequstion==undefined )
                                                    {
                                                    this.state.perpagequstion=1;
                                                    }
                                                    if(QuestionArray.questions!='')
                                                    {
                                                    if(index<this.state.perpagequstion)
                                                    {
                                                    qustionnum++;
                                                    if(QuestionArray.typeofquestion=='survey')
                                                    {
                                                    if(this.state.QuestionArray[0].pagetitlecount==0 || this.state.QuestionArray[0].pagetitlecount=="" || this.state.QuestionArray[0].pagetitlecount==null || this.state.QuestionArray[0].pagetitlecount==undefined)
                                                    {
                                                    perpagetitle=<Text style={{color:'#2494F2',marginLeft:20 ,fontWeight: 'bold',fontSize:20 }}><Text></Text> </Text>;
                                                    }
                                                    else
                                                    {
                                                    if(this.state.QuestionArray[0].pagetitlecount!=0 || this.state.QuestionArray[0].pagetitlecount!="" || this.state.QuestionArray[0].pagetitlecount!=null || this.state.QuestionArray[0].pagetitlecount!=undefined)
                                                    {
                                                    if(this.state.QuestionArray[0].pagetitlecount!=this.state.QuestionArray[0].ansCountindex)
                                                    {
                                                    //alert(this.state.QuestionArray[2].pagetitle);
                                                    
                                                                                                       //alert(55);
                                                    
                                                    perpagetitle=<Text style={{color:'#2494F2',marginLeft:20 ,fontWeight: 'bold',fontSize:20 }}><Text>{this.state.QuestionArray[0].pagetitle}</Text> </Text>;
                                                    
                                                    
                                                    }
                                                    }
                                                    }
                                                    }
                                                    if(QuestionArray.typeofquestion=='checkbox'){
                                                    Nextcheck=<View><View><Text>{"\n"}</Text></View>
                                                    
                                                    
                                                    <Button
                                                    buttonStyle={{ backgroundColor: '#a4db51', borderRadius: 10,width:100, padding: 10, shadowColor: 'white',marginLeft: this.state.buttonWidth, shadowOffset: { width: 0, height: 3  }, shadowRadius: 5}}
                                                    title={this.state.submitvalue}  onPress={() =>this.submitRating('checkbox',QuestionArray.questionid,'pre',this.state.submitvalue)} /></View>;
                                                    
                                                    }
                                                    var Question='Question';
                                                    if(QuestionArray.typeofquestion=='survey')
                                                    {
                                                    Question='Page';
                                                    }
                                                    
                                                    if(index!=0)
                                                    {
                                                    Question='';
                                                    survey=<Text></Text>;
                                                    perpagetitle=<Text></Text>
                                                    }
                                                    if(QuestionArray.typeofquestion=='radio'){
                                                    Nextcheck=<View><View><Text>{"\n"}</Text></View>
                                                    
                                                    <Button
                                                    
                                                    buttonStyle={{ backgroundColor: '#a4db51', borderRadius: 10,width:100, padding: 10, shadowColor: 'white',marginLeft: this.state.buttonWidth, shadowOffset: { width: 0, height: 3  }, shadowRadius: 5}}
                                                    title={this.state.submitvalue}  onPress={() =>this.submitRating('radio',QuestionArray.questionid,'pre',this.state.submitvalue)} /></View>;
                                                    
                                                    }
                                                    if(QuestionArray.typeofquestion=='survey'){
                                                    this.state.questionidsurvey[index]=this.state.QuestionArray[index].questionid;
                                                    
                                                    Nextcheck=<View><View><Text>{"\n"}</Text></View>
                                                    
                                                    <Button
                                                    buttonStyle={{ backgroundColor: '#a4db51', borderRadius: 10,width:100, padding: 10, shadowColor: 'white',marginLeft: this.state.buttonWidth, shadowOffset: { width: 0, height: 3  }, shadowRadius: 5}}
                                                    title={this.state.submitvalue}  onPress={() =>this.submitRating('survey',QuestionArray.questionid,'pre',this.state.submitvalue)} /></View>;
                                                    
                                                    }
                                                    
                                                    if(QuestionArray.typeofquestion=='checkbox'){
                                                    var optionJcs=[{}];
                                                    var string=QuestionArray.options;
                                                    var optionJcs=string.split(',');
                                                    option=<View><SelectMultiple
                                                    items={optionJcs}
                                                    selectedItems={this.state.selectedFruits}
                                                    onSelectionsChange={this.onSelectionsChange} /></View>;
                                                    
                                                    }
                                                    if(QuestionArray.typeofquestion=='radio'){
                                                    
                                                    option=
                                                    <RadioForm
                                                    style={{padding:10}}
                                                    initial={""}
                                                    radio_props={radio_props}
                                                    onPress={(value) => this.statusRadio(value)}
                                                    />;
                                                    
                                                    }
                                                    if(QuestionArray.typeofquestion=='survey')
                                                    {
                                                    var scorestringoption=[{}];
                                                    var scorestring=QuestionArray.score;
                                                    scorestringoption=scorestring.split(',');
                                                    
                                                    var allObj = [];
                                                    var obj="";
                                                    var optionJcs=[{}];
                                                    var string=QuestionArray.options;
                                                    optionJcs=string.split(',');
                                                    var optionlabel='';
                                                    for(var i=0;i<optionJcs.length;i++){
                                                    
                                                    optionlabel=optionJcs[i].replace(/@@@@/,',');
                                                    var labeltext=scorestringoption[i]+"_"+optionlabel;
                                                    obj = {label: optionlabel, value: labeltext };
                                                    allObj.push(obj);
                                                    }
                                                    option= <View ><RadioForm
                                                    initial={""}
                                                    style={{padding:10}}
                                                    
                                                    radio_props={allObj}
                                                    onPress={(surveyValue) => {this.setState({surveyValue:surveyValue})}}
                                                    /></View>;
                                                    
                                                    }
                                                    if(QuestionArray.typeofquestion=='survey')
                                                    {
                                                    
                                                    this.state.stateindex=index;
                                                    option=<Text></Text>;
                                                    return (
                                                            
                                                            <View key={index} >
                                                            
                                                            <View style={{flex:1}}>
                                                            <Text style={{fontWeight: 'bold' ,color: 'black', fontSize:16 ,marginRight:20,marginTop:8, alignSelf:"center" }}>{Question}<Text> {survey}</Text></Text>
                                                            
                                                            </View>
                                                            <View>{perpagetitle}</View>
                                                           	<View>{this.state.surveystatus[index]}<Text style={{color: 'black', fontSize:16, textAlign: 'left', marginTop:10}}>{qustionnum}).{QuestionArray.questions}</Text><View style={ThemeStyles.cardStyle}><RadioForm
                                                    initial={""}
                                                    style={{padding:10}}
                                                    
                                                    radio_props={allObj}
                                                    onPress={(surveyValue) => this.check(surveyValue,index)}//{this.setState({surveyValue:surveyValue})}}
                                                    /></View></View>
                                                    
                                                    </View>
                                                    
                                                    
                                                    
                                                    )
        
        
        
    }
    else
        
    {
        return (
                
                <View key={index}>
                
                <View style={{flex:1}}>
                
                <Text style={{fontWeight: 'bold' ,color: 'black', fontSize:16 ,marginRight:20,marginTop:8, alignSelf:"center" }}>Question<Text> {survey}</Text></Text>
                
                </View>
                <View></View>
                <View><Text style={{color: 'black', fontSize:16, textAlign: 'left', marginTop:10}}>{QuestionArray.questions}</Text></View>
                
                </View>
                
                
                
                )
    }
    
}
}
}else{
    AsyncStorage.setItem("ProgramExit","No");
    if(QuestionArray.typeofquestion==undefined && QuestionArray.Score !='survey'){
        TextScore=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:15 }}>Your Score is: {QuestionArray.Score} %</Text>;
        
    }
    else{
        AsyncStorage.setItem("ProgramExit","No");
        survey=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:18 }}>Survey</Text>;
    }
    if(this.state.pagetype=="survey")
    {
        TextStatus=<View key={index}>
        
        <View style={{flex:1,padding:10}}>
        <Text style={{color:'#F55443'}}>Congratulations. You have completed your Pre Program Evaluation. {TextScore}</Text>
        
        </View>
        </View>;
    }
    else
    {
        TextStatus=<View key={index}>
        <View style={{flex:1,padding:10}}>
        <Text style={{color:'#F55443'}}>Congratulations. You have completed your Pre Program Evaluation. {TextScore}</Text>
        
        </View>
        </View>;
    }
    
    
    nextpost=<View style={{alignItems:'center'}}>
    <Button
    
    buttonStyle={{ backgroundColor: '#a4db51',marginTop:20, borderRadius: 10, shadowColor: 'white', shadowOffset: { width: 0, height: 3  }, shadowRadius: 5}}
    title="Post Program Evaluation" disabled={this.state.buttonstatus} onPress={() =>this.statuspostQuestions()} /></View>;
    
}

});



if(this.state.preAnswerStatus==false)
{
    var status=<Text></Text>;
    var AnswerStatus = this.state.StatusArray.map((StatusArray, index) => {
                                                  if(StatusArray.msg==2)
                                                  {
                                                  this.message.showMessage('Correct!', 30000000000000000000000);
                                                  this.setState({ StatusArray:[],nextstatus:false,submitstatus:true,submitvalue:'Continue' });
                                                  }
                                                  else if(StatusArray.msg==3)
                                                  {
                                                  this.message.showMessage('Thanks!', 30000000000000000000000);
                                                  this.setState({ StatusArray:[],nextstatus:false,submitstatus:true,submitvalue:'Continue' });
                                                  }
                                                  else if(StatusArray.msg==1)
                                                  {
                                                  this.setState({ StatusArray:[],nextstatus:false,submitstatus:true,submitvalue:'Continue'});
                                                  this.message.showMessage('Wrong!', 30000000000000000000000);
                                                  }
                                                  else if(StatusArray.msg=='Already Answered')
                                                  {
                                                  
                                                  status=<Text style={{color:'red',fontSize:13,alignSelf:"center" }}>Already Answered</Text>;
                                                  }
                                                  else if(StatusArray.msg=='Choose')
                                                  {
                                                  status=<Text style={{color:'red',fontSize:13,alignSelf:"center" }}>Please Choose To Answer</Text>;
                                                  
                                                  }
                                                  return(
                                                         <View>{status}</View>
                                                         )
                                                  });
}
if(this.state.postanswerStatus==false)
{
    var status=<Text></Text>;
    var PostAnswerStatus = this.state.StatusArray.map((StatusArray, index) => {
                                                      if(StatusArray.msg==2)
                                                      {
                                                      this.message.showMessage('Correct!', 30000000000000000000000);
                                                      this.setState({ StatusArray:[],nextstatus:false,submitstatus:true,submitvalue:'Continue' });
                                                      }
                                                      else if(StatusArray.msg==3)
                                                      {
                                                      this.message.showMessage('Thanks!', 30000000000000000000000);
                                                      this.setState({ StatusArray:[],nextstatus:false,submitstatus:true,submitvalue:'Continue' });
                                                      }
                                                      else if(StatusArray.msg==1)
                                                      {
                                                      this.setState({ StatusArray:[],nextstatus:false,submitstatus:true,submitvalue:'Continue' });
                                                      this.message.showMessage('Wrong!', 30000000000000000000000);
                                                      }
                                                      else if(StatusArray.msg=='Already Answered')
                                                      {
                                                      
                                                      status=<Text style={{color:'red',fontSize:13,alignSelf:"center" }}>Already Answered</Text>;
                                                      }
                                                      else if(StatusArray.msg=='Choose')
                                                      {
                                                      status=<Text style={{color:'red',fontSize:13,alignSelf:"center" }}>Please Choose To Answer</Text>;
                                                      
                                                      }
                                                      return(
                                                             <View>{status}</View>
                                                             )
                                                      });
}
if(this.state.resultPreData==false)
{
    
    if(this.state.preQuestion==true)
    {
        var test=<Text></Text>;
        if(Question!='')
        {
            var test=<View styel={{ marginLeft:this.state.MessageWidth}}>
            <View><Text>{"\n"}</Text></View>
            <View><Text>{"\n"}</Text></View>
            <Message
            ref={(message) => this.message = message }
            animation={"slideX"}
            messageHeight={50}
            messageWidth={80}
            
            messageStyle={{backgroundColor: '#fffbc9',  borderRadius: 5, shadowColor: '#000000',marginTop:this.state.massageTop}}
            
            position={'bottom'}>
            </Message>
            </View>;
        }
        
        if(this.state.proceedstatus==true)
        {
            if(this.state.pagetype=='survey')
            {
                var PreQuestion=<View >
                <View>
                {heading}
                </View>
                <View>
                <View style={{marginLeft:10}}>
                {Question}
                </View>
                <View>
                {AnswerStatus}
                </View>
                {nextpost}
                {test}
                <View>
                {Nextcheck}
                </View>
                </View><View><Text>{"\n"}</Text></View>
                </View>;
            }
            else
            {
                var PreQuestion=<View >
                <View>
                {heading}
                </View>
                <View>
                <View style={{marginLeft:10}}>
                {Question}
                </View>
                <View>
                {AnswerStatus}
                </View>
               
                <View style={ThemeStyles.cardStyle}>
                    {option}
                    {TextStatus}
                </View>
                
                {nextpost}
                {test}
                <View>
                {Nextcheck}
                </View>
                </View><View><Text>{"\n"}</Text></View>
                </View>;
            }
        }
        else{
            AsyncStorage.setItem("Typeofprogarm","pre");
            if(this.state.pagetype=='survey')
            {
                var PreQuestion=<View >
                
                <View>
                {heading}
                </View>
                <View>
                <View style={{marginLeft:10}}>
                {Question}
                </View>
                <View>
                {AnswerStatus}
                </View>
                <View style={ThemeStyles.cardStyle}>
                {option}
                {TextStatus}
                </View>
                {test}
                <View>
                {Nextcheck}
                </View>
                </View><View><Text>{"\n"}</Text></View>
                
                </View>;
            }
            else
            {
                var PreQuestion=<View >
                
                <View>
                {heading}
                </View>
                <View>
                <View style={{marginLeft:10}}>
                {Question}
                </View>
                <View>
                {AnswerStatus}
                </View>
                
                <View style={ThemeStyles.cardStyle}>
                {option}
                {TextStatus}
                </View>
                 {test}
                <View>
                {Nextcheck}
                </View>
                </View><View><Text>{"\n"}</Text></View>
                
                </View>;
                
                
            }
        }
    }
}
var heading=<Text></Text>;
var surveypost=<Text></Text>;
var TextScorepost=<Text></Text>;
var QuestionStatus=<Text></Text>;
var Nextcheck=<Text></Text>;
var option=<Text></Text>;
var postscore=<Text></Text>;
var perpagetitlepost=<Text></Text>;
var qustnum=0;
var Questionpost = this.state.PostQuestionArray.map((PostQuestionArray, index) => {
                                                    if(PostQuestionArray.programname!='' && PostQuestionArray.programname!=null){
                                                    heading=<Row style={{backgroundColor:'#a4db51'}}>
                                                    <Text style={styles.titleViewText}><Text style={{ fontWeight: 'bold' ,color: 'black', fontSize:16 ,marginLeft:25, alignSelf:"center" }}> {PostQuestionArray.programname} -  Post Program Evaluation</Text></Text>
                                                    </Row>;
                                                    }
                                                    if(PostQuestionArray.Score=="" || PostQuestionArray.Score==undefined ){
                                                    if(PostQuestionArray.typeofquestion=='checkbox' || PostQuestionArray.typeofquestion=='radio'){
                                                    surveypost=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:13}}><Text>{this.state.PostQuestionArray[0].ansCount}/{this.state.PostQuestionArray[0].Totalcount}</Text> </Text>;
                                                    TextScore=<Text></Text>;
                                                    }
                                                    if(PostQuestionArray.status=="" || PostQuestionArray.status==undefined ){
                                                    if(PostQuestionArray.typeofquestion=='survey'){
                                                    surveypost=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:13 }}><Text>{this.state.PostQuestionArray[0].ansCount}/{this.state.PostQuestionArray[0].pagecount}</Text></Text>;
                                                    TextScorepost=<Text></Text>;
                                                    }
                                                    if(PostQuestionArray.questions!='')
                                                    {
                                                    AsyncStorage.setItem("Typeofprogarm","post");
                                                    AsyncStorage.setItem("ProgramExit","Yes");
                                                    }
                                                    if(PostQuestionArray.typeofquestion!='survey' || this.state.perpagequstion==null || this.state.perpagequstion==undefined)
                                                    {
                                                    this.state.perpagequstion=1;
                                                    }
                                                    if(PostQuestionArray.typeofquestion=='survey')
                                                    {
                                                    this.state.pagetype=PostQuestionArray.typeofquestion;
                                                    
                                                    if(this.state.PostQuestionArray[0].pagetitlecount==0 || this.state.PostQuestionArray[0].pagetitlecount=="" || this.state.PostQuestionArray[0].pagetitlecount==null || this.state.PostQuestionArray[0].pagetitlecount==undefined)
                                                    {
                                                    perpagetitlepost=<Text style={{color:'#2494F2',marginLeft:20 ,fontWeight: 'bold',fontSize:20 }}><Text></Text> </Text>;
                                                    }
                                                    else
                                                    {
                                                    if(this.state.PostQuestionArray[0].pagetitlecount!=0 || this.state.PostQuestionArray[0].pagetitlecount!="" || this.state.PostQuestionArray[0].pagetitlecount!=null || this.state.PostQuestionArray[0].pagetitlecount!=undefined)
                                                    {
                                                    if(this.state.PostQuestionArray[0].pagetitlecount!=this.state.PostQuestionArray[0].ansCountindex)
                                                    {
                                                    //alert(this.state.QuestionArray[2].pagetitle);
                                                    
                                                    
                                                                                                        //alert(55);
                                                    
                                                    perpagetitlepost=<Text style={{color:'#2494F2',marginLeft:20 ,fontWeight: 'bold',fontSize:20 }}><Text>{this.state.PostQuestionArray[0].pagetitle}</Text> </Text>;
                                                    
                                                    
                                                    }
                                                    }
                                                    }
                                                    }
                                                    
                                                    //alert(this.state.perpagequstion);
                                                    if(index<this.state.perpagequstion)
                                                    {
                                                    qustnum++;
                                                    if(PostQuestionArray.typeofquestion=='checkbox'){
                                                    Nextcheck=<View><View><Text>{"\n"}</Text></View>
                                                    
                                                    <Button
                                                    buttonStyle={{ backgroundColor: '#a4db51', borderRadius: 10,width:100, padding: 10, shadowColor: 'white',marginLeft: this.state.buttonWidth, shadowOffset: { width: 0, height: 3  }, shadowRadius: 5}}
                                                    title={this.state.submitvalue}  onPress={() =>this.submitRating('checkbox',PostQuestionArray.questionid,'post',this.state.submitvalue)} /></View>;
                                                    
                                                    }
                                                    var Question='Question';
                                                    if(PostQuestionArray.typeofquestion=='survey')
                                                    {
                                                    Question='Page';
                                                    }
                                                    
                                                    if(index!=0)
                                                    {
                                                    Question='';
                                                    surveypost=<Text></Text>;
                                                    perpagetitlepost=<Text></Text>
                                                    }
                                                    if(PostQuestionArray.typeofquestion=='radio'){
                                                    Nextcheck=<View><View><Text>{"\n"}</Text></View>
                                                    
                                                    <Button
                                                    buttonStyle={{ backgroundColor: '#a4db51', borderRadius: 10,width:100, padding: 10, shadowColor: 'white',marginLeft: this.state.buttonWidth, shadowOffset: { width: 0, height: 3  }, shadowRadius: 5}}
                                                    title={this.state.submitvalue}  onPress={() =>this.submitRating('radio',PostQuestionArray.questionid,'post',this.state.submitvalue)} /></View>;
                                                    
                                                    }
                                                    if(PostQuestionArray.typeofquestion=='survey'){
                                                    this.state.questionidsurvey[index]=this.state.PostQuestionArray[index].questionid;
                                                    
                                                    Nextcheck=<View><View><Text>{"\n"}</Text></View>
                                                    
                                                    <Button
                                                    buttonStyle={{ backgroundColor: '#a4db51', borderRadius: 10,width:100, padding: 10, shadowColor: 'white',marginLeft: this.state.buttonWidth, shadowOffset: { width: 0, height: 3  }, shadowRadius: 5}}
                                                    title={this.state.submitvalue}  onPress={() =>this.submitRating('survey',PostQuestionArray.questionid,'post',this.state.submitvalue)} /><View><Text>{"\n"}</Text></View></View>;
                                                    
                                                    }
                                                    
                                                    
                                                    if(PostQuestionArray.typeofquestion=='checkbox'){
                                                    var optionJcs=[{}];
                                                    var string=PostQuestionArray.options;
                                                    var optionJcs=string.split(',');
                                                    option=<View><SelectMultiple
                                                    items={optionJcs}
                                                    selectedItems={this.state.selectedFruits}
                                                    onSelectionsChange={this.onSelectionsChange} /></View>;
                                                    
                                                    }
                                                    if(PostQuestionArray.typeofquestion=='radio'){
                                                    
                                                    option=<View>
                                                    <RadioForm
                                                    initial={""}
                                                    radio_props={radio_props}
                                                    onPress={(value) => this.statusRadio(value)}
                                                    />
                                                    </View>;
                                                    
                                                    }
                                                    
                                                    if(PostQuestionArray.typeofquestion=='survey')
                                                    {
                                                    var optionJcs=[{}];
                                                    var string=PostQuestionArray.options;
                                                    var optionJcs=string.split(',');
                                                    
                                                    var scorestringoption=[{}];
                                                    var scorestring=PostQuestionArray.score;
                                                    scorestringoption=scorestring.split(',');
                                                    
                                                    var allObj = [];
                                                    var obj="";
                                                    var optionlabel='';
                                                    for(var i=0;i<optionJcs.length;i++){
                                                    
                                                    optionlabel=optionJcs[i].replace(/@@@@/,',');
                                                    var labeltext=scorestringoption[i]+"_"+optionlabel;
                                                    obj = {label: optionlabel, value:labeltext };
                                                    allObj.push(obj);
                                                    }
                                                    
                                                    this.state.stateindex=index;
                                                    option=<Text></Text>
                                                    return (
                                                            <View key={index}>
                                                            <View style={{flex:1}}>
                                                            
                                                            <Text style={{fontWeight: 'bold' ,color: 'black', fontSize:16 ,marginRight:20, alignSelf:"center" }}>{Question}<Text> {surveypost}</Text></Text>
                                                            
                                                            </View><View>{perpagetitlepost}</View>
                                                            <View style={ThemeStyles.cardStyle}>
                                                            <View style={{marginLeft:10}}>
                                                            <Text style={{color: 'black', fontSize:16, textAlign: 'left', marginTop:10,marginLeft:10}}>{qustnum}).{PostQuestionArray.questions}</Text>
                                                    <View style={{marginTop:10}}>
                                                            <RadioForm
                                                    initial={""}
                                                    radio_props={allObj}
                                                    onPress={(surveyValue) => this.check(surveyValue,index)}//this.setState({surveyValue:surveyValue})}}
                                                    />
                                                    </View>
                                                    </View>
                                                    </View>
                                                    </View>
                                                    
                                                    )
}
else
{
    return (
            <View key={index}>
            <View style={{flex:1}}>
            
            <Text style={{fontWeight: 'bold' ,color: 'black', fontSize:16 ,marginRight:20,marginTop:8, alignSelf:"center" }}>Question<Text> {surveypost}</Text></Text>
            
            </View>
            <View><Text style={{color: 'black', fontSize:16, textAlign: 'left', marginTop:10}}>{PostQuestionArray.questions}</Text></View>
            {QuestionStatus}
            </View>
            )
}
}
}

}

else{
    AsyncStorage.setItem("ProgramExit","No");
    if(PostQuestionArray.typeofquestion==undefined && PostQuestionArray.Score !='survey'){
        TextScorepost=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:15 }}>Your Score is: {PostQuestionArray.Score} %</Text>;
        
    }
    else{
        AsyncStorage.setItem("ProgramExit","No");
        surveypost=<Text style={{color:'#2494F2',fontWeight: 'bold',fontSize:18 }}>Survey</Text>;
    }
    if(this.state.pagetype=='survey')
    {
        
        postscore=<View key={index}>
        <View style={{flex:1,padding:10}}>
        <Text style={{color:'#F55443'}}>Congratulations. You have completed your Post Program Evaluation. {TextScorepost}</Text>
        </View>
        </View>;
    }
    else
    {
        postscore=<View key={index}>
        <View style={{flex:1,padding:10}}>
        <Text style={{color:'#F55443'}}>Congratulations. You have completed your Post Program Evaluation. {TextScorepost}</Text>
        </View>
        </View>;
    }
    
}

});
if(this.state.resultPostData==true){
    
    if(this.state.postStatus==true){
        var status=<Text></Text>;
        if(Questionpost!='')
        {
            status=<View styel={{ marginLeft:this.state.MessageWidth}}><View><Text>{"\n"}</Text></View>
            <View><Text>{"\n"}</Text></View>
            <Message
            ref={(message) => this.message = message }
            animation={"slideX"}
            messageHeight={50}
            messageWidth={80}
            textStyle={{color: 'black', fontSize: 18, fontWeight: 'bold' ,marginRight:this.state.MessageWidth}}
            
            messageStyle={{backgroundColor: '#fffbc9',  borderRadius: 5, shadowColor: '#000000',marginTop:this.state.massageTop}}
            
            position={'bottom'}>
            </Message>
            </View>;
            
        }
        
        if(this.state.pagetype=='survey')
        {
            var postQuestion=<View>
            <View>
            {heading}
            </View>
            <View style={{marginLeft:10}}>
            {Questionpost}
            </View>
            <View>
            {PostAnswerStatus}
            </View>
            
            <View>
            {option}
            {postscore}
            </View>
            
            {status}
            
            <View>
            {Nextcheck}
            </View>
            <View><Text>{"\n"}</Text></View>
            </View>;
        }
        else
        {
            var postQuestion=<View>
            <View>
            {heading}
            </View>
            <View style={{marginLeft:10}}>
            {Questionpost}
            </View>
            <View>
            {PostAnswerStatus}
            </View>
            <View style={ThemeStyles.cardStyle}>
            {option}
            {postscore}
            </View>
            {status}
            
            <View>
            {Nextcheck}
            </View>
            <View><Text>{"\n"}</Text></View>
            </View>;
            
        }
    }
}

if(this.state.rating!=0){
    var  rating=<Rating
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

if(this.state.PreScore==true && this.state.PostScore==true){
    var surveyTrainee=<View style={ThemeStyles.cardStyle}>
    <View>
    <Text style={{color:this.state.Ratingcolor,fontSize: 15,alignSelf:"center"}}>{this.state.errorMsg}</Text>
    
    </View>
    <View>
    <Text style={{ fontWeight: 'bold' , marginLeft:10}} >Trainee Satisfaction Survey</Text>
    <View style={{alignSelf:"center",marginTop:20}}>
    {rating}
    </View>
    </View>
    <View style={{marginTop:5,alignItems:'flex-end'}}>
    <Button
    
    onPress={() => this.onTraineeRating()}
    style={{alignSelf:'center',marginTop:15 }}
    backgroundColor="#63c655"
    title="Rate"/>
    </View>
    </View>;
}

if(this.state.retry==true){
    
    var retry=<View style={{alignSelf:"center",flex:1,paddingTop:10}}>
    <Text style={{color:"#000000"}}>You seem to be offline</Text>
    
    <Button
    
    style={{backgroundColor:'#EC9B64',height:35,alignSelf:"center"}}
    backgroundColor="#EC9B64"
    onPress={()=>this.componentDidMount()}
    title="Go Online"/>
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
    restult=PreQuestion;
}
var restultpost="";
if(this.state.animatingpost==true){
    restultpost= <ActivityIndicator
    animating = {this.state.animatingpost}
    color = '#23A9FF'
    size = "large"
    style = {styles.activityIndicator}
    />;
}else{
    restultpost=postQuestion;
}

if(this.state.overall=="true"){
    
    var preoverall=restult;
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
            <Text style={ThemeStyles.titleTextTheme3}>{this.state.menuLable} </Text>
			</View>;
		}
return (
        <View style={ThemeStyles.container} onLayout={(event) => this.handleLayoutChange(event)}>
        {headerTab}
        <ScrollView>
        {preoverall}
        {resultpreData}
        {restultpost}
        {surveyTrainee}
        {resultpostData}
        
        {retry}
        </ScrollView>
        </View>
        
        
        )


}
};

var styles = StyleSheet.create({
                               container: {
                               paddingRight: 3,
                               paddingLeft: 0.5,
                               paddingTop: 5,
                               paddingBottom: 10,
                               height: height,
                               backgroundColor: '#ffffff',
                               },
                               dataNumber: {
                               color: '#000',
                               fontSize: 18
                               },
                               headerIcon: {
                               width: 75,
                               height: 75,
                               alignItems: 'center',
                               justifyContent: 'center',
                               marginBottom:5
                               
                               },
                               bar: {
                               alignSelf: 'center',
                               borderRadius: 6,
                               height: 10,
                               marginRight: 5
                               },
                               points: {
                               backgroundColor: '#F55443'
                               },
                               menuicon:
                               {
                               width: 75,
                               height: 75,
                               
                               },
                               titleViewText: {
                               height: 40,
                               marginTop:15,
                               fontSize: 20,
                               color: '#3b5998',
                               alignSelf:'center'
                               
                               },
                               titleView: {
                               color: '#3b5998',
                               fontSize: 23,
                               alignSelf: 'center',
                               
                               },
                               containernew:{
                               flex: 1,
                               borderColor : 'blue',
                               },
                               page: {
                               flex: 1,
                               
                               
                               },
                               activityIndicator: {
                               flex: 1,
                               justifyContent: 'center',
                               alignItems: 'center',
                               height: 350
                               },
                               fullWidthButton: {
                               backgroundColor: '#f49542',
                               height:20,
                               flexDirection: 'row',
                               justifyContent: 'center',
                               alignItems: 'center'
                               },
                               fullWidthButtonText: {
                               fontSize:12,
                               justifyContent: 'center',
                               alignItems: 'center',
                               color: 'white'
                               },
                               button: {
                               backgroundColor: "#efefef",
                               alignItems: "center",
                               justifyContent: "center",
                               marginTop:6,
                               width:10,
                               },
                               divhead:{
                               backgroundColor: "#efefef",
                               paddingVertical: 10,
                               alignItems: "center",
                               justifyContent: "center",
                               marginTop:8,
                               borderRadius: 5,
                               
                               
                               },
                               content:{
                               backgroundColor: "#efefef",
                               paddingVertical: 10,
                               alignItems: "center",
                               justifyContent: "center",
                               marginTop:8,
                               borderRadius: 5,
                               
                               
                               },
                               divcontent:{
                               backgroundColor: "#dddcd2",
                               paddingVertical: 10,
                               alignItems: "center",
                               justifyContent: "center",
                               marginTop:8,
                               borderRadius: 5,
                               
                               
                               },
                               
                               
                               title: {
                               fontSize: 30,
                               alignSelf: 'center',
                               marginBottom: 30
                               },
                               touchable: {
                               marginTop: 20,
                               fontSize: 30,
                               },
                               registration: {
                               fontSize: 30,
                               color: '#48BBEC',
                               paddingBottom: 20,
                               paddingTop: 20,
                               alignSelf: 'center'
                               },
                               usernamestyle: {
                               fontSize: 15,
                               color: '#48BBEC',
                               paddingBottom: 10,
                               paddingTop: 10,
                               alignSelf: 'center'
                               },
                               borderlayout: {
                               marginLeft: 12,
                               paddingTop: 10,
                               paddingBottom: 10,
                               backgroundColor: 'rgb(12,150,241)',
                               borderColor: '#48BBEC',
                               borderWidth: 2,
                               },
                               text: {
                               marginLeft: 12,
                               paddingTop: 10,
                               paddingBottom: 10,
                               borderColor: '#48BBEC',
                               fontSize: 16,
                               },
                               red: {
                               color: 'red',
                               },
                               header: {
                               height: 65,
                               flexDirection: 'row',
                               justifyContent: 'space-between',
                               alignItems: 'center',
                               },
                               title: {
                               fontSize: 20,
                               color: '#fff',
                               fontWeight: '600',
                               marginTop: 270,
                               padding: 20,
                               },
                               card: {
                               marginTop: 10,
                               },
                               row: {
                               height: 50,
                               padding: 10,
                               justifyContent: 'center',
                               borderBottomWidth: 1,
                               borderColor: '#f5f5f5',
                               backgroundColor: '#fff',
                               },
                               encrypt: {
                               height: 50,
                               paddingHorizontal: 20,
                               flexDirection: 'row',
                               alignItems: 'center',
                               borderBottomWidth: 1,
                               borderColor: '#f1f1f1',
                               backgroundColor: '#fff',
                               },
                               number: {
                               height: 50,
                               paddingHorizontal: 5,
                               flexDirection: 'row',
                               justifyContent: 'space-between',
                               alignItems: 'center',
                               borderBottomWidth: 1,
                               borderColor: '#f5f5f5',
                               backgroundColor: '#fff',
                               },
                               text: {
                               fontSize: 14,
                               color: '#333',
                               fontWeight: '400',
                               },
                               subText: {
                               fontSize: 15,
                               color: '#31b0d5',
                               },
                               green: {
                               color: '#075e54',
                               fontSize: 10,
                               },
                               });
