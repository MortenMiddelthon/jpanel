#!/usr/bin/perl

use warnings;
use strict;
use CGI;
my $q = CGI->new;

print $q->header();
print $q->start_html(
	-title => 'IP address',
	-style => '/jpanel/jpanel.css',
	-bgcolor => 'black',
	);
my $ipaddress = `/usr/bin/facter ipaddress`;
print $q->h4({-class=>'jpanel', -align=>'right'}, "$ipaddress");

print $q->end_html;

