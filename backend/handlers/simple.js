'use strict'

const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function (req, res) {
  const meta = await Promise.all(
    fs.readdirSync('recordings')
      .filter(file => !file.includes('thumb'))
      .sort()
      .map(file => exec(`exiftool -J recordings/${file}`))
  );

  res.json(meta.map(({ stdout }) => {
    const m = JSON.parse(stdout)[0];
    const p = path.parse(m.SourceFile);

    const [
      all,
      EventNumber,
      EventYear,
      EventMonth,
      EventDay,
      EventHour,
      EventMinute,
      EventSecond
    ] = p.base.match(/^(\d+)-(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/)

    return {
      ...m,
      AnimatedThumbnail: `${p.dir}/${p.name}.thumb.gif`,
      EventDate: `${EventYear}-${EventMonth}-${EventDay}`,
      EventTime: `${EventHour}:${EventMinute}:${EventSecond}`,
      EventNumber,
      EventYear,
      EventMonth,
      EventDay,
      EventHour,
      EventMinute,
      EventSecond
    };
  }));
}
