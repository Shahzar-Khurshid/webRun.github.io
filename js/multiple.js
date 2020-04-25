// alert("connected");
var css_html = {};
var count = 0;


$(".container").on("click",".add",function(){
    var prev_id = $(this).closest('.code-output-container').attr('id');
    var newCodeArea = $("#"+prev_id)[0].outerHTML;
    console.log(newCodeArea)
    count++;
    newCodeArea = newCodeArea.replace(/"code-output-container[0-9]+"/,"code-output-container"+count);
    newCodeArea = newCodeArea.replace(/"output[0-9]"/,"output"+count);
    newCodeArea = newCodeArea.replace(/"html-code-area[0-9]"/,"html-code-area"+count);
    newCodeArea = newCodeArea.replace(/"css-code-area[0-9]"/,"css-code-area"+count);
    var newcodeArea = $(".container").append(newCodeArea);
    console.log(newCodeArea);
    $(".container").append("<style media=\"screen\" id=\"style-output"+count+ "\"></style>")
});

$(".container").on("click",".reset",function(){
  var parent_container = $(this).closest('.code-output-container');
  var id = $(parent_container).attr("id");
  var styleId = $(parent_container).find("section").attr("id");
  // $(parent_container).find('textarea').val("");;
  $(parent_container).find(".html-code-area").val(css_html[id] ? css_html[id].html : css_html[id]);
  $(parent_container).find(".css-code-area").val(css_html[id] ? css_html[id].css : css_html[id] );
  $(parent_container).find("section").html("");
  $(parent_container).find("section").html(css_html[id] ? css_html[id].html : css_html[id] );
  // $(parent_container).find("#style-"+styleId).html();
  // var a = $("#style-"+styleId).html(css_html[id] ? css_html[id].css : css_html[id]);
  // $(parent_container).find('css-code-area').val("");
  addingCSS($(parent_container).find('.css-code-area'));
});

$(".container").on("click",".save",function(){
  var parent_container = $(this).closest('.code-output-container');
  var htmlContent = $(parent_container).find(".html-code-area").val();
  var cssContent = $(parent_container).find(".css-code-area").val();
  var newObj = {}
  newObj.html = htmlContent;
  newObj.css = cssContent;
  css_html[$(parent_container).attr("id")] = newObj;
  console.log(newObj,css_html);
});

$(".container").on("click",".delete",function(){
  var parent_container = $(this).closest('.code-output-container');
  var id = $(parent_container).attr("id");
  delete css_html[id];
  console.log(css_html)
  $(parent_container).remove();
});

// $(".container").on("keyup",'.html-code-area',function(){
//   var value = $("#html-code-area0").val();
//   $(".show-webpage").html( value );
// });

$(".container").on("keyup",".html-code-area",function(){
  var value = $(this).val();
  $(this).closest(".code-output-container").find("section").html(value);
});

$(".container").on("keyup",".css-code-area",function(){
  addingCSS($(this));
});

function addingCSS(element){
  var id = $(element).closest(".code-output-container").find("section").attr("id");
  var css = $(element).val().trim();
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
      var ele = ele.replace("body","#"+id+" ")
      // console.log(a);
      // console.log(ele);
      value+=ele+"}\n";
      console.log("value is" + value);
    }else{
    value += "#"+id+" "+ele+" }\n";
    console.log(value);
    }
  });


  $("#style-"+id).html(value);
}
