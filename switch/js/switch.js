!(function($){
  $.fn.extend({
    switch:function(options){
      this.attr('switch','on');
      for (var i = 0; i < this.length; i++) {
        this[i].setAttribute('txt',this[i].innerHTML);
      }
      this.live('click',function(){
        //获取codeid
        //var codeID = this.getAttribute('codeid');
        // $.ajax({
        //   url:options.url,
        //   type:options.type||'GET',
        //   data:options.data||{
        //     //id:codeID
        //   },
        //   dataType:options.dataType||'JSON',
        //   success:options.success||function(data){
        //     if(data.type == 1){
        //       this.innerHTML=options.text;
        //     }
        //   }
        // });
        if(this.getAttribute('switch')=='on'){
          this.innerHTML=options.text;
          this.setAttribute('switch','off');
        }else {
          this.innerHTML=this.getAttribute('txt');
          this.setAttribute('switch','on');
        }
      });
      var add = function(){
        console.log(this);
      }
    }

  })
})(window.jQuery);
