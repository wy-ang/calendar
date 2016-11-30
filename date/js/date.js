/**
 * 日历插件
 * 支持正常日期展示及场次预约
 * 汪洋
 **/
$(function(){
		// 初始化
		var initDraw = function(){
			initDate = new Date();
			initDate.setDate(1);
		}
		initDraw();

		//构建月
		var curMonthDays = new Date(initDate.getFullYear(), (initDate.getMonth()+1), 0).getDate();
		var weekTxt = ['日','一', '二', '三', '四', '五', '六'];
		var curDay;
		var hourDraw = function(){
				var h,
				hourEm = '';
				curDay = initDate.getDay();
				initDate.setDate(initDate.getDate() - curDay);
				var tDay = new Date(initDate);

				for(var i = 0;i<curMonthDays+11;i++){
					if(i%7==0){
						hourEm += '<tr>';
					}
					var y = tDay.getFullYear(),
						m = tDay.getMonth()+1,
						d = tDay.getDate();
						hourEm += '<td data="'+y+'-'+(m<10?'0'+m:m)+'-'+(d<10?'0'+d:d)+'"><sup>'+(d<10?'0'+d:d)+'</sup></td>';
						tDay.setDate(tDay.getDate() + 1);
					if(i%7==6){
						hourEm += '</tr>';
					}
				}
				$('.hourDate').html(hourEm);
		}

		//构建周
		var weekDraw = function(){
			var w = 0,
				weekEm = '<tr>';
			for (; w < weekTxt.length; w++) {
				weekEm += '<td class="data-day-'+(parseInt(w) + 1)+'" data-day='+(parseInt(w) + 1)+'><span>'+weekTxt[w]+'</span></td>';
			};
			weekEm += '</tr>';
			$('.weekDate').html(weekEm);
		}

		//显示当前月
		var viewMonth = function(){
			$('.now-month').html(initDate.getFullYear()+'年'+(initDate.getMonth()+1)+'月');
		}
		viewMonth();

		//加载日期
		var reload = function(){
			weekDraw();
			hourDraw();
		}
		reload();

		//下一月
		$('.next-week').live('click',function(){
			initDate.setDate(initDate.getDate() + curDay);
			initDate.setMonth(initDate.getMonth() + 1);
			viewMonth();
			reload();
			getSiteTime();
			//overdueTime();
		});

		//上一月
		$('.prev-week').live('click',function(){
			initDate.setDate(initDate.getDate() + curDay);
       		initDate.setMonth(initDate.getMonth() - 1);
       		viewMonth();
      		reload();
      		getSiteTime();
				//overdueTime();
		});

		//过期时间
		var overdueTime = function(){
				var nowDate = new Date(),
						y = nowDate.getFullYear(),
						m = nowDate.getMonth()+1,
						d = nowDate.getDate();

				$('span[data][hour]').each(function(){
						var data = $(this).attr('data');
						var hour = $(this).attr('hour');

						var data = data.match(/[0-9]/g);
						var data = data.join('');
						var data = parseInt(data);

						var nData = y+'/'+(m<10?'0'+m:m)+'/'+(d<10?'0'+d:d);
						var nData = nData.match(/[0-9]/g);
						var nData = nData.join('');
						var nData = parseInt(nData);

						if(nData>data){
									$(this).addClass('disabled');
						}
						if(nData==data){
								if(hour <= nowDate.getHours()){
									$(this).addClass('disabled');
								}
						}
				})

		}
		overdueTime();


		var getSiteTime = function(){
			var _self = $(this),
			date = _self.attr('data');

			$.ajax({
				url:'https://raw.githubusercontent.com/wy-ang/once/master/season.json',
				dataType:'json',
				type:'get',
				data:{
					aaa:111
				},
				success:function(data){
					var $layer = '<div class="container layer visible-xs-block">';
							$layer += '<div class="row">';
							$layer += '<span class="arrow"></span>';
					for(var i in data){
						var date = data[i].date,
						size = data[i].size;
						for(var j in data[i].list){
							!(function(i){
								var fieldName = data[i].list[j].fieldName,
								type = data[i].list[j].type;

								$('td[data='+date+']').append(type==0?'<a class="label label-primary notSed visible-lg-block" type="0"><i class="glyphicon"></i> '+fieldName+'</a>':'<a class="label label-danger visible-lg-block"><i class="glyphicon glyphicon-remove" type="1"></i> ' +fieldName+'</a>');
								$layer += '<span class="col-xs-10 col-sm-10 label label-primary">'+fieldName+'</span>';
						})(i);

							// $("td").tooltip({
							// 	trigger:'hover',
							// 	html:true,
							// 	title:'<div class=" visible-xs-block"><a class="label label-primary notSed" type="0"><i class="glyphicon"></i> '+data[i].list[j].fieldName+'</a></div>',
							// 	placement:'bottom'
							// });
						}
						$('td[data='+date+']').append('<span class="tag visible-xs-block" type="0">'+size+'</span>');
					}
					$layer += '</div>';
					$layer += '</div>';
					$('tbody td').live('click',function(){
						var _self = $(this);
						var x = _self.offset();
						var w = _self.outerWidth();
						var h = _self.outerHeight();
						_self.append($layer);
					//	_self.css('background','#428bca').siblings().css('background','none');
						$('.layer').css({
							top:x.top+h+6,
							left:0
						});
						$('.arrow').css({
							left:x.left+w/2
						})
					});
				}
			})
		}
		getSiteTime();

		var info = {};
		$('.notSed').live('click',function(){
			var _self = $(this);
			var type = _self.attr('type');
			var data = _self.parents('td').attr('data');
			var obj = {
					selNot:function(){
						_self.attr('type',1).find('i').addClass('glyphicon-ok');
						info = {
							type : type,
							text : _self.text(),
							data : data
						}
					},
					selYes:function(){
						_self.attr('type',0).find('i').removeClass('glyphicon-ok');
					}
			}
			type==0?obj.selNot():obj.selYes();
		});

		$('.btn').live('click',function(){
			$('.info').html(info.data+info.text);
		})
			/*$.ajax({
				url:'https://nutz.cn/yvr/search?q=maven&format=json',
				dataType:'json',
				type:'GET',
				success:function(data){
					for(var i=0;i<data.suggestions.length;i++){
						var date = data.suggestions[i].updateTime.substring(0,10);
						$('td[data='+date+']').append('<span class="label label-success">'+data.suggestions[i].title+'</span><span class="label label-success">'+data.suggestions[i].userId+'</span><span class="label label-important">'+data.suggestions[i].good+'</span>');
						console.log(date);
					}
				}
			})*/
	});
