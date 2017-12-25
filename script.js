var Main = {
  templates : {},  
  
  loadTemplate : function(input){
    
    var that = this;
  
    if (that.templates[input.url]) {
      var html = that.templates[input.url];
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
        url : input.url,
        success: function(response){
          that.templates[input.url] = response;
          that.loadTemplate(input); 
        }
      });
      return false; 
    }
  }

};
