import * as d3 from 'd3';
import { generateSVG } from './utils';

const margin = {
  top: 20,
  right: 10,
  bottom: 20,
  left: 50,
};

const width = (window.innerWidth - 20) - margin.left - margin.right;
const height = Math.min(550, window.innerHeight) - margin.bottom - margin.top;

function drawWeeklyTitles(data) {
  d3.select('#weekly .titles')
    .selectAll('span')
    .data(data.reverse())
    .enter()
    .append('span')
    .attr('data-num', (d, i) => i + 1)
    .html((d, i) => `<a href="https://www.shurado.com/?page=${41-i}" target="_blank" rel="nofollow noreferer">${d}</a>`);
}


function drawSubscriber(data) {
  const svg = generateSVG('#subscriberChart', width, height, margin);
  const xScale = d3.scaleBand()
    .padding(0.5)
    .domain([
      '2017-3',
      '2017-4',
      '2017-5',
      '2017-6',
      '2017-7',
      '2017-8',
      '2017-9',
      '2017-10',
      '2017-11',
      '2017-12',
    ])
    .range([0, width]);
  const yScale = d3.scaleLinear()
    .domain([0, 1500])
    .range([height, 0]);


  const axisX = d3.axisBottom(xScale)
    .tickSizeInner(4)
    .tickSizeOuter(20)
    .tickPadding(3);

  svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-width))
    .append('text')
      .attr('dx', 4)
      .attr('y', 6)
      .attr('text-anchor', 'start')
      .text('(人)')
      .style('fill', '#111')
      .style('font-size', '20px')

  svg
  .append('g')
  .attr('class', 'axis x')
  .attr('transform', `translate(0, ${height})`)
  .call(axisX)

  svg.selectAll('rect')
    .data(data.reverse())
    .enter().append('rect')
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(+d))
    .attr('x', (d, i) => xScale(`2017-${i+3}`))
    .attr('y', d => yScale(+d))
    .attr('fill', 'url("#highlight")');
}

function drawIssueChart(data) {

  const svg = generateSVG('#issueChart', width, height, margin);
  const xScale = d3.scaleBand()
    .padding(0.5)
    .domain(data.map(d => d.min_date))
    .range([0, width]);
  const yScale = d3.scaleLinear()
    .domain([0, 11000])
    .range([height, 0]);

  const axisX = d3.axisBottom(xScale)
    .tickSizeInner(4)
    .tickSizeOuter(20)
    .tickPadding(3)
    .tickFormat(d => d3.timeFormat('%Y-%m')(new Date(d)))

  svg.append('g')
    .attr('class', 'y axis')
    .call(d3.axisLeft(yScale).ticks(5).tickSize(-width))
    .append('text')
      .attr('dx', 4)
      .attr('y', 6)
      .attr('text-anchor', 'start')
      .text('（字）')
      .style('fill', '#111')
      .style('font-size', '20px')

  svg
    .append('g')
    .attr('class', 'axis x')
    .attr('transform', `translate(0, ${height})`)
    .call(axisX)

  svg.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('width', xScale.bandwidth())
    .attr('height', d => height - yScale(+d.issue_length))
    .attr('x', d => xScale(d.min_date))
    .attr('y', d => yScale(+d.issue_length))
    .attr('fill', 'url("#highlight")');

}

d3.json('./assets/data/yaoya-title.json', drawWeeklyTitles);
d3.csv('./assets/data/issue.csv', drawIssueChart);
d3.json('./assets/data/subscribers.json', drawSubscriber);
