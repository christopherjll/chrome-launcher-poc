const ChromeLauncher = require("chrome-launcher");
const puppeteer = require("puppeteer");

async function startChrome() {
  const chrome = await ChromeLauncher.launch({
    startingUrl: "https://dev.azara.jllt.com/",
  });
  return chrome;
}

async function getBrowser(chrome) {
  let browser = {};
  browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`,
    defaultViewport: null,
  });
  return browser;
}

async function run() {
  const chrome = await startChrome();
  const browser = await getBrowser(chrome);

  // to move the new tab in background
  const allPages = await browser.pages();
  allPages[0].bringToFront();

  let i = 0;
  // 50 tabs
  while (i < 50) {
    const page = await browser.newPage();
    await page.goto("https://cpu-intensive-tasks.topherwenceslaus.vercel.app/");
    i++;
  }
}

run();
