// Custom Js
var total_height = jQuery(window).innerHeight();
var header_height = jQuery("header").outerHeight();
var heading_height = jQuery(".vertical-scroll-title").outerHeight();
var empty_height =  total_height - header_height;
var vertical_scroll =  total_height - (header_height + heading_height);
jQuery(".vertical-scroll").height(vertical_scroll - 24);
jQuery(".tab-content").height(vertical_scroll -102);