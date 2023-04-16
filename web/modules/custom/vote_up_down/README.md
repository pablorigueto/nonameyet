# Introduction

The Vote Up/Down module allows the user to cast votes on entities where fields
can be added using different widgets.
This module uses [Voting API](https://www.drupal.org/project/votingapi) to
implement votes, uses Drupal core AJAX for the user interface, and Drupal core
Plugin API to implement the idea of widgets.

For a full description of the module, visit the [project
page](https://www.drupal.org/project/vote_up_down).

To submit bug reports and feature suggestions, or to track changes please use
the [project issue queue](https://www.drupal.org/project/issues/vote_up_down).

# Requirements

This module requires the [Voting API](https://www.drupal.org/project/votingapi)
module to work.

# Features

The module is implemented as a field, you may vote over any field-able entity,
node, comment, and term are examples of entities.

# Installation

The module currently depends on a Drupal core change from [#2670798-4:
"nojs"/"ajax" route parameter in use-ajax link breaks CSRF
protection](https://www.drupal.org/project/drupal/issues/2670798#comment-10868390).
Please use that patch to improve a bit core ajax api, its full url is
https://www.drupal.org/files/issues/drupal-exclude-csrf-paramaters-2670798-4.patch

Install as usual, see
https://www.drupal.org/docs/8/extending-drupal-8/installing-modules for further
information.

# Configuration

Configure permissions in Administer >> People >> Permissions >> **Vote
Up/Down**:

- access vote up/down statistics
  Users in roles with the 'access vote up/down statistics' permission will be
  able to see the votes performed by each user on its 'Votes' tab.

- administer vote up/down
  Users in roles with the 'administer vote up/down' permission will be able to
  modify the Voting API tag for Vote Up/Down votes.

- reset vote up/down votes
  Users in roles with the 'reset vote up/down votes' permission will be able to
  undo their own votes if it's also permitted in the configuration for the
  respective module.

- use vote up/down
  Users in roles with the 'use vote up/down' permission will be able to actually
  cast a vote with vote up/down(for the callback).

Start voting!

# Customization

You can write your own widget for Vote Up/Down, and you can put it in your
module or in your theme. Please take a look to [WIDGETAPI.md](WIDGETAPI.md) for
more information.

## Theming widgets and votes
   
Since widgets are implemented through plugins, and there are many plugins to
choose at runtime, theme templates cannot be used directly, so instead the
render is performed by the widget.

# Frequently Asked Questions

## Why anonymous cannot vote?

With current drupal core and current implementation, vote_up_down cannot support
anonymous voting, details at [#2955847: Anonymous users can not
vote](https://www.drupal.org/project/vote_up_down/issues/2955847).  The Drupal
core issue [#2730351: CSRF check always fails for users without a
session](https://www.drupal.org/project/drupal/issues/2730351) is the underlying
reason.  The changes at
[#2730351-57](https://www.drupal.org/project/drupal/issues/2730351#comment-11989824)
enable it for Drupal 8.9.x.  On Drupal 9.x.x, there is not any current solution
yet that have been verified with this module, if you know one, please add a
comment to [the related vote_up_down issue
\#2955847](https://www.drupal.org/project/vote_up_down/issues/2955847).

## How can I prevent bots to vote when anonymous voting is enabled?

When anonymous voting is enabled, you need to modify your `robots.txt` file to
prevent bots to vote.

    Disallow: /vote/
    Disallow: /?q=vote/

# Credits

The original author was [Fredrik Jonsson](https://www.drupal.org/u/frjo).

The original 2.x version was added by [Pratul
Kalia](https://www.drupal.org/u/lut4rp).

The initial port to Drupal 8 was added by [Sudhanshu
Gautam](https://www.drupal.org/u/sudhanshug).

Current main maintainer is [Marco Villegas](https://www.drupal.org/u/marvil07).
