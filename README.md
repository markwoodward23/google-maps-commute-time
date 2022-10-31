# Optimise commute time with Google Maps, Puppeteer, Cloud Run Jobs, Cloud Scheduler and Recharts. 

See Medium article of the same name! 

- We'll use Puppeteer, the headless Chrome npm package, to open a URL that has my commute already saved as part of the path (luckily Google Maps does all the hard work here to make directions sharable). 
- We'll scrape the data from the page, recording the fastest transit time. 
- We'll save this into a database, in this case Firebase realtime database is one of the fastest to setup. 
- We'll run this job in Google Cloud Platform, given its generous free tier. We'll use the new Cloud Run Jobs functionality and couple that with Cloud Scheduler to run the job when we want. 
- We'll use the excellent Recharts library to graph the results, because Excel is… Excel.