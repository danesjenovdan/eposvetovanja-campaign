const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || '8778';

const indexHtml = fs.readFileSync('dist/index.html', 'utf8');

function ogFromTemplate(party) {
  return {
    title: `Uvažava li ${party} naš glas`,
    description: `Iz ${party} još nisu potvrdili da će uvažavati glas građanki i građana nakon izbora. Tražimo pravovremenu najavu, primjereno trajanje i argumentirane odgovore vlasti na komentare pristigle na javnom savjetovanju. Poručite ${party} da imamo pravo sudjelovati u donošenju odluka koje nas se tiču.`,
    og_image: `{ TODO: base url }og/${party.toLowerCase()}.jpg`,
  };
}

const ogData = {
  default: {
    title: 'Uvažite naš glas i između izbora',
    description:
      'Savjetovanje s javnošću jednostavan je i svakom građaninu_ki dostupan mehanizam sudjelovanja u odlukama vlasti. Provođenje javnog savjetovanja pokazuje i koliko vlasti uvažavaju mišljenje svojih građanki i građana. Više od 20 posto zakonskih propisa donesenih u mandatu IX. saziva Hrvatskog sabora nije prošlo savjetovanje s javnošću.',
    og_image: `{ TODO: base url }og/_default.jpg`,
  },
  band: ogFromTemplate('BANDIĆ MILAN'),
  glas: ogFromTemplate('GLAS'),
  hdz: ogFromTemplate('HDZ'),
  // hns: ogFromTemplate('HNS'),
  hss: ogFromTemplate('HSS'),
  ids: ogFromTemplate('IDS'),
  most: ogFromTemplate('MOST'),
  nlm: ogFromTemplate('NLM'),
  sdp: ogFromTemplate('SDP'),
  sdss: ogFromTemplate('SDSS'),
};

app.get(['/', '/index.html'], async (req, res) => {
  try {
    const og =
      req.query.stranka && ogData[req.query.stranka]
        ? ogData[req.query.stranka]
        : ogData.default;

    const newHtml = indexHtml
      .replace(/{{title}}/g, og.title)
      .replace(/{{description}}/g, og.description)
      .replace(/{{og_image}}/g, og.og_image);

    res.send(newHtml);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    res.status(500).send('og-replacer-error');
  }
});

app.use('/', express.static('dist'));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});
