#!/usr/bin/perl

use warnings;
use strict;
use CGI;
my $q = CGI->new;

print $q->header();
my $template = "/home/morten/devel/jpanel/raspberry/html/circles.template.html";
my $status = "/tmp/jpanel.status";

my %circle_colour = (
	0 => 'grey_circle',
	1 => 'white_circle',
	2 => 'red_circle',
	3 => 'small_grey_circle',
	4 => 'small_yellow_circle',
	5 => 'small_blue_circle',
	6 => 'small_red_circle',
	);
if(open(STATUS, "< $status")) {
	my $page = read_template($template);
	$page =~ s/\%\%\%RELOAD\%\%\%/<meta http-equiv="Refresh" content="10">/;
	while(<STATUS>) {
		if($_ =~ /#(\d):(\d):(\d):(\d):(\d);/) {
			my $id = $1;
			my $main_c = $2;
			my $small_c1 = $3+3;
			my $small_c2 = $4+3;
			my $small_c3 = $5+3;
			if($id == 0) {
				$page =~ s/\%\%\%CIRCLE001\%\%\%/$circle_colour{$main_c}/;
				$page =~ s/\%\%\%SMALL_CIRCLE001\%\%\%/$circle_colour{$small_c1}/;
				$page =~ s/\%\%\%SMALL_CIRCLE002\%\%\%/$circle_colour{$small_c2}/;
				$page =~ s/\%\%\%SMALL_CIRCLE003\%\%\%/$circle_colour{$small_c3}/;
			}
			if($id == 1) {
				$page =~ s/\%\%\%CIRCLE002\%\%\%/$circle_colour{$main_c}/;
				$page =~ s/\%\%\%SMALL_CIRCLE004\%\%\%/$circle_colour{$small_c1}/;
				$page =~ s/\%\%\%SMALL_CIRCLE005\%\%\%/$circle_colour{$small_c2}/;
				$page =~ s/\%\%\%SMALL_CIRCLE006\%\%\%/$circle_colour{$small_c3}/;
			}
			if($id == 2) {
				$page =~ s/\%\%\%CIRCLE003\%\%\%/$circle_colour{$main_c}/;
				$page =~ s/\%\%\%SMALL_CIRCLE007\%\%\%/$circle_colour{$small_c1}/;
				$page =~ s/\%\%\%SMALL_CIRCLE008\%\%\%/$circle_colour{$small_c2}/;
				$page =~ s/\%\%\%SMALL_CIRCLE009\%\%\%/$circle_colour{$small_c3}/;
			}
		}
	}
	close STATUS;
	print $page;
	unlink $status;
}
else {
	&display_blank;
}

sub display_blank {
	my $page = read_template($template);
	$page =~ s/\%\%\%RELOAD\%\%\%//;
	$page =~ s/\%\%\%(CIRCLE\d\d\d)\%\%\%/grey_circle/g;
	$page =~ s/\%\%\%(SMALL_CIRCLE\d\d\d)\%\%\%/small_grey_circle/g;
	print $page;
}

sub read_template {
	my $tpl = shift;
	if(open(TEMPLATE, "< $tpl")) {
		my $contents = "";
		while(<TEMPLATE>) {
			$contents .= $_;
		}
		close TEMPLATE;
		return $contents;
	}
	else {
		return $tpl;
	}
}
