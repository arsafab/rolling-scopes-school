import Meteora from './meteora';

const game = new Meteora();

window.addEventListener('load', game.start.bind(game));
window.addEventListener('resize', game.resize.bind(game));
window.addEventListener('mousedown', game.click.bind(game));
window.addEventListener('mousemove', game.hover.bind(game));
window.addEventListener('contextmenu', event => event.preventDefault());
