import * as d3 from 'd3'
import allpib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import lifeEsper from '../data/life_expectancy_years.csv'
import "./index.css"
import gdp from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv'
import lifeExpectancy from '../data/life_expectancy_years.csv'
import population from '../data/population_total.csv'

// //data du nbPopulation de 2021

// population.forEach(pays => {
//     (Object.keys(pays)).forEach(key => {
//         if (typeof pays[key] == 'string' && key !== 'country') {
//             pays[key] = strToInt(pays[key])
//         }
//     })
// })

// //data du PIB de 2021
// let nbPib
// allpib.forEach(pays => {
//     if (typeof pays[2021] == 'string') {
//         nbPib = strToInt(pays[2021])
//         pays[2021] = nbPib
//     }
// })

// //data les plus récentes 
// lifeEsper.forEach(pays => {
//     if (pays[2021] == null) {
//         let i = 2021
//         do {
//             i--
//         } while (pays[i] == null);
//         console.log('en année ', i, 'le pib de', pays['country'], 'était de', pays[i])
//         pays[2021] = pays[i]
//     }
// })

// d3.select("body")
//     .append("div")
//     .attr('id', 'graph-stat-country')

// //taille en fonction de la largeur de la fenêtre
// let wDiv = document.querySelector("#graph-stat-country").offsetWidth
// let hDiv = document.querySelector("#graph-stat-country").offsetHeight

// const margin = { top: 50, right: 50, bottom: 50, left: 50 }
// const width = wDiv - margin.left - margin.right
// const height = hDiv - margin.top - margin.bottom

// //svg 
// const svg = d3.select("#graph-stat-country")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom + 100)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


// //rectangle pour couleur de fond
// svg.append("rect")
//     //position
//     .attr("x", 0)
//     .attr("y", 0)
//     //coins du rectangle
//     .attr("height", height)
//     .attr("width", width)
//     .style("fill", "#151F30")

// //dimensions de l'axe x
// let maxPib = 0
// allpib.forEach(pibByYear => {
//     if (pibByYear[2021] > maxPib) {
//         maxPib = pibByYear[2021]
//     }
// })
// console.log("le pib par habitant le plus élevé est de : ", maxPib)

// //dimensions de l'axe y
// let maxLifeLength = 0
// lifeEsper.forEach(lifeEsperByYear => {
//     if (lifeEsperByYear[2021] > maxLifeLength) {
//         maxLifeLength = lifeEsperByYear[2021]
//     }
// })
// console.log("la plus longue espérence de vie est de : ", maxLifeLength, " ans ")

// //max et min de population 
// let maxPop = 0
// let minPop = 0
// population.forEach(pays => {
//     if (pays[2021] > maxPop) {
//         maxPop = pays[2021]
//     }
//     if (population[0] == pays) {
//         minPop = pays[2021]
//     } else if (pays[2021] < minPop) {
//         minPop = pays[2021]
//     }
// })
// console.log("Le plus grand nombre de personne réunit dans un pays en 2021 est de :", maxPop, "personnes")
// console.log("Le plus petit nombre de personne réunit dans un pays en 2021 est de :", minPop, "personnes")


// //échelle de l'axe x
// let x = d3.scaleSqrt()
//     .domain([0, maxPib * 1.05])
//     .range([0, width])
//     .nice()

// //échelle pour l'axe y
// let y = d3.scalePow()
//     .exponent(1.7)
//     .domain([0, maxLifeLength * 1.05])
//     .range([height, 0])
//     .nice()

// //taille des cercles
// let sqrtScale = d3.scaleSqrt()
//     .domain([minPop, maxPop])
//     .range([5, 20]);


// //dessiner l'axe X
// svg.append("g")
//     //translation de l'axe pour le positionner au bon endroit, en l'occurence descendre le graphe de sa taille en y 
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .call(d3.axisBottom(x).tickSize(-height).tickFormat(d3.format('~s')))

// //dessiner l'axe y
// svg.append("g").call(d3.axisLeft(y)).call(d3.axisLeft(y).tickSize(-width))


// //apparance des lignes
// svg.selectAll(".tick line").attr("stroke", "white").attr("opacity", "0.3")

// //description axe X 
// svg.append("text")
//     .attr("text-anchor", "end")
//     .attr("x", wDiv / 2 + margin.left)
//     .attr("y", height + margin.top)
//     .text("Log du PIB par habitant [CHF]");

