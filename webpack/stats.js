import fs from 'fs';
import path from 'path';

const filepath = path.resolve(__dirname, '..', 'build', 'server', 'webpack-stats.json');

export default function (stats) {
  const publicPath = this.options.output.publicPath;
  const json = stats.toJson();

  const getChunks = (name, ext = /.js$/) => {
    let chunks = json.assetsByChunkName[name];

    if (!(Array.isArray(chunks))) {
      chunks = [chunks];
    }

    return chunks
      .filter(chunk => ext.test(path.extname(chunk)))
      .map(chunk => `${publicPath}${chunk}`);
  };

  const script = [
    ...getChunks('common', /js/),
    ...getChunks('app', /js/),
  ];

  const style = [
    ...getChunks('app', /css/),
  ];

  const imagesRegex = /\.(jpe?g|png|gif|svg)$/;

  const images = json.modules
    .filter(module => imagesRegex.test(module.name))
    .map(image => ({
      original: image.name,
      compiled: `${publicPath}${image.assets[0]}`,
    }));

  const content = { script, style, images };

  fs.writeFileSync(filepath, JSON.stringify(content));
}
