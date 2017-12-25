var Main = {
  templates : {},  
  
  loadTemplate : function(input){
    
    var that = this;
  
    if (templates[input.url]) {
      var html = templates[input.url];
      for (var key in input.data[key] ){
        var delimeter = '{{' + key + '}}';
        if (html.indexOf(delimeter) !== -1) {
          html.split(delimeter).join(input.data[key]);
        }
      }
      
      if (input.callback) {
        input.callback(html);
      }
      return html;
    } else {
      $.get({
        url : url,
        success: function(response){
          console.log(response);
          //that.loadTemplate(input);
        }
      });
      return false;
    }
  }

};
