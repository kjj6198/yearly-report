import * as d3 from 'd3';

function drawImages(target, data) {
  let dragging = false;
  let prev = null;
  const images = d3.select(target)
    .selectAll('figure')
    .data(data)
    .enter()
    .append('figure');
  d3.select(target)
    .on('mousedown', () => dragging = true)
    .on('touchstart', () => dragging = true)
    .on('mouseup', () => {
      dragging = false;
      prev = null;
    })
    .on('touchend', () => {
      dragging = false;
      prev = null;
    })
    .on('mousemove', function(_, i, e) {
      if (dragging) {
        const event = e[0];
        const [x] = d3.mouse(event);
        const { scrollLeft } = event;
        if (!prev) {
          prev = x;
        }

        event.scrollTo(scrollLeft + (prev - x) / 10, 0)
      }

      return;
    })

  images.append('div')
    .attr('class', 'image')
    .attr('style', d => `background-image: url(${d.link})`)
    .attr('alt', d => d.desc);
  images.append('figcaption')
    .text(d => d.desc)

  return images;
}

function drawTravel(data) {
  const kyoto = data.slice(0, 5);
  const tokyo = data.slice(5);
  drawImages('#kyoto > .image-container', kyoto);
  drawImages('#tokyo > .image-container', tokyo);
}

d3.json('./assets/data/images.json', drawTravel);
