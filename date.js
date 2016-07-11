$(function(){
	// 初始化
		var init = function(){
			initDate = new Date();
		}
		init();

		//构建时间段
		var weekTxt = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
		var hourTxt = ['08:00 - 09:00', '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00', '17:00 - 18:00', '18:00 - 19:00', '19:00 - 20:00', '20:00 - 21:00', '21:00 - 22:00', '22:00 - 23:00'];
		var hourDraw = function(){
				var hourPatText = ['上<br/>午', '下<br/>午', '晚<br/>上'],
				h,
				s,
				hourEm = '';
				for (h in hourTxt) {
					if(h % 6 == 0){
						hourEm += '<ul><li><span class="hourpat0'+h/6+'">'+hourPatText[h/6]+'</span>';
					}else{
						hourEm += '<ul><li>';
					}
					hourEm += '<span class="week-hour">'+hourTxt[h]+'</span>';
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
				weekEm += '<li class="data-day-'+(parseInt(w) + 1)+'" data-day='+(parseInt(w) + 1)+'><span>'+weekTxt[w]+'</span><span class="data-date-'+(parseInt(w) + 1)+'"></span></li>';
			};
			weekEm += '</ul>';
			$('.weekDate').html(weekEm);
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
				var $thisDay = $('.data-date-'+(parseInt(day) + 1)),
					$thisWeek = $('.data-day-'+(parseInt(day) + 1)),
					y = myDate.getFullYear(),
					m = myDate.getMonth()+1,
					d = myDate.getDate();
				$thisDay.html('('+(m<10?'0'+m:m)+'月'+(d<10?'0'+d:d)+'日)');
				$thisDay.attr({
					'data-year': y,
					'data-month': m,
					'data-date': d
				});
				if(myDate.getFullYear()==dateNow.getFullYear()&&myDate.getMonth()==dateNow.getMonth()&&myDate.getDate()==dateNow.getDate()){
						$thisDay.html('(今天)').addClass('active');
				};
				myDate.setDate(myDate.getDate() + 1);
			};
		}

		//加载日期
		var reload = function(){
			weekDraw();
			hourDraw();
			fillDate();
		}
		reload();

		//下一周
		$('.next-week').live('click',function(){
			initDate.setDate(initDate.getDate()+7);
			reload();
			overdueTime();
		})

		//上一周
		$('.prev-week').live('click',function(){
			 var now = new Date();
           if (initDate.getTime() > now.getTime()) {
           		initDate.setDate(initDate.getDate() - 7);
          		reload();
		 		overdueTime();
		   }
		})
		$('a.prev-week').addClass('grey');

		//过期时间
		var overdueTime = function(){
			for (var w = 0; w < 7; w++){
				var nowDate = new Date();
				var nowYear = nowDate.getFullYear();
				var nowMon = nowDate.getMonth() + 1;
				var nowDay = nowDate.getDate();
				var nowWeek = nowDate.getDay();
				var nowHours = nowDate.getHours();
				var conDate = $('span[class^="data-date-'+w+'"]');
				var conYear = conDate.attr('data-year');
				var conMon = conDate.attr('data-month');
				var conDay = conDate.attr('data-date');
				var tDay = conYear+'/'+conMon+'/'+conDay;
				var nDay = nowYear+'/'+nowMon+'/'+nowDay;
				
				for (var x = 0;x < 14;x++){
						if(hourTxt[x].substring(0,2) <= nowHours && w <= nowWeek && tDay <= nDay){
							$('span[id="week-'+(parseInt(w) - 1)+'-hour-'+x+'"]').addClass('disabled');
						}
				}
			}
		}
		overdueTime();


		//选中
		$('span[id^=week][class!="disabled"]').live('click',function(){
				var _self = $(this);
				var time = _self.siblings('.week-hour').html();

				console.log(time);
				_self.addClass('selected');

		})
})
