import express, { Request } from 'express';
import { Params } from './classes';
import { getHero, getHeroes, getSkin } from './files';
import { getImage, getImage16 } from './image';

const app = express();
const port = 8080;
app.get('/image/:orientation([vh])?/:hero?/:skin?', (req: Request<Params>, res) => {
  const orientation = req.params.orientation || (Math.random() > 0.5 ? 'v' : 'h');
  const hero = getHero(orientation, req.params.hero);
  const skin = getSkin(orientation, hero, req.params.skin);
  getImage(orientation, hero, skin).then(path => res.sendFile(path));
});
app.get('/bw16/:orientation([vh])?/:hero?/:skin?', (req: Request<Params>, res) => {
  const orientation = req.params.orientation || (Math.random() > 0.5 ? 'v' : 'h');
  const hero = getHero(orientation, req.params.hero);
  const skin = getSkin(orientation, hero, req.params.skin);
  getImage16(orientation, hero, skin).then(path => res.sendFile(path));
});

app.listen(port, () => {
  console.log('Server listening...');
  console.log(`  http://localhost:${port}/`);
});