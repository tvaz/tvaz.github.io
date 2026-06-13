---
layout: default
title: Why I Prefer the Simplicity of Jekyll in 2026
description: Musings on why I still like using Jekyll.
categories: ["blogging", "jekyll"]
date: 2026-06-12 21:34:33
---

In a web ecosystem obsessed with complexity, algorithmic reach, and high-performance platforms, Jekyll has been a place I have found simplicity in the madness of the modern internet. It is one of the few tools that feels grounded and peaceful. A quiet corner, where writing feels personal and human instead of like content.

I initially got into Jekyll blogging because it is supported by Github Pages - a great microservice that allows anyone to deploy a small site for free. All I needed to do was setup the attached repo, add a CNAME for my custom domain, and initialize a Jekyll site. Github handles all deployments for me for no cost. These sites are intended for small personal sites or for project landing pages, which make them the perfect scale for this site.

Jekyll has been a sweet spot for me in a world of feature-heavy content management systems, blogging platforms, and social media providers. The ephemeral nature of social media makes connections hard and getting a sense of people even harder - whenever I can, I prefer to read individual blogs and posts on static sites, as I feel they give me a more human connection.

For simple tasks, I utilize shell scripts. Setting up a new post is fairly simple, requiring just some basic metadata in a new file in your `_posts` directory; however, setting up this front matter can be a bother every time, especially because you have to provide a time.

To solve this issue, I created this small script:

```
#!/usr/bin/zsh

cd _posts/

filename=`date +%Y-%m-%d-new-post.md`

cat > $filename <<EOF
---
layout: default
title:
description:
categories: [""]
date: `date "+%Y-%m-%d %H:%M:%S"`
---
EOF
```

This automatically generates a new post template with the current date that I can fill in as needed, such as for this post. These kinds of lightweight solutions encourage my creativity and give me a chance to flex my scripting muscles in a low-tension setting. The trial and error process of making simple things work effectively can be soothing. Instead of wrestling with a full-stack Node application and a CMS, I get to work with plain Markdown files.

And when I do need to add something more dynamic, Jekyll doesn't get in the way. JavaScript can be integrated into the site easily when I need it to - see my [post on my site's Gallery pages]({% post_url 2025-08-07-new-art-gallery %}) for an example on how I implemented some Javascript.

Due to the structure of Github Pages, the site is by default version-controlled and in plain text, which makes the cognitive load of maintaining it simple. I do a lot of my own writing in Obsidian. Because both Obsidian and Jekyll rely on plain Markdown files, moving writing between them is seamless.I can draft in Obsidian, paste into a new post, and it just works. I put a lot of stock in plain text files - Markdown formatting is readable when formatted as well as when viewed plainly in any text editor, even one as basic as Vim.

Generally, once I have drafted my post using the above script and pasting in any writing I have done in Obsidian, I do a quick preview of the changes. To preview locally, a simple `bundle exec jekyll serve --livereload` launches the site on localhost:4000, with live reloading to make sure I don't have to keep refreshing the page. Once I'm happy with the post, I make a commit and push the changes to `main`. I can feel comfortable doing this because I can always get back any changes I made later, and any deletions or additions do not have to be permanent. Once deployed, Github Pages takes care of the rest - I don't have to watch any deployments; its as good as clicking the "Post" button on a traditional platform.

While the processing power of a large-scale CMS like WordPress isn't really matched by Jekyll, I think that in many cases WordPress can be overkill. This site is small enough that the potential loading gains of a higher-performance platform are not necessary. 

If you are willing to take the time to learn some basic skills, Jekyll is much easier to maintain than Wordpress and its ilk for static websites. All you need is a little bit of comfort running (not even coding!) Ruby code, a Github account, and some DNS basics, and you can get a solid Jekyll site up and running easily. HTML and CSS knowledge can help you customize the site, but there is a great ecosystem of prebuilt themes that you can draw from to bridge this knowledge gap. And if you are interested in learning some basic web programming, I have found it to be a pretty interesting platform to play with building new features on top of.

To be sure, the limitations of a Github Pages Jekyll site are not for everyone, and even cursory interactions with Ruby gems might be intimidating for some users. For my needs, I have no problems with these trade-offs, and I find it worth it for not having to worry about things like where I am going to host my WordPress site and how often I need to login to the CMS dashboard and update it. Jekyll is predictable and free of distracting dashboards and notifications. Also, no one else owns the content posted here- it's all just hosted in a Github repo that I control, and I have a local copy of the repo as well. I'll never have to worry about losing this content or having it expire, or having a user account deleted for inactivity on a social media site.

There is a lot to like about static sites, and Jekyll has been a pleasurable platform to learn more about. I hope to keep improving my Jekyll chops in the future and maybe start working on my own plugins. While the internet is moving towards increasingly ephemeral content, it's comforting to build something simple and durable that I can call my own.