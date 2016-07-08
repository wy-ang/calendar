$(function(){
	// 初始化
		var init = function(){
			initDate = new Date();
		}
		init();

		//构建时间段
		var weekTxt = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
		var hourDraw = function(){
			var hourTxt = ['06:00 - 07:00', '07:00 - 08:00', '08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 13:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00', '23:00 - 24:00'],
				hourPatText = ['上<br/>午', '下<br/>午', '晚<br/>上'],
				a = ['1','2','3','4','5','6','7'],
				h,
				s,
				hourEm = '';
				for (h in hourTxt) {
					if(h % 6 == 0){
						hourEm += '<ul><li><span class="hourpat0'+h/6+'">'+hourPatText[h/6]+'</span>';
					}else{
						hourEm += '<ul><li>';
					}
					hourEm += '<span>'+hourTxt[h]+'</span>';
					for(s in weekTxt){
						hourEm += '<span id="week-'+ s +'-hour-'+ h +'"></span>';
					}
					hourEm += '</li></ul>';
				};
				$('.hourDate').html(hourEm);
		}

		//构建周
		var weekDraw = function(){
			var w = 0,
				weekEm = '<ul>';
			for (; w < weekTxt.length; w++) {
				weekEm += '<li class="data-day-'+(parseInt(w) + 1)+'" data-day='+(parseInt(w) + 1)+'>'+weekTxt[w]+'</li>';
			};
			weekEm += '</ul>';
			$('.weekDate').html(weekEm);
		}

		//构建日期
		var dateDraw = function(){
			var i = 0,
				dateEm = '<ul>';
			for(;i<7;i++){
				dateEm += '<li class="data-week-'+(parseInt(i) + 1)+'"></li>';
			};
			dateEm += '</ul>';
			$('.motDate').html(dateEm);
		}
		
		//填充日期
		var fillDate = function(){
			var curDay = initDate.getDay();
			if(curDay == 0){
				curDay = 7;
			};
			initDate.setDate(initDate.getDate() - curDay + 1);
			
			var myDate = new Date(initDate),
				day = 0,
				dateNow = new Date;
			for(; day < 7; day++){
				var $thisDay = $('.data-week-'+(parseInt(day) + 1)),
					$thisWeek = $('.data-day-'+(parseInt(day) + 1)),
					y = myDate.getFullYear(),
					m = myDate.getMonth()+1,
					d = myDate.getDate();
				$thisDay.html(((m<10?'0'+m:m)+'月'+(d<10?'0'+d:d)+'日'));
				$thisDay.attr({
					'data-year': y,
					'data-month': m,
					'data-date': d
				});
				if(myDate.getFullYear()==dateNow.getFullYear()&&myDate.getMonth()==dateNow.getMonth()&&myDate.getDate()==dateNow.getDate()){
					$thisDay.html('今天').addClass('active');
					$thisWeek.addClass('active');
				};
				myDate.setDate(myDate.getDate() + 1);
			};
		}
		
		//加载日期
		var reload = function(){
			dateDraw();
			weekDraw();
			hourDraw();
			fillDate();
		}
		reload();
		
		//下一周
		$('.next-week').live('click',function(){
			initDate.setDate(initDate.getDate()+7);
			reload();
		})
		
		//上一周
		$('.prev-week').live('click',function(){
			 var now = new Date();
             if (initDate.getTime() > now.getTime()) {
             	initDate.setDate(initDate.getDate() - 7);
            	reload();
             }
        	
		})
})