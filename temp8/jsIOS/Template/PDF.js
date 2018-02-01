/**
 * Copyright (c) 2017-present, Wonday (@wonday.org)
 * All rights reserved.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Text
} from 'react-native';

import Pdf from 'react-native-pdf';

export default class PDFExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            pageCount: 1,
        };
        this.pdf = null;
    }

    componentDidMount() {
    }

    prePage=()=>{
        if (this.pdf){
            let prePage = this.state.page>1?this.state.page-1:1;
            this.pdf.setNativeProps({page: prePage});
            this.setState({page:prePage});
            console.log(`prePage: ${prePage}`);
        }
    }

    nextPage=()=>{
        if (this.pdf){
            let nextPage = this.state.page+1>this.state.pageCount?this.state.pageCount:this.state.page+1;
            this.pdf.setNativeProps({page: nextPage});
            this.setState({page:nextPage});
            console.log(`nextPage: ${nextPage}`);
        }

    }

    render() {
        var module= this.props.path;
        
        let source = {uri:'http://yokupro.com/uploadfiles/'+module,cache:true};
        

        return (
                <View style={styles.container}>
                <View><Text>{this.props.filename}</Text></View>
                <View style={{flexDirection:'row'}}>
                
                <TouchableHighlight  disabled={this.state.page==1} style={this.state.page==1?styles.btnDisable:styles.btn} onPress={()=>this.prePage()}>
                <Text style={styles.btnText}>{'<<'}</Text>
                </TouchableHighlight>
                <View ><Text style={{marginTop:10}}>Page no: {this.state.page}</Text></View>
                <TouchableHighlight  disabled={this.state.page==this.state.pageCount} style={this.state.page==this.state.pageCount?styles.btnDisable:styles.btn}  onPress={()=>this.nextPage()}>
                <Text style={styles.btnText}>{'>>'}</Text>
                </TouchableHighlight>
                
                </View>
                <Pdf ref={(pdf)=>{this.pdf = pdf;}}
                    source={source}
                    page={1}
                    scale={1}
                    horizontal={false}
                    onLoadComplete={(pageCount)=>{
                        this.setState({pageCount: pageCount});
                        console.log(`total page count: ${pageCount}`);
                    }}
                    onPageChanged={(page,pageCount)=>{
                        this.setState({page:page});
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    style={styles.pdf}/>
            </View>
        )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    btn: {
        margin: 5,
                                 marginTop:10,
        padding:5,
        backgroundColor: "#1a90a5",
                                 borderRadius:1,
                                 borderRadius: 6,
                                 borderWidth: 1,
                                 borderColor: '#fff'
    },
    btnDisable: {
                                 margin: 5,
                                 marginTop:10,
                                 padding:5,
                                 backgroundColor: "gray",
                                 borderRadius:1,
                                 borderRadius: 6,
                                 borderWidth: 1,
                                 borderColor: '#fff'
    },
    btnText: {
        color: "#FFF",
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});
