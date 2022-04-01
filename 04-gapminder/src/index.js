import * as d3 from 'd3'
import allpib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv' //PIB par habitant par pays et pour chaque année depuis 1800
import lifeEsper from '../data/life_expectancy_years.csv' //espérance de vie par pays et pour chaque année depuis 1800
import population from '../data/population_total.csv' //population depuis 1800 par pays 

//data du nbPopulation de 2021

population.forEach(pays => {
    (Object.keys(pays)).forEach(key => {
        if (typeof pays[key] == 'string' && key !== 'country') {
            pays[key] = strToInt(pays[key])
        }
    })
})

//data du PIB de 2021
let nbPib
allpib.forEach(pays => {
    if (typeof pays[2021] == 'string') {
        nbPib = strToInt(pays[2021])
        pays[2021] = nbPib
    }
})

//data les plus récentes
lifeEsper.forEach(pays => {
    if (pays[2021] == null) {
        let i = 2021
        do {
            i--
        } while (pays[i] == null);
        console.log('en année ', i, 'le pib de', pays['country'], 'était de', pays[i])
        pays[2021] = pays[i]
    }
})


const margin = { top: 10, right: 20, bottom: 30, left: 50 }
const width = 1500 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom


d3.select("body")
    .append("div")
    .attr('id', 'graph-stat-country')

const svg = d3.select("#graph-stat-country")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 200)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("height", height)
    .attr("width", width)
    .style("fill", "#151F30")

//axe x
let maxPib = 0
allpib.forEach(pibByYear => {
    if (pibByYear[2021] > maxPib) {
        maxPib = pibByYear[2021]
    }
})
console.log("le pib par habitant le plus élevé est de : ", maxPib)

//axe y
let maxLifeLength = 0
lifeEsper.forEach(lifeEsperByYear => {
    if (lifeEsperByYear[2021] > maxLifeLength) {
        maxLifeLength = lifeEsperByYear[2021]
    }
})
console.log("la plus longue espérence de vie est de : ", maxLifeLength, " ans ")

//définir le max et le min de population dans un pays en 2021
let maxPop = 0
let minPop = 0
population.forEach(pays => {
    if (pays[2021] > maxPop) {
        maxPop = pays[2021]
    }
    if (population[0] == pays) {
        minPop = pays[2021]
    } else if (pays[2021] < minPop) {
        minPop = pays[2021]
    }
})
console.log("Le plus grand nombre de personne réunit dans un pays en 2021 est de :", maxPop, "personnes")
console.log("Le plus petit nombre de personne réunit dans un pays en 2021 est de :", minPop, "personnes")


//échelle de l'axe x
let x = d3.scaleLinear()
    .domain([0, maxPib * 1.05])
    .range([0, width])
    .nice()

//échelle pour l'axe y
let y = d3.scalePow()
    .exponent(1.7)
    .domain([0, maxLifeLength * 1.05])
    .range([height, 0])
    .nice()

//taille des cercles
let sqrtScale = d3.scaleSqrt()
    .domain([minPop, maxPop])
    .range([5, 20]);

//axe X selon l'échelle 
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .call(d3.axisBottom(x).tickSize(-height * 1.3).ticks(10))

//axe y selon l'échelle
svg.append("g").call(d3.axisLeft(y)).call(d3.axisLeft(y).tickSize(-width * 1.3).ticks(10))

//lignes
svg.selectAll(".tick line").attr("stroke", "white").attr("opacity", "0.3")

//description axe X 
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width / 2 + margin.left)
    .attr("y", height + margin.top + 30)
    .text("PIB par habitant [CHF]");

//description axe Y
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top - height / 2 + 20)
    .text("Espérance de vie")

//cercles
svg.append('g')
    .selectAll("dot")
    .data(allpib)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d[2021]) })
    .data(lifeEsper)
    .join()
    .attr("cy", function (d) { return y(d[2021]) })
    .data(population)
    .join()
    .attr("r", function (d) { return sqrtScale(d[2021]) })
    .style("fill", "#FF7A48")
    .attr("opacity", "0.7")
    .attr("stroke", "black")

//string en int
function strToInt(str) {
    let number
    let onlyNumber
    if (str.slice(-1) == 'M') {
        //enlever le dernier caractère, ici le M
        onlyNumber = str.substring(0, str.length - 1)
        number = Number(onlyNumber)
        number = number * 1000000
    } else if (str.slice(-1) == 'K' || str.slice(-1) == 'k') {
        onlyNumber = str.substring(0, str.length - 1)
        number = Number(onlyNumber)
        number = number * 1000
    }
    return number
}