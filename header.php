<!DOCTYPE html>
<!-- by xavierburrow.com -->
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="description" content="A virtual webgl gallery packed with exciting art!">
  <meta name="keywords" content="virtual gallery, online gallery, webgl, 3D">
  <meta name="author" content="Closed On Mondays">
	<meta property="og:url" content="http://closedmondaygallery.com/" />
	<meta property="og:title" content="Closed On Mondays"/>
	<meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/img/og-image.jpg"/>
	<meta property="og:site_name" content="Closed On Mondays"/>

	<title>Closed On Mondays</title>

	<meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
	<link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
	<link href="https://fonts.googleapis.com/css?family=Karla" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/galleria/galleria/build/css/style.css">
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/galleria/galleria/js/lib/three.min.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/galleria/galleria/js/lib/inflate.min.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/galleria/galleria/js/lib/OBJLoader.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/galleria/galleria/js/lib/MTLLoader.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/galleria/galleria/js/lib/jquery.min.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/galleria/galleria/js/lib/collider.min.js"></script>
	<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/galleria/galleria/build/js/app.min.js"></script>
	<script type="text/javascript">
		var siteUrl = '<?php echo get_site_url(); ?>';
		var themeRoot = '<?php echo get_template_directory_uri(); ?>/';
		var appRoot = '<?php echo get_template_directory_uri(); ?>/';
	</script>
</head>
<body <?php body_class(); ?>>

<?php get_template_part('loading'); ?>
<div class="content">
