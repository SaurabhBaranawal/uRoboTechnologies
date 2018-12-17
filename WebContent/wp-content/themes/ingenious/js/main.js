"use strict";
/**********************************
************ CWS LIBRARY **********
**********************************/

function cws_uniq_id ( prefix ){
	var prefix = prefix != undefined && typeof prefix == 'string' ? prefix : "";
	var d = new Date();
	var t = d.getTime();
	var unique = Math.random() * t;
	var unique_id = prefix + unique;
	return unique_id;
}
function cws_has_class ( el, cls_name ){
	var re = new RegExp( "(^|\\s)" + cls_name + "(\\s|$)", 'g' );
	return re.test( el.className );
}
function cws_add_class ( el, cls_name ){
	el.className =  el.className.length ? el.className + " " + cls_name : cls_name;		
}
function cws_remove_class ( el, cls_name ){
	var re = new RegExp( "\\s?" + cls_name, "g" );
	el.className = el.className.replace( re, '' );
}
function cws_is_mobile_device () {
  if ( navigator.userAgent.match( /(Android|iPhone|iPod|iPad)/ ) ) {
    return true;
  } else {
    return false;
  }
}
function cws_is_mobile_viewport () {
  if ( window.innerWidth < 980 ){
    return true;
  } else {
    return false;
  }		
}
function cws_is_mobile () {
	var device = cws_is_mobile_device();
	var viewport = cws_is_mobile_viewport();
	return device || viewport;
}
function cws_mobile_controller (){
	var device = cws_is_mobile_device();
	var viewport = cws_is_mobile_viewport();
	var mobile_class 	= cws_has_class( document.body, "cws_mobile" );
	if ( !device ){
		if ( viewport ){
			if ( !mobile_class ){
				cws_add_class( document.body, "cws_mobile" );
			}				
		}
		window.addEventListener( "resize", function (){
			var viewport 		= cws_is_mobile_viewport();
			var mobile_class 	= cws_has_class( document.body, "cws_mobile" );
			if ( viewport ){
				if ( !mobile_class ){
					cws_add_class( document.body, "cws_mobile" );
				}				
			}
			else{
				if ( mobile_class ){
					cws_remove_class( document.body, "cws_mobile" );
				}
			}			
		}, false );
	}
	else{
		cws_add_class( document.body, "cws_mobile" );
	}
}
function cws_merge_trees ( arr1, arr2 ){
	if ( typeof arr1 != 'object' || typeof arr2 != 'object' ){
		return false;
	}
	return cws_merge_trees_walker ( arr1, arr2 );
}
function cws_merge_trees_walker ( arr1, arr2 ){
	if ( typeof arr1 != 'object' || typeof arr2 != 'object' ){
		return false;
	}
	var keys1 = Object.keys( arr1 );
	var keys2 = Object.keys( arr2 );
	var r = {};
	var i;
	for ( i = 0; i < keys2.length; i++ ){
		if ( typeof arr2[keys2[i]] == 'object' ){
			if ( Array.isArray( arr2[keys2[i]] ) ){
				if ( keys1.indexOf( keys2[i] ) === -1 ){
					r[keys2[i]] = arr2[keys2[i]];
				}
				else{
					r[keys2[i]] = arr1[keys2[i]];
				}				
			}
			else{
				if ( typeof arr1[keys2[i]] == 'object' ){
					r[keys2[i]] = cws_merge_trees_walker( arr1[keys2[i]], arr2[keys2[i]] );
				}
				else{
					r[keys2[i]] = cws_merge_trees_walker( {}, arr2[keys2[i]] );
				}
			}
		}
		else{
			if ( keys1.indexOf( keys2[i] ) === -1 ){
				r[keys2[i]] = arr2[keys2[i]];
			}
			else{
				r[keys2[i]] = arr1[keys2[i]];
			}
		}
	}
	return r;
}

cws_mobile_controller ();

function cws_get_flowed_previous ( el ){
	var prev = el.previousSibling;
	var is_prev_flowed;
	if ( !prev ) return false;
	is_prev_flowed = cws_is_element_flowed( prev );
	if ( !is_prev_flowed ){
		return cws_get_flowed_previous( prev );
	}
	else{
		return prev;
	}
}

function cws_is_element_flowed ( el ){
	var el_styles;
	if ( el.nodeName === "#text" ){
		return false;
	}
	el_styles = getComputedStyle( el );
	if ( el_styles.display === "none" || ["fixed","absolute"].indexOf( el_styles.position ) != -1 ){
		return false;
	}else{
		return true;
	}
}
function cws_empty_p_filter_callback (){
	var el = this;
	if ( el.tagName === "P" && !el.innerHTML.length ){
		return false;
	}
	else{
		return true;
	}	
}
function cws_br_filter_callback (){
	var el = this;
	if ( el.tagName === "BR" ){
		return false;
	}
	else{
		return true;
	}	
}

/**********************************
************ \CWS LIBRARY *********
**********************************/

jQuery(document).ready(function() {

var hashTagActive = false;
jQuery('.menu-item a').click(function(event) {
if(!jQuery(this).hasClass("fancy") && jQuery(this).attr("href") != "#" && jQuery(this).attr("target") != "_blank"){
    var anchor = jQuery(this).attr("href");
    var link = anchor.replace('index.html#','#')
	var re = new RegExp( "^#.*$" );
	var matches = re.exec( link );

	if ((matches == null && jQuery(this).attr("href").indexOf("#") != -1) || (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/))){
		return true;
	} else {
		event.preventDefault();
	}

    if (hashTagActive) return;
    hashTagActive = true;      
    
    if (jQuery(this).attr("href").indexOf("#") != -1 && matches !== null){

        if (jQuery(link).length){
                jQuery('html, body').animate({
                scrollTop: jQuery(link).offset().top
            }, 700, 'linear', function () {
                hashTagActive = false;
            });              
        }
    } else {
        jQuery('body').fadeOut(1000, newpage(anchor)); 
    }
       
  }
   });
   function newpage(e) {
     window.location = e;
   }
});

