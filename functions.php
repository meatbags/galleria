<?php
add_action( 'wp_enqueue_scripts', 'gallery_load_scripts' );
function gallery_load_scripts(){

	


	wp_enqueue_script('xbscript_app', get_stylesheet_directory_uri() . '/lib/build/app.min.js');
	//wp_enqueue_script('xbscript_jquery', get_stylesheet_directory_uri() . '/lib/build/jquery.min.js');
	//wp_enqueue_script('xbscript_app', get_stylesheet_directory_uri() . '/lib/build/slick.min.js');
	//wp_enqueue_script('xbscript_base64', get_stylesheet_directory_uri() . '/lib/build/base64binary.js');
	//wp_enqueue_script('xbscript_three', get_stylesheet_directory_uri() . '/lib/build/three.min.js');
	//wp_enqueue_script('xbscript_piano', get_stylesheet_directory_uri() . '/lib/build/midi.min.js');
	//wp_enqueue_script('xbscript_objloader', get_stylesheet_directory_uri() . '/lib/build/objloader.js');
	//wp_enqueue_script('xbscript_mtlloader', get_stylesheet_directory_uri() . '/lib/build/mtlloader.js');

	wp_register_style('xbslick', get_stylesheet_directory_uri() . '/lib/build/slick.css' );
  wp_register_style('xbstyle', get_stylesheet_directory_uri() . '/lib/build/style.css' );
	wp_enqueue_style('xbslick');
	wp_enqueue_style('xbstyle');

	wp_register_style( 'gallerystyle', get_template_directory_uri() . '/galleria/galleria/build/css/style.css' );
	wp_enqueue_style( 'gallerystyle' );
}

// setup
function gallery_setup(){
	add_theme_support( 'title-tag' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'post-thumbnails' );
}
add_action( 'after_setup_theme', 'gallery_setup' );

// customise admin
function add_admin_post_types() {
	register_post_type('gallery', array(
		'label' => 'Gallery',
		'public' => true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug' => 'gallery'),
		'query_var' => true,
		'menu_icon' => 'dashicons-format-gallery',
		'taxonomies' => array('category', 'post_tag'),
		'supports' => array('title', 'editor', 'revisions', 'thumbnail')
	));
	remove_post_type_support('gallery', 'editor');
}
add_action('init', 'add_admin_post_types');

function remove_admin_post_types() {
	remove_menu_page('edit.php');
	//remove_menu_page('edit.php?post_type=page');
	remove_menu_page('edit-comments.php');
	//remove_menu_page('plugins.php');
}

add_action('admin_menu', 'remove_admin_post_types');

// defaults
add_action( 'comment_form_before', 'gallery_enqueue_comment_reply_script' );
function gallery_enqueue_comment_reply_script()
{
	if ( get_option( 'thread_comments' ) ) { wp_enqueue_script( 'comment-reply' ); }
}

add_filter( 'the_title', 'gallery_title' );
function gallery_title( $title ) {
	if ( $title == '' ) {
		return '&rarr;';
	} else {
		return $title;
	}
}

add_filter( 'wp_title', 'gallery_filter_wp_title' );
function gallery_filter_wp_title( $title ){
	return $title . esc_attr( get_bloginfo( 'name' ) );
}

add_action( 'widgets_init', 'gallery_widgets_init' );
function gallery_widgets_init(){
	register_sidebar( array (
		'name' => __( 'Sidebar Widget Area', 'gallery' ),
		'id' => 'primary-widget-area',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => "</li>",
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	));
}

function gallery_custom_pings( $comment ){
	$GLOBALS['comment'] = $comment;?>
	<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>"><?php echo comment_author_link(); ?></li>
	<?php
}
