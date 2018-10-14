<?php
function gallery_setup() {
	add_theme_support('title-tag');
	add_theme_support('automatic-feed-links');
	add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'gallery_setup');

function add_admin_post_types() {
	register_post_type('gallery', array(
		'label' => 'Galleries',
		'public' => true,
		'capability_type' => 'post',
		'hierarchical' => true,
		'rewrite' => array('slug' => 'gallery'),
		'query_var' => true,
		'menu_icon' => 'dashicons-format-gallery',
		'taxonomies' => array('category'),
		'supports' => array('title')
	));
	remove_post_type_support('gallery', 'editor');
}
add_action('init', 'add_admin_post_types');

function remove_admin_post_types() {
	remove_menu_page('edit.php');
	//remove_menu_page('edit.php?post_type=page');
	//remove_menu_page('edit-comments.php');
	//remove_menu_page('plugins.php');
}
add_action('admin_menu', 'remove_admin_post_types');

function gallery_enqueue_comment_reply_script(){
	if (get_option('thread_comments')) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action('comment_form_before', 'gallery_enqueue_comment_reply_script' );

function gallery_title( $title ) {
	if ( $title == '' ) {
		return '&rarr;';
	} else {
		return $title;
	}
}
add_filter('the_title', 'gallery_title');

function gallery_filter_wp_title( $title ){
	return $title . esc_attr( get_bloginfo( 'name' ) );
}
add_filter( 'wp_title', 'gallery_filter_wp_title' );

add_action('wp_enqueue_scripts', 'gallery_load_scripts');
function gallery_load_scripts() {
	$dir = get_template_directory_uri();
	wp_enqueue_script('gallery_three', $dir . '/build/three.min.js');
	wp_enqueue_script('gallery_inflate', $dir . '/build/inflate.min.js');
	wp_enqueue_script('gallery_collider', $dir . '/build/collider.min.js');
	wp_enqueue_script('gallery_app', $dir . '/build/app.min.js');
	wp_register_style('gallery_style', get_template_directory_uri() . '/build/style.css' );
	wp_enqueue_style('gallery_style' );
}

?>
