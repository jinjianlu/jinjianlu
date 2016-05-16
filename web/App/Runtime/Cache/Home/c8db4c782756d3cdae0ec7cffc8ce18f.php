<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7">
	<meta name="description" content="人人小站的描述">
	<meta name="keywords" content="人人,人人网,小站,话题">
	<title>人人小站</title>
	<link rel="stylesheet" href="/Public/Home/Css/home-new-all-min.css">
	<link rel="stylesheet" href="/Public/Home/Css/my-home-all-min.css">
	<link href="/Public/Home/Css/setup-all-min.css" rel="stylesheet">
	
	<!--[if IE]>
	<script src="http://s.xnimg.cn/a51836/n/core/expressions.js"></script>
	<![endif]-->
	<!--// <script type="text/javascript">var XZ ={get_check:'fa7cae4c'}</script>-->
	 <!-- // <script src="/Public/Home/Scripts/core.js"></script> -->
	 <!-- // <script src="/Public/Home/Scripts/set-up2.js"></script> -->
	 <script src="/Public/Home/Scripts/jquery-1.8.3.min.js"></script>
	 	<!--[if IE]>
	<script src="http://s.xnimg.cn/a51836/n/core/expressions.js"></script>
	<![endif]-->

</head>
<body>
	<div id="jsContainer"></div>
	<div id="page" class="">
		<header id="header">
			<div class="header-box">
				<div class="logo">
					<a href="/home?from=bar"></a>
				</div>
				<div class="header-search">
					<form action="" method="get" id="">
						<input type="hidden" name="value"></form>
					<input type="text" maxlength="20" autocomplete="off" placeholder="告诉我你的梦想" class="search" id="tag-key" data-not-use-placeholder="true" style="color: rgb(136, 136, 136);"></div>
				<menu class="main-nav">
					<li class="home-select">
						<a href="/home?from=bar">首页</a>
						<div style="display:none;" class="news-feed">
							<a href="#">99+</a>
						</div>
					</li>
					<li>
						<a href="/explore?from=bar">探索</a>
					</li>
					<li>
						<a href="/suggest?from=bar">推荐</a>
					</li>
					<li>
						<a href="/zhan/create?from=bar" class="create-site">创建小站</a>
					</li>
				</menu>
				<div class="site-recommend">
					<a data-num="" id="notify-btn" href="javascript:;" class="site-recommend-icon">消息</a>
					<div class="site-notice" style="display: none;margin-top:20px;">
						<p  style="display:block;" class="no-notice" id="no-notice">现在没有新通知</p>
						<ul class="clearfix"></ul>
					</div>
				</div>
				<div class="site-user">
					<div id="div">
						<a class="fun-list-btn">功能</a>
						<ul class="user-choose" style="display: none;">
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
			</div>			
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
			<div class="searchinfoboxa" id="searchInfoBox" style="position: absolute; top: 67px; left: 386px;">
				<ul></ul>
			</div>
		</header>
		<div class="page-content">
			<div class="sub-header" style="height: 100px;">
				<div class="title-box" style="margin-top: 0px;">
					<div class="home-site">
						<a href="http://zhan.renren.com/profile/896481364?from=settings" class="user-photo">
							<img alt="个人头像"  src="http://hdn.xnimg.cn/photos/hdn521/20160511/2015/h_main_WBTi_b6d200038d9d1986.jpg" style="width: 133px; height: 100px; margin-left: -16px;" data-ml="-16px"></a>
						<div class="user-messge">
							<span class="user-name">金建璐</span>
						</div>
						<p>需要遍历</p>
						<a href="http://www.renren.com/profile.do?id=896481364" class="more-setup">更多设置&gt;&gt;</a>
					</div>
				</div>
			</div>
		</div>
			<script>
				$(window).scroll(function(){
					var sT = $(window).scrollTop();
					// console.log(sT);
					if(sT>50){
					      $('.page-content').fadeOut(3000);
					}else{
					      $('.page-content').fadeIn(3000);
					}
				})

			</script>
			<div class="container clearfix">
				<form autocomplete="off" id="setForm" action=""  method="post"><!-- form开始 -->
					<div class="setup-site">
						<div class="register-top clearfix">
							<!-- <div id="completedetails" class="item">
								<div id="namesetting" class="clearfix">
								<label>我是</label>
								<input type="text" class="namebox" value="金建璐" name="name"/>
								<div class="judeje" id="nameStatus"></div>
								<span id="Error" class="email-judej">*请输入你的名字</span>
							</div> -->
							<div id="sexSelection">
								<label>我是</label>
								<input type="button" id="famle" class="sex btn-girl" value="女" tabindex="1">
								<input type="button" class="sex btn-boy  select" id="male" value="男" tabindex="2">
								<input type="hidden" value="男生" id="hiddentext" name="gender">
								<span class="error-tip" id="nosexError"></span>
							</div>
							<div id="brithSelection">
								<label>我的生日</label>
								<select id="yy" name="bYear" class="birthday-yy" tabindex="3">
									<option value="">--</option>
									<option value="2010">2010</option>
									<option value="2009">2009</option>
									<option value="2008">2008</option>
									<option value="2007">2007</option>
									<option value="2006">2006</option>
									<option value="2005">2005</option>
									<option value="2004">2004</option>
									<option value="2003">2003</option>
									<option value="2002">2002</option>
									<option value="2001">2001</option>
									<option value="2000">2000</option>
									<option value="1999">1999</option>
									<option value="1998">1998</option>
									<option value="1997">1997</option>
									<option value="1996">1996</option>
									<option value="1995">1995</option>
									<option value="1994">1994</option>
									<option value="1993">1993</option>
									<option value="1992">1992</option>
									<option value="1991">1991</option>
									<option value="1990">1990</option>
									<option value="1989">1989</option>
									<option value="1988">1988</option>
									<option value="1987">1987</option>
									<option value="1986">1986</option>
									<option value="1985">1985</option>
									<option value="1984">1984</option>
									<option value="1983">1983</option>
									<option value="1982">1982</option>
									<option value="1981">1981</option>
									<option value="1980">1980</option>
									<option value="1979">1979</option>
									<option value="1978">1978</option>
									<option value="1977">1977</option>
									<option value="1976">1976</option>
									<option value="1975">1975</option>
									<option value="1974">1974</option>
									<option value="1973">1973</option>
									<option value="1972">1972</option>
									<option value="1971">1971</option>
									<option value="1970">1970</option>
									<option value="1969">1969</option>
									<option value="1968">1968</option>
									<option value="1967">1967</option>
									<option value="1966">1966</option>
									<option value="1965">1965</option>
									<option value="1964">1964</option>
									<option value="1963">1963</option>
									<option value="1962">1962</option>
									<option value="1961">1961</option>
									<option value="1960">1960</option>
									<option value="1959">1959</option>
									<option value="1958">1958</option>
									<option value="1957">1957</option>
									<option value="1956">1956</option>
									<option value="1955">1955</option>
									<option value="1954">1954</option>
									<option value="1953">1953</option>
									<option value="1952">1952</option>
									<option value="1951">1951</option>
									<option value="1950">1950</option>
								</select>
								<select id="mm" name="bMonth" class="birthday-mm" tabindex="4">
									<option value="">--</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
								</select>
								<select id="dd" name="bDay" class="birthday-dd" tabindex="5">
									<option value="">--</option>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
									<option value="6">6</option>
									<option value="7">7</option>
									<option value="8">8</option>
									<option value="9">9</option>
									<option value="10">10</option>
									<option value="11">11</option>
									<option value="12">12</option>
									<option value="13">13</option>
									<option value="14">14</option>
									<option value="15">15</option>
									<option value="16">16</option>
									<option value="17">17</option>
									<option value="18">18</option>
									<option value="19">19</option>
									<option value="20">20</option>
									<option value="21">21</option>
									<option value="22">22</option>
									<option value="23">23</option>
									<option value="24">24</option>
									<option value="25">25</option>
									<option value="26">26</option>
									<option value="27">27</option>
									<option value="28">28</option>
									<option value="29">29</option>
									<option value="30">30</option>
									<option value="31">31</option>
								</select>
								<span class="error-tip" id="nobirthError"></span>
							</div>
							<div id="" class="select-photo">
								<label>我的头像</label>
								<div style="display:block" class="initial-head">
									<img class="mainimg" src="http://hdn.xnimg.cn/photos/hdn521/20160511/2015/h_main_WBTi_b6d200038d9d1986.jpg" alt="我的头像"></div>
								
									 <param value="transparent" name="wmode">
									<param value="http://zhan.renren.com/swfupload.swf?preventswfcaching=1463301450613" name="movie">
						</div>
					</div>
					<div class="sync-set">
						<div class="set-up-tit">
							<a class="minus" href="">修改密码</a>
						</div>
						<div class="pwd" style="display:none">
							&nbsp;&nbsp;&nbsp;原密码: <input type="password" name="pwd" id="" style="margin-top:10px;padding:5px 100px 5px 5px;"> <br>
							&nbsp;&nbsp;&nbsp;新密码: <input type="password" name="newpwd" id="" style="margin-top:10px;padding:5px 100px 5px 5px;"> <br>
							确认密码: <input type="password" name="repwd" id="" style="margin-top:10px;padding:5px 100px 5px 5px;"> <br>
						</div>				
					</div>   
					<script>
					$('.set-up-tit').click(function(){
						$(this).parent('div').find('.pwd').css('display','block');
						return false;
					})
					// $('.set-up-tit').click(function(){
					// 	$(this).parent('div').find('.pwd').css('display','none');
					// })
					</script>
				<div class="save-box">
					<input type="button" value="保存" id="set-up-complete" class="setup-submit">
					<span class="save-form-tip" id="save-form-tip">保存中..</span>
				</div>

			</div>
		</form>
	</div>
</div>
</div>
<script src="/Public/Home/Scripts/beacon.js"></script>

<script>
COMSCORE.beacon({ c1:2, c2:6934070, c3:"", c4:"", c5:"", c6:"", c15:"" });
</script>
<noscript>
&lt;img src="http://b.scorecardresearch.com/p?c1=2&amp;c2=6934070&amp;c3=&amp;c4=&amp;c5=&amp;c6=&amp;c15=&amp;cj=1" /&gt;
</noscript>

<div style="display:none;" class="gotop">
<a alt="回到顶部" title="回到顶部" class="" href="javascript:;">回到顶部</a>
</div>
</body>
</html>