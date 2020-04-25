$("#html-code-area").keyup(function(){
  var value = $("#html-code-area").val();
  $(".show-webpage").html( value );
});

$("#css-code-area").keyup(function(){

  var css = $("#css-code-area").val().trim();
  var eachCss = css.split("}");
  var value = "";
  if(eachCss[eachCss.length - 1].length === 0 ){
    eachCss.pop();
  }
  $(eachCss).each(function(i,ele){
    ele = ele.trim()
    console.log(ele);
    console.log(ele.indexOf("body"));
    if(ele.indexOf("body") !== -1){
      // console.log("inside if");
      // console.log(ele);
      var ele = ele.replace("body",".webpage-container ")
      // console.log(a);
      // console.log(ele);
      value+=ele+"}\n";
      console.log("value is" + value);
    }else{
    value += ".webpage-container "+ele+" }\n";
    console.log(value);
    }
  });


  $("#webpage-style").html(value);
});
