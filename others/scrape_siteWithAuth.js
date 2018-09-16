const puppeteer = require('puppeteer');

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.authenticate({ username: 'teste', password: 'teste123' });
  await page.goto('http://members.teste.com/');
  await page.waitFor(5000);
  await page.click('#li_abc'); //TODO Melhorar este item para ser mais dinâmico
  await page.waitFor(15000);

  const result = await page.evaluate(() => {
    let data = [];

    let elements = document.querySelectorAll('#updateFade > li');

    for (var element of elements) {
      let id = element.id;
      let episode = element.dataset['id'];
      let pageNumber = document.querySelector(
        '#video-list > div > ul.pagination.pagination-main > li.active > a'
      ).text;
      // let imageUrl = element.querySelector('img').getAttribute('src');

      data.push({ id, episode, pageNumber });
    }

    return data;
  });

  browser.close();
  return result;
};

scrape().then(value => {
  console.log(value);
});
