$(function(){
	// 初始化
		var init = function(){
				initDate = new Date();
		}
		init();

		var weekDraw= function(){
			var weekTxt = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
					weekWrap = [],
					nowDate = new Date();

					weekWrap.push('<ul>');
					for(i in weekTxt){
							weekWrap.push('<li>'+weekTxt[i]+'</li>');
							nowDate.setDate(nowDate.getDate() + 1);
					}
					weekWrap.push('</ul>');
					$('.monWeekTit').html(weekWrap.join(''));
		}
		weekDraw();

		var dateDraw = function(){
				var getNewDate = new Date(),
						getYear = getNewDate.getFullYear(),
						getMon = getNewDate.getMonth(),
						getDay = getNewDate.getDate();
				var setNewDate = new Date(getYear,getMon,1),
						firstDay = setNewDate.getDay();


				var dateWrap = [];
				var nowDate = new Date(setNewDate);
				var weekTxt = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

				for(var i = 0;i<6;i++){
					dateWrap.push('<ul>');
						for (var j =0;j<7;j++) {
								
								dateWrap.push('<li date='+nowDate.toLocaleString()+' week='+nowDate.getDay()+'>'+nowDate.getDate()+'</li>');
								 nowDate.setDate(nowDate.getDate() + 1);
						}
						dateWrap.push('</ul>');
				}
				$('.monWeekBot').html(dateWrap.join(''));
		}
		dateDraw();
})
