"use strict";
(function ($){

	window.cws_megamenu = cws_megamenu;

	function cws_megamenu ( menu, args ){
		if ( menu == undefined ) return false;
		var def_args, fw_obj, items, item, item_data, item_id, i;
		var that = this;
		var args = typeof args === 'object' ? args : {};
		def_args = {
			'fw_sel'							: '.ingenious_layout_container',
			'bottom_level_sub_menu_width_adj' 	: 0
		}
		that.args = cws_merge_trees( args, def_args );
		that.controller = cws_megamenu_controller;
		that.update_vars = cws_megamenu_update_vars;
		that.update_items_vars = cws_megamenu_update_items_vars;
		that.reposition_items = cws_megamenu_reposition_items;
		that.is_item_right = cws_megamenu_is_item_right;
		that.is_item_top_level = cws_megamenu_is_item_top_level;		
		that.is_rtl = cws_megamenu_is_rtl;
		that.rtl = that.is_rtl();
		that.mobile_init = false;
		that.menu = menu;
		if ( that.args.fw_sel.length ){
			fw_obj = $( that.menu ).closest( that.args.fw_sel );
			if ( fw_obj.length ){
				that.fw = fw_obj[0];
			}
		}
		else{
			that.fw = that.menu.parentNode;
		}
		if ( !that.fw ) return false;
		items = that.menu.getElementsByClassName( "menu-item-object-megamenu_item" );
		that.vars = {};
		that.vars.fw_width = null;
		that.vars.fw_left = null;
		that.vars.fw_right = null;
		that.items = {};
		for ( i = 0; i < items.length; i++ ){
			item = items[i];
			item_id = item.id;
			that.items[item_id] = {};
			item_data = that.items[item_id];
			item_data['el'] = item;
			item_data['sub_menu'] = item.querySelector( ".sub-menu" );
			item_data['megamenu_item'] = item.querySelector( ".megamenu_item" );
			item_data.vars = {
				'width' : null,
				'left' : null,
				'right' : null
			};
			item_data['is_right'] = that.is_item_right( item );
			item_data['is_top_level'] = that.is_item_top_level( item );
		}
		that.controller();
	}
	function cws_megamenu_controller (){
		var that = this;
		that.update_vars();	
		that.update_items_vars();
		that.reposition_items();
		window.addEventListener( "resize", function (){
			that.update_vars();	
			that.update_items_vars();
			that.reposition_items();
		}, false );
	}
	function cws_megamenu_update_items_vars (){
		var that = this;
		var items, keys, i, item_data, vars, item_id, item;
		items 	= that.items;
		keys 	= Object.keys( items );
		for ( i = 0; i < keys.length; i++ ){
			item_id 		= keys[i];
			item_data 		= items[item_id];
			item 			= item_data['el'];
			vars 			= item_data.vars;
			vars['width'] 	= item.offsetWidth;
			vars['left'] 	= $( item ).offset().left;
			vars['right'] 	= vars['left'] + vars['width'];
		}
	}
	function cws_megamenu_update_vars ( item ){
		var that = this;
		that.vars.fw_width 	= that.fw.offsetWidth;
		that.vars.fw_left 	= $( that.fw ).offset().left;
		that.vars.fw_right 	= that.vars.fw_left + that.vars.fw_width;	
	}
	function cws_megamenu_reposition_items (){
		var that = this;
		var items, keys, i, item_data, item_id, mm_item_width, mm_item_left, mm_item_right, mm_section;
		items = that.items;
		keys = Object.keys( items );
		for ( i = 0; i < keys.length; i++ ){
			item_id = keys[i];
			item_data = items[item_id];
			mm_section = jQuery(item_data.el).find('.cws_megamenu_item');
			if (mm_section.hasClass('dis_full_width')){
				var that_item, that_per_item, mgmenu_pos, doc_w, item_pos, pos, item_per_w;
				that_item = mm_section;
				that_per_item = that_item.parents('.menu-item-object-megamenu_item')
				that_per_item.addClass('disable_fw');
				mgmenu_pos = that_item.data('pos');
				that_per_item.addClass('direction_'+mgmenu_pos+'');
				mm_item_width = that_item.data('width');
				item_data.sub_menu.style.width = mm_item_width + "px";
				doc_w = jQuery(window).width();
				$('#main_menu .menu-item-object-megamenu_item').each(function() {
					item_pos = $(this).offset().left;
					item_per_w = $(this).width();
				});
				if (mgmenu_pos == 'right') {
					if (item_pos + mm_item_width > doc_w) {
						mm_item_left = -1 * (item_pos + mm_item_width - doc_w + 30);
						item_data.sub_menu.style.left = mm_item_left + "px";
					} 
				} else if (mgmenu_pos == 'left') {
					if (item_pos < mm_item_width) {
						mm_item_left = -1 * (item_pos - 30);
						item_data.sub_menu.style.left = mm_item_left + "px";
					}
				} else if (mgmenu_pos == 'center') {
					if ( (item_pos + mm_item_width / 2 < doc_w) && item_pos > mm_item_width / 2 ) {
						mm_item_left = -1 * (mm_item_width / 2 - item_per_w / 2) ;
						item_data.sub_menu.style.left = mm_item_left + "px";
					} else if (item_pos + mm_item_width > doc_w) {
						mm_item_left = -1 * (item_pos + mm_item_width - doc_w + 30);
						item_data.sub_menu.style.left = mm_item_left + "px";
					} else if (item_pos < mm_item_width) {
						mm_item_left = -1 * (item_pos - 30);
						item_data.sub_menu.style.left = mm_item_left + "px";
					}
				}
			} else {
				mm_item_width = that.vars.fw_width;
				item_data.sub_menu.style.width = mm_item_width + "px";
				if ( that.rtl ){
					mm_item_right = item_data.vars.right - that.vars.fw_right;
					item_data.sub_menu.style.right = mm_item_right + "px";
				}
				else{
					mm_item_left = -1 * ( item_data.vars.left - that.vars.fw_left );
					item_data.sub_menu.style.left = mm_item_left + "px";	
				}
			}
		}
	}
	function cws_megamenu_is_item_right ( item ){
		var that = this;
		if ( item == undefined ) return false;
		return cws_has_class( item, "right" ) || $( item ).closest( ".menu-item.right" ).length;
	}
	function cws_megamenu_is_item_top_level ( item ){
		var that = this;
		if ( item == undefined ) return false;
		return !cws_has_class( item.parentNode, "sub-menu" );
	}
	function cws_megamenu_is_rtl (){
		return cws_has_class( document.body, "rtl" );
	}
	
}(jQuery))