import jsdom from "jsdom";
import fetch from "isomorphic-fetch"
import puppeteer from "puppeteer"

// //EX 1 - WEBSCRAP CANTONS WIKIPEDIA
// (async () => {
//        // simuler un browser
//     const browser = await puppeteer.launch({
//         defaultViewport: {width: 1920, height: 1720}
//     });
//       // ouvrir une nouvelle page
//     const page = await browser.newPage();
//     await page.goto('https://fr.wikipedia.org/wiki/Canton_(Suisse)#Données_cantonales');
//     await page.screenshot({ path: 'img/wiki.png' });
  
//     await browser.close();
//   })();

// //EX 2 - FETCH  DONNEES WIKIPEDIA 
// (async () => {
//     const url = 'https://fr.wikipedia.org/wiki/Canton_(Suisse)';
//     const browser = await puppeteer.launch();

//     // Creating an object to store the data
//     function Canton(canton, population) {
//         this.canton = canton;
//         this.population = population;
//     }
  
//     try {
//         const page = await browser.newPage();
//         await page.goto(url);
  
//         const rawData = await page.$$eval('table tr', rows => {
//             return Array.from(rows, row => {
//                 const cols = row.querySelectorAll('td');
//                 return Array.from(cols, col => col.innerText);
//             });
//         });

//         // tableaux
//         let result = [];
//         for (let i = 2; i < 28; i++) {
//             result.push(new Canton(rawData[i][0],rawData[i][3]));
//         }

//         for (let i = 0; i < 26; i++) {
//             let string = result[i].canton;
//             if (string.includes('\n')) {
//                 result[i].canton = string.slice(0, string.indexOf('\n'));
//             }

//             result[i].population = result[i].population.replaceAll(/\s/g,'');
//             result[i].population = parseInt(result[i].population)
//         }
//         console.table(result);

//     } catch (error) {
//         console.log('error', error);
//     }
// })();


//EX3 WEBSCRAP SITE E-COMMERCE 
(async () => {
    
    const star = String.fromCharCode(9733);
    const url = 'https://www.webscraper.io/test-sites/e-commerce/allinone/computers/laptops';
    const browser = await puppeteer.launch();
  
    try {
        const page = await browser.newPage();
        await page.goto(url);

        let productList = [];

        let div = await page.$$('div.thumbnail')

        for (let el of div) {
            let product = await el.$eval('.title', el => el.textContent);
            let price = await el.$eval('.price', el => el.textContent);
            let nbEtoiles = await el.$eval('.ratings :nth-child(2)', el => el.getAttribute( 'data-rating' ));
            nbEtoiles = parseInt(nbEtoiles);
            // ajouter des étoiles pour les notes
            let etoiles = '';
            for (let i = 0; i < 5; i++) {
                if (i < 4 && i < nbEtoiles && i > 0) {
                    etoiles += ' ';
                }
                if (i < nbEtoiles) {
                    etoiles += star;
                } else {
                    etoiles += String.fromCharCode(32) + String.fromCharCode(32);
                }
            }
            
            let productComplete = {
                produit: product,
                prix: price,
                etoiles: etoiles
            }

            productList.push(productComplete);
        }

        console.table(productList);
        
    } catch (error) {
      console.log('error', error);
    }
})();
