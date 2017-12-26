var List = {
    init : function(){
      var that = this;
      if ($('.list_host .card').length == 0){
        setTimeout(function(){
          that.init();
        },250);
        return false;
      } else {
       
        $('.list_host .card').unbind('click').click(function(){
          if ($(this).hasClass('active')){
            return false;
          }
          $('.list_host .card.active').removeClass('active');
          $(this).addClass('active');
        });
      
      }
    }
};  


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

var Data = {
 
  get : function(data){
     var result = {
              description : Main.truncateString('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                                                80),
              image : 'http://bm.img.com.ua/nxs/img/prikol/images/large/3/9/315193.jpg',
              username : 'user Name',
              score1 : Math.round(Math.random()*100)/10 + '',
              score2 : Math.round(Math.random()*100) + '',
              price : Math.round(Math.random()*100) + ''
            };
    
    for (key in data){
      result[key] = data[key];  
    }
   
    return result;
    
  }
  
}  
