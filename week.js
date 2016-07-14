$(function(){
	// 初始化
		var init = function(){
			//构建时间段
			var weekTxt = ['一', '二', '三', '四', '五', '六', '日'],
					hourPatText = ['上<br/>午', '下<br/>午', '晚<br/>上'],
					$weekDate = $('.weekWrap'),
					$hourDate = $('.hourWrap'),
					hourWrap = [],
					weekWrap = [],
					nowDate = new Date();

					weekWrap.push('<ul>');
					for(w in weekTxt){
							weekWrap.push('<li date-week="'+(parseInt(w) + 1)+'">'+weekTxt[w]+'</li>');
							nowDate.setDate(nowDate.getDate() + 1);
					}
					weekWrap.push('</ul>');
					$weekDate.html(weekWrap.join(''));

					for(h in hourPatText){
						hourWrap.push('<ul>');
						hourWrap.push('<li>'+hourPatText[h]+'</li>');
						for(w in weekTxt){
								hourWrap.push('<li week="'+(parseInt(w) + 1)+'"></li>');
								nowDate.setDate(nowDate.getDate() + 1);
						}
						hourWrap.push('</ul>');
					}
					$hourDate.html(hourWrap.join(''));

					for(w in weekTxt){
							$('li[week="'+(parseInt(w) + 1)+'"]').addClass('right');
					}

		}
		init();
})
