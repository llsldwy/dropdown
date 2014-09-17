/*
	lilin
	2014-9-17
	2.0增加了点击下拉 其他 下拉框也自动清除下拉  和 防止重复绑定方法
*/
(function($) {
    $.fn.extend({
        VERSION:'2.0.0',
    	customSelect: function(opt){
			var _this=$(this);
			opt=opt || {};
			opt.callback=opt.callback || '';//回调方法
            var data_toggle='[data-toggle="dropdown"]';
			var toggle=_this.children().children(data_toggle);
			if(toggle.data("events") && toggle.data("events")["click"]) return;//防止重复绑定
			toggle.on("click.fn.dropdown",function(){
				clearMenus();//清除所有下拉
                var parent=$(this).parent();
                parent.toggleClass("open");
                if(parent.hasClass('open')){
                    parent.next(".dropdown-menu").show(100);
                }else{
                    parent.next(".dropdown-menu").hide(100);
                }
                return false;
		     });
		     _this.find('.dropdown-menu>li').hover(function(){
		     	$(this).find('.dropdown-menu').show();
		     }).click(function(){
		     	var children=$(this).children();
		     	var _val='';
		     	if(children.length>0)
		     		_val=children.html();
		     	else 
		     		_val=$(this).html();
		     	if(opt.callback!='' && $.isFunction(opt.callback))
		     		opt.callback(_val,$(this).index(),$(this));

		    	 _this.find(".dropdown-menu").slideUp();
		     })
		     
 
		     $(document).bind('click', clearMenus);
             
		     function clearMenus(){//清除下拉
			    $(data_toggle).each(function (e){
                    var parent=$(this).parent();
                    if(parent.hasClass('open')) parent.removeClass("open");
			        parent.next(".dropdown-menu").hide(100);
			    })
			 }
        }
    })
})(jQuery);