(function ($){
	ingenious_render_styles();
	ingenious_fix_styles();
	is_visible_init ();
	cws_progress_bar_init ();
	ingenious_process_apear_init ();
	cws_milestone_init ();
	var directRTL;
	if (jQuery("html").attr('dir') == 'rtl') {
		directRTL =  'rtl'
	}else{
		directRTL =  ''
	};
	document.addEventListener( "DOMContentLoaded", function (){
		if ( window.theme_opts.rtl ){
			ingenious_fix_rtl_vc_stretchRow();
		}
		ingenious_megamenu_active_cell_highlighting_init ();
		jQuery( ".ingenious_pb" ).cws_progress_bar();
		jQuery( ".cws_sc_processes_wrap" ).process_apear();
		jQuery( ".ingenious_milestone" ).cws_milestone();
		ingenious_select2_init ();
		ingenious_search_hovers_init ();
		ingenious_wp_widget_archives_hierarchy_init ();

		if (window.theme_opts.scroll_to_top != 'none'){
			scroll_top_init ();
		}

		ingenious_msg_box_init ();
		cws_woo_product_thumbnails_carousel_init ();
		ingenious_wp_standard_processing ();
		cws_sticky_sidebars_init();
		/* menu controllers */
		if ( window.cws_megamenu != undefined ){
			window.cws_megamenu_main 	= new cws_megamenu( document.querySelector( "#site_header .main_menu" ) );
			window.cws_megamenu_sticky 	= new cws_megamenu( document.querySelector( "#sticky_menu" ) );		
		}
		window.cws_mobile_menu 	= new cws_mobile_menu({
			menu_sel 		: '#mobile_menu',
			mobile_class	: '',
			toggles				: [
				{
					'behaviour'		: 'slideOnlyHeight',
					'parent_sel'	: '.menu-item',
					'opnr_sel'		: '.pointer',
					'sect_sel'		: '.sub-menu',
					'speed'			: 300,
					'active_class'	: 'active'				
				},
				{
					'behaviour'		: 'slideOnlyHeight',
					'parent_sel'	: '.wpb_wrapper',
					'opnr_sel'		: '.pointer',
					'sect_sel'		: '.megamenu_item_column_content',
					'speed'			: 300,
					'active_class'	: 'active'				
				}				
			]
		});
		window.cws_mobile_menu.set_instances ();
		/* \menu controllers */
	});

	window.addEventListener( "load", function (){
		pricing_table_highlighted ();
		ingenious_process_active ();
		ingenious_carousel_init ();
		ingenious_sc_carousel_init ();
		ingenious_gallery_post_carousel_init ();
		ingenious_isotope_init ();
		ingenious_step_scroll_init ();
		if ( Boolean( window.theme_opts.menu_stick ) && document.getElementById ( 'sticky' ) != null ){
			ingenious_sticky_init ();
		}
		if ( document.getElementsByClassName( 'sandwich' ).length ){
			ingenious_sandwich_init ();
		}
		cws_header_search();
		ingenious_widget_carousel_init ();
		ingenious_fancybox_init ();
		ingenious_posts_grid_sections_dynamic_content_init ();
		ingenious_single_posts_fw ();
		ingenious_posts_timeline_load_more();
		ingenious_portfolio_single_carousel_init ();
		ingenious_canvas_figure();
		ingenious_hexagon_grid();
		ingenious_hex_grid_2_init();
		ingenious_filter_lavalamp();
		// ingenious_menu_lavalamp();
		ingenious_woo_add_cart();
		ingenious_blog_bg();
		ingenious_portfolio_mobile_click();
		ingenious_portfolio_fw();
		ingenious_portfolio_fw_load();
		ingenious_footer_height();
		ingenious_hoverdir();
		animation_init();
		ingenious_single_sticky_content();
		button_animation();
		cws_like_unlike_init();
	}, false );
	function is_visible_init (){
		jQuery.fn.is_visible = function (){
			return ( jQuery(this).offset().top >= jQuery(window).scrollTop() ) && ( jQuery(this).offset().top <= jQuery(window).scrollTop() + jQuery(window).height() );
		}
	}
	function ingenious_sticky_init (){
		window.sticky 			= {};
		window.sticky.active 	= !cws_is_mobile();
		window.sticky.init 		= false;
		window.sticky.class 	= 'stick';
		window.sticky.section 	= document.getElementById( 'sticky' );
		window.sticky.page_content	= document.getElementById( 'page' );
		window.sticky.start_pos 	= $( window.sticky.page_content ).offset().top;
		window.sticky.last_scroll_pos = window.pageYOffset;
		window.addEventListener( 'resize', function (){
			var mobile = sticky_is_mobile();
			var scroll_pos;
			if ( !mobile && !window.sticky.active ){
				scroll_pos = window.pageYOffset;				
				if ( scroll_pos < window.sticky.last_scroll_pos && scroll_pos > window.sticky.start_pos ){
					set_sticky( true );
				}
				window.sticky.active = true;
			}
			else if ( mobile && window.sticky.active ){
				reset_sticky( true );
				window.sticky.active = false;				
			}		
		});
		window.addEventListener( 'scroll', function (){
			var scroll_pos = window.pageYOffset;
			var stick_h = jQuery('#sticky').outerHeight(true);
			if ( window.sticky.active && jQuery('#sticky').hasClass('smart') ){
				if ( scroll_pos < window.sticky.last_scroll_pos && scroll_pos > window.sticky.start_pos && !window.sticky.init ){	
					set_sticky( true );
				}
				else if ( ( scroll_pos > window.sticky.last_scroll_pos || scroll_pos < window.sticky.start_pos  ) && window.sticky.init ){
					reset_sticky( true ); 
				}
			} else if ( window.sticky.active && jQuery('#sticky').hasClass('standard') ){
				if ( scroll_pos > stick_h ){	
					jQuery('#sticky').addClass('stick');
				}
				else if (  scroll_pos < stick_h ){
					jQuery('#sticky').removeClass('stick');
				}
			}
			window.sticky.last_scroll_pos = scroll_pos;
		});
	}
	/* set sticky function */
	function set_sticky ( animated ){
		var animated = animated != undefined ? animated : false;
		if ( animated ){
			cws_add_class( window.sticky.section, window.sticky.class );
			window.sticky.init = true;
		}
		else{
			window.sticky.section.style.display = 'block';
			window.sticky.init = true;
		}
	}
	/* reset sticky function */
	function reset_sticky ( animated ){
		var animated = animated != undefined ? animated : false;
		if ( animated ){
			cws_remove_class( window.sticky.section, window.sticky.class );
			window.sticky.init = false;
		}
		else{
			window.sticky.section.style.display = 'none';
			window.sticky.init = false;
		}
	}
	/* mobile sticky function */
	function sticky_is_mobile (){
		return cws_has_class( document.body, 'cws_mobile' );
	}
	/* header search function */
	function cws_header_search (){
		jQuery("#site_header .menu_search_button, #mobile_header .menu_search_button").click(function(){
			console.log('lolo4ka');

			jQuery(this).parents('#site_header, #mobile_header').siblings('.menu_search_wrap').fadeToggle(200);
			jQuery(this).parents('#site_header, #mobile_header').addClass('search-on');
			jQuery(this).parents('#site_header, #mobile_header').siblings('.menu_search_wrap').find('.search-field').focus();
		})
		jQuery('.menu_search_wrap .search_back_button').click(function(){
			jQuery(this).parents('.menu_search_wrap').fadeToggle(200);
			jQuery(this).parents('.menu_search_wrap').siblings('#site_header').removeClass('search-on');
		})
	}	
	/* sandwich menu function */
	function ingenious_sandwich_init (){
		var i, j, sections, section, switcher, section_sel;
		window.sandwich = {};
		window.sandwich.init = false;
		window.sandwich.class = 'sandwich';
		window.sandwich.active_class = 'sandwich_active';
		sections = document.getElementsByClassName( window.sandwich.class );
		window.sandwich.sections = [];
		for ( i = 0; i < sections.length; i++ ){
			section = sections[i];
			ingenious_sandwich_section_init ( section );
		}
		window.sandwich.init = true;
	}
	/* sandwich section function */
	function ingenious_sandwich_section_init ( section ){
		var section 	= section;
		var switcher 	= section.getElementsByClassName( 'sandwich_switcher' )[0];
		if ( switcher === undefined ){
			return false;
		}
		var action 		= switcher.getAttribute( 'data-sandwich-action' );
		var handler, mobile_menu, mobile_menu_wrapper;
		window.sandwich.sections.push( {
			'section' 	: section,
			'switcher' 	: switcher,
			'action'	: action
		});
		switch ( action ){
			case 'toggle_mobile_menu':
				handler = function (){
					mobile_menu 		= section.querySelector( '#mobile_menu' );
					if ( mobile_menu == null ){
						return;
					}
					mobile_menu_wrapper = $( mobile_menu ).closest( '#mobile_menu_wrapper' );
					if ( cws_has_class( section, window.sandwich.active_class ) ){
						mobile_menu_wrapper.slideUp( 300 );
						cws_remove_class( section, window.sandwich.active_class );
					}
					else{
						mobile_menu_wrapper.slideDown( 300 );
						cws_add_class( section, window.sandwich.active_class );						
					}
				};				
				break;
			default:
				handler = function (){
					if ( cws_has_class( section, window.sandwich.active_class ) ){
						cws_remove_class( section, window.sandwich.active_class );
					}
					else{
						cws_add_class( section, window.sandwich.active_class );
					}
				};
		};
		switcher.addEventListener( 'click', handler, false );
	}  
	/* select init function */
	function ingenious_select2_init (){
		jQuery("select").select2();
	}
	/* search hovers function */
	function ingenious_search_hovers_init (){
		var i, el, target_el;
		var els = document.querySelectorAll( ".widget #searchsubmit, .widget .woocommerce-product-search input[type='submit']" );
		for ( i = 0; i < els.length; i++ ){
			ingenious_search_hover_init ( els[i] );
		}
	}
	/* search hover function */
	function ingenious_search_hover_init ( el ){
		var target_el = $(el).siblings('.screen-reader-text')[0];
		el.addEventListener( 'mouseenter', function (){
			cws_add_class( target_el, 'hover' );
		});
		el.addEventListener( 'mouseout', function (){
			cws_remove_class( target_el, 'hover' );
		});
	}
	/* widget menu function */
	function ingenious_wp_widget_menu_init (){
		$('.widget .menu .menu-item.menu-item-has-children > .pointer').on( 'click', function( e ) {
			var pointer, item, sub_menu, active_class;
			e.stopPropagation();
			active_class = 'active';
			pointer = this;
			item = pointer.parentNode;
			sub_menu = $( pointer ).siblings( 'ul' );
			if( sub_menu.length ) {
				if ( cws_has_class( item, active_class ) ){
					$( sub_menu ).slideUp( 500 );
					cws_remove_class( item, active_class );
					cws_remove_class( sub_menu[0], active_class );
				}
				else{
					$( sub_menu ).slideDown( 500 );
					cws_add_class( item, active_class );
					cws_add_class( sub_menu[0], active_class );					
				}
			} 
		});
	}
	/* widget pages function */
	function ingenious_wp_widget_pages_init (){
		$('.widget .page_item.page_item_has_children > a').on( 'click', function( e ) {
			e.stopPropagation();
		});
		$('.widget .page_item.page_item_has_children').on( 'click', function( e ) {
			var item, sub_menu, active_class;
			e.stopPropagation();
			active_class = 'active';
			item = this;
			sub_menu = $(item).children('ul');
			if( sub_menu.length ) {
				if ( cws_has_class( item, active_class ) ){
					$( sub_menu ).slideUp( 500 );
					cws_remove_class( item, active_class );
					cws_remove_class( sub_menu[0], active_class );
				}
				else{
					$( sub_menu ).slideDown( 500 );
					cws_add_class( item, active_class );
					cws_add_class( sub_menu[0], active_class );					
				}
			} 
		});
	}

	function ingenious_wp_widget_archives_hierarchy_init (){
		ingenious_wp_widget_archives_hierarchy_controller ( ".widget>ul li", "ul.children", "parent_archive", "widget_archive_opener" );
		ingenious_wp_widget_archives_hierarchy_controller ( ".widget .menu li", "ul.sub-menu", "menu-item-has-children", "opener" );
	}

	function ingenious_wp_widget_archives_hierarchy_controller ( list_item_selector, sublist_item_selector, parent_class, opener_class ){
		jQuery( list_item_selector ).has( sublist_item_selector ).each( function (){
			jQuery( this ).addClass( parent_class );
			var sublist = jQuery( this ).children( sublist_item_selector ).first();
			var level_height = jQuery( this ).outerHeight() - sublist.outerHeight();
			jQuery(this).append( "<span class='fa fa-angle-right " + opener_class + "'></span>" );
		});
		jQuery( list_item_selector + ">" + sublist_item_selector ).css( "display", "none" );
		jQuery( document ).on( "click", "." + opener_class, function (){
			var li = jQuery(this).closest('.menu-item')
			var el = jQuery(this);
			var sublist = el.siblings( sublist_item_selector );
			li.toggleClass( "li_active" );
			if ( !sublist.length ) return;
			sublist = sublist.first();
			el.toggleClass( "active" );
			sublist.slideToggle( 300 );
		});
	}

	/* fancybox init function */
	function ingenious_fancybox_init ( area ){
		var area = area == undefined ? document : area;
		if ( typeof $.fn.fancybox == 'function' ){
			$(".fancy").fancybox();
			$("a[rel^='attachment'][href*='.jpg'], a[rel^='attachment'][href*='.jpeg'], a[rel^='attachment'][href*='.png'],	a[rel^='attachment'][href*='.gif'],.gallery-icon a[href*='.jpg'],.gallery-icon a[href*='.jpeg'],.gallery-icon a[href*='.png'],.gallery-icon a[href*='.gif']").fancybox();
		}
	}
	/* sections dynamic content function */
	function ingenious_posts_grid_sections_dynamic_content_init (){
		var i, section;
		var sections = document.getElementsByClassName( 'posts_grid dynamic_content' );
		for ( i = 0; i < sections.length; i++ ){
			section = sections[i];
			ingenious_posts_grid_section_dynamic_content_init ( section );
		}
	}
	/* section dynamic cintent function */
	function ingenious_posts_grid_section_dynamic_content_init ( section ){
		var i, section_id, grid, loader, form, data_field, paged_field, appear_style, anim_style, display_style, filter_field, data, request_data, response_data, response_data_str, pagination, page_links, page_link, filter, load_more;
		if ( section == undefined ) return;
		grid = section.getElementsByClassName( 'ingenious_grid' );
		if ( !grid.length ) return;
		grid = grid[0];
		loader = section.getElementsByClassName( 'cws_loader_holder' );
		loader = loader.length ? loader[0] : null; 
		form = section.getElementsByClassName( 'posts_grid_data' );
		if ( !form.length ) return;
		form = form[0];
		data_field = form.getElementsByClassName( 'posts_grid_ajax_data' );
		if ( !data_field.length ) return;
		data_field = data_field[0];
		data = data_field.value;
		data = JSON.parse( data );
		section_id = data['section_id'];
		request_data = response_data = data;

		ingenious_posts_grid_dynamic_pagination({
			'section'		: section,
			'section_id'	: section_id,
			'grid'			: grid,
			'loader'		: loader,
			'form'			: form,
			'data_field'	: data_field,
			'paged_field'	: paged_field,
			'filter_field'	: filter_field,
			'data'			: data,
			'display_style'	: display_style,
		});
		filter = $( '.filter', section );
		var event_select;

		if ( $('.posts_grid').hasClass('select_filter') || cws_is_mobile() ) {
			event_select = 'change';
		} else if ( $('.posts_grid').hasClass('simple_filter') ) {
			event_select = 'click';
		}

		if ( filter.length ){
			filter.on( event_select, function (e){
				var filter = $(this);
				var filter_val;
				if ( event_select === "click" ) {
					e.preventDefault();
					filter.addClass('active').siblings().removeClass('active')
					filter_val = filter.attr('data-filter');
				} else {
					filter_val = filter.val();
				}
				if ( loader != null ){
					if ( !cws_has_class( loader, "filter_action" ) ){
						cws_add_class( loader, "filter_action" );
					}
					if ( !cws_has_class( loader, "active" ) ){
						cws_add_class( loader, "active" );
					}
				}
				request_data['current_filter_val']	= filter_val;
				request_data['page']				= 1;
				$.post( ajaxurl, {
					'action'		: 'ingenious_posts_grid_dynamic_filter',
					'data'			: request_data
				}, function ( response, status ){
					var response_container, old_items, load_more_pg, load_more_pg_old, new_items, pagination, new_pagination, img_loader;
					response_container = document.createElement( "div" );
					response_container.innerHTML = response;
					new_items = $( ".item", response_container );
					new_items.hide();
					new_pagination = response_container.getElementsByClassName( 'pagination dynamic' );
					new_pagination = new_pagination.length ? new_pagination[0] : null;

					load_more_pg = response_container.getElementsByClassName( 'ingenious_load_more' );
					load_more_pg = load_more_pg.length ? load_more_pg[0] : null;

					old_items = $( ".item", grid );
					pagination = section.getElementsByClassName( 'pagination dynamic' );
					pagination = pagination.length ? pagination[0] : null;	
					
					load_more_pg_old = section.getElementsByClassName( 'ingenious_load_more' );
					load_more_pg_old = load_more_pg_old.length ? load_more_pg_old[0] : null;	

					$( grid ).append( new_items );
					ingenious_hexagon_grid();
					ingenious_hex_grid_2_init();
					img_loader = imagesLoaded ( grid );
					img_loader.on( "always", function (){
						ingenious_canvas_figure();
						ingenious_fancybox_init ( grid );
						ingenious_isotope_init ();
						ingenious_hoverdir();
						if ($('.ingenious_grid').hasClass('isotope')){
							$( grid ).isotope( 'remove', old_items );
						} else {
							new_items.fadeIn();
							$( old_items ).closest('.hexgrid-inner-wrapper').remove();
							$( old_items ).remove();
						}
						new_items.show();
						ingenious_gallery_post_carousel_init( grid );
						ingenious_hexagon_grid();
						ingenious_hex_grid_2_init();
						if ($('.ingenious_grid').hasClass('isotope')) {
							$( grid ).isotope( 'appended', new_items );
							$( grid ).isotope( 'layout' );
						}
						if (Retina.isRetina()) {
							jQuery(window.retina.root).trigger( "load" );
						}
						if ( pagination != null || load_more_pg_old != null ){
							cws_add_class ( pagination || load_more_pg_old, "hiding animated fadeOut" );
							setTimeout( function (){
								(pagination || load_more_pg_old).parentNode.removeChild( pagination || load_more_pg_old );
								if ( new_pagination != null || load_more_pg != null ){
									cws_add_class( new_pagination || load_more_pg, "animated fadeIn" );
									section.insertBefore( new_pagination || load_more_pg, form );
									if(new_pagination){
										ingenious_posts_grid_dynamic_pagination({
												'section'		: section,
												'section_id'	: section_id,
												'grid'			: grid,
												'loader'		: loader,
												'form'			: form,
												'data_field'	: data_field,
												'paged_field'	: paged_field,
												'filter_field'	: filter_field,
												'data'			: data,
												'display_style'	: display_style,
											});	
									}	
									if(load_more_pg){
										ingenious_posts_grid_dynamic_loadmore({
												'section'		: section,
												'section_id'	: section_id,
												'grid'			: grid,
												'loader'		: loader,
												'form'			: form,
												'data_field'	: data_field,
												'paged_field'	: paged_field,
												'filter_field'	: filter_field,
												'data'			: data,
												'display_style'	: display_style,
											});	
									}			    		
								}
							}, 300);
						}
						else{
							if ( new_pagination != null || load_more_pg != null ){
								cws_add_class( new_pagination || load_more_pg, "animated fadeIn" );
								section.insertBefore( new_pagination || load_more_pg, form );
								if(new_pagination){
									ingenious_posts_grid_dynamic_pagination({
											'section'		: section,
											'section_id'	: section_id,
											'grid'			: grid,
											'loader'		: loader,
											'form'			: form,
											'data_field'	: data_field,
											'paged_field'	: paged_field,
											'filter_field'	: filter_field,
											'data'			: data,
											'display_style'	: display_style,
									});	
								}
								if(load_more_pg){
									ingenious_posts_grid_dynamic_loadmore({
											'section'		: section,
											'section_id'	: section_id,
											'grid'			: grid,
											'loader'		: loader,
											'form'			: form,
											'data_field'	: data_field,
											'paged_field'	: paged_field,
											'filter_field'	: filter_field,
											'data'			: data,
											'display_style'	: display_style,
									});	
								}
							}					    	
						}
						ingenious_isotope_init ();
						ingenious_portfolio_fw_load();
						response_data['current_filter_val']	= filter_val;
						response_data['page']		= 1;
						response_data_str = JSON.stringify( response_data );
						data_field.value = response_data_str;
						if ( loader != null ){
							if ( cws_has_class( loader, "filter_action" ) ){
								cws_remove_class( loader, "filter_action" );
							}
							if ( cws_has_class( loader, "active" ) ){
								cws_remove_class( loader, "active" );
							}
						}
					});
				});
			})
		}

		//Portfolio load more
		load_more = section.getElementsByClassName( 'ingenious_load_more' );
		if ( load_more.length ){
			load_more = load_more[0];
			load_more.addEventListener( 'click', function ( e ){
				var page, next_page, max_paged;
				e.preventDefault();
				e.stopPropagation();
				if ( !cws_has_class( loader, "load_more_action" ) ){
					cws_add_class( loader, "load_more_action" );
				}
				if ( !cws_has_class( loader, "active" ) ){
					cws_add_class( loader, "active" );
				}
				page = data['page'];
				max_paged = data['max_paged'];
				next_page = page + 1;
				request_data['page'] = next_page;
				if ( next_page >= max_paged ){
					cws_add_class( load_more, 'hiding animated fadeOut' );
					setTimeout( function (){
						load_more.parentNode.removeChild( load_more );
					}, 300);
				}
				$.post( ajaxurl, {
					'action'		: 'ingenious_posts_grid_dynamic_pagination',
					'data'			: request_data
				}, function ( response, status ){
					var response_container, new_items, img_loader;
					response_container = document.createElement( "div" );
					response_container.innerHTML = response;
					new_items = $( ".item", response_container );
					if ($('.ingenious_grid').hasClass('isotope')){
						new_items.addClass( "hidden" );
					} else {
						new_items.hide();
					}
					if ($(grid).hasClass('hexgrid-wrapper') && $(section).hasClass('posts_grid_hex_style_2') ) {
						grid = section.getElementsByClassName( 'hexgrid-inner-wrapper' );
						grid = grid[0];
					}
					$( grid ).append( new_items );
					img_loader = imagesLoaded ( grid );
					img_loader.on( "always", function (){
						var ex = false
						ingenious_canvas_figure( new_items , ex);
						ingenious_hexagon_grid();
						ingenious_hex_grid_2_init();
						ingenious_gallery_post_carousel_init( new_items );
						ingenious_fancybox_init ( grid );
						ingenious_isotope_init ();
						ingenious_hoverdir();
						if ($('.ingenious_grid').hasClass('isotope')) {
							new_items.removeClass( "hidden" );
						} else {
							new_items.fadeIn();
						}
						if ($('.ingenious_grid').hasClass('isotope')) {	
							$( grid ).isotope( 'appended', new_items );
							$( grid ).isotope( 'layout' );
						}
						if (Retina.isRetina()) {
							jQuery(window.retina.root).trigger( "load" );
						}
						ingenious_portfolio_fw_load();
						response_data['page'] = next_page;
						response_data_str = JSON.stringify( response_data );
						data_field.value = response_data_str;
						if ( loader != null ){
							if ( cws_has_class( loader, "load_more_action" ) ){
								cws_remove_class( loader, "load_more_action" );
							}
							if ( cws_has_class( loader, "active" ) ){
								cws_remove_class( loader, "active" );
							}
						}
					});
				});
			}, false );
		}
	}

	/* timeline loade more function */
	function ingenious_posts_timeline_load_more() {
		jQuery(document).on('click', '.ingenious_load_more_time_line', function(e) {
			e.preventDefault();
			var page, next_page, max_paged, response_data, response_data_str, data_field;
			var button = jQuery(this);
			var section = jQuery(this).parent('.latest_post_post_list');
			var field = section.find('.posts_grid_data');
			field = field[0];
			data_field = field.getElementsByClassName( 'posts_grid_ajax_data' );
			if ( !data_field.length ) return;
			data_field = data_field[0];
			var data = data_field.value;
			data = JSON.parse( data );
			var grid = section.find('.posts_time_line_wrap');;
			if ( !grid.length ) return;
			grid = grid[0];
			var request_data = response_data = data;

			page = data['page'];
			max_paged = data['max_paged'];
			next_page = page + 1;
			request_data['page'] = next_page;	

			if ( next_page >= max_paged ){
				button.addClass('hiding animated fadeOut');
				setTimeout( function (){
					button.remove();
					$(".latest_post_list_end").css('display','block');
				}, 600);
			}

			$.post( ajaxurl, {
				'action'		: 'ingenious_posts_timeline',
				'data'			: request_data
			}, function ( response, status ){
				var response_container, new_items, img_loader;
				response_container = document.createElement( "div" );
				response_container.innerHTML = response;
				new_items = $( ".post", response_container );
				new_items.hide();
				new_items.removeClass('block_show');
				$( grid ).append( new_items );
				img_loader = imagesLoaded ( grid );
				img_loader.on( "always", function (){
					ingenious_canvas_figure();
					ingenious_hexagon_grid();
					ingenious_hex_grid_2_init();
					ingenious_gallery_post_carousel_init( new_items );
					ingenious_fancybox_init ( grid );
					$(new_items).each(function(index, el) {
						$(this).slideDown();
						$(this).delay(200*index).queue(function(){
							$(this).addClass('block_show');
							$(this).dequeue();
						});
					});
					if (Retina.isRetina()) {
						jQuery(window.retina.root).trigger( "load" );
					}
					response_data['page'] = next_page;
					response_data_str = JSON.stringify( response_data );
					data_field.value = response_data_str;
				});
			});
		});
	}
	/* portfolio single carousel function */
	function ingenious_portfolio_single_carousel_init (){
		jQuery( ".portfolio.single.related" ).each( function (){
			var parent = jQuery(this);
			var grid = jQuery( ".portfolio_items", parent );
			var ajax_data_input = jQuery( "#portfolio_single_ajax_data", parent );
			var carousel_nav = jQuery( ".carousel_nav_panel", parent );
			if ( !carousel_nav.length ) return;
			jQuery( ".prev,.next", carousel_nav ).on( "click", function (){
				var el = jQuery( this );
				var action = el.hasClass( "prev" ) ? "prev" : "next";
				var ajax_data = JSON.parse( ajax_data_input.val() );
				var current = ajax_data['current'];
				var all = ajax_data['related_ids'];
				var next_ind;
				var next;
				for ( var i=0; i<all.length; i++ ){
					if ( all[i] == current ){
						if ( action == "prev" ){
							if ( i <= 0 ){
								next_ind = all.length-1;
							}
							else{
								next_ind = i-1;
							}
						}
						else{
							if ( i >= all.length-1 ){
								next_ind = 0;
							}
							else{
								next_ind = i+1
							}
						}
						break;
					}
				}
				if ( typeof next_ind != "number" || typeof all[next_ind] == undefined ) return;
				next = all[next_ind];
				jQuery.post( ajaxurl, {
					'action' : 'ingenious_portfolio_single',
					'data' : {
						'initial_id' : ajax_data['initial'],
						'requested_id' : next
					}
				}, function ( data, status ){
					var animation_config, old_el, old_el2, new_el, hiding_class, showing_class, delay, img_loader;
					ajax_data['current'] = next;
					ajax_data_input.attr( "value", JSON.stringify( ajax_data ) );
					animation_config = {
						'prev' : {
							'in' : 'fadeInLeft',
							'out' : 'fadeOutRight'
						},
						'next' : {
							'in' : 'fadeInRight',
							'out' : 'fadeOutLeft'
						},
						'delay' : 150
					};
					old_el = jQuery( ".portfolio_items .post_single" , parent );
					new_el = jQuery( ".post_single", jQuery( data ) );
					old_el2 = jQuery('#page.full_width > .post_media');
					hiding_class = "animated " + animation_config[action]['out'];
					showing_class = "animated " + animation_config[action]['in'];
					delay = animation_config['delay'];
					new_el.css( "display", "none" );
					grid.append( new_el );
					img_loader = imagesLoaded( grid );
					img_loader.on( 'always', function (){
						old_el.addClass( hiding_class );
						old_el2.addClass( hiding_class );
						setTimeout( function (){
							old_el.remove();
							old_el2.remove();
							new_el.addClass( showing_class );
							new_el.css( "display", "block" );

						    if (Retina.isRetina()) {
					        	jQuery(window.retina.root).trigger( "load" );
						    }
							ingenious_gallery_post_carousel_init ();
						    ingenious_fancybox_init();

						}, delay );
					});
				});
			});
		});
	}
	/* posts grid dynamic loadmore function */
	function ingenious_posts_grid_dynamic_loadmore ( args ){
		var i, section, section_id, section_offset, grid, loader, form, data_field, paged_field, filter_field, data, display_style, request_data, response_data, pagination, page_links, page_link;
		section = args['section'];
		section_id = args['section_id'];
		grid = args['grid'];
		loader = args['loader'];
		form = args['form'];
		data_field = args['data_field'];
		paged_field	= args['paged_field'];
		filter_field = args['filter_field'];
		display_style = args['display_style'];
		data = request_data = response_data = args['data'];
		section_offset = $( section ).offset().top;
		pagination = section.getElementsByClassName( 'pagination dynamic' );
		var load_more = section.getElementsByClassName( 'ingenious_load_more' );
		if ( !load_more.length ) return;
		load_more = load_more[0];
		load_more.addEventListener( 'click', function ( e ){
			var page, next_page, max_paged;
			e.preventDefault();
			if ( !cws_has_class( loader, "load_more_action" ) ){
				cws_add_class( loader, "load_more_action" );
			}
			if ( !cws_has_class( loader, "active" ) ){
				cws_add_class( loader, "active" );
			}
			page = data['page'];
			max_paged = data['max_paged'];
			next_page = page + 1;
			request_data['page'] = next_page;
			if ( next_page >= max_paged ){
				cws_add_class( load_more, 'hiding animated fadeOut' );
				setTimeout( function (){
					load_more.parentNode.removeChild( load_more );
				}, 300);
			}
			$.post( ajaxurl, {
				'action'		: 'ingenious_posts_grid_dynamic_pagination',
				'data'			: request_data
			}, function ( response, status ){
				var section_offset_top, response_container, page_number_field, old_items, new_items, pagination, old_page_links, new_pagination, new_page_links, img_loader, page_number, response_data_str;
				response_container = document.createElement( "div" );
				response_container.innerHTML = response;
				new_items = $( ".item", response_container );
				new_items.hide();
				$( grid ).append( new_items );
				img_loader = imagesLoaded ( grid );
				img_loader.on( "always", function (){
					ingenious_canvas_figure();
					ingenious_hexagon_grid();
					ingenious_hex_grid_2_init();
					ingenious_fancybox_init ( grid );
					ingenious_isotope_init ();
					new_items.show();
					ingenious_gallery_post_carousel_init( new_items );
					if ($('.ingenious_grid').hasClass('isotope')) {
						$( grid ).isotope( 'appended', new_items );
						$( grid ).isotope( 'layout' );
					}
					if (Retina.isRetina()) {
						jQuery(window.retina.root).trigger( "load" );
					}
					ingenious_portfolio_fw_load();
					response_data['page'] = next_page;
					response_data_str = JSON.stringify( response_data );
					data_field.value = response_data_str;
					if ( loader != null ){
						if ( cws_has_class( loader, "load_more_action" ) ){
							cws_remove_class( loader, "load_more_action" );
						}
						if ( cws_has_class( loader, "active" ) ){
							cws_remove_class( loader, "active" );
						}
					}
				});
			});
		});	
	}
	/* posts grid dynamic pagination function */
	function ingenious_posts_grid_dynamic_pagination ( args ){
		var i, section, section_id, section_offset, grid, loader, form, data_field, paged_field, filter_field, data, display_style, request_data, response_data, pagination, page_links, page_link;

		section = args['section'];
		section_id = args['section_id'];
		grid = args['grid'];
		loader = args['loader'];
		form = args['form'];
		data_field = args['data_field'];
		paged_field	= args['paged_field'];
		filter_field = args['filter_field'];
		display_style = args['display_style'];
		data = request_data = response_data = args['data'];
		section_offset = $( section ).offset().top;

		pagination = section.getElementsByClassName( 'pagination dynamic' );
		if ( !pagination.length ) return;
		pagination = pagination[0];
		page_links = pagination.getElementsByTagName( 'a' );
		for ( i = 0; i < page_links.length; i++ ){
			page_link = page_links[i];
			page_link.addEventListener( 'click', function ( e ){
				e.preventDefault();
				var el = e.srcElement ? e.srcElement : e.target;
				if ( loader != null ){
					if ( !cws_has_class( loader, "pagination_action" ) ){
						cws_add_class( loader, "pagination_action" );
					}
					if ( !cws_has_class( loader, "active" ) ){
						cws_add_class( loader, "active" );
					}
				}
				request_data['req_page_url'] = jQuery(el).is('.page-numbers') ? el.href : jQuery(el).parent()[0].href;
				$.post( ajaxurl, {
					'action'		: 'ingenious_posts_grid_dynamic_pagination',
					'data'			: request_data
				}, function ( response, status ){
					var section_offset_top, response_container, page_number_field, old_items, new_items, pagination, old_page_links, new_pagination, new_page_links, img_loader, page_number, response_data_str;
					response_container = document.createElement( "div" );
					response_container.innerHTML = response;
					new_items = $( ".item", response_container );
					new_items.hide();
					new_pagination = response_container.getElementsByClassName( 'pagination dynamic' );
					new_pagination = new_pagination.length ? new_pagination[0] : null;
					new_page_links = new_pagination != null ? new_pagination.getElementsByClassName( 'page_links' ) : [];
					new_page_links = new_page_links.length ? new_page_links[0] : null;
					page_number_field = response_container.getElementsByClassName( 'ingenious_posts_grid_dynamic_pagination_page_number' );
					page_number_field = page_number_field.length ? page_number_field[0] : null;
					page_number = page_number_field != null ? page_number_field.value : "";						
					section_offset_top = $( section ).offset().top;
					old_items = $( ".item", grid );
					pagination = section.getElementsByClassName( 'pagination dynamic' );
					pagination = pagination.length ? pagination[0] : null;
					old_page_links = pagination != null ? pagination.getElementsByClassName( 'page_links' ) : [];
					old_page_links = old_page_links.length ? old_page_links[0] : null;	
					if ( window.scrollY > section_offset_top ){
						jQuery( 'html, body' ).stop().animate({
							scrollTop : section_offset_top
						}, 300);
					}
					$( grid ).append( new_items );
					img_loader = imagesLoaded ( grid );
					img_loader.on( "always", function (){
						ingenious_canvas_figure();
						if ($('.ingenious_grid').hasClass('isotope')) {					
							$( grid ).isotope( 'remove', old_items );
						}
						if ($('.dynamic_content').hasClass('hexagon_grid')) {				
							$( old_items ).closest('.hexgrid-inner-wrapper').remove();
							$(old_items).remove();
						}
						ingenious_hexagon_grid();
						ingenious_hex_grid_2_init();
						ingenious_fancybox_init ( grid );
						ingenious_isotope_init ();
						new_items.show();
						ingenious_gallery_post_carousel_init( new_items );
						if ($('.ingenious_grid').hasClass('isotope')) {
							$( grid ).isotope( 'appended', new_items );
							$( grid ).isotope( 'layout' );
						}
						if (Retina.isRetina()) {
							jQuery(window.retina.root).trigger( "load" );
						}
						cws_add_class ( old_page_links, "hiding animated fadeOut" );
						setTimeout( function (){
							try {
								pagination.removeChild ( old_page_links );
							}
							catch(i) {
								return false;
							}
							cws_add_class( new_page_links, "animated fadeIn" );
							pagination.appendChild ( new_page_links );
							ingenious_posts_grid_dynamic_pagination({
									'section'		: section,
									'section_id'	: section_id,
									'grid'			: grid,
									'loader'		: loader,
									'form'			: form,
									'data_field'	: data_field,
									'paged_field'	: paged_field,
									'filter_field'	: filter_field,
									'data'			: data,
									'display_style'	: display_style,
								});
						}, 300);
						ingenious_portfolio_fw_load();
						response_data['page'] = page_number.length ? page_number : 1;
						response_data_str = JSON.stringify( response_data );
						data_field.value = response_data_str;
						if ( loader != null ){
							if ( cws_has_class( loader, "pagination_action" ) ){
								cws_remove_class( loader, "pagination_action" );
							}
							if ( cws_has_class( loader, "active" ) ){
								cws_remove_class( loader, "active" );
							}
						}
						if ( window.scrollY > section_offset ){
							jQuery( 'html, body' ).stop().animate({
								scrollTop : section_offset
							}, 300);
						}
					});
				});
			});
		}	
	}
	/* isotope */
	function ingenious_isotope_init (){
		if ( typeof $.fn.isotope == 'function' ){
			$(".isotope").isotope({
				itemSelector: ".item"
			});
		}
		if (jQuery(".masonry").length) {
			jQuery.each( jQuery(".masonry"), function( i, val ) {

				ingenious_isotope_masonry_resize(val);
				jQuery( window ).resize(function() {
					ingenious_isotope_masonry_resize(val);
				});

				jQuery(val).isotope({
					itemSelector: ".item",
					  percentPosition: true,
					  layoutMode: 'masonry',
					  masonry: {
						columnWidth: '.grid-size',
					  }	
				});	

			});
		}
	}
	/* masonry isotope function */
	function ingenious_isotope_masonry_resize(container){
		var container, size, th, col_count, line_count, width;
		container = jQuery(container);
		size = container.find('.grid-size');
		width = container.width();
		var grid_num = container.parents('.posts_grid').attr('data-col');
		var col_width = width/grid_num;
		container.find('.item').each(function() {
			th = jQuery(this);
			col_count = th.data('masonry-col'); 
			line_count = th.data('masonry-line'); 
			var col = col_width*col_count;
			var line = col_width*line_count;
			th.css('width', col + 'px');
			th.css('height',line + 'px');
			if (jQuery(document).width() < 600) {
				th.css('width', '100%');
				th.css('height','auto');
			}
		});
	}
	/* carousel init function */
	function ingenious_carousel_init ( area ){
		var area = area == undefined ? document : area;
		$( ".ingenious_carousel", area ).each( function (){
			var owl = jQuery(this);
			if (owl.hasClass('carousel_auto')) {
				var auto = 4000;
			} else {var auto = false}
			var carousel = this;
			var section = $( carousel ).closest( ".posts_grid" );
			var nav = $( ".carousel_nav", section );
			var navi, pag;
			if (owl.hasClass( 'carousel_pagination' )) {
				pag = true;
				navi = false;
			} else if (owl.hasClass( 'carousel_nav' )) {
				pag = false;
				navi = true;
			} else {
				navi = false;
				pag = false;
			}
			var cols = carousel.dataset.cols;
			var args = {
				itemsel: "*:not(style)",	/* for staff members because they have custom color styles */
				slideSpeed: 300,
				navigation: navi,
				pagination: pag,
				autoPlay: auto,
				direction: directRTL
			};
			switch ( cols ){
				case '5':
					args.itemsCustom = [
						[0,1],
						[579,2],
						[980,3],
						[1170, 5]
					];
					break
				case '4':
					args.itemsCustom = [
						[0,1],
						[579,2],
						[980,3],
						[1170, 4]
					];
					break
				case '3':
					args.itemsCustom = [
						[0,1],
						[579,2],
						[980,3]
					];
					break
				case '2':
					args.itemsCustom = [
						[0,1],
						[579,2]
					];
					break
				default:
					args.singleItem = true;
			}
			$( carousel ).owlCarousel( args );
			if ( nav.length ){
				$( ".next", nav ).click( function (){
					$( carousel ).trigger( "owl.next" );
				});
				$( ".prev", nav ).click( function (){
					$( carousel ).trigger( "owl.prev" );
				});
			}
		});
	}
	/* widget carousel init function */
	function ingenious_widget_carousel_init(){
		jQuery(".widget_carousel").each(function (){
			var bullets_nav, nav;
			var owl = jQuery(this);
			if (owl.hasClass( 'bullets_nav' )) {
				bullets_nav = true;
				nav = false;
			} else{
				bullets_nav = false;
				nav = true;
			}

			owl.owlCarousel({
				singleItem: true,
				slideSpeed: 300,
				navigation: nav,
				pagination: bullets_nav,
				direction: directRTL
			});
			jQuery(this).parent().find(".carousel_nav .next").click(function (){
					owl.trigger('owl.next');
			});
			jQuery(this).parent().find(".carousel_nav .prev").click(function (){
					owl.trigger('owl.prev');
			});
		});
	}
	/* gallery carousel function */
	function ingenious_gallery_post_carousel_init( area ){
		var area = area == undefined ? document : area;
		jQuery( ".gallery_post_carousel", area ).each(function (){
			var owl = jQuery(this);
			owl.owlCarousel({
				singleItem: true,
				slideSpeed: 300,
				navigation: false,
				pagination: false,
				direction: directRTL
			});
			jQuery(this).parent().find(".carousel_nav.next").click(function (){
					owl.trigger('owl.next');
			});
			jQuery(this).parent().find(".carousel_nav.prev").click(function (){
					owl.trigger('owl.prev');
			});
		});
	}
	/* count carousel function */
	function ingenious_count_carousel_items ( cont, layout_class_prefix, item_class, margin ){
		var re, matches, cols, cont_width, items, item_width, margins_count, cont_without_margins, items_count;
		if ( !cont ) return 1;
		layout_class_prefix = layout_class_prefix ? layout_class_prefix : 'grid-';
		item_class = item_class ? item_class : 'item';
		margin = margin ? margin : 30;
		re = new RegExp( layout_class_prefix + "(\\d+)" );
		matches = re.exec( cont.attr( "class" ) );
		cols = matches == null ? 1 : parseInt( matches[1] );
		cont_width = cont.outerWidth();
		items = cont.children( "." + item_class );
		item_width = items.eq(0).outerWidth();
		margins_count = cols - 1;
		cont_without_margins = cont_width - ( margins_count * margin ); /* margins = 30px */
		items_count = Math.round( cont_without_margins / item_width );	
		return items_count;
	}
	/* carousel function */
	function ingenious_sc_carousel_init (){
		jQuery( ".ingenious_sc_carousel" ).each( ingenious_sc_carousel_controller );
		window.addEventListener( 'resize', function (){
			jQuery( ".ingenious_sc_carousel" ).each( ingenious_sc_carousel_controller );		
		}, false);
	}
	/* carousel controller function */
	function ingenious_sc_carousel_controller (){
		var el = jQuery( this );
		var bullets_nav = el.hasClass( "bullets_nav" );
		var auto = el.attr("data-time");
		var content_wrapper = jQuery( ".ingenious_wrapper", el );
		var owl = content_wrapper;
		var content_top_level = content_wrapper.children().filter( function(){
			return cws_empty_p_filter_callback.call( this ) && cws_br_filter_callback.call( this ); /* fix wpautop & br tags */
		});
		var nav = jQuery( ".carousel_nav", el );
		var cols = el.data( "columns" );
		var items_count, grid_class, col_class, items, children, is_init, matches, args;
		if ( content_top_level.is( ".gallery[class*='galleryid-']" ) ){
			owl = content_top_level.filter( ".gallery[class*='galleryid-']" );
			is_init = owl.hasClass( "owl-carousel" );
			if ( is_init ) owl.data( "owlCarousel" ).destroy();
			owl.children( ":not(.gallery-item)" ).remove();
			items_count = ingenious_count_carousel_items( owl, "gallery-columns-", "gallery-item" );
		}
		else if ( content_top_level.is( ".woocommerce" ) ){
			owl = content_top_level.children( ".products" );
			is_init = owl.hasClass( "owl-carousel" );
			if ( is_init ) owl.data( "owlCarousel" ).destroy();
			owl.children( ":not(.product)" ).remove();
			matches = /columns-\d+/.exec( content_top_level.attr( "class" ) );
			grid_class = matches != null && matches[0] != undefined ? matches[0] : '';
			owl.addClass( grid_class );
			items_count = ingenious_count_carousel_items( owl, "columns-", "product" );
			owl.removeClass( grid_class );
		}
		else if ( content_top_level.is( "ul" ) ){
			owl = content_top_level;
			is_init = owl.hasClass( "owl-carousel" );
			if ( is_init ) owl.data( "owlCarousel" ).destroy();
			children = owl.children();
			children.each( function (){
				if ( !cws_empty_p_filter_callback.call( this ) || !cws_br_filter_callback.call( this ) ){
					$( this ).remove();
				}
			});
			items = owl.children();
			grid_class = "crsl-grid crsl-grid-" + cols;
			col_class = "grid_col_" + Math.round( 12 / cols );
			owl.addClass( grid_class );
			if ( !items.hasClass( "item" ) ) items.addClass( "item" )
			items.addClass( col_class );
			items_count = ingenious_count_carousel_items( owl, "crsl-grid-", "item" );
			owl.removeClass( grid_class );
			items.removeClass( col_class );
		}
		else {
			is_init = owl.hasClass( "owl-carousel" );
			if ( is_init ) owl.data( "owlCarousel" ).destroy();
			children = owl.children();
			children.each( function (){
				if ( !cws_empty_p_filter_callback.call( this ) || !cws_br_filter_callback.call( this ) ){
					$( this ).remove();
				}
			});
			items = owl.children();
			grid_class = "crsl-grid-" + cols;
			col_class = "grid_col_" + Math.round( 12 / cols );
			owl.addClass( grid_class );
			if ( !items.hasClass( "item" ) ) items.addClass( "item" )
			items.addClass( col_class );
			items_count = ingenious_count_carousel_items( owl, "crsl-grid-", "item" );
			owl.removeClass( grid_class );
			items.removeClass( col_class );
		}
		args = {
			slideSpeed: 300,
			navigation: false,
			autoPlay: auto,
			pagination: bullets_nav,
			dragDirection: directRTL,
			direction: directRTL
		}
		switch ( items_count ){
			case 5:
				args.itemsCustom = [
					[0,1],
					[479,2],
					[980,3],
					[1170, 5]
				];
				break;
			case 4:
				args.itemsCustom = [
					[0,1],
					[479,2],
					[980,3],
					[1170, 4]
				];
				break;
			case 3:
				args.itemsCustom = [
					[0,1],
					[479,2],
					[980,3]
				];	
				break;
			case 2:
				args.itemsCustom = [
					[0,1],
					[479,2]
				];	
				break;
			default:
				args.singleItem = true;
		}
		owl.owlCarousel(args);
		if ( nav.length ){
			jQuery( ".next", nav ).click( function (){
				owl.trigger( "owl.next" );
			});
			jQuery( ".prev", nav ).click( function (){
				owl.trigger( "owl.prev" );
			});
		}	
	}
	/* product carousel function */
	function cws_woo_product_thumbnails_carousel_init (){
		$( ".woo_product_thumbnail_carousel" ).each( function (){
			var cols, args, prev, next;
			var owl = $( this );
			var matches = /carousel_cols_(\d+)/.exec( this.className );
			if ( !matches ){
				cols = 3;
			}
			else{
				cols = matches[1];
			}
			args = {
				slideSpeed: 300,
				navigation: false,
				pagination: false,
				items: cols,
				direction: directRTL		
			}
			owl.owlCarousel( args );
			prev = this.parentNode.querySelector( ":scope > .prev" );
			next = this.parentNode.querySelector( ":scope > .next" );
			if ( prev ){
				prev.addEventListener( "click", function (){
					owl.trigger( "owl.prev" );
				}, false );
			}
			if ( next ){
				next.addEventListener( "click", function (){
					owl.trigger( "owl.next" );
				}, false );
			}
		});
	}
	/* scroll top vars function */
	function scroll_top_vars_init (){
		window.scroll_top = {
			el : jQuery( "#scroll_to_top" ),
			anim_in_class : "show_scroll",
			anim_out_class : "hide_scroll",			
			last_scroll_top : 0
		};
	}
	/* scroll top function */
	function scroll_top_init (){
		scroll_top_vars_init ();
		scroll_top_controller ();
		window.addEventListener( 'scroll', scroll_top_controller, false);
		window.scroll_top.el.on( 'click', function (){
			jQuery( "html, body" ).animate( {scrollTop : 0}, '300', function (){
				window.scroll_top.el.css({
					"pointer-events" : "none"
				});
				window.scroll_top.el.addClass( window.scroll_top.anim_out_class );
			});
		});
	}/* scroll top controller function */
	function scroll_top_controller (){
		var scroll_pos = window.pageYOffset;
		var window_height = window.innerHeight || document.documentElement.clientHeight;

		if ( window.scroll_top == undefined ) return;

			if ( scroll_pos < 1 && window.scroll_top.el.hasClass( window.scroll_top.anim_in_class ) ){
				scroll_top_hide();
			}
			else if( scroll_pos >= 1){
				if (window.theme_opts.scroll_to_top == 'standard'){
					scroll_top_show();
				} else if (window.theme_opts.scroll_to_top == 'smart'){
					if (window.scroll_top.last_scroll_top > scroll_pos){
						scroll_top_show();
					} else {
						scroll_top_hide();
					}
					window.scroll_top.last_scroll_top = scroll_pos;
				}
			}
	}

	function scroll_top_show(){
		window.scroll_top.el.css({
			"pointer-events" : "auto"
		});

		window.scroll_top.el.removeClass( window.scroll_top.anim_out_class );
		window.scroll_top.el.addClass( window.scroll_top.anim_in_class );
	}

	function scroll_top_hide(){
		window.scroll_top.el.css({
			"pointer-events" : "none"
		});

		window.scroll_top.el.removeClass( window.scroll_top.anim_in_class );
		window.scroll_top.el.addClass( window.scroll_top.anim_out_class );
	}	

	/* row step scroll init */
	function ingenious_step_scroll_init() {
		jQuery('.row_step:not(.custom_link)').each(function (){
			var el = jQuery(this);
			var id  = el.find('.row_step_link').attr('href').slice(1);
			var parent_next = el.parents('.cws-content').next();
			parent_next.attr('id', id);
			el.on('click', function (event){
				event.preventDefault();
				var top = parent_next.offset().top;
				jQuery('body,html').animate({scrollTop: top}, 500);
			})
		})
	}
	/* message box function */
	function ingenious_msg_box_init (){
		jQuery( document ).on( 'click', '.ingenious_msg_box.closable .close_button', function (){
			var cls_btn = jQuery(this);
			var el = cls_btn.closest( ".ingenious_msg_box" );
			el.fadeOut( function (){
				el.remove();
			});
		});
	}
	/* progress bar function */
	function cws_progress_bar_init (){
		jQuery.fn.cws_progress_bar = function (){
			jQuery(this).each( function (){
				var el = jQuery(this);
				var done = false;
				if (!done) done = progress_bar_controller(el);
				jQuery(window).scroll(function (){
					if (!done) done = progress_bar_controller(el);
				});
			});
		}
	}
	/* progress bar controller function */
	function progress_bar_controller (el){
		if (el.is_visible()){
			var progress = el.find(".ingenious_pb_progress");
			var value = parseInt( progress.attr("data-value") );
			var width = parseInt(progress.css('width').replace(/%|(px)|(pt)/,""));
			var ind = el.find(".indicator");
			if ( width < value ){
				var progress_interval = setInterval( function(){
					width ++;
					progress.css("width", width+"%");
					ind.text(width+'%');
					if (width == value){
						clearInterval(progress_interval);
					}
				}, 7);
			}
			return true;
		}
		return false;
	}
	/* pricing table highlighted */
	function pricing_table_highlighted (){
		jQuery('.ingenious_pricing_plan.highlighted').each(function(){
			jQuery(this).parents('.vc_column_container').css('z-index','4');
		})
	}
	/* sticky sidebars function */
	function cws_sticky_sidebars_init(){
		if (!cws_is_mobile_device()){
			jQuery('.sticky_sidebar:not(.single-cwsportfolio) .sidebar').theiaStickySidebar({
				additionalMarginTop: 60,
				additionalMarginBottom: 60
			}); 
			jQuery('.cwsportfolio_post.sticky .sidebar').theiaStickySidebar({
				additionalMarginTop: 60,
				additionalMarginBottom: 60
			}); 
		}
	}
	/* milestone function */
	function cws_milestone_init (){
		jQuery.fn.cws_milestone = function (){
			jQuery(this).each( function (){		
				var el = jQuery(this);
				var number_container = el.find(".ingenious_milestone_number");
				var done = false;
				if (number_container.length){
					if ( !done ) done = milestone_controller (el, number_container);
					jQuery(window).scroll(function (){
						if ( !done ) done = milestone_controller (el, number_container);
					});
				}
			});
		}
	}
	/* milestone controller function */
	function milestone_controller (el, number_container){
		var od, args;
		var speed = number_container.data( 'speed' );
		var number = number_container.text();
		if (el.is_visible()){
			args= {
				el: number_container[0],
				format: 'd',
			};
			if ( speed ) args['duration'] = speed;
			od = new Odometer( args );
			od.update( number );
			return true;
		}
		return false;
	}
	function get_digit (number, digit){
		var exp = Math.pow(10, digit);
		return Math.round(number/exp%1*10);
	}
	/*  cws ios touch function */
	function cws_ios_touch_events_empty_handler ( e ){
		e.preventDefault();
		return true;
	}
	/* standard processing function */
	function ingenious_wp_standard_processing (){
		var galls;
		jQuery( "img[class*='wp-image-']" ).each( function (){
			var canvas_id;
			var el = jQuery( this );
			var parent = el.parent( "a" );
			var align_class_matches = /align\w+/.exec( el.attr( "class" ) );
			var align_class = align_class_matches != null && align_class_matches[0] != undefined ? align_class_matches[0] : "";
			var added_class = "";
			if ( align_class.length ){
				if ( parent.length ){
					el.removeClass( align_class );
				}
				added_class += " " + align_class;
			}
			if ( parent.length ){
				parent.addClass( added_class );
			}
		});
		galls = jQuery( ".gallery[class*='galleryid-']" );
		if ( galls.length ){
			galls.each( function (){
				var gall = jQuery( this );
				var gall_id = cws_uniq_id ( "wp_gallery_" );
				jQuery( "a", gall ).attr( "data-fancybox-group", gall_id );
			});
		}
		jQuery( ".gallery-icon a[href*='.jpg'], .gallery-icon a[href*='.jpeg'], .gallery-icon a[href*='.png'], .gallery-icon a[href*='.gif'], .cws_img_frame[href*='.jpg'], .cws_img_frame[href*='.jpeg'], .cws_img_frame[href*='.png'], .cws_img_frame[href*='.gif']" ).fancybox();
	}
	/* megamenu active cell function */
	function ingenious_megamenu_active_cell_highlighting_init (){
		$( ".main_menu .cws_megamenu_item .menu-item.current-menu-item" ).parents( ".menu-item" ).addClass( "current-menu-item" );
	}
	function ingenious_fix_rtl_vc_stretchRow (){
		var rows = document.querySelectorAll( ".vc_row[data-vc-full-width-init='true']" );
		var i, row;
		for ( i = 0; i < rows.length; i++ ){
			row = rows[i];
			row.style.left = row.style.left.replace( /-/g, "" );
		}
	}	
	/* canvas figure function */
	function ingenious_canvas_figure( new_items , ex) {
		ingenious_hexagon_mob_grid();
		var len = $('[class^="figure_container"]').length;
		var width = $('body').find('.figure_container canvas').width()
		var height = $('body').find('.figure_container canvas').height()
		for (var i = 0; i < len; i++) {
			var canvas_container = $('body').find('[class^="figure_container"]').eq(i);
			var imgsource = canvas_container.children('img').attr('src'),
				figure = canvas_container.children('canvas')[0],
				prefix_2x = /@2x/g,
				num, hexagon;
			if ($(canvas_container.children('img')).length == 0) continue;
			if(!imgsource) return false;
			if (prefix_2x.test(imgsource)){
				imgsource = imgsource.replace(/@2x/g,"");
			}
			var fig = figure.getContext('2d');
			var img = new Image();
			img.src = imgsource;
			if (jQuery(document).width() < 730 && !canvas_container.parents('.item.staff_post').length && !canvas_container.parents('.latest_post_post').length) {
				num = 4;
			} else {
				if (canvas_container.hasClass('medium')) {
					num = 1.9;
				} else if (canvas_container.hasClass('small')) {
					num = 3.2;
				} else if (canvas_container.hasClass('mini2')) {
					num = 6.65;
				}
				if (canvas_container.parents('article').hasClass('hex_style')) {
					if (canvas_container.hasClass('col_3')) {
						num = 1;
					} else if (canvas_container.hasClass('col_4')) {
						num = 1.375;
					} else if (canvas_container.hasClass('col_5')) {
						num = 1.75;
					}
				} else if (canvas_container.parents('article').hasClass('hex_style_2')) {
					if (canvas_container.closest('.owl-carousel').length>0) {
						if (canvas_container.hasClass('col_3')) {
							num = 1.125;
						} else if (canvas_container.hasClass('col_4')) {
							num = 1.53;
						} else if (canvas_container.hasClass('col_5')) {
							num = 1.95;
						}
					} else{
						if (canvas_container.hasClass('col_3')) {
							num = 0.98;
						} else if (canvas_container.hasClass('col_4')) {
							num = 1.3;
						} else if (canvas_container.hasClass('col_5')) {
							num = 1.62;
						}
					}
				} 
			}
			hexagon = function(){
				if (canvas_container.parents('article').hasClass('hex_style_2')) {
					fig.translate(width/2, height/2);
					fig.rotate(90*Math.PI/180);
					fig.translate(-height/2, -width/2);
				}
				fig.moveTo(55 / num, 80 / num);
				fig.arcTo(190 / num, 0 / num, 335 / num, 80 / num, 55 / num);
				fig.arcTo(380 / num, 110 / num, 380 / num, 280 / num, 55 / num);
				fig.arcTo(380 / num, 325 / num, 250 / num, 395 / num, 55 / num);
				fig.arcTo(190 / num, 435 / num, 55 / num, 330 / num, 55 / num);
				fig.arcTo(5 / num, 325 / num, 5 / num, 110 / num, 55 / num);
				fig.arcTo(5 / num, 110 / num, 55 / num, 80 / num, 55 / num);
			}
			if (canvas_container.hasClass('big')) {
				num = 1.375;
			}
			fig.save();
			if (ex != false) {
				fig.drawImage(img, 0, 0, width, height);
				fig.globalCompositeOperation = 'destination-in';
				fig.beginPath();
				hexagon();
				fig.closePath();
				fig.fill();
			}
			canvas_container.children('img').hide();
		}
		if (ex == false) {
			jQuery(new_items).find('.figure_container').each(function (){
				canvas_container = jQuery(this)
				figure = canvas_container.children('canvas')[0]
				imgsource = canvas_container.children('img').attr('src')
				fig = figure.getContext('2d');
				img = new Image();
				img.src = imgsource;
				fig.drawImage(img, 0, 0, width, height);
				fig.globalCompositeOperation = 'destination-in';
				fig.beginPath();
				hexagon();
				fig.closePath();
				fig.fill();
			})
		}
	}
	/* hexagon mobile grid function */
	function ingenious_hexagon_mob_grid() {
		jQuery('.posts_grid.hexagon_grid').each(function (){
			if (jQuery(this).width() < 730) {
				jQuery(this).addClass('hex_mobile');
				jQuery(this).find('.item canvas.hex_display').remove();
			}
		});
	}
	/* process active visible */
	function ingenious_process_active() {
		jQuery('.ingenious_process_column').each(function(index){
			var el = jQuery(this);
			if(el.hasClass('active')){
				el.prev().addClass('prev_active');
			}
		})
	}
	/* process apear init */
	function ingenious_process_apear_init() {
		jQuery.fn.process_apear = function (){
			jQuery(this).each( function (){
				var el = jQuery(this);
				var done = false;
				if (!done) done = ingenious_process_apear_controller(el);
				jQuery(window).scroll(function (){
					if (!done) done = ingenious_process_apear_controller(el);
				});
			});
		}
	}
	/* process apear controller */
	function ingenious_process_apear_controller(el) {
		var duration = 200; 
		if (el.is_visible()){
			jQuery(el).children('.ingenious_process_column').each(function(index){
				var el = jQuery(this);
				el.delay(duration * index).animate({
					opacity:1
				},duration);
			})
			return true;
		}
		return false;
	}
	window.addEventListener( 'resize', function (){
		ingenious_hexagon_grid();
		ingenious_blog_bg();
		ingenious_portfolio_fw();
	}, false )
	/* lavalamp init function */
	function ingenious_filter_lavalamp(){
		jQuery(".filter_wrap").lavalamp({setOnClick:true});
	}

	function ingenious_menu_lavalamp(){
		jQuery("#main_menu").lavalamp();


		jQuery('.current-menu-item.lavalamp-item, .current-menu-ancestor.lavalamp-item,	.current-menu-parent.lavalamp-item,	.current_page_parent.lavalamp-item,	.current_page_ancestor.lavalamp-item').hover(
			//in
			function(event) {
				jQuery(this).siblings('.lavalamp-object').addClass('current_menu_item');
			},
			//out
			function(event) {
				jQuery(this).siblings('.lavalamp-object').removeClass('current_menu_item');
			}
		);			

	}

	/* hexagon grid function */
	function ingenious_hexagon_grid() {
		if ($('.portfolio_posts_grid:not(.posts_grid_carousel) .portfolio_item_grid_post').hasClass('hex_style')) {
			var divs = $('.portfolio_item_grid_post');
			var k = true;
			var wrap_item, w, col_num, item_w;
			var wrap_width = $(".portfolio_posts_grid.hexagon_grid .ingenious_grid").outerWidth();
			var data_col = jQuery('.posts_grid_hex_style.hexagon_grid').attr('data-col');
			if (data_col == 3) {
				item_w = 400;
				col_num = 2;
				if ( wrap_width < 1199 ) {
					col_num = 1;
				} 
				if ( wrap_width < 970) {
					col_num = 0;
				}   
			} else if (data_col == 4) {
				item_w = 300;
				col_num = 3;
				if ( wrap_width < 1199 ) {
					col_num = 2;
				} 
				if ( wrap_width < 970) {
					col_num = 1;
				} 
			} else if (data_col == 5) {
				item_w = 240;
				col_num = 4;
				if ( wrap_width < 1199 ) {
					col_num = 3;
				} 
				if ( wrap_width < 970) {
					col_num = 2;
				} 
			}
			if ( wrap_width < 730) {
				col_num = 2;
				item_w = 110;
			}
			if ( wrap_width < 400) {
				col_num = 1;
				item_w = 110;
			}
			var wrap_fw = (col_num + 1) * item_w
			var wrap_pw = (wrap_width - wrap_fw) / 2
			$(".portfolio_posts_grid.hexagon_grid .ingenious_grid").css({ "padding-left":wrap_pw,"padding-right":wrap_pw})
			var parent = divs.parents('.hexagon_grid'), even, odd;
			if (parent.hasClass('start_even')) {
				even = 1
				odd = 0
			} else if (parent.hasClass('start_odd')) {
				even = 0
				odd = 1
			}
			var wrap_num1 = col_num;
			divs.removeClass('wrap1').removeClass('wrap2');
			for(var i = 0; i < divs.length; i+=1) {
				if (k) {
					wrap_item = i + wrap_num1 + even;
					w = 1;
				} else {
					wrap_item = i + wrap_num1 + odd;
					w = 2;
				}
				divs.slice(i, wrap_item).addClass('wrap'+w+'');
				if (k) {
					i += wrap_num1 - odd;
					k = false;
				} else {
					i += wrap_num1 - even;
					k = true;
				}
			}
		}
	}
	/* hexagon grid function */
	function ingenious_hex_grid_2_init() {
		var width = 290;
		var marg = 20;
		if (jQuery('.posts_grid_hex_style_2').hasClass('posts_grid_5')) {
			var width = 270;
		} else if (jQuery('.posts_grid_hex_style_2').hasClass('posts_grid_4')) {
			var width = 340;
		} else if (jQuery('.posts_grid_hex_style_2').hasClass('posts_grid_3')) {
			var width = 450;
		}
		jQuery('.posts_grid.hexagon_grid').each(function (){
			if (jQuery(this).width() < 730) {
				width = 120;
				marg = 5;
			}
		});

		jQuery('.hexagon_grid .ingenious_grid').hexgrid({
			combWidth: width,
			margin: marg
		});
	}
	$.fn.hexgrid = function (options) {

		// Establish our default settings
		var settings = $.extend({
			combWidth: 250,
			margin: 10
		}, options);

		function initialise(element) {

			element.addClass('hexgrid-wrapper');
			
			var width = 0;
			var combWidth = 0;
			var combHeight = 0;
			var num = 0;
			var $wrapper = null;
			
			/**
			 * Build the dom
			 */
			function buildHtml(){
				// add the 2 other boxes
				if ( !$(element).find('.hex_style_2').closest('.hexgrid-inner-wrapper').length ) {
					$(element).find('.hex_style_2').wrapAll('<div class="hexgrid-inner-wrapper"></div>');
				}
				$wrapper = $(element).find('.hexgrid-inner-wrapper');			
				num = 0;
				$(element).find('.hex_style_2').each(function(){
					num = num + 1;
				});
			}
			
			/**
			 * Update all scale values
			 */
			function updateScales(){
				combWidth = settings.combWidth;
				combHeight = ( Math.sqrt(3) * combWidth ) / 2;
				var edgeWidth = combWidth / 2;
				
				$(element).find('.hex_style_2').width(combWidth).height(combHeight);
				$(element).find('.hex_l, .hex_r').width(combWidth).height(combHeight);
				$(element).find('.hex_inner').width(combWidth).height(combHeight);
			}
			
			/**
			 * update css classes
			 */
			function reorder(animate){
				
				updateScales();
				width = $(element).width();
				
				var newWidth = num * settings.combWidth;
				
				if(newWidth < width){
					width = newWidth;
				}
				
				$wrapper.width(width);
				

				var parent = element.parents('.hexagon_grid')
				if (parent.hasClass('start_odd')) {
					var start = 1;
				} else if (parent.hasClass('start_even')) {
					var start = 0;
				}
				var row = 0; // current row
				var upDown = start; // 1 is down
				var left = 0; // pos left
				var top = 0; // pos top
				var cols = 0;
				var count_row, count_col, count, row_p
				
				$(element).find('.hex_style_2').each(function(index){
					
					top = ( row * (combHeight + settings.margin) ) + (upDown * (combHeight / 2 + (settings.margin / 2)));
					
					if(animate == true){
						$(this).stop(true, false);
						$(this).animate({'left': left, 'top': top});
					}else{
						$(this).css('left', left).css('top', top);
					}
					$(this).css('position', 'absolute');
					
					left = left + ( combWidth - combWidth / 4 + settings.margin );
					upDown = (upDown + 1) % 2;
					
					if(row == 0){
						cols = cols + 1;
					}
					
					count_col = Math.round(width / (combWidth - combWidth / 4 + settings.margin))
					count = $(this).closest('div').children().length
					count_row = count/count_col

					if(left + combWidth > width){
						left = 0;
						row = row + 1;
						upDown = start; // 1 is down
					}

				});
				
				if (count_row > row) {
					row_p = 1
				} else if (count_row <= row){
					row_p = 0
				}
				
				$wrapper
					.width(cols * (combWidth / 4 * 3 + settings.margin) + combWidth / 4)
					.height((row + row_p) * (combHeight + settings.margin) + combHeight / 2);
			}
			
			$(window).resize(function(){
				reorder(true);
			});
			
			$(element).find('.hex_style_2').mouseenter(function(){
				$(this).find('.inner_span').stop(true, true);
				$(this).find('.inner_span').fadeIn();
			});
			
			$(element).find('.hex_style_2').mouseleave(function(){
				$(this).find('.inner_span').stop(true, true);
				$(this).find('.inner_span').fadeOut();
			});
			
			buildHtml();
			reorder(false);
		}
		return initialise(this);
	}
	/* styles render function */
	function ingenious_render_styles(){
		var css = '';
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');  
			jQuery('.render_styles').each(function(index, el) {
				var data = '';
				var data = JSON.parse(jQuery(el).data('style'));
				jQuery(el).removeAttr('data-style');
				jQuery(el).removeClass('render_styles');
				css += data;
			});

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}
		head.appendChild(style);
	}

	/* fix styles with JS */
	function ingenious_fix_styles(){
		jQuery('p q').each(function() {
			jQuery(this).closest('p').addClass('quote_line');
		});

		if (cws_is_mobile){
			jQuery('.ingenious_icon_wrapper.icon-align-center').each(function() {
				jQuery(this).closest('.vc_column-inner').addClass('center_on_mobile');
			});
		}

		jQuery('form.wpcf7-form input.col_2').each(function() {
			jQuery(this).closest('p').addClass('col_2');
		});

		jQuery('form.wpcf7-form .wpcf7-submit.center').each(function() {
			jQuery(this).closest('p').addClass('col_center');
		});
	}


	/* woo add cart function */
	function ingenious_woo_add_cart(){
		$('li.product .add_to_cart_button').on( 'click', function() {
			$(this).parents('.product').addClass('added_product');
		});
	}
	/* blog full width image background function */
	function ingenious_blog_bg() {
		var div = jQuery('.posts_grid.posts_grid_fw_img');
		if (!div.hasClass('posts_grid_carousel')) {
			var doc_w = jQuery(document).width();
			var div_w = jQuery('#page_content').width();
			var marg = ( doc_w - div_w ) / 2;
			div.each(function() {
				jQuery(this).css({
					'margin-left' : '-'+marg+'px',
					'margin-right' : '-'+marg+'px'
				})
			});
			div.find('article.post_grid_post').each(function() {
				jQuery(this).css({
					'padding-left' : marg+15+'px',
					'padding-right' : marg+15+'px'
				})
			})
		}
	}

	function ingenious_portfolio_mobile_click(){
		if (cws_is_mobile){
			jQuery('.mobile_title_wrapper').on( 'click', function( e ) {
				jQuery('.mobile_title_wrapper').slideDown();
				jQuery(this).slideUp(100);
				jQuery(this).parents('article').trigger('mouseenter');
			});		
		}
	}

	/* full width portfolio function */
	function ingenious_portfolio_fw() {
		var doc_w, marg, div, div_w;
		if (jQuery('.posts_grid').hasClass('posts_grid_showcase')) {
			jQuery("body").addClass('portfolio_fw');
		}
		div = jQuery('.posts_grid.posts_grid_showcase');
		doc_w = jQuery(document).width();
		div_w = jQuery('#page_content').width();
		marg = ( doc_w - div_w ) / 2;
		div.each(function() {
			jQuery(this).css({
				'margin-left' : '-'+marg+'px',
				'margin-right' : '-'+marg+'px',
				'margin-top' : '-81px',
				'margin-bottom' : '-80px'
			})
		});	
	}
	/* full width single posts function */
	function ingenious_single_posts_fw() {
		var div2, div3, fw_item, fw_item2, scroll_top_el;
		if (jQuery('.posts_grid').hasClass('posts_grid_showcase')) {
			jQuery("body").addClass('portfolio_fw');
		}
		div2 = jQuery('.single-cwsportfolio #page');
		div3 = jQuery('.single-post #page');
		fw_item = div2.find('.post_media');
		fw_item2 = div3.find('.post_media');
		if (div2.hasClass('full_width')) {
			fw_item.css({'height' : '100%'})
			setTimeout(function(){
				fw_item.css({'opacity' : '1'})
			}, 700);
			if (fw_item.length) {
				scroll_top_el = fw_item.offset().top;
			}
			jQuery("body.single-cwsportfolio").animate({"scrollTop":scroll_top_el}, 1000);
		}
		if (div3.hasClass('full_width')) {
			fw_item2.css({'height' : '100%'})
			setTimeout(function(){
				fw_item2.css({'opacity' : '1'})
			}, 700);
			if (fw_item2.length) {
				scroll_top_el = fw_item2.offset().top;
			}
			jQuery("body.single-post").animate({"scrollTop":scroll_top_el}, 1000);
		}	
	}
	/* full width portfolio load function */
	function ingenious_portfolio_fw_load() {
		if (jQuery('section.posts_grid').hasClass('posts_grid_showcase')) {
			jQuery('.portfolio_item_post .pic a').click(function(e) {
				e.preventDefault();
				var body, post_id, page_url, doc_w, footer, footer_h, footer_oh, win_par_half, ajax_h, win_h, 
				doc_h, bar_w, parent, parent_h, offsettop, offsettop2, offsetscrolltop;
				post_id = jQuery(this).data('pid');
				page_url = jQuery(this).data('url-reload');
				doc_w = jQuery(document).width();
				win_h = jQuery(window).height();
				doc_h = jQuery(document).height();
				bar_w = doc_w + 30;
				body = jQuery('body');
				parent = jQuery(this).parents('.portfolio_item_post');
				parent.addClass('cur');
				parent_h = parent.height();
				offsettop = parent.offset().top;
				win_par_half = ((win_h / 2) - (parent_h / 2));
				offsetscrolltop = offsettop - win_par_half;
				parent.children().wrapAll('<div class="old_article">');
				parent.append("<div class='content_ajax'>");
				jQuery(document).on('scroll mousewheel touchmove click', stopScrolling);
				setTimeout(function(){
					jQuery(document).off('scroll mousewheel touchmove click', stopScrolling).css({'pointer-events':'auto'});
				}, 4500);
				body.animate({"scrollTop":offsetscrolltop}, 500);
				parent.find(".load_bg").delay(500).animate({"width":bar_w}, 2000);
				parent.find(".load_wrap").delay(500).animate({"width":bar_w}, 2000);
				parent.find(".load_wrap h3").css({"width":bar_w});
				parent.find(".old_article").delay(2500).animate({"left":"100%"}, 500);
				footer = jQuery('#footer');
				footer_oh = footer.outerHeight();
				if ( (footer_oh < win_par_half ) && parent.parent().children().last().hasClass('cur') ) {
					footer.css('height', win_par_half );
				}
				setTimeout(function(){
					ajax_h = parent.find('.content_ajax').outerHeight();
					if (parent.parent().children().first().hasClass('cur')) {
						body.animate({"scrollTop":offsettop}, 1000);
						parent.animate({"height" : ajax_h}, 1000);
					} else if (parent.parent().children().last().hasClass('cur')) {
						parent.prevAll().animate({"top":"-"+win_par_half}, 1000);
						parent.animate({"top":"-"+win_par_half, "height" : ajax_h}, 1000);
						if (ajax_h < win_h) {
							footer.animate({"top":"-"+win_par_half, 'height' : win_h - ajax_h}, 1000);
						} else {
							footer.animate({"top":"-"+win_par_half, 'height' : footer_oh}, 1000);
						}
					} else {
						parent.animate({"top":"-"+win_par_half, "height" : ajax_h}, 1000);
						parent.prev().animate({"top":"-"+win_par_half}, 1000);
						parent.nextAll().animate({"top":"-"+win_par_half}, 1000);
					}
				}, 3000);
				setTimeout(function(){
					parent.addClass('current');
					parent.prevAll().remove();
					parent.next().animate({"top":"0"},0).animate({'height':'0'},500);
					setTimeout(function(){
						parent.next().remove();
					}, 500);
					parent.next().nextAll().remove();
					parent.find(".old_article").remove();
					offsettop2 = parent.offset().top;
					body.scrollTop(offsettop2);
					footer.animate({'top' : '0'},0).animate({'height' : footer_oh},500);
				}, 4000);

				jQuery.post( ajaxurl, {
					'action'		: 'ingenious_single_portfolio_ajax_load',
					'post_id'		: post_id
				}, function ( response, status ){
					jQuery(".content_ajax").html(response);
					ingenious_gallery_post_carousel_init ();
					ingenious_portfolio_single_carousel_init ();
				})
			});
			function stopScrolling (e) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		}
	}
	/* footer height function */
	function ingenious_footer_height(){
		var fh, fh2, footer;
		footer = jQuery('#footer');
		fh = footer.outerHeight();
		fh2 = fh * 1.5;

		if (!jQuery('section.posts_grid').hasClass('posts_grid_showcase')) {
			if ( ( jQuery(window).width()>992) && footer.hasClass('footer-fixed')){
				footer.addClass('fixed');
				jQuery('body').css('margin-bottom',' ' + fh + 'px');
			} else{
				jQuery('body').css('margin-bottom','0px');
				footer.removeClass('fixed');
			}
			if ( ( jQuery(window).height()<fh) ){
				jQuery('body').css('margin-bottom','0px');
				footer.removeClass('fixed');
			}
		}
	};

	/* hover dir init function */
	function ingenious_hoverdir(){

		jQuery(".portfolio_item_post.hoverdir").each(function() {
			jQuery(this).hoverdir({hoverElem: '.portfolio_content_wrap'})
		})
	}
	(function (factory) {
		if (typeof define === 'function' && define.amd) {
			define(['jquery'], factory);
		} else if (typeof exports !== 'undefined') {
			module.exports = factory(require('jquery'));
		} else {
			factory(jQuery);
		}
	})(function ($) {
		function Hoverdir(element, options) {
			this.$el = $(element);
			this.options = $.extend(true, {}, this.defaults, options);
			this.isVisible = false;
			this.$hoverElem = this.$el.find(this.options.hoverElem);
			this.transitionProp = 'all ' + this.options.speed + 'ms ' + this.options.easing;
			this.support = this._supportsTransitions();
			this._loadEvents();
		}
		Hoverdir.prototype = {
			defaults: {
				speed: 300,
				easing: 'ease',
				hoverDelay: 0,
				inverse: false,
				hoverElem: 'div'
			},
			constructor: Hoverdir,
			_supportsTransitions: function () {
				if (typeof Modernizr !== 'undefined') {
					return Modernizr.csstransitions;
				} else {
					var b = document.body || document.documentElement,
						s = b.style,
						p = 'transition';
					if (typeof s[p] === 'string') {
						return true;
					}
					var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
					p = p.charAt(0).toUpperCase() + p.substr(1);

					for (var i = 0; i < v.length; i++) {
						if (typeof s[v[i] + p] === 'string') {
							return true;
						}
					}

					return false;
				}
			},
			_loadEvents: function () {
				this.$el.on('mouseenter.hoverdir mouseleave.hoverdir', $.proxy(function (event) {
					this.direction = this._getDir({x: event.pageX, y: event.pageY});
					if (event.type === 'mouseenter') {
						this._showHover();
					}
					else {
						this._hideHover();
					}
				}, this));
			},
			_showHover: function () {
				var styleCSS = this._getStyle(this.direction);
				if (this.support) {
					this.$hoverElem.css('transition', '');
				}
				this.$hoverElem.hide().css(styleCSS.from);
				clearTimeout(this.tmhover);

				this.tmhover = setTimeout($.proxy(function () {
					this.$hoverElem.show(0, $.proxy(function () {
						if (this.support) {
							this.$hoverElem.css('transition', this.transitionProp);
						}
						this._applyAnimation(styleCSS.to);

					}, this));
				}, this), this.options.hoverDelay);

				this.isVisible = true;
			},
			_hideHover: function () {
				var styleCSS = this._getStyle(this.direction);
				if (this.support) {
					this.$hoverElem.css('transition', this.transitionProp);
				}
				clearTimeout(this.tmhover);
				this._applyAnimation(styleCSS.from);
				this.isVisible = false;
			},
			_getDir: function (coordinates) {
				var w = this.$el.width(),
					h = this.$el.height(),
					x = (coordinates.x - this.$el.offset().left - (w / 2)) * (w > h ? (h / w) : 1),
					y = (coordinates.y - this.$el.offset().top - (h / 2)) * (h > w ? (w / h) : 1),
					direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
				return direction;
			},
			_getStyle: function (direction) {
				var fromStyle, toStyle,
					slideFromTop = {'left': '0', 'top': '-100%'},
					slideFromBottom = {'left': '0', 'top': '100%'},
					slideFromLeft = {'left': '-100%', 'top': '0'},
					slideFromRight = {'left': '100%', 'top': '0'},
					slideTop = {'top': '0'},
					slideLeft = {'left': '0'};
				switch (direction) {
					case 0:
					case 'top':
						fromStyle = !this.options.inverse ? slideFromTop : slideFromBottom;
						toStyle = slideTop;
						break;
					case 1:
					case 'right':
						fromStyle = !this.options.inverse ? slideFromRight : slideFromLeft;
						toStyle = slideLeft;
						break;
					case 2:
					case 'bottom':
						fromStyle = !this.options.inverse ? slideFromBottom : slideFromTop;
						toStyle = slideTop;
						break;
					case 3:
					case 'left':
						fromStyle = !this.options.inverse ? slideFromLeft : slideFromRight;
						toStyle = slideLeft;
						break;
				}

				return {from: fromStyle, to: toStyle};
			},
			_applyAnimation: function (styleCSS) {
				$.fn.applyStyle = this.support ? $.fn.css : $.fn.animate;
				this.$hoverElem.stop().applyStyle(styleCSS, $.extend(true, [], {duration: this.options.speed}));
			},
			show: function (direction) {
				this.$el.off('mouseenter.hoverdir mouseleave.hoverdir');
				if (!this.isVisible) {
					this.direction = direction || 'top';
					this._showHover();
				}
			},
			hide: function (direction) {
				this.rebuild();
				if (this.isVisible) {
					this.direction = direction || 'bottom';
					this._hideHover();
				}
			},
			setOptions: function (options) {
				this.options = $.extend(true, {}, this.defaults, this.options, options);
			},
			destroy: function () {
				this.$el.off('mouseenter.hoverdir mouseleave.hoverdir');
				this.$el.data('hoverdir', null);
			},
			rebuild: function (options) {
				if (typeof options === 'object') {
					this.setOptions(options);
				}
				this._loadEvents();
			}
		};
		$.fn.hoverdir = function (option, parameter) {
			return this.each(function () {
				var data = $(this).data('hoverdir');
				var options = typeof option === 'object' && option;

				// Initialize hoverdir.
				if (!data) {
					data = new Hoverdir(this, options);
					$(this).data('hoverdir', data);
				}
				if (typeof option === 'string') {
					data[option](parameter);

					if (option === 'destroy') {
						$(this).data('hoverdir', false);
					}
				}
			});
		};
		$.fn.hoverdir.Constructor = Hoverdir;
	});
	jQuery(window).scroll(function (){
		animation_init();
	});
	/* appear animations function */
	function animation_init() {
		if (!cws_is_mobile() && jQuery('.posts_grid.appear_style').length) {
			var el = jQuery('.posts_grid.appear_style article.item');
			$.Velocity.RegisterEffect.packagedEffects = {
				"callout.bounce": {
					defaultDuration: 550,
					calls: [[{
						translateY: -30
					}, .25], [{
						translateY: 0
					}, .125], [{
						translateY: -15
					}, .125], [{
						translateY: 0
					}, .25]]
				},
				"callout.shake": {
					defaultDuration: 800,
					calls: [[{
						translateX: -11
					}, .125], [{
						translateX: 11
					}, .125], [{
						translateX: -11
					}, .125], [{
						translateX: 11
					}, .125], [{
						translateX: -11
					}, .125], [{
						translateX: 11
					}, .125], [{
						translateX: -11
					}, .125], [{
						translateX: 0
					}, .125]]
				},
				"callout.flash": {
					defaultDuration: 1100,
					calls: [[{
						opacity: [0, "easeInOutQuad", 1]
					}, .25], [{
						opacity: [1, "easeInOutQuad"]
					}, .25], [{
						opacity: [0, "easeInOutQuad"]
					}, .25], [{
						opacity: [1, "easeInOutQuad"]
					}, .25]]
				},
				"callout.pulse": {
					defaultDuration: 825,
					calls: [[{
						scaleX: 1.1,
						scaleY: 1.1
					}, .5, {
						easing: "easeInExpo"
					}], [{
						scaleX: 1,
						scaleY: 1
					}, .5]]
				},
				"callout.swing": {
					defaultDuration: 950,
					calls: [[{
						rotateZ: 15
					}, .2], [{
						rotateZ: -10
					}, .2], [{
						rotateZ: 5
					}, .2], [{
						rotateZ: -5
					}, .2], [{
						rotateZ: 0
					}, .2]]
				},
				"callout.tada": {
					defaultDuration: 1e3,
					calls: [[{
						scaleX: .9,
						scaleY: .9,
						rotateZ: -3
					}, .1], [{
						scaleX: 1.1,
						scaleY: 1.1,
						rotateZ: 3
					}, .1], [{
						scaleX: 1.1,
						scaleY: 1.1,
						rotateZ: -3
					}, .1], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], ["reverse", .125], [{
						scaleX: 1,
						scaleY: 1,
						rotateZ: 0
					}, .2]]
				},
				"transition.fadeIn": {
					defaultDuration: 600,
					calls: [[{
						opacity: [1, 0]
					}]]
				},
				"transition.flipXIn": {
					defaultDuration: 600,
					calls: [[{
						opacity: [1, 0],
						transformPerspective: [800, 800],
						rotateY: [0, -30]
					}]],
					reset: {
						transformPerspective: 0
					}
				},
				"transition.flipYIn": {
					defaultDuration: 600,
					calls: [[{
						opacity: [1, 0],
						transformPerspective: [1500, 1500],
						rotateX: [0, -30]
					}]],
					reset: {
						transformPerspective: 0
					}
				},
				"transition.shrinkIn": {
					defaultDuration: 600,
					calls: [[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, 1.15],
						scaleY: [1, 1.15],
						translateZ: 0
					}]]
				},
				"transition.expandIn": {
					defaultDuration: 600,
					calls: [[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, .9],
						scaleY: [1, .9],
						translateZ: 0
					}]]
				},
				"transition.grow": {
					defaultDuration: 600,
					calls: [[{
						opacity: [1, 0],
						transformOriginX: ["50%", "50%"],
						transformOriginY: ["50%", "50%"],
						scaleX: [1, .2],
						scaleY: [1, .2],
						translateZ: 0
					}]]
				},
				"transition.slideUpBigIn": {
					defaultDuration: 850,
					calls: [[{
						opacity: [1, 0],
						translateY: [0, 75],
						translateZ: 0
					}]]
				},
				"transition.slideDownBigIn": {
					defaultDuration: 850,
					calls: [[{
						opacity: [1, 0],
						translateY: [0, -75],
						translateZ: 0
					}]]
				},
				"transition.slideLeftBigIn": {
					defaultDuration: 800,
					calls: [[{
						opacity: [1, 0],
						translateX: [0, -75],
						translateZ: 0
					}]]
				},
				"transition.slideRightBigIn": {
					defaultDuration: 800,
					calls: [[{
						opacity: [1, 0],
						translateX: [0, 75],
						translateZ: 0
					}]]
				},
				"transition.perspectiveUpIn": {
					defaultDuration: 800,
					calls: [[{
						opacity: [1, 0],
						transformPerspective: [3e3, 3e3],
						transformOriginX: [0, 0],
						transformOriginY: ["100%", "100%"],
						rotateX: [0, -70]
					}]],
					reset: {
						transformPerspective: 0,
						transformOriginX: "50%",
						transformOriginY: "50%"
					}
				},
				"transition.perspectiveDownIn": {
					defaultDuration: 800,
					calls: [[{
						opacity: [1, 0],
						transformPerspective: [3e3, 3e3],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateX: [0, 70]
					}]],
					reset: {
						transformPerspective: 0,
						transformOriginX: "50%",
						transformOriginY: "50%"
					}
				},
				"transition.perspectiveLeftIn": {
					defaultDuration: 800,
					calls: [[{
						opacity: [1, 0],
						transformPerspective: [2e3, 2e3],
						transformOriginX: [0, 0],
						transformOriginY: [0, 0],
						rotateY: [0, -70]
					}]],
					reset: {
						transformPerspective: 0,
						transformOriginX: "50%",
						transformOriginY: "50%"
					}
				},
				"transition.perspectiveRightIn": {
					defaultDuration: 800,
					calls: [[{
						opacity: [1, 0],
						transformPerspective: [2e3, 2e3],
						transformOriginX: ["100%", "100%"],
						transformOriginY: [0, 0],
						rotateY: [0, 70]
					}]],
					reset: {
						transformPerspective: 0,
						transformOriginX: "50%",
						transformOriginY: "50%"
					}
				}
			};
			for (var k in $.Velocity.RegisterEffect.packagedEffects)
				$.Velocity.RegisterEffect(k, $.Velocity.RegisterEffect.packagedEffects[k]);
			el.each(function() {
				if (jQuery(this).is_visible() && !jQuery(this).hasClass('anim_done')){
					jQuery(this).addClass('anim_done');
					var anim = jQuery(this).data('item-anim');
					jQuery(this).velocity(anim);
				}	
			});
		}	
	}
	/* single sticky content function */
	function ingenious_single_sticky_content() {
		var item = jQuery(".portfolio_single_content.sticky_cont");
		var item_p = item.parent()
		item_p.theiaStickySidebar({
			additionalMarginTop: 80,
			additionalMarginBottom: 30
		}); 
	}
	/* button animation function */
	function button_animation() {  
		jQuery('.ingenious_button.pos_aware').each(function() {
			jQuery(this).append('<span></span>');
			var pageX, pageY, parentOffset, relX, relY;
			jQuery(this).on('mouseenter', function(e) {
				parentOffset = $(this).offset(),
		  		relX = e.pageX - parentOffset.left,
		  		relY = e.pageY - parentOffset.top;
				jQuery(this).find('span').css({top:relY, left:relX})
			})
			jQuery(this).on('mouseout', function(e) {
				parentOffset = $(this).offset(),
		  		relX = e.pageX - parentOffset.left,
		  		relY = e.pageY - parentOffset.top;
				jQuery(this).find('span').css({top:relY, left:relX})
			});
			jQuery(this).click(function(){return false});
		})
	};
}(jQuery));
/*********************************************
***************** CWS Loader *****************
*********************************************/
(function ($){
	var loader;
	$.fn.start_cws_loader = start_cws_loader;
	$.fn.stop_cws_loader = stop_cws_loader;

	$( document ).ready(function (){
		cws_page_loader_controller ();
	});
	function cws_page_loader_controller (){
		var cws_page_loader, interval, timeLaps ;
		cws_page_loader = $( "#cws_page_loader" );
		timeLaps = 0;
		interval = setInterval( function (){
			var page_loaded = cws_check_if_page_loaded ();	
			timeLaps ++;		
			if ( page_loaded ||  timeLaps == 6) {
				clearInterval ( interval );
				cws_page_loader.stop_cws_loader ();
			}
		}, 10);
	}
	function cws_check_if_page_loaded (){
		var keys, key, i, r;
		if ( window.cws_modules_state == undefined ) return false;
		r = true;
		keys = Object.keys( window.cws_modules_state );
		for ( i = 0; i < keys.length; i++ ){
			key = keys[i];
			if ( !window.cws_modules_state[key] ){
				r = false;
				break;
			}
		}
		return r;
	}	
	function start_cws_loader (){
		var loader_obj, loader_container, indicators;
		loader = jQuery( this );
		if ( !loader.length ) return;
		loader_container = loader[0].parentNode;
		if ( loader_container != null ){
			loader_container.style.opacity = 1;
			setTimeout( function (){
				loader_container.style.display = "block";
			}, 10);
		}
	}
	function stop_cws_loader (){
		var loader_obj, loader_container, indicators;
		loader = jQuery( this );
		if ( !loader.length ) return;
		loader_container = loader[0].parentNode;
		if ( loader_container != null ){
			loader_container.style.opacity = 0;
			setTimeout( function (){
				loader_container.style.display = "none";
			}, 200);
		}
	}
}(jQuery));
/*********************************************
***************** CWS Toggle *****************
*********************************************/
( function ($){
	window.cws_toggle 	= cws_toggle;
	function cws_toggle ( args, area ){
		var that = this;
		var r = false;
		that.area = typeof area == 'object' ? area : document;
		that.attached = false;
		that.def_args = {
			'mode'			: 'toggle',
			'behaviour'		: 'slide',	/* slide / activeClass / slideOnlyHeight */
			'parent_sel'	: '.menu-item',
			'opnr_sel'		: '.pointer',
			'sect_sel'		: '.sub-menu',
			'speed'			: 300,
			'active_class'	: 'active',
		};
		that.args = {
		};
		that.sections = [];
		that.init = cws_toggle_init;
		that.set_defaults = cws_toggle_set_defaults;
		that.init_section = cws_toggle_init_section;
		that.attach = cws_toggle_attach;
		that.attach_section = cws_toggle_attach_section;
		that.detach = cws_toggle_detach;
		that.detach_section = cws_toggle_detach_section;
		that.check_attachment = cws_toggle_check_attachment;
		that.clear_section = cws_toggle_clear_section;
		that.handlers = {};
		that.handlers.toggle_slide_opnr_click_handler = function (){
			var section_data 	= this.section_data;
			var tgl 			= this.tgl;
			var args 			= tgl.args;
			if ( section_data.active ){
				$( section_data.section ).slideUp( args.speed );
				cws_remove_class( section_data.parent, args.active_class );
				section_data.active = false;
			}
			else{
				$( section_data.section ).slideDown( args.speed );
				cws_add_class( section_data.parent, args.active_class );
				section_data.active = true;
			}
		}
		that.handlers.toggle_activeClass_opnr_click_handler = function (){
			var section_data 	= this.section_data;
			var tgl 			= this.tgl;
			var args 			= tgl.args;
			if ( section_data.active ){
				cws_remove_class( section_data.parent, args.active_class );
				section_data.active = false;
			}
			else{
				cws_add_class( section_data.parent, args.active_class );
				section_data.active = true;
			}
		}
		that.handlers.toggle_slideOnlyHeight_opnr_click_handler = function (){
			var section_data 	= this.section_data;
			var tgl 			= this.tgl;
			var args 			= tgl.args;
			var speed 			= args.speed;
			var transition 		= args.speed / 1000;
			if ( section_data.active ){
				section_data.section.style.height = section_data.section.scrollHeight + "px";				
				section_data.section.style.transition = transition + "s";				
				setTimeout( function (){
					section_data.section.style.height = "0px";
					cws_remove_class( section_data.parent, args.active_class );
					setTimeout( function (){
						section_data.section.style.removeProperty( 'transition' );
						section_data.section.style.removeProperty( 'height' );							
						section_data.active = false;
					}, speed );					
				}, 0);
			}
			else{
				section_data.section.style.height = "0px";
				section_data.section.style.transition = transition + "s";
				setTimeout( function (){
					section_data.section.style.height = section_data.section.scrollHeight + "px";
					cws_add_class( section_data.parent, args.active_class );				
					setTimeout( function (){
						section_data.section.style.removeProperty( 'transition' );
						section_data.section.style.removeProperty( 'height' );					
						section_data.active = true;				
					}, speed );
				}, 0 );
			}
		}
		that.cleaners = {};
		that.cleaners.toggle_slide_section_cleaner = function ( section_data, callback ){
			if ( section_data == undefined ){
				return false;
			}
			cws_remove_class( section_data.parent, args.active_class );
			section_data.section.style.removeProperty( 'display' );
			return true;
		}
		that.cleaners.toggle_activeClass_section_cleaner = function ( section_data, callback ){
			if ( section_data == undefined ){
				return false;
			}
			cws_remove_class( section_data.parent, args.active_class );
			return true;
		}
		that.cleaners.toggle_slideOnlyHeight_section_cleaner = function ( section_data, callback ){
			if ( section_data == undefined ){
				return false;
			}
			cws_remove_class( section_data.parent, args.active_class );
			return true;
		}
		that.cleaners.default = function ( section_data ){
			if ( section_data == undefined ){
				return false;
			}
			cws_remove_class( section_data.parent, args.active_class );
			return true;
		}
		r = that.init( args );
		return r;		
	}
	function cws_toggle_init ( args ){
		var tgl = this;
		tgl.set_defaults( args );
		var args = tgl.args;
		var sections = tgl.sections;
		var sects = tgl.area.querySelectorAll( args.sect_sel );
		var i, sect;
		for ( i = 0; i < sects.length; i++ ){
			sect = sects[i];
			tgl.init_section( sect );
		}
		return tgl;
	}
	function cws_toggle_set_defaults ( args ){
		var tgl = this;
		var def_args = tgl.def_args;
		var arg_names, arg_name, i;
		if ( typeof args != 'object' || !Object.keys( args ).length ){
			tgl.args = def_args;
		}
		else{
			arg_names = Object.keys( def_args );
			for ( i = 0; i < arg_names.length; i++ ){
				arg_name = arg_names[i];
				if ( args[arg_name] != undefined ){
					tgl.args[arg_name] = args[arg_name];
				}
				else{
					tgl.args[arg_name] = def_args[arg_name];					
				}
			}
		}
		return true;		
	}
	function cws_toggle_init_section ( section ){
		var tgl = this;
		var args = tgl.args;
		var sections = tgl.sections;
		var parent, opnr;
		if ( !section ) return false;
		parent = $( section ).closest( args.parent_sel );
		if ( !parent.length ) return false;
		parent = parent[0];
		if ( !( typeof args.opnr_sel == 'string' && args.opnr_sel.length ) ) return false;
		opnr = parent.querySelector( args.opnr_sel );
		if ( !opnr ) return false;
		sections.push({
			opnr 	: opnr,
			parent 	: parent,
			section : section,
			active 	: false
		});
		return true;	
	}
	function cws_toggle_attach (){
		var tgl = this;
		var sections_data = tgl.sections;
		var i, section_data;
		for ( i = 0; i < sections_data.length; i++ ){
			section_data = sections_data[i];
			tgl.attach_section( section_data );
		}
		tgl.attached = true;
		return true;
	}
	function cws_toggle_attach_section ( section_data ){
		var tgl = this;
		var args = tgl.args;
		var handler_id = args.mode + "_" + args.behaviour + "_opnr_click_handler";
		var handler;
		if ( typeof section_data != 'object' ){
			return false;
		}
		if ( tgl.handlers[handler_id] === undefined ){
			return false;
		}
		handler = tgl.handlers[handler_id];
		section_data.opnr.section_data 	= section_data;
		section_data.opnr.tgl 			= tgl;
		section_data.opnr.addEventListener( "click", handler, false );
		return true;
	}
	function cws_toggle_detach (){
		var tgl = this;
		var sections_data = tgl.sections;
		var i, section_data;
		for ( i = 0; i < sections_data.length; i++ ){
			section_data = sections_data[i];
			tgl.detach_section( section_data );
		}
		tgl.attached = false;
		return true;
	}
	function cws_toggle_detach_section ( section_data ){
		var tgl = this;
		var args = tgl.args;
		var handler_id = args.mode + "_" + args.behaviour + "_opnr_click_handler";
		if ( typeof section_data != 'object' ){
			return false;
		}
		if ( tgl.handlers[handler_id] !== undefined ){
			section_data.opnr.removeEventListener( "click", tgl.handlers[handler_id] );		
		}
		tgl.clear_section( section_data );
		section_data.active = false;
		return true;
	}
	function cws_toggle_check_attachment (){
		var tgl = this;
		return tgl.attached;
	}
	function cws_toggle_clear_section ( section_data ){
		var tgl = this;
		var args = tgl.args;
		var cleaner_id = args.mode + "_" + args.behaviour + "_section_cleaner";
		var cleaner;
		if ( typeof section_data != 'object' ){
			return false;
		}
		if ( tgl.cleaners[cleaner_id] === undefined ){
			cleaner = tgl.cleaners.default;
		}
		else{
			cleaner = tgl.cleaners[cleaner_id];	
		}
		cleaner( section_data );
	}
}(jQuery));
/*********************************************
************** CWS Mobile Menu ***************
*********************************************/
(function ($){
	window.cws_mobile_menu 			= cws_mobile_menu;
	window.cws_mobile_menu_instance = cws_mobile_menu_instance;
	function cws_mobile_menu ( args ){
		var that = this;
		that.def_args = {
			behaviour			: 'toggle',		/* toggle/accordeon ... */
			mobile_class		: 'cws_mobile_menu',					
			menu_sel 			: '',
			toggles				: [
				{
					'parent_sel'	: '.menu-item',
					'opnr_sel'		: '',
					'sect_sel'		: '.sub-menu',
					'speed'			: 300,
					'active_class'	: 'active'				
				}
			]
		};
		that.args = typeof args === 'object' ? args : {};
		that.instances 			= {};
		that.set_defaults 		= cws_mobile_menu_set_defaults;
		that.init_instances		= cws_mobile_menu_init_instances;
		that.set_instances 		= cws_mobile_menu_set_instances;
		that.reset_instances 	= cws_mobile_menu_reset_instances;
		that.set_defaults();
		that.init_instances();
	}
	function cws_mobile_menu_set_defaults (){
		var that = this;
		that.args = cws_merge_trees( that.args, that.def_args );
		return true;	
	}
	function cws_mobile_menu_init_instances (){
		var that = this;
		var sections = document.querySelectorAll( that.args.menu_sel );
		var i, section, section_id, instance;
		if ( !sections.length ) return false;
		for ( i = 0; i < sections.length; i++ ){
			section = sections[i];
			section_id = section.id;
			instance = new cws_mobile_menu_instance( section, that.args );
			if ( instance !== false ){
				that.instances[section_id] = instance;
			}
		}
	}
	function cws_mobile_menu_set_instances (){
		var that = this;
		var i, section_id, instance;
		for ( section_id in that.instances ){
			instance = that.instances[section_id];
			instance.set();
		}
	}
	function cws_mobile_menu_reset_instances (){
		var that = this;
		var i, section_id, instance;
		for ( section_id in that.instances ){
			instance = that.instances[section_id];
			instance.reset();
		}
	}	
	function cws_mobile_menu_instance ( section, menu_args ){
		var instance = this;
		var i, tgl_settings, tgl_instance;
		if ( typeof section != 'object' && typeof mobile_class != 'string' ){
			return false;
		}
		instance.section 		= section;
		instance.mobile_class 	= menu_args.mobile_class;
		instance.tgls 			= [];
		instance.set 		 	= cws_mobile_menu_instance_set;
		instance.reset 		 	= cws_mobile_menu_instance_reset;
		instance.attach_tgls 	= cws_mobile_menu_instance_attach_toggles;
		instance.detach_tgls 	= cws_mobile_menu_instance_detach_toggles;
		for ( i in menu_args.toggles ){
			tgl_settings = menu_args.toggles[i];
			tgl_instance = new cws_toggle( tgl_settings, section );
			if ( tgl_instance !== false ){
				instance.tgls.push( tgl_instance );
			}
		}
	}
	function cws_mobile_menu_instance_attach_toggles (){
		var instance = this;
		var i, tgl;
		for ( i = 0; i < instance.tgls.length; i++ ){
			tgl = instance.tgls[i];
			tgl.attach();
		}
	}
	function cws_mobile_menu_instance_detach_toggles (){
		var instance = this;
		var i, tgl;
		for ( i = 0; i < instance.tgls.length; i++ ){
			tgl = instance.tgls[i];
			tgl.detach();
		}
	}	
	function cws_mobile_menu_instance_set (){
		var instance = this;
		instance.attach_tgls();
		if ( instance.mobile_class.length ){
			cws_add_class( instance.section, nstance.mobile_class );
		}
	}		
	function cws_mobile_menu_instance_reset ( section, menu ){
		var instance = this;
		instance.detach_tgls();
		if ( instance.mobile_class.length ){
			cws_remove_class( instance.section, nstance.mobile_class );
		}
	}
}(jQuery));
/************************************
************** Retina ***************
************************************/
var retina = {};
retina.root = (typeof exports === 'undefined' ? window : exports);
retina.config = {
        retinaImageSuffix : '@2x',
        check_mime_type: true,
        force_original_dimensions: true
    };
