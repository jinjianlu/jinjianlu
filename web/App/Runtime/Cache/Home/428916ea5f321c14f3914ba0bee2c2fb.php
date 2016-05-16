<?php if (!defined('THINK_PATH')) exit();?>﻿<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta content="IE=EmulateIE7" http-equiv="X-UA-Compatible">
	<meta content="人人小站的描述" name="description">
	<meta content="人人,人人网,小站,话题" name="keywords">
	<title>人人小站</title>
	<link rel="stylesheet" href="/Public/Home/Css/home-new-all-min.css">
	<link rel="stylesheet" href="/Public/Home/Css/my-home-all-min.css">
	<!--[if IE]>
	<script src="/Public/Home/Scripts//expressions.js"></script>
	<![endif]-->

	<!-- // <script src="/Public/Home/Scripts//home2.js"></script> -->
</head>
<body>
	<div id="page">
		<header id="header">
			<div class="header-box">
				<div class="logo">
					<a href="/home?from=bar"></a>
				</div>
				<div class="header-search">
					<form id="tagSearchForm" method="get" action="http://zhan.renren.com/tag">
						<input type="hidden"  name="value"></form>
					<input type="text" id="tag-key"  class="search" placeholder="告诉我你的梦想" autocomplete="off" maxlength="20"></div>

					<div class="site-recommend" style="float:right;margin-left:10px">
						<a data-num="0" class="site-recommend-icon">消息</a>
						<div class="site-notice" style="display: none;">
							<p style="" class="no-notice" id="no-notice">现在没有新通知</p>
							<ul class="clearfix" style="display: none;"></ul>
						</div>
					</div>
					
					<div class="site-user" style="float:right;">
						<div id="div">
						<a class="fun-list-btn" rdid="0.11805079950166852">功能</a>
						<ul class="user-choose" style="display: none;" id="dis">
							<li>
								<a class="user-home" href="http://zhan.renren.com/profile/896481364?from=bar">我的主页</a>
							</li>
							<li>
								<a class="user-friend" href="http://zhan.renren.com/friends?from=bar">我的好友</a>
							</li>
							<li>
								<a class="user-fans" href="http://zhan.renren.com/fans?from=bar&amp;siteId=">小站粉丝</a>
							</li>
							<li>
								<a class="user-setUp" href="http://zhan.renren.com/zhan/settinginfo?from=bar">帐号设置</a>
							</li>
							<li>
								<a class="user-out" href="http://www.renren.com/Logout.do?origURL=http://zhan.renren.com/login">退出</a>
							</li>
						</ul>
						</div>
					</div>
					<script src="/Public/Home/Scripts/jquery-1.8.3.min.js"></script>
					<script>
						$("#div").click(function(){
								
								$(this).find('ul').css('display','block');			
						})
						$('.user-choose').mouseover(function(){
							$(this).css('display','block');
						})
						$(".user-choose").mouseout(function(){
								
								$(this).css('display','none');			
						})
						
						$(".site-recommend-icon").mouseover(function(){

							$(this).parent('div').find('div').css('display','block');
						})
						$(".site-recommend-icon").mouseout(function(){
							$(this).parent('div').find('div').css('display','none');
						})
						
					</script>
				<menu class="main-nav main-nav-right">
					<li>
						<a href="/loginall?from=bar">首页</a>
					</li>
					<li >
						<a href="/explore?from=bar">探索</a>
					</li>
					<li >
						<a href="/suggest?from=bar">推荐</a>
					</li>
					<li>
						<a href="/login?from=bar">创建小站</a>
					</li>
				</menu>
					
					

			</div>
		</header>
		<div class="page-content">
			<div class="sub-header">
				<div class="title-box">
					<div class="home-site">
						<a class="user-photo" herf="#">
							<img  src="/Public/Home/Picture/h_main_wbti_b6d200038d9d1986.jpg" />
						</a>
						<div class="user-messge">
							<h1 class="user-name" title="金建璐 — 人人小站">需要遍历</h1>
							<a class="renren-home" href="http://www.renren.com/896481364/profile" target="_blank">查看人人主页</a>
						</div>
						<p>拥有0个小站，订阅0个话题，关注的小站</p>
					</div>
				</div>
			</div>
			<script>
				$(window).scroll(function(){
					var sT = $(window).scrollTop();
					// console.log(sT);
					if(sT>50){
					      $('.sub-header').fadeOut(3000);
					}else{
					      $('.sub-header').fadeIn(3000);
					}
				})

			</script>
			<div class="container clearfix" id="container" style="z-index =999">
				<section class="sitemain clearfix" id="sitemainold">
					<div id="feed-container">
						<div class='no-sitemain'>还没有内容！</div>
					</div>
				</section>
				<section class="siteside">
					<div>
						<div class="my-site">
							<a href="#">TA的小站</a>
						</div>
						<div class="site-like site-likes"></div>
						<div class="my-site">
							<a href="#">TA订阅的话题</a>
						</div>
						<ul class="site-tag"></ul>
						<div class="attention-site">
							<h4>TA关注的小站246</h4>
							
						</div>
					</div>
				</section>
			</div>
		</div>
	<div class="feed-scroll-page show">
		<a alt="上一篇" title="上一篇" class="feed-pre-btn" style="visibility: visible;" href="javascript:;">上一篇</a>
		<a alt="下一篇" title="下一篇" class="feed-next-btn" href="javascript:;" style="visibility: visible;">下一篇</a>
	</div>
	<div class="help-enter"><a title="帮助" class="enter" href="http://zhan.renren.com/help">帮助</a></div>
</div>
 <script>
// //初始化热度
// window.hotCount = new SmallSite.app.hotCount({
// clickSelector : '.hot-view',
// feedSelector : 'article[data-feedid]',
// type: 9
// });
// window.hotCount.init();
// </script>
<!-- <script src="/Public/Home/Scripts/beacon.js"></script> -->

<noscript>
	<img src="Picture/b32df65da6d34165977fa8a2c86a0263.gif" />
</noscript>
<span style="display:none">
	<!-- // <script language="javascript" type="text/javascript" src="/Public/Home/Scripts//14879491.js"></script> -->
	<noscript>
		<a href="http://www.51.la/?14879491" target="_blank">
			<img alt="&#x6211;&#x8981;&#x5566;&#x514D;&#x8D39;&#x7EDF;&#x8BA1;" src="Picture/14879491.asp" style="border:none" />
		</a>
	</noscript>
</span>
</body>
</html>