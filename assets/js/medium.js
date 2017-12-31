import * as d3 from 'd3';

const toHumanUnit = (number) => (number / 1000).toFixed(2) + 'K';

function drawMediumStat(data) {
  const scale = d3.scaleLinear()
    .domain([0, 10000])
    .range([0, 100]);
  const posts = d3.select('#stat-medium')
    .selectAll('li')
    .data(data)
    .enter()
    .append('li');

  posts.append('strong')
    .html(d => `<a href="${d.link}">${d.name}</a>`);
  posts.append('span')
    .attr('data-title', d => toHumanUnit(d.views))
    .attr('style', d => `width: ${scale(d.views)}%;`)
}

d3.json('./assets/data/medium.json', drawMediumStat);
