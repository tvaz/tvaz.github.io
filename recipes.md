---
layout: default
title: Recipes
---
This is a small collection of recipes I like to keep around my kitchen, mostly for my own reference but I hope it can help others as well. These are mostly not of my own invention, but I have provided links to my inspiration.
<ul>
  {% for recipe in site.recipes %}
    <li>
      <a href="{{ recipe.url }}">{{ recipe.title }}</a>
    </li>
  {% endfor %}
</ul>