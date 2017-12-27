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

var Sliders = {
    list: {},
	description: {
		id: '_required', //свойство _required
		host: $('body'),
		data : {}
	},
	getByID: function(id) {
		return this.list[id]
				? this.list[id]
				: false;
	},
	place: function(p) {
		
		var id = p.id || Math.round(Math.random() * 10000);

		if (!this.list[id]) {
			p.id = id;
			this.list[id] = new Slider(p);
			return this.list[id];
		} else {
			if (!p.id) { //случай когда автоматически сгенерированное id уже существует
				this.place(p); //once again
				return false;
			}
			return this.list[id].set(p); //устанавливаем 
		}

	}
};

var Slider = function(p) {

	this.place = function(p) {
		
		//загружаем шаблон карточки и если он не загружен ждем 100 мс и пытаемся снова
		if (!Main.loadTemplate({
			url : '/carousel/card.tpl'
		}) || !Main.loadTemplate({
			url : '/carousel/slider.tpl'
		}) ) {
			var that = this;
			if (that.timer){
				clearTimeout(that.timer);
				that.timer = false;
			}
			that.timer = setTimeout(function(){
				that.place(p);
			}, 100);
			return false;	
		};
		

		for (var key in Sliders.description) {

			//если объявленное обязательным поле не найдено в переданных параметрах
			if (Sliders.description[key] === '_required' && !p[key]) {
				console.error('"' + key + '" is required in Slider.place');
			}

			this[key] = p[key]
					? p[key]
					: Sliders.description[key];
		}

		//вставляем в DOM
		if (this.host) {
			
			Main.loadTemplate({
				url : '/carousel/slider.tpl',
				data : {
					id : this.id
				},
				html: this.host
			})
			
			var h = [];
			
			var maxCount = this.getCountInScreen();
			var count = 0;
			for (var i in this.data){
				if (count <= maxCount) {
					var record = this.data[i];
					h.push(Main.loadTemplate({
						url : '/carousel/card.tpl',
						data : record
					}));
					count+=1;
				} else {
					break;
				}
					
			}
			
			$('.slider_content',this.$).html(h.join(''));
			
			var that = this;
			
			$(window).unbind('resize').resize(function(){
			    console.log(that.getCountInScreen());
			});
		}

	};
	
	this.getCountInScreen = function(){
		//console.log($('.slider_content', this.$).width());
		return Math.ceil(($('.slider_content', this.$).width()) / 240 - 1);	
	}	

	this.set = function(p) {
		for (var key in p) {
			this.data[key] = p[key];
		}
	};

	this.get = function(what) {
		return this.data[what];
	};

	this.show = function() {
		this.$.show();
		return this;
	};


	this.place(p);

};
