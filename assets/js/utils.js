import * as d3 from 'd3';
export const attrs = (options = {}) => s =>
  Object
    .keys(options)
    .forEach(key => s.attr(key, options[key]));

export const styles = (options = {}) => s =>
  Object
    .keys(options)
    .forEach(key => s.style(key, options[key]));

export function responsify(svg) {
  const container = d3.select(svg.node().parentNode);
  const width = parseInt(svg.style('width'), 10);
  const height = parseInt(svg.style('height'), 10);
  const aspect = width / height;

  function resize() {
    const targetWidth = parseInt(container.style('width'), 10);
    svg.attr('width', targetWidth);
    svg.attr('height', Math.round(targetWidth / aspect));
  }

  svg
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMinYMid')
    .call(resize);

  d3.select(window).on(`resize.${container.attr('id')}`, resize);
}

/**
 *
 * @param {string} target DOM selector
 * @param {number} width
 * @param {number} height
 * @param {object} margin
 */
export const generateSVG = (target, width, height, margin = {
  top: 10,
  bottom: 10,
  left: 30,
  right: 10,
}) =>
  d3
    .select(target)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsify)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
