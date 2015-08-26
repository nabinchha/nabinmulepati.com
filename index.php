<!DOCTYPE HTML>
<!--
	Template Big Picture by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>Nabin Mulepati</title>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />
		<meta name="description" content="Nabin Mulepati - Software Engineer"> 
		<meta name="keywords" content="Nabin Mulepati, Mulepati,Nabin, photography, Philadelphia, Pennsylvania, Bucks County, Bhaktapur, Nepal, Kathmandu, Software Developer, Software Engineer, Software Development"> 
		<meta name="heading" content="Nabin Mulepati - Software Engineer"> 

		<!--[if lte IE 8]><script src="css/ie/html5shiv.js"></script><![endif]-->
		<script src="js/jquery.min.js"></script>
		<script src="js/jquery.poptrox.min.js"></script>
		<script src="js/jquery.scrolly.min.js"></script>
		<script src="js/jquery.scrollgress.min.js"></script>
		<script src="js/skel.min.js"></script>
		<script src="js/init.js"></script>
		<noscript>
			<link rel="stylesheet" href="css/skel.css" />
			<link rel="stylesheet" href="css/style.css" />
			<link rel="stylesheet" href="css/style-wide.css" />
			<link rel="stylesheet" href="css/style-normal.css" />
		</noscript>
		<!--[if lte IE 8]><link rel="stylesheet" href="css/ie/v8.css" /><![endif]-->
		<script>
			var val = Math.floor(Math.random()*11 + 1);
			$(document).ready(function() {
				$('#intro').css({'background': 'url(images/introimage' + String(val) + '.jpg)'});
				$('#intro').css({'background-size':'cover'});
				$('#intro').css({'background-attachment':'fixed'});
				$('#intro').css({'background-position':'bottom center'});
				$('#intro').css({'background-repeat':'no-repeat'});
			});
		</script>

		<style>
			header{
				text-align: left;
			}
			.headerText {
				font-size: 1.30em;
				
			}

			.textShadow {
				text-shadow: 2px 2px 20px #000000;
			}

			.button.style2.down {
				width:75px !important;
				height:75px !important;
			}
		</style>
	</head>
	<body>
		<!-- Header -->
		<header id="header">
			<!-- Logo -->
			<h1 id="logo">Nabin Mulepati</h1>
			
			<!-- Nav -->
			<nav id="nav">
				<ul>
					<li><a href="#intro">hi</a></li>
					<li><a href="http://www.linkedin.com/pub/nabin-mulepati/31/a1/633/" target="_blank">about</a></li>
					<li><a href="http://github.com/nabinchha" target="_blank">github</a></li>
					<li><a href="#work">photography</a></li>
					<li><a href="#contact">contact</a></li>
				</ul>
			</nav>
		</header>
			
		<!-- Intro -->
		<section id="intro" class="main style1 dark fullscreen">
			<div class="content container 75%">
				<header class="textShadow">
					<h2>Hi.</h2>
				</header>
				<p class='headerText textShadow'>My name is <strong>Nabin Mulepati</strong>. <br/>I am a <strong>Software Engineer</strong> with a passion for <strong>Photography</strong>.</p>
				<p>
					<ul class="actions">
						<li><a href="https://twitter.com/nabinchha" class="icon fa-twitter" target="_blank"><span class="label">Twitter</span></a></li>
						<li><a href="https://github.com/nabinchha" class="icon fa-github" target="_blank"><span class="label">Github</span></a></li>
						<li><a href="https://www.linkedin.com/pub/nabin-mulepati/31/a1/633" class="icon fa-linkedin" target="_blank"><span class="label">Linkedin</span></a></li>
						<li><a href="https://www.flickr.com/photos/blackxtibook" class="icon fa-flickr" target="_blank"><span class="label">Flickr</span></a></li>
						<li><a href="https://500px.com/nabinmulepati" class="" target="_blank">500px</a></li>
					</ul>
				</p>
				<footer>
					<a href="#work" class="button style2 down">More</a>
				</footer>
			</div>
		</section>
			
		<!-- Work -->
		<section id="work" class="main style3 primary">
			<div class="content container">
				<header>
					<h2>photography</h2>
					<p>I love photography. I especially like capturing portraits and landscapes. Lately, I have been quite fond of the black and white medium. I use Canon EOS 5D MKII with Canon EF 24-105mm f/4L, Tamron SP 24-70mm f/2.8, and Canon EF 50mm f/1.8 II lenses</p>
				</header>
				
				<div class="container 90% gallery">
					<?php
						$directories = glob("photography" . '/*' , GLOB_ONLYDIR);

						for($i=0; $i< count($directories); $i++) {	
							$path = $directories[$i];
							$values = explode("/", $path);
							$path = $path . '/';
							$sectionTitle = $values[1];
							
							echo '<header><h3>'. $sectionTitle .'</h3></header>';
							echo '<div class="row 0% images no-collapse">';
							
							$shouldSlideFromleft = ($i % 2);

							if (glob($path . "*.jpg") != false) {
								$images = glob($path . "*.jpg");

								for($j= 0; $j < count($images); $j++) {
									$nameValues = explode("/", $images[$j]);
									$imageName = $nameValues[count($nameValues)-1];

									$titleValues = explode(".", $imageName);
									$imageTitle = $titleValues[0];

									echo '<div class="2u">';
									echo '<a href="' . $images[$j] .'" rel="lightbox[' . $sectionTitle . ']" class="image fit';
									if($shouldSlideFromleft == 0)
										echo ' from-left ';
									else
										echo ' from-right ';

									echo '"><img title="'. $sectionTitle .'" src="'. $path .'thumb/'. $imageName .'"></a></div>';
								}
							}
							echo '</div><br/>';
						}
					?>
				</div>
			</div>
		</section>
			
		<!-- Contact -->
		<section id="contact" class="main style3 secondary">
			<div class="content container">
				<header>
					<h2>Drop a line.</h2>
					<p>Please feel free to say hello at <strong><a href="mailto:nabinchha@gmail.com">nabinchha [at] gmail [dot] com</a></strong>, or contact me via any of the following platforms.</p>

					<ul class="actions">
						<li><a href="https://twitter.com/nabinchha" class="icon fa-twitter" target="_blank"><span class="label">Twitter</span></a></li>
						<li><a href="https://github.com/nabinchha" class="icon fa-github" target="_blank"><span class="label">Github</span></a></li>
						<li><a href="https://www.linkedin.com/pub/nabin-mulepati/31/a1/633" class="icon fa-linkedin" target="_blank"><span class="label">Linkedin</span></a></li>
						<li><a href="https://www.flickr.com/photos/blackxtibook" class="icon fa-flickr" target="_blank"><span class="label">Flickr</span></a></li>
						<li><a href="https://500px.com/nabinmulepati" class="" target="_blank">500px</a></li>
					</ul>
				</header>
			</div>
		</section>
			
		<!-- Footer -->
		<footer id="footer">
			<!-- Menu -->
			<ul class="menu">
				<li>&copy; Nabin Mulepati</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
			</ul>
		</footer>
	</body>
</html>