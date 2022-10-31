const puppeteer = require('puppeteer');
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

// your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  databaseURL: "databaseURL",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId"
};

const calculateTime = async () => {
  // initialize Firebase
  const app = initializeApp(firebaseConfig);

  try {
    //  when running local, use the following line
    const browser = await puppeteer.launch({ headless: true })
    // when using docker, uncomment the below and comment out the above
    /*
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: [
        '--no-sandbox',
        '--disable-gpu',
      ]
    });
    */
    const page = await browser.newPage();

    // navigate to our commute url
    await page.goto('https://www.google.com/maps/dir/Countdown+Ponsonby+Williamson+Avenue,+Grey+Lynn,+Auckland/-36.9378439,174.6561453/@-36.8977441,174.6703558,13z')

    // evaluate the transit time
    const transitTime = await page.evaluate(() => [...document.querySelectorAll('span')].filter(e => e.textContent.includes('min'))[0].textContent);

    // format the current time into a firebase safe string
    const currentTimeString = new Date().toLocaleString('en-GB', { timeZone: 'Pacific/Auckland' }).replace(', ', '@').replaceAll('/', ':');

    // get the firebase database
    const database = getDatabase(app);

    // set data! 
    await set(ref(database, `logs/${currentTimeString}`), transitTime);

    // shut down
    await browser.close()
    process.exit(0)
  } catch (e) {
    console.log(e)
  }
}

calculateTime()