// //description axe Y
// svg.append("text")
//     .attr("text-anchor", "end")
//     .attr("transform", "rotate(-90)")
//     .attr("y", -margin.left + 20)
//     .attr("x", -margin.top - height / 2 + 100)
//     .text("Espérance de vie")


// //cercles
// svg.append('g')
//     .selectAll("dot")
//     .data(allpib)
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) { return x(d[2021]) })
//     .data(lifeEsper)
//     .join()
//     .attr("cy", function (d) { return y(d[2021]) })
//     .data(population)
//     .join()
//     .attr("r", function (d) { return sqrtScale(d[2021]) })
//     .style("fill", "#FF7A48")
//     .attr("opacity", "0.7")
//     .attr("stroke", "black")


// d3.select("body").append("h3")
//     .attr('id', 'separateur')
//     .text("Let's give a look of l'espérance de vie sur une map choroplète...")


// d3.select("body").append("Mapdiv")
//     .attr("id", "map")

// const Mapmargin = { top: 20, right: 20, bottom: 30, left: 50 }
// const Mapwidth = 650 - Mapmargin.left - Mapmargin.right
// const Mapheight = 500 - Mapmargin.top - Mapmargin.bottom

// const Mapsvg = d3.select("#map")
//     .append("svg")
//     .attr("width", Mapwidth + Mapmargin.left + Mapmargin.right)
//     .attr("height", Mapheight + Mapmargin.top + Mapmargin.bottom + 100)
//     .append("g")
//     .attr("transform", "translate(" + Mapmargin.left + "," + Mapmargin.top + ")")


// //Optimisation des données
// let listPays = []
// lifeEsper.forEach(pays => {
//     let paysD = {}
//     paysD[pays['country']] = pays['2021']
//     listPays.push(paysD)
// })


// //projection
// let path = d3.geoPath()
// let projection = d3.geoMercator()
//     .center([0, 20])
//     .scale(90)
//     .translate([Mapwidth / 2, Mapheight / 2])


// let data = new Map()
// let thresholdScale = d3.scaleThreshold()
//     .domain([50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100])
//     .range(d3.schemeOranges[8])


// //map
// d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (d) {
//     Mapsvg.append('g')
//         .selectAll('path')
//         .data(d.features)
//         .join("path")
//         .attr("d", path.projection(projection))
//         .attr("id", function (d) { return d.properties.name; })
//         .attr("fill", function (d) {
//             let number = 0;
//             listPays.forEach(country => {
//                 if (typeof country[this.id] != "undefined") {
//                     number = country[this.id]
//                 }
//             })
//             return thresholdScale(number);
//         })
//         .attr("class", function (d) { return "Country" })
//         .style("opacity", 1)
//         .on("mouseover", mouseOver)
//         .on("mouseleave", mouseLeave)
// })


// //hover
// let mouseOver = function (d) {
//     d3.selectAll(".Country")
//         .transition()
//         .duration(200)
//         .style("opacity", .5)
//     d3.select(this)
//         .transition()
//         .duration(200)
//         .style("opacity", 1)
// }

// let mouseLeave = function (d) {
//     d3.selectAll(".Country")
//         .transition()
//         .duration(200)
//         .style("opacity", 1)
//     d3.select(this)
//         .transition()
//         .duration(200)
//         .style("stroke", "transparent")
// }


// //string en int
// function strToInt(str) {
//     let number
//     let onlyNumber
//     if (str.slice(-1) == 'M') {
//         onlyNumber = str.substring(0, str.length - 1)
//         number = Number(onlyNumber)
//         number = number * 1000000
//     } else if (str.slice(-1) == 'K' || str.slice(-1) == 'k') {
//         onlyNumber = str.substring(0, str.length - 1)
//         number = Number(onlyNumber)
//         number = number * 1000
//     }
//     return number
// }


//années
const annees = Object.keys(population[0])

// console.log(annees)

let pop = [],
    income = [],
    life = [],
    dataCombined = [];

// Merge data
const mergeByCountry = (a1, a2, a3) => {
    let data = [];
    a1.map(itm => {
        let newObject = {
            ...a2.find((item) => (item.country === itm.country) && item),
            ...a3.find((item) => (item.country === itm.country) && item),
            ...itm
        }
        data.push(newObject);
    })
    return data;
}

annees.forEach(annee => {
    pop.push({ "annee": annee, "data": converterSI(population, annee, "pop") })
    income.push({ "annee": annee, "data": converterSI(gdp, annee, "income") })
    life.push({ "annee": annee, "data": converterSI(lifeExpectancy, annee, "life") })
    const popAnnee = pop.filter(d => d.annee == annee).map(d => d.data)[0];
    const incomeAnnee = income.filter(d => d.annee == annee).map(d => d.data)[0];
    const lifeAnnee = life.filter(d => d.annee == annee).map(d => d.data)[0];
    dataCombined.push({ "annee": annee, "data": mergeByCountry(popAnnee, incomeAnnee, lifeAnnee) })
});

function converterSI(array, variable, variableName) {
    let convertedVariable = array.map(d => {
        //format SI (M, B, k)
        let SI = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? d[variable.toString()].slice(-1) : d[variable.toString()];
        //partie numérique
        let number = typeof d[variable.toString()] === 'string' || d[variable.toString()] instanceof String ? parseFloat(d[variable.toString()].slice(0, -1)) : d[variable.toString()];
        //valeur SI
        switch (SI) {
            case 'M': {
                return { "country": d.country, [variableName]: Math.pow(10, 6) * number };
                break;
            }
            case 'B': {
                return { "country": d.country, [variableName]: Math.pow(10, 9) * number };
                break;
            }
            case 'k': {
                return { "country": d.country, [variableName]: Math.pow(10, 3) * number };
                break;
            }
            default: {
                return { "country": d.country, [variableName]: number };
                break;
            }
        }
    })
    return convertedVariable;
};

// chaque année

dataCombined.forEach(annee => {
    annee.data.forEach(pays => {
        if (isUnknow(pays.pop) || isUnknow(pays.life) || isUnknow(pays.income)) {
            pays.pop = undefined;
            pays.life = undefined;
            pays.income = undefined;
        }
    })
});

function isUnknow(elm) {
    if (isNaN(elm) || elm == null || elm == undefined) {
        return true;
    }
}

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// axe X 
let theBiggestGDP = 0;
dataCombined.forEach(annee => {
    annee.data.forEach(pays => {
        if (pays.income >= theBiggestGDP) {
            theBiggestGDP = pays.income;
        }
    })
});

let x = d3.scaleSqrt()
    .domain([0, theBiggestGDP])
    .range([0, width]);
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

//axe Y
let theBiggestLifeExp = 0;
dataCombined.forEach(annee => {
    annee.data.forEach(pays => {
        if (pays.life >= theBiggestLifeExp) {
            theBiggestLifeExp = pays.life;
        }
    })
});

let y = d3.scalePow()
    .exponent(1.25)
    .domain([0, theBiggestLifeExp * 1.1])
    .range([height, 0]);
svg.append("g")
    .call(d3.axisLeft(y));

//Bulle
let z = d3.scaleLinear()
    .domain([200000, 1310000000])
    .range([5, 60]);

//id intervalle
let nIntervId;

function animate() {
    if (!nIntervId) {
        nIntervId = setInterval(play, 100);
    }
    console.log(nIntervId);
}

d3.select('body').append('h1').attr('id', 'anneeCourante')

let i = -1;
function play() {
    if (i == 250) {
        i = 0;
    } else {
        i++;
    }

    d3.select('#anneeCourante').text(dataCombined[i].annee)
    updateChart(dataCombined[i]);
}

//pause
function stop() {
    clearInterval(nIntervId);
    nIntervId = null;
}

//mise à jour du graphique
function updateChart(data_iteration) {
    svg.selectAll('circle')
        .data(data_iteration.data)
        .join(enter => enter.append('circle')
            .attr("stroke", "black")
            .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}70`)
            .attr('cx', function (d) { return x(d.income); })
            .attr('cy', function (d) { return y(d.life); }).transition(d3.transition()
                .duration(500)
                .ease(d3.easeLinear)).attr('r', function (d) { return z(d.pop); }),
            update => update.transition(d3.transition()
                .duration(500)
                .ease(d3.easeLinear))
                .attr('r', function (d) { return z(d.pop); })
                .attr('cx', function (d) { return x(d.income); })
                .attr('cy', function (d) { return y(d.life); }),
            exit => exit.remove())
}

animate();