#!/usr/bin/perl

use warnings;
use strict;
use CGI;
my $q = CGI->new;

print $q->header();
my $url_param = "";
my %button_status = (
	0 => 0,
	1 => 0,
	2 => 0,
	);
my $status = "/home/morten/devel/jpanel/raspberry/html/jpanel.status";
if(open(STATUS, "< $status")) {
	while(<STATUS>) {
		if($_ =~ /#(\d):(\d):(\d):(\d):(\d);/) {
			$url_param .= "\&ID$1=$2:$3:$4:$5";
			$button_status{$1}++;
		}
	}
	close STATUS;
	if($button_status{0} > 0 and $button_status{1} > 0 and $button_status{2} > 0) {
#		print "URL: $url_param\n";
		print $q->start_html(
			-title => 'Read jpanel status',
			-style => '/jpanel/jpanel.css',
			-bgcolor => 'black',
			-script=>{
				-type=>'JAVASCRIPT',
				-src=>'/jpanel/js/jpanel.js',
				-onLoad=>'updateLights()',
			},
			);
	}
	else {
		print $q->start_html(
			-title => 'Read jpanel status',
			-style => '/jpanel/jpanel.css',
			-bgcolor => 'black',
			);
	}
#	unlink $status;
}
else {
	print $q->start_html(
		-title => 'Read jpanel status',
		-style => '/jpanel/jpanel.css',
		-bgcolor => 'black',
		);
}

print $q->end_html, "\n";

