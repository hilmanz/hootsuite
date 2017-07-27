var apitoken = null;
var auth_url = "";
var dashboard_url = "";
var mainkey = "SONAR-";
var Model = function(){
	var self = this;
	this.inputUsername = ko.observable('');
	this.inputPassword = ko.observable('');
	this.has_message = ko.observable(false);
	this.message = ko.observable('');
	this.loginpage = ko.observable(true);
	this.loadingProgress = ko.observable(false);
	this.loading_message = ko.observable('');
	this.pid = ko.observable('');
	this.uid = ko.observable('');
	this.token = ko.observable('');

	this.is_stream = ko.observable(false);
	this.is_fb_stream = ko.observable(false);
	this.is_welcome = ko.observable(false);
	this.is_twitter_analytics = ko.observable(false);
	this.is_fb_analytics = ko.observable(false);
	this.is_consolidated_stream = ko.observable(false);
	this.is_consolidated_analytics = ko.observable(false);

	this.opt_stream = ko.observable(true);
	this.opt_analytics = ko.observable(false);
	this.opt_consolidated = ko.observable(true);
	this.opt_media = ko.observable(false);
	this.opt_twitter = ko.observable(false);
	this.opt_forum = ko.observable(false);
	this.opt_web = ko.observable(false);
	this.opt_facebook = ko.observable(false);
	this.opt_blog = ko.observable(false);

	this.tab = ko.observable('stream');
	this.channel = ko.observable('consolidated');

	this.stream_items = ko.observableArray([]);
	this.fb_stream_items = ko.observableArray([]);

	this.searchInput = ko.observable('');

	this.topics = ko.observableArray([]);
	this.campaign_id = ko.observable(0);
	this.is_account_info = ko.observable(false);
	//twitter analytics data
	this.twitter_buzz = ko.observableArray([]);
	this.tweets = ko.observable(0);
	this.interactions = ko.observable(0);
	this.potential_reach = ko.observable(0);
	this.tweet_sentiment_positive = ko.observable(0);
	this.tweet_sentiment_negative = ko.observable(0);
	this.tweet_sentiment_neutral = ko.observable(0);
	this.viral_sentiment_positive = ko.observable(0);
	this.viral_sentiment_negative = ko.observable(0);
	this.viral_sentiment_neutral = ko.observable(0);
	this.viral_reach = ko.observable(0);
	this.engagement_rate = ko.observable(0);
	//-->

	this.loadTopics = function(){
		$.get("https://app.sonarplatform.com/secure_api/campaign_list_api.php?token="+self.token(),
			function(response){

				if(response!=null && typeof response.campaigns !== 'undefined'){
					self.topics.removeAll();
					console.log('new topics');
					for(var i in response.campaigns){
						console.log(response.campaigns[i]);
						self.topics.push(response.campaigns[i]);
					}
				}
			});
	}
	this.select_tab = function(tab){
		self.reset_tab();
		if(tab=='stream'){
			self.opt_stream(true);
		}else{
			self.opt_analytics(true);
		}
		self.tab(tab);
	}
	this.reset_tab = function(){
		self.opt_analytics(false);
		self.opt_stream(false);
	}
	this.select_channel = function(channel){
		self.reset_channel();
		switch(channel){
			case "twitter":
				self.opt_twitter(true);
			break;
			case "facebook":
				self.opt_facebook(true);
			break;
			case "web":
				self.opt_web(true);
			break;
			case "forum":
				self.opt_forum(true);
			break;
			case "media":
				self.opt_media(true);
			break;
			case "blog":
				self.opt_blog(true);
			break;
			default:
				self.opt_consolidated(true);
			break;


		}

		self.channel(channel);
	}
	this.reset_channel = function(){
		self.opt_consolidated(false);
		self.opt_media(false);
		self.opt_twitter(false);
		self.opt_facebook(false);
		self.opt_forum(false);
		self.opt_media(false);
		self.opt_blog(false);
	}
	this.reset_tab = function(){
		self.opt_analytics(false);
		self.opt_stream(false);
	}
	this.create_tab = function(){
		self.is_welcome(false);
		self.loadingProgress(true);
		self.loading_message("Please wait, your tab will be ready in a moment !");
		self.storeKey(self.pid()+"_channel",self.channel(),function(data){
			self.storeKey(self.pid()+"_tab",self.tab(),function(data){
				self.storeKey(self.pid()+"_campaign",self.campaign_id(),function(data){
					console.log("data saved !");
					self.loadTabContent();
				});
			});
		});
	}
	this.set_topic = function(id){
		$('.btn_topic').removeClass('checked');
		$('a[data-id='+id+']').addClass('checked');
		self.campaign_id(id);
	}
	this.login = function(){
		self.loginpage(false);
		self.loadingProgress(true);

		var username = self.inputUsername();
		var password = self.inputPassword();
		$.post(auth_url,{
			email:username,
			password:password
		},function(response){
			if(response.status==0){
				document.location=dashboard_url+"?pid="+self.pid()+"&uid="+self.uid();
			}else{
				self.has_message(true);
				self.message("INVALID USER / LOGIN !");
				self.loginpage(true);
				self.loadingProgress(false);
			}
		});


	}

	this.storeKey = function(name,val,callback){

		hsp.getData(function(data){
			if(data==null){
				data = {apitoken:null};
			}
			data[name] = val;
			hsp.saveData(data,function(d){
				console.log('hsp data updated');
				callback(d);
			});
		});

	}
	this.getKey = function(name,callback){
		hsp.getData(function(data){
			try{
				callback(data[name]);
			}catch(e){
				callback(null)
			}

		});
	}

	this.loadTabContent = function(){
		//check all the keys
		var pid = self.pid();
		self.reset_screen();
		self.loadingProgress(true);
		self.loading_message("Checking Sessions..");
		self.getKey(pid+"_tab",function(data){
			console.log('current tab : ',data);

			if(data != null){
				console.log('search: ',self.searchInput());
				switch(data){
					case 'analytics':
						self.loadAnalytics();
					break;
					default:
						self.loadStreams();
					break;
				}
			}else{
				self.reset_screen();
				self.is_welcome(true);
				self.loadTopics();
			}

		});
	}
	this.search = function(){
		self.loadTabContent();

	}
	this.reset_screen = function(){
		self.is_welcome(false);
		self.loadingProgress(false);
		self.is_stream(false);
		self.is_consolidated_analytics(false);
		self.is_consolidated_stream(false);
		self.is_fb_analytics(false);
		self.is_twitter_analytics(false);
		self.is_fb_stream(false);
		self.is_blog_analytics(false);
		self.is_blog_stream(false);
		self.is_forum_analytics(false);
		self.is_forum_stream(false);
		self.is_media_stream(false);
		self.is_media_analytics(false);
	}
	this.loadAnalytics = function(){
		var pid = self.pid();

		self.loading_message("Preparing your analytics tab..");
		self.tab('analytics');
		self.getKey(pid+"_channel",function(channel){
			self.channel(channel);
			console.log('selected_channel',self.channel());
			self.getKey(pid+"_campaign",function(campaign_id){
				self.campaign_id(campaign_id);
				switch(self.channel()){
					case 'twitter':
						//load everything
						self.loadTwitterAnalyticsTab();
					break;
					case 'facebook':
						self.loadFacebookAnalyticsTab();
					break;
					case 'media':
						self.loadMediaAnalyticsTab();
					break;
					case 'forum':
						self.loadForumAnalyticsTab();
					break;
					case 'blog':
						self.loadBlogAnalyticsTab();
					break;
					case 'consolidated':
						self.loadConsolidatedAnalyticsTab();
					break;
					default:
						self.loadConsolidatedAnalyticsTab();
					break;
				}
				self.searchInput('');
			});
		});
	}

	this.loadStreams = function(){
		var pid = self.pid();
		self.loading_message("Preparing your streams tab..");
		self.tab('stream');

		self.getKey(pid+"_channel",function(channel){
			self.channel(channel);
			self.getKey(pid+"_campaign",function(campaign_id){
				console.log('selected_channel',self.channel());
				self.campaign_id(campaign_id);
				switch(self.channel()){
					case 'twitter':
						//load everything
						self.loadTwitterStreamTab();
					break;
					case 'facebook':
						self.loadFacebookStreamTab();
					break;
					case 'media':
						hsp.updatePlacementSubtitle('Media Streams');
						self.loadMediaStreamTab();
					break;
					case 'forum':
						self.loadForumStreamTab();
					break;
					case 'blog':
						self.loadBlogStreamTab();
					break;
					case 'consolidated':

						self.loadConsolidatedStreamTab();
					break;
					default:
						self.loadConsolidatedStreamTab();
					break;
				}
				self.searchInput('');
			});
		});
	}

	this.loadTwitterAnalyticsTab = function(){
		self.reset_screen();
		self.is_twitter_analytics(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));


		var url = "https://app.sonarplatform.com/secure_api/twitter_report_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date;

		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}

		$.get(url,function(response){
			if(typeof response !== 'undefined'){
				var data = response[self.campaign_id()];
				self.twitter_buzz.removeAll();
				for(var i in data.twitter_buzz){
					self.twitter_buzz.push({dt:i,amount:data.twitter_buzz[i]});
				}
				self.tweets(number_format(data.tweets));
				self.interactions(number_format(data.interactions));
				self.potential_reach(number_format(data.potential_reach));
				self.tweet_sentiment_positive(data.tweet_sentiment['1']);
				self.tweet_sentiment_neutral(data.tweet_sentiment['0']);
				self.tweet_sentiment_negative(data.tweet_sentiment['-1']);

				self.viral_sentiment_positive(data.viral_sentiment['1']);
				self.viral_sentiment_neutral(data.viral_sentiment['0']);
				self.viral_sentiment_negative(data.viral_sentiment['-1']);

				self.viral_reach(number_format(data.viral_reach));
				self.engagement_rate(data.engagement_rate);

				self.loadTwitterBuzzChart();
				self.loadTwitterSentimentChart();

			}
		});
	}
	this.daily_articles = ko.observableArray([]);
	this.media_sentiment = ko.observable();
	this.media_posts = ko.observable();
	this.media_comments = ko.observable();
	this.media_total_reach = ko.observable();
	this.media_engagement_rate = ko.observable();
	this.media_sentiment = ko.observable();
	this.media_coverage = ko.observable();
	this.is_media_analytics = ko.observable(false);
	this.loadMediaAnalyticsTab = function(){
		self.reset_screen();
		self.is_media_analytics(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/news_report_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date;
		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){
			if(typeof response !== 'undefined'){
				var data = response[self.campaign_id()];
				self.daily_articles.removeAll();
				for(var i in data.daily_articles){
					self.daily_articles.push({dt:i,amount:data.daily_articles[i]});
				}
				self.media_posts(number_format(data.posts));
				self.media_comments(number_format(data.comments));
				self.media_total_reach(number_format(data.total_reach));


				self.media_engagement_rate(number_format(data.engagement_rate));
				self.media_sentiment(data.media_sentiment);
				self.media_coverage(data.coverage);
				self.loadMediaDailyCharts();
				self.loadMediaCoverage();
				self.loadMediaSentiment();
				//self.loadFacebookContentInteractionChart();
			}
		});
	}
	this.is_forum_analytics = ko.observable(false);
	this.daily_threads = ko.observableArray([]);
	this.forum_replies = ko.observable();
	this.threads = ko.observable();
	this.forum_sentiment = ko.observable();
	this.loadForumAnalyticsTab = function(){
		self.reset_screen();
		self.is_forum_analytics(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/forum_report_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date;

		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){
			if(typeof response !== 'undefined'){
				var data = response[self.campaign_id()];
				self.daily_threads.removeAll();
				for(var i in data.daily_threads){
					self.daily_threads.push({dt:i,amount:data.daily_threads[i]});
				}
				self.threads(number_format(data.threads));
				self.forum_replies(number_format(data.replies));

				self.forum_sentiment(data.media_sentiment);

				self.loadForumDailyCharts();
				self.loadForumSentiment();
				//self.loadFacebookContentInteractionChart();
			}
		});
	}

	this.daily_buzz = ko.observableArray([]);
	this.c_engagement = ko.observable(0);
	this.c_shareofvoice = ko.observable(0);
	this.c_totalauthor = ko.observable(0);
	this.avger = ko.observable(0);
	this.c_totalpost = ko.observable(0);
	this.postofchannel = ko.observable();
	this.unique_authors = ko.observable(0);
	this.loadConsolidatedAnalyticsTab = function(){
		self.reset_screen();
		self.is_consolidated_analytics(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/dashboard_report_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date;

		console.log(url);
		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){
			if(typeof response !== 'undefined'){
				var data = response[self.campaign_id()];
				self.daily_buzz.removeAll();
				for(var i in data.dailybuzz){
					self.daily_buzz.push({dt:i,amount:data.dailybuzz[i]});
				}
				self.c_engagement(number_format(data.engagement));
				self.c_shareofvoice(number_format(data.shareofvoice));
				self.c_totalauthor(number_format(data.totalauthor));
				self.avger(number_format(data.avger));
				self.c_totalpost(number_format(data.totalpost));
				self.postofchannel(data.postofchannel);
				//self.forum_sentiment(data.media_sentiment);
				var url = "https://app.sonarplatform.com/secure_api/dashboard_author_report_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date;
				 $.get(url,function(response){
					console.log(url);
					var data = response[self.campaign_id()];
					self.unique_authors(number_format(data.unique_authors));
					self.loadDailyBuzzDailyCharts();
					self.loadPostOfChannel();
				  });

			}
		});
	}
	this.loadPostOfChannel = function(){
		var d  = self.postofchannel();
		var series = [];
		for(var i in d){
			series.push(
				{
					name: i,
					y: d[i],
				}
			);
		}
		$('#post-channel-chart').highcharts({
			colors: ['#0d233a', '#2f7ed8', '#8bbc21','#ff0000','#00ff00','#0000ff'],
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: ''
			},
			exporting: {
			 enabled: false
			},
			credits: {
				enabled: false
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: "Post of Channel",
				colorByPoint: true,
				data: series
			}]
		});
	}
	this.loadDailyBuzzDailyCharts = function(){
		var twitter_buzz_categories = [];
		var twitter_buzz_data_a = [];
        var twitter_buzz = self.daily_buzz();
        for(var i in twitter_buzz){
        	var y = twitter_buzz[i].dt.substring(0,4);
        	var m = twitter_buzz[i].dt.substring(6,4);
        	var d = twitter_buzz[i].dt.substring(8,6);
            twitter_buzz_categories.push(d+'/'+m+'/'+y);
            twitter_buzz_data_a.push(twitter_buzz[i].amount);
        }

        $('#daily-buzz-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: twitter_buzz_categories
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Daily Buzz',
                data: twitter_buzz_data_a
            }]
        });
	}
	this.is_blog_analytics = ko.observable(false);
	this.daily_blogs = ko.observableArray([]);
	this.blog_posts = ko.observable(0);
	this.loadBlogAnalyticsTab = function(){
		self.reset_screen();
		self.is_blog_analytics(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/blog_report_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date;
		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){
			if(typeof response !== 'undefined'){
				var data = response[self.campaign_id()];
				self.daily_blogs.removeAll();
				for(var i in data.daily_blogs){
					self.daily_blogs.push({dt:i,amount:data.daily_blogs[i]});
				}
				self.blog_posts(number_format(data.posts));


				//self.forum_sentiment(data.media_sentiment);

				self.loadBlogDailyCharts();
				//self.loadForumSentiment();
				//self.loadFacebookContentInteractionChart();
			}
		});
	}
	this.loadBlogDailyCharts = function(){
		var twitter_buzz_categories = [];
		var twitter_buzz_data_a = [];
        var twitter_buzz = self.daily_blogs();
        for(var i in twitter_buzz){
        	var y = twitter_buzz[i].dt.substring(0,4);
        	var m = twitter_buzz[i].dt.substring(6,4);
        	var d = twitter_buzz[i].dt.substring(8,6);
            twitter_buzz_categories.push(d+'/'+m+'/'+y);
            twitter_buzz_data_a.push(twitter_buzz[i].amount);
        }

        $('#daily-blog-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: twitter_buzz_categories
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Daily Threads',
                data: twitter_buzz_data_a
            }]
        });
	}
	this.loadForumDailyCharts = function(){
		var twitter_buzz_categories = [];
		var twitter_buzz_data_a = [];
        var twitter_buzz = self.daily_threads();
        for(var i in twitter_buzz){
        	var y = twitter_buzz[i].dt.substring(0,4);
        	var m = twitter_buzz[i].dt.substring(6,4);
        	var d = twitter_buzz[i].dt.substring(8,6);
            twitter_buzz_categories.push(d+'/'+m+'/'+y);
            twitter_buzz_data_a.push(twitter_buzz[i].amount);
        }

        $('#daily-threads-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: twitter_buzz_categories
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Daily Threads',
                data: twitter_buzz_data_a
            }]
        });
	}
	this.loadForumSentiment = function(){
		var d = self.forum_sentiment();
		var categories = [];
		var positive = [];
		var negative = [];
		var neutral = [];
		for(var i in d){
			categories.push(i);
			positive.push(d[i]['1']);
			negative.push(d[i]['-1']);
			neutral.push(d[i]['0']);
		}
		$('#forum-sentiment-chart').highcharts({
					colors: ['#64bf0a', '#e12626','#999999' ],
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Forum Sentiments'
	        },
	        credits:false,
	        xAxis: {
	            categories: categories
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Total fruit consumption'
	            },
	            stackLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                }
	            }
	        },
	        legend: {
	            align: 'right',
	            x: -30,
	            verticalAlign: 'top',
	            y: 25,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
	        },
	        tooltip: {
	            formatter: function () {
	                return '<b>' + this.x + '</b><br/>' +
	                    this.series.name + ': ' + this.y + '<br/>' +
	                    'Total: ' + this.point.stackTotal;
	            }
	        },
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: true,
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                    style: {
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Positive',
	            data: positive
	        }, {
	            name: 'Negative',
	            data: negative
	        }, {
	            name: 'Neutral',
	            data: neutral
	        }]
	    });
	}
	this.loadMediaSentiment = function(){
		var d = self.media_sentiment();
		var categories = [];
		var positive = [];
		var negative = [];
		var neutral = [];
		for(var i in d){
			categories.push(i);
			positive.push(d[i]['1']);
			negative.push(d[i]['-1']);
			neutral.push(d[i]['0']);
		}
		$('#media-sentiment-chart').highcharts({
					colors: ['#64bf0a', '#e12626','#999999' ],
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Media Sentiments'
	        },
	        xAxis: {
	            categories: categories
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Total fruit consumption'
	            },
	            stackLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                }
	            }
	        },
	        legend: {
	            align: 'right',
	            x: -30,
	            verticalAlign: 'top',
	            y: 25,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
	        },
	        tooltip: {
	            formatter: function () {
	                return '<b>' + this.x + '</b><br/>' +
	                    this.series.name + ': ' + this.y + '<br/>' +
	                    'Total: ' + this.point.stackTotal;
	            }
	        },
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: true,
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                    style: {
	                        textShadow: '0 0 3px black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Positive',
	            data: positive
	        }, {
	            name: 'Negative',
	            data: negative
	        }, {
	            name: 'Neutral',
	            data: neutral
	        }]
	    });
	}
	this.loadMediaCoverage = function(){
		var d  = self.media_coverage();
		var series = [];
		for(var i in d){
			series.push(
				{
					name: i,
					y: d[i],
				}
			);
		}
		$('#media-coverage-chart').highcharts({
			colors: ['#0d233a', '#2f7ed8', '#8bbc21','#ff0000','#00ff00','#0000ff'],
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: ''
			},
			exporting: {
			 enabled: false
			},
			credits: {
				enabled: false
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: "Coverage",
				colorByPoint: true,
				data: series
			}]
		});
	}
	this.loadMediaDailyCharts = function(){
		var twitter_buzz_categories = [];
		var twitter_buzz_data_a = [];
        var twitter_buzz = self.daily_articles();
        for(var i in twitter_buzz){
        	var y = twitter_buzz[i].dt.substring(0,4);
        	var m = twitter_buzz[i].dt.substring(6,4);
        	var d = twitter_buzz[i].dt.substring(8,6);
            twitter_buzz_categories.push(d+'/'+m+'/'+y);
            twitter_buzz_data_a.push(twitter_buzz[i].amount);
        }

        $('#daily-articles-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: twitter_buzz_categories
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Daily Articles',
                data: twitter_buzz_data_a
            }]
        });
	}
	this.facebook_daily_activity = ko.observableArray([]);
	this.posts = ko.observable();
	this.comments = ko.observable();
	this.likes = ko.observable();
	this.shares = ko.observable();
	this.content_interaction = ko.observable();
	this.loadFacebookAnalyticsTab = function(){
		self.reset_screen();
		self.is_fb_analytics(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/facebook_report_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date;
		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){
			if(typeof response !== 'undefined'){
				var data = response[self.campaign_id()];
				self.facebook_daily_activity.removeAll();
				for(var i in data.facebook_daily_activity){
					self.facebook_daily_activity.push({dt:i,amount:data.facebook_daily_activity[i]});
				}
				self.posts(number_format(data.posts));
				self.comments(number_format(data.comments));
				self.likes(number_format(data.likes));


				self.shares(number_format(data.shares));


				self.content_interaction(data.content_interaction);
				self.loadFacebookDailyChart();
				self.loadFacebookContentInteractionChart();
			}
		});
	}
	this.loadFacebookContentInteractionChart = function(){
		var d  = self.content_interaction();
		if(typeof d.event === 'undefined'){
			d.event = 0;
		}
		$('#interaction-chart').highcharts({
			colors: ['#0d233a', '#2f7ed8', '#8bbc21','#ff0000','#00ff00','#0000ff'],
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: ''
			},
			exporting: {
			 enabled: false
			},
			credits: {
				enabled: false
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: "Content Interactions",
				colorByPoint: true,
				data: [{
					name: "event",
					y: d.event,
					selected:false,
				}, {
					name: "link",
					y: d.link,

				}, {
					name: "note",
					y: d.note
				},
				{
					name: "photo",
					y: d.photo,

				},
				{
					name: "status",
					y: d.status,

				},
				{
					name: "video",
					y: d.video,

				}]
			}]
		});

	}
	this.loadFacebookDailyChart = function(){
		var twitter_buzz_categories = [];
		var twitter_buzz_data_a = [];
        var twitter_buzz = self.facebook_daily_activity();
        for(var i in twitter_buzz){
        	var y = twitter_buzz[i].dt.substring(0,4);
        	var m = twitter_buzz[i].dt.substring(6,4);
        	var d = twitter_buzz[i].dt.substring(8,6);
            twitter_buzz_categories.push(d+'/'+m+'/'+y);
            twitter_buzz_data_a.push(twitter_buzz[i].amount);
        }

        $('#fb-daily-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: twitter_buzz_categories
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Facebook Daily Activity',
                data: twitter_buzz_data_a
            }]
        });
	}
	this.loadTwitterSentimentChart = function(){
		$('#sentiment-chart').highcharts({
			colors: ['#64bf0a', '#e12626','#999999' ],
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: ''
			},
			exporting: {
			 enabled: false
			},
			credits: {
				enabled: false
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			},
			series: [{
				name: "Sentiments",
				colorByPoint: true,
				data: [{
					name: "Positive",
					y: self.tweet_sentiment_positive()
				}, {
					name: "Negative",
					y: self.tweet_sentiment_negative(),
					sliced: true,
					selected: true
				}, {
					name: "Neutral",
					y: self.tweet_sentiment_neutral()
				}]
			}]
		});
	}
	this.loadTwitterBuzzChart = function(){
		var twitter_buzz_categories = [];
		var twitter_buzz_data_a = [];
        var twitter_buzz = self.twitter_buzz();
        for(var i in twitter_buzz){
        	var y = twitter_buzz[i].dt.substring(0,4);
        	var m = twitter_buzz[i].dt.substring(6,4);
        	var d = twitter_buzz[i].dt.substring(8,6);
            twitter_buzz_categories.push(d+'/'+m+'/'+y);
            twitter_buzz_data_a.push(twitter_buzz[i].amount);
        }

        $('#twitter-buzz-chart').highcharts({
            colors: ['#0d233a', '#2f7ed8', '#8bbc21'],
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            exporting: {
             enabled: false
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: twitter_buzz_categories
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Twitter Buzz',
                data: twitter_buzz_data_a
            }]
        });
	}
	this.loadTwitterStreamTab = function(){
		self.reset_screen();
		self.is_stream(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/twitter_data_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date+"&start=0&limit=20";

		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){

			if(typeof response.response.docs !== 'undefined'){
				self.stream_items.removeAll();
				for(var i in response.response.docs){
					var doc = response.response.docs[i];
					response.response.docs[i].interactions = number_format(doc.num_replies_i + doc.num_rts_i);
					response.response.docs[i].author_id_s = "@"+doc.author_id_s;
					if(typeof doc.attached_url_s === 'undefined'){
						response.response.docs[i].attached_url_s = "#";
					}
					response.response.docs[i].post_date = date("d/m/Y H:i",doc.published_timestamp_l);
					response.response.docs[i].viral_reach = number_format(doc.num_reach_i);
					response.response.docs[i].potential_reach = number_format(doc.num_reach_i + doc.num_followers_i);
					self.stream_items.push(response.response.docs[i]);

				}
			}
		});

	}
	this.loadFacebookStreamTab = function(){
		self.reset_screen();
		self.is_fb_stream(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/facebook_data_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date+"&start=0&limit=20";


		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){

			if(typeof response.response.docs !== 'undefined'){
				self.fb_stream_items.removeAll();
				for(var i in response.response.docs){
					var doc = response.response.docs[i];

					if(typeof doc.link_s === 'undefined'){
						response.response.docs[i].link_s = "#";
					}
					response.response.docs[i].post_date = date("d/m/Y H:i",doc.created_timestamp_l);
					response.response.docs[i].num_likes_i = number_format(doc.num_likes_i);
					response.response.docs[i].num_comments_i = number_format(doc.num_comments_i);
					response.response.docs[i].num_shares_i = number_format(doc.num_shares_i);

					self.fb_stream_items.push(response.response.docs[i]);

				}
			}
		});
	}
	this.is_media_stream = ko.observable(false);
	this.media_stream_items = ko.observableArray([]);
	this.loadMediaStreamTab = function(){
		self.reset_screen();
		self.is_media_stream(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/news_data_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date+"&start=0&limit=20";


		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){

			if(typeof response.response.docs !== 'undefined'){
				self.media_stream_items.removeAll();
				for(var i in response.response.docs){
					var doc = response.response.docs[i];

					if(typeof doc.link_s === 'undefined'){
						response.response.docs[i].link_s = "#";
					}
					if(typeof doc.media_name_s === 'undefined'){
						response.response.docs[i].media_name_s = "n/a";
					}
					doc.published_date_i = ""+doc.published_date_i;
					var y = doc.published_date_i.substring(0,4);
		        	var m = doc.published_date_i.substring(6,4);
		        	var d = doc.published_date_i.substring(8,6);
					response.response.docs[i].post_date = d+"/"+m+"/"+y;
					response.response.docs[i].num_comments_i = number_format(doc.num_comments_i);
					response.response.docs[i].num_news_reach_i = number_format(doc.num_news_reach_i);


					self.media_stream_items.push(response.response.docs[i]);

				}
			}
		});
	}
	this.is_forum_stream = ko.observable(false);
	this.forum_stream_items = ko.observableArray([]);

	this.loadForumStreamTab = function(){
		self.reset_screen();
		self.is_forum_stream(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/forum_data_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date+"&start=0&limit=20";
		console.log(url);


		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}

		$.get(url,function(response){

			if(typeof response.response.docs !== 'undefined'){
				self.forum_stream_items.removeAll();
				for(var i in response.response.docs){
					var doc = response.response.docs[i];

					if(typeof doc.link_s === 'undefined'){
						response.response.docs[i].link_s = "#";
					}
					if(typeof doc.media_name_s === 'undefined'){
						response.response.docs[i].media_name_s = "n/a";
					}
					doc.published_date_i = ""+doc.published_date_i;
					var y = doc.published_date_i.substring(0,4);
		        	var m = doc.published_date_i.substring(6,4);
		        	var d = doc.published_date_i.substring(8,6);
					response.response.docs[i].post_date = d+"/"+m+"/"+y;
					response.response.docs[i].num_replies_i = number_format(doc.num_replies_i);
					response.response.docs[i].num_views_i = number_format(doc.num_views_i);


					self.forum_stream_items.push(response.response.docs[i]);

				}
			}
		});
	}

	this.is_blog_stream = ko.observable(false);
	this.blog_stream_items = ko.observableArray([]);
	this.loadBlogStreamTab = function(){
		self.reset_screen();
		self.is_blog_stream(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/blog_data_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date+"&start=0&limit=20";
		console.log(url);

		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){

			if(typeof response.response.docs !== 'undefined'){
				self.blog_stream_items.removeAll();
				for(var i in response.response.docs){
					var doc = response.response.docs[i];

					if(typeof doc.link_s === 'undefined'){
						response.response.docs[i].link_s = "#";
					}
					if(typeof doc.author_s === 'undefined'){
						response.response.docs[i].author_s = "n/a";
					}
					doc.published_date_i = ""+doc.published_date_i;
					var y = doc.published_date_i.substring(0,4);
		        	var m = doc.published_date_i.substring(6,4);
		        	var d = doc.published_date_i.substring(8,6);
					response.response.docs[i].post_date = d+"/"+m+"/"+y;



					self.blog_stream_items.push(response.response.docs[i]);

				}
			}
		});
	}

	this.consolidated_stream_items = ko.observableArray([]);

	this.loadConsolidatedStreamTab = function(){
		self.reset_screen();
		self.is_consolidated_stream(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/dashboard_data_api.php?token="+self.token()+
				 "&campaign_ids="+self.campaign_id()+"&start_date="+start_date+
				 "&end_date="+end_date+"&start=0&limit=20";
		console.log(url);

		var keyword = self.searchInput();
		if(keyword.length>0){
			url+="&keyword="+keyword;
		}
		$.get(url,function(response){

			if(typeof response.response.docs !== 'undefined'){
				self.consolidated_stream_items.removeAll();
				for(var i in response.response.docs){
					var doc = response.response.docs[i];

					if(typeof doc.link_s === 'undefined'){
						response.response.docs[i].link_s = "#";
					}
					if(typeof doc.author_name === 'undefined'){
						response.response.docs[i].author_name = "n/a";
					}
					if(typeof doc.content === 'undefined'){
						response.response.docs[i].content = "";
					}
					doc.published_date_i = ""+doc.published_date_i;
					var y = doc.published_date_i.substring(0,4);
		        	var m = doc.published_date_i.substring(6,4);
		        	var d = doc.published_date_i.substring(8,6);
					response.response.docs[i].post_date = d+"/"+m+"/"+y;
					//response.response.docs[i].num_replies_i = number_format(doc.num_replies_i);
					//response.response.docs[i].num_views_i = number_format(doc.num_views_i);


					self.consolidated_stream_items.push(response.response.docs[i]);

				}
			}
		});
	}
	this.acc_company = ko.observable();
	this.acc_country = ko.observable();
	this.acc_email = ko.observable();
	this.acc_exp_date = ko.observable();
	this.acc_keywords_limit = ko.observable();
	this.acc_keywords_usage = ko.observable();
	this.acc_lang = ko.observable();
	this.acc_lastlogin_ts = ko.observable();
	this.acc_posts_limit = ko.observable();
	this.acc_posts_usage = ko.observable();
	this.acc_reg_date = ko.observable();
	this.acc_status = ko.observable();
	this.acc_topics = ko.observableArray([]);
	this.acc_users_limit = ko.observable();
	this.acc_users_usage = ko.observable();
	this.acc_posts_usage_percent = ko.observable();
	this.acc_users_usage_percent = ko.observable();
	this.acc_keywords_usage_percent = ko.observable();
	this.my_account = function(){
		self.reset_screen();
		self.is_account_info(true);
		var start_date = date("Ymd",(time()-(60*60*24*30)));
		var end_date = date("Ymd",(time()));
		var url = "https://app.sonarplatform.com/secure_api/account_detail_api.php?token="+self.token();

		$.get(url,function(response){
			if(response.status==0){
				var data = response.data;
				self.acc_company(data.company);
				self.acc_country(data.country);
				self.acc_email(data.email);
				self.acc_exp_date(data.exp_date);
				self.acc_keywords_limit(data.keywords_limit);
				self.acc_keywords_usage(data.keywords_usage);
				self.acc_keywords_usage_percent(Math.round(data.keywords_usage/data.keywords_limit*100,2));
				self.acc_lang(data.lang);
				self.acc_lastlogin_ts(date("d/m/Y H:i:s",data.lastlogin_ts));
				self.acc_posts_limit(data.posts_limit);

				self.acc_posts_usage(data.posts_usage);
				self.acc_posts_usage_percent(Math.round(data.posts_usage/data.posts_limit*100,2));
				self.acc_reg_date(data.reg_date);
				if(data.status=='Active'){
					self.acc_status("<span class='blue'>Active</span");
				}else{
					self.acc_status("<span class='red'>Inactive</span");
				}

				self.acc_topics(data.topics);
				self.acc_users_limit(data.users_limit);
				self.acc_users_usage(data.users_usage);
				self.acc_users_usage_percent(Math.round(data.users_usage/data.users_limit*100,2));
			}


		});
	}


	this.show_settings = function(){
		self.reset_screen();
		self.is_welcome(true);
		self.loadTopics();
	}

}

/*
hsp.getMemberInfo(function(info){

	mainkey="SONAR-"+info.userId;
	//check if the user is already logged in
	var model = new Model();
	ko.applyBindings(model);
	if(typeof isLoginPage === 'undefined'){
		if(typeof isLoading === 'undefined'){
			model.checkAPIToken();
		}
	}
	if(typeof isLoading !== 'undefined'){
		console.log(isLoading);
		model.loading();
	}
	if(typeof isLoginPage !== 'undefined'){
		hsp.getData(function(data){
			console.log('hsp',data);
			if(data!=null && data.apitoken!=null){
				document.location="welcome.html";
			}
		});
	}

});
*/

var model = new Model();
ko.cleanNode(document.getElementById(pid));
ko.applyBindings(model,document.getElementById(pid));
