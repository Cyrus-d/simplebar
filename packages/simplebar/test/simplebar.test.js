import jestPuppeteerConfig from '../jest-puppeteer.config';

describe('Load', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${jestPuppeteerConfig.server.port}/demo/`);
  });

  it('should render demo page', async () => {
    await expect(page).toMatch('Simplebar demo page');
  });

  it('should render SimpleBar on data-simplebar elements', async () => {
    await expect(page).toMatchElement('[data-simplebar] .simplebar-content');
  });

  it('should not auto hide the scrollbar', async () => {
    const demo = await expect(page).toMatchElement('[data-simplebar-auto-hide="false"]');
    await expect(demo).toMatchElement('.simplebar-scrollbar.visible');
  });
  
  it('should force scrollbar track to be visible but scrollbar to be hidden', async () => {
    const trackSelector = '[data-simplebar-force-visible] .simplebar-track.vertical';
    
    await page.waitForSelector(trackSelector, { visible: true });
    await page.waitForSelector(`${trackSelector} .simplebar-scrollbar`, { hidden: true });
  });

  it('should display SimpleBar right to left', async () => {
    await expect(page).toMatchElement('[data-simplebar-direction="rtl"]');
    const options = await page.$eval('[data-simplebar-direction="rtl"]', el => el.SimpleBar.options);
    await expect(options.direction).toEqual('rtl');
  });
});
