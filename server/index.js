const fs = require('fs');
const express = require('express');

const app = express();
const port = process.env.PORT || '8778';

const indexHtml = fs.readFileSync('dist/index.html', 'utf8');

function ogFromTemplate(party, fullParty) {
  return {
    title: `Uvažava li ${fullParty} naš glas`,
    description: `Iz ${fullParty} još nisu potvrdili da će uvažavati glas građanki i građana nakon izbora. Tražimo pravovremenu najavu, primjereno trajanje i argumentirane odgovore vlasti na komentare pristigle na javnom savjetovanju. Poručite ${fullParty} da imamo pravo sudjelovati u donošenju odluka koje nas se tiču.`,
    og_image: `https://parlametar.hr/javno-savjetovanje/og/${party}.jpg`,
  };
}

const ogData = {
  default: {
    title: 'Uvažite naš glas i između izbora',
    description:
      'Savjetovanje s javnošću jednostavan je i svakom građaninu_ki dostupan mehanizam sudjelovanja u odlukama vlasti. Provođenje javnog savjetovanja pokazuje i koliko vlasti uvažavaju mišljenje svojih građanki i građana. Više od 20 posto zakonskih propisa donesenih u mandatu IX. saziva Hrvatskog sabora nije prošlo savjetovanje s javnošću.',
    og_image: `https://parlametar.hr/javno-savjetovanje/og/_default.jpg`,
  },
  // bandic: ogFromTemplate('bandic', 'BANDIĆ MILAN'),
  domovinski: ogFromTemplate('domovinski', 'DOMOVINSKI POKRET'),
  // glas: ogFromTemplate('glas', 'GLAS'),
  hdz: ogFromTemplate('hdz', 'HDZ'),
  // hss: ogFromTemplate('hss', 'HSS'),
  // ids: ogFromTemplate('ids', 'IDS'),
  most: ogFromTemplate('most', 'MOST'),
  mozemo: ogFromTemplate('mozemo', 'MOŽEMO'),
  // nlm: ogFromTemplate('nlm', 'NLM'),
  restart: ogFromTemplate('restart', 'RESTART'),
  // sdp: ogFromTemplate('sdp', 'SDP'),
  // sdss: ogFromTemplate('sdss', 'SDSS'),
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