retina.config.retinaImagePattern = new RegExp( retina.config.retinaImageSuffix + "." );
(function() {
    function Retina() {}
    window.retina.root.Retina = Retina;
    Retina.configure = function(options) {
        if (options === null) {
            options = {};
        }

        for (var prop in options) {
            if (options.hasOwnProperty(prop)) {
                window.retina.config[prop] = options[prop];
            }
        }
    };
    Retina.init = function(context) {
        if (context === null) {
            context = window.retina.root;
        }
        var existing_onload = context.onload || function(){};
        context.onload = function() {
            var images = document.getElementsByTagName('img'), retinaImages = [], i, image;
            for (i = 0; i < images.length; i += 1) {
                image = images[i];
                if ( !retina.config.retinaImagePattern.test(image.getAttribute("src")) ){
                    if (!!!image.getAttributeNode('data-no-retina')) {
                        retinaImages.push(new RetinaImage(image));
                    }
                }
            }
            existing_onload();
        };
    };
    Retina.isRetina = function(){
        var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';

        if (window.retina.root.devicePixelRatio > 1) {
            return true;
        }

        if (window.retina.root.matchMedia && window.retina.root.matchMedia(mediaQuery).matches) {
            return true;
        }

        return false;
    };
    var regexMatch = /\.\w+$/;
    function suffixReplace (match) {
        return window.retina.config.retinaImageSuffix + match;
    }
    function RetinaImagePath(path, at_2x_path) {
        this.path = path || '';
        if (typeof at_2x_path !== 'undefined' && at_2x_path !== null) {
            this.at_2x_path = at_2x_path;
            this.perform_check = false;
        } else {
            if (undefined !== document.createElement) {
                var locationObject = document.createElement('a');
                locationObject.href = this.path;
                locationObject.pathname = locationObject.pathname.replace(regexMatch, suffixReplace);
                this.at_2x_path = locationObject.href;
            } else {
                var parts = this.path.split('?');
                parts[0] = parts[0].replace(regexMatch, suffixReplace);
                this.at_2x_path = parts.join('?');
            }
            this.perform_check = true;
        }
    }
    window.retina.root.RetinaImagePath = RetinaImagePath;
    RetinaImagePath.confirmed_paths = [];
    RetinaImagePath.prototype.is_external = function() {
        return !!(this.path.match(/^https?\:/i) && !this.path.match('//' + document.domain) );
    };
    RetinaImagePath.prototype.check_2x_variant = function(callback) {
        var http, that = this;
        if (this.is_external()) {
            return callback(false);
        } else if (!this.perform_check && typeof this.at_2x_path !== 'undefined' && this.at_2x_path !== null) {
            return callback(true);
        } else if (this.at_2x_path in RetinaImagePath.confirmed_paths) {
            return callback(true);
        } else {
            return callback(false);
        }
    };
    function RetinaImage(el) {
        this.el = el;
        this.path = new RetinaImagePath(this.el.getAttribute('src'), this.el.getAttribute('data-at2x'));
        var that = this;
        this.path.check_2x_variant(function(hasVariant) {
            if (hasVariant) {
                that.swap();
            }
        });
    }
    window.retina.root.RetinaImage = RetinaImage;
    RetinaImage.prototype.swap = function(path) {
        if (typeof path === 'undefined') {
            path = this.path.at_2x_path;
        }

        var that = this;
        function load() {
            var width = that.el.offsetWidth;
            var height = that.el.offsetHeight;
            if ( !that.el.complete || !width || !height ) {
                setTimeout(load, 5);
            } else {
                if (window.retina.config.force_original_dimensions) {
                    that.el.setAttribute('width', width);
                    that.el.setAttribute('height', height);
                }

                that.el.setAttribute('src', path);
            }
        }
        load();
    };
    if (Retina.isRetina()) {
        Retina.init(window.retina.root);
    }
})();
/*******************************************************
************** CWS Self Vimeo Background ***************
*******************************************************/
jQuery(document).ready(function (){
	vimeo_init();
	cws_self_hosted_video ();
});
jQuery(window).resize( function (){
	vimeo_init();
	cws_self_hosted_video ();
} );
function vimeo_init() {
	var element;
	var vimeoId;
	var chek;
	jQuery(".cws_Vimeo_video_bg").each(function(){
		element = jQuery(this);
		var el_width;
		var el_height;
		vimeoId = jQuery(".cws_Vimeo_video_bg").attr('data-video-id');

		jQuery("#"+vimeoId).vimeo("play");
			jQuery("#"+vimeoId).vimeo("setVolume", 0);
			jQuery("#"+vimeoId).vimeo("setLoop", true);
			el_width = element[0].offsetWidth;

		if (element[0].offsetHeight<((el_width/16)*9)) {
			el_height = (element[0].offsetWidth/16)*9;
		}else{
			el_height = element[0].offsetHeight;
			el_width = (el_height/9)*16;
		}
		jQuery("#"+vimeoId)[0].style.width = el_width+'px';
		jQuery("#"+vimeoId)[0].style.height = el_height+'px';
		setInterval(check_on_page, 1000);
	})

	function check_on_page (){
		if (document.getElementsByTagName('html')[0].hasAttribute('data-focus-chek')) {		
			if (chek < 1) {
				chek++
				jQuery("#"+vimeoId).vimeo("play");
			}else{
				chek = 1
			}									
		}else{
			jQuery("#"+vimeoId).vimeo("pause");
			chek = 0;
		}
	}	
}

