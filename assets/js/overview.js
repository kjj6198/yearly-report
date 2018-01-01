import * as d3 from 'd3';

const toPresent = (scale) => (date, width) =>
  `${(Math.floor(scale(new Date(date))) / width) * 100}%`;

function drawTimeline(data) {
  const div = d3.select('#overview');
  const timeScale = d3.scaleTime()
  .domain([new Date('2017-01-01'), new Date('2017-12-31')])
  .range([0, window.innerWidth]);

  const timeFormat = d3.timeFormat('%m-%d');

  const events = div
    .selectAll('span')
    .data(data)
    .enter()
    .append('div')
      .attr('style', d => `left: ${toPresent(timeScale)(d.time, window.innerWidth)}`);
  events.append('span')
    .attr('class', 'point')
  events.append('span')
    .attr('class', 'time')
    .text(d => timeFormat(new Date(d.time)))
  events.append('h6')
    .attr('class', 'title')
    .attr('style', (d, i) => (i % 2) == 0 ? `bottom: 60px` : null)
    .html(d => d.link ? `<a href="${d.link}" target="_blank" rel="nofollow noreferer">${d.name}</a>` : d.name)
}

d3.json('./assets/data/overview.json', (data) => {
  drawTimeline(data);
});
