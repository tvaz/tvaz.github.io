---
layout: default
title: Recipes
---
This is a small collection of recipes I like to keep around my kitchen, mostly for my own reference but I hope it can help others as well. While these are not of my own invention, I have provided links to my inspiration.

{% assign sorted_recipes = site.recipes | sort: "title" %}

<ul>
  {% for recipe in sorted_recipes %}
    <li>
      <a href="{{ recipe.url }}">{{ recipe.title }}</a>
    </li>
  {% endfor %}
</ul>


### Recipes By Tag

{% assign recipes = site.recipes %}
{% assign all_tags = "" | split: "" %}

{% for recipe in recipes %}
  {% for tag in recipe.tags %}
    {% unless all_tags contains tag %}
      {% assign all_tags = all_tags | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}

{% assign all_tags = all_tags | sort %}

{% for tag in all_tags %}
  <details class="tag-block">
    <summary class="tag-header">
      {{ tag }}
    </summary>

    <ul class="tag-recipes">
      {% for recipe in recipes %}
        {% if recipe.tags contains tag %}
          <li>
            <a href="{{ recipe.url | relative_url }}">{{ recipe.title }}</a>
          </li>
        {% endif %}
      {% endfor %}
    </ul>
  </details>
{% endfor %}
