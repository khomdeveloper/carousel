var Main = {
  templates : {},  
  
  truncateString : function(s, length){
    return s.substring(0, length) + '...'; 
  },
  
  loadTemplate : function(input){
    
    var that = this;
  
    if (that.templates[input.url]) {
      var html = that.templates[input.url];
      if (input.data) {
        for (var key in input.data){
          var delimeter = '{{' + key + '}}';
          if (html.indexOf(delimeter) !== -1) {
            html = html.split(delimeter).join(input.data[key]);
          }
        }
      }
      
      if (input.callback) {
        input.callback(html);
      } else if (input.append){
          input.append.append(html); 
      } else if (input.html) { 
          input.html.html(html);
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
