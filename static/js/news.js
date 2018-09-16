var news= document.getElementsByClassName("news-section");
console.log(news);
for(var value of news){
    var text = value.innerHTML.slice(0,50);
    console.log(text);
    value.innerHTML=text;
}
