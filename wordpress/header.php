<!DOCTYPE html>
<!-- by xavierburrow.com -->
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
	<title>Closed On Monday</title>
	<meta charset="utf-8">
	<meta name="description" content="Closed On Monday is an online 3D space that hosts monthly exhibitions.">
  <meta name="keywords" content="virtual gallery, online gallery, webgl, 3D">
  <meta name="author" content="http://xavierburrow.com">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta property="og:url" content="http://closedonmondaygallery.com/">
	<meta property="og:title" content="Closed On Monday">
	<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/img/com_og_image.jpg">
	<meta property="og:site_name" content="Closed On Monday">
	<meta property="og:description" content="Closed On Monday is an online 3D space that hosts monthly exhibitions.">
	<?php date_default_timezone_set('Australia/Sydney'); ?>
	<meta property="timeref" content="<?php echo date('d-m-Y', time()); ?>">
	<?php wp_head(); ?>
	<link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
	<script type="text/javascript">
	//<![CDATA[
		var SITE_URL = '<?php echo get_site_url(); ?>';
		var APP_ROOT = '<?php echo get_template_directory_uri(); ?>/';
	//]]>
	</script>
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/img/favicon.png">
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-60746754-7"></script>
	<script>
	  window.dataLayer = window.dataLayer || [];
	  function gtag(){dataLayer.push(arguments);}
	  gtag('js', new Date());
	  gtag('config', 'UA-60746754-7');
	</script>
</head>
<body <?php body_class(); ?>>
