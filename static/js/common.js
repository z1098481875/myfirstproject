/**
 * Created by Administrator on 2018/8/21.
 */
function $(id){
    return document.getElementById(id);
}
//�첽���󴴽�
function createXhr(){
    var xhr=null;
    if(window.XMLHttpRequest){
        xhr=new XMLHttpRequest();
    }else{
        xhr=new ActiveXObject("Microsoft.XMLHttp");
    }
    return xhr;
}