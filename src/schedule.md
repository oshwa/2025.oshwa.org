---
layout: layouts/page.html
title: Speak at the Open Hardware Summit
---

# Schedule

## May 2nd

{% assign events = collections.events %}
{% for event in events %}
<div class="columns event-list-item">
  <div class="column">
    <a class="title is-4 is-family-display" href="{{event.url}}">{{event.data.title}}</a>
    <p class="subtitle">{{event.data.presenter}}</p>
    <p class="subtitle my-1">{% formatEventTimes event.data.start, event.data.end, event.data.timezone %}</p>
    <p class="subtitle">{{event.data.location}}</p>
    <p>{{event.content}}</p>
    <p class="my-4">
      <a href="{{event.url}}">More details</a>
    </p>
  </div>
</div>
{% endfor %}


## May 3th

## May 4th
