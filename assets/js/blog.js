import * as d3 from 'd3';

function drawBlogPosts(data) {
  const articles = d3.select('.posts-container')
    .selectAll('div')
    .data(data)
    .enter()
    .append('div')
    .attr('class', 'card');

  articles
    .append('h3')
    .attr('class', 'card-title')
    .html(d => `<a href="${d.link}">${d.name}</a>`);
  articles
    .append('p')
    .attr('class', 'card-body')
    .text(d => d.summary);
}

d3.json('/assets/data/blog.json', drawBlogPosts);