function cws_self_hosted_video (){
	var element,el_width,video
	jQuery('.cws_self_hosted_video').each(function(){
		element = jQuery(this)
		video = element.find('video')
		el_width = element[0].offsetWidth;

		if (element[0].offsetHeight<((el_width/16)*9)) {
			el_height = (element[0].offsetWidth/16)*9;
		}else{
			el_height = element[0].offsetHeight;
			el_width = (el_height/9)*16;
		}
		video[0].style.width = el_width+'px';
		video[0].style.height = el_height+'px';
	})	
}

function cws_like_unlike_init () {
	jQuery('.sl-button').click(function() {
		var button = jQuery(this);
		var post_id = button.attr('data-post-id');
		var security = button.attr('data-nonce');
		var iscomment = button.attr('data-iscomment');
		var allbuttons;
		if ( iscomment === '1' ) { /* Comments can have same id */
			allbuttons = jQuery('.sl-comment-button-'+post_id);
		} else {
			allbuttons = jQuery('.sl-button-'+post_id);
		}
		var loader = allbuttons.next('#sl-loader');
		if (post_id !== '') {
			jQuery.ajax({
				type: 'POST',
				url: simpleLikes.ajaxurl,
				data : {
					action : 'cws_vc_shortcode_process_simple_like',
					post_id : post_id,
					nonce : security,
					is_comment : iscomment,
				},
				beforeSend:function(){
					loader.html('&nbsp;<div class="loader">Loading...</div>');
				},	
				success: function(response){
					var icon = response.icon;
					var count = response.count;
					allbuttons.html(icon+count);
					if(response.status === 'unliked') {
						var like_text = simpleLikes.like;
						allbuttons.prop('title', like_text);
						allbuttons.removeClass('liked');
					} else {
						var unlike_text = simpleLikes.unlike;
						allbuttons.prop('title', unlike_text);
						allbuttons.addClass('liked');
					}
					loader.empty();					
				}
			});
			
		}
		return false;
	});
}