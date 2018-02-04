import async from 'async'
import Storage from './storage'
require("babel-polyfill")

export default async (url,method='get',data={},headers={'Content-Type':'application/json'})=>{
    if(window.fetch){//浏览器支持fetch
        let requestConfig={
            method:method,
            headers:{
                'Accept':'application/json',
            }
        }
   
    if (method==='post') {//如果请求为POST 添加属性
        Object.defineProperty(requestConfig,'body',{value:data});
    } else {//如果不是,修改URL
        let dataStr='';
        for(let [k,v] of Object.entries(data)){
            dataStr += `${k}=${v}&`;
        }
        if( dataStr !== '' ){
            url = url + '?' +dataStr.substr(0,dataStr.lastIndexOf('&'));
        }
    }
    //header

    if (Object.keys(headers).length!==0) {//如果header不是空的,把header赋值给requestConfig.headers
        Object.assign( requestConfig.headers, headers );
    }
    try{//尝试fetch连接
        let response=await fetch(url,requestConfig);
        if (response.status===401) {//如果要求身份验证,更改地址
            Storage.clear();
            window.location.href='/';
        }else{
            let data;//数据类型
            switch (requestConfig.headers.Accept) {
                case 'application/json':
                    data=response.json();
                    break;
                    case 'text/html':
                    data=response.text();
                    break;
            }
            return data;
        }
    }catch(error){
        console.log('error aaa',error)
        throw new Error(error)
    }
}else{//浏览器不支持fetch
    let requestObj;
    if (window.ActiveXObject) {
       // requestObj= new ActiveXObject("Microsoft.XMLHTTP");
    }else{
        requestObj=new XMLHttpRequest()
    }
    let sendDate='';
    if (method=='post') {
        sendDate=JSON.stringify(data);
    }else{
        let dataStr='';
        for(let [k,v] of Object.entries(data)){
            dataStr += `${k}=${v}&`;
        }
        if( dataStr !== '' ){
            url = url + '?' +dataStr.substr(0,dataStr.lastIndexOf('&'));
        }
    }
    return new Promise((resolve,reject)=>{
        requestObj.open(method,url,true);
        requestObj.setRequestHeader('Content-Type','application/json');
        requestObj.setRequestHeader('Accept',headers.Accept||'application/json');
        requestObj.send(sendDate);
        requestObj.onreadystatechange=()=>{
            if (requestObj.readyState==4) {
                if (requestObj.status==200) {
                    let obj=requestObj.response;
                    if (typeof obj!=='object') {
                        switch (headers.Accept) {
                            case 'text/html':
                                obj=obj;
                                break;
                        
                            default:
                            obj=JSON.parse(obj)
                                break;
                        }
                    }
                    console.log(obj)
                    resolve(obj);
                }else{

                }
            }
        }

    })
}
}