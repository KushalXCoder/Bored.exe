import puppeteer from 'puppeteer'

const getNews = async() => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://timesofindia.indiatimes.com/briefs');

    const news = await page.evaluate(() => {
        const news = [];
        const newsElements = document.querySelectorAll('.brief_box ');
        newsElements.forEach((element) => {
            const titleElement = element.querySelector('h2');
            const contentElement = element.querySelector('p');
            const imageElement = element.querySelector('.posrel img');
            
            const title = titleElement ? titleElement.innerText : 'No title';
            const content = contentElement ? contentElement.innerText : 'No content';
            const image = imageElement 
            ? (imageElement.getAttribute('data-src') || imageElement.getAttribute('src')) 
            : 'No image';

            news.push({title, content, image});
        })
        return news;
    })

    await browser.close();

    return news;
}

export default getNews;