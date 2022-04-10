import * as d3 from 'd3'
import allpib from '../data/income_per_person_gdppercapita_ppp_inflation_adjusted.csv' 
import lifeEsper from '../data/life_expectancy_years.csv'
import population from '../data/population_total.csv' 
import "./index.css"


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

d3.select("body")
    .append("div")
    .attr('id', 'graph-stat-country')

//taille en fonction de la largeur de la fenêtre
let wDiv = document.querySelector("#graph-stat-country").offsetWidth
let hDiv = document.querySelector("#graph-stat-country").offsetHeight

const margin = { top: 50, right: 50, bottom: 50, left: 50 }
const width = wDiv - margin.left - margin.right
const height = hDiv - margin.top - margin.bottom

//svg 
const svg = d3.select("#graph-stat-country")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 100)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


//rectangle pour couleur de fond
svg.append("rect")
    //position
    .attr("x", 0)
    .attr("y", 0)
    //coins du rectangle
    .attr("height", height)
    .attr("width", width)
    .style("fill", "#151F30")

//dimensions de l'axe x
let maxPib = 0
allpib.forEach(pibByYear => {
    if (pibByYear[2021] > maxPib) {
        maxPib = pibByYear[2021]
    }
})
console.log("le pib par habitant le plus élevé est de : ", maxPib)

//dimensions de l'axe y
let maxLifeLength = 0
lifeEsper.forEach(lifeEsperByYear => {
    if (lifeEsperByYear[2021] > maxLifeLength) {
        maxLifeLength = lifeEsperByYear[2021]
    }
})
console.log("la plus longue espérence de vie est de : ", maxLifeLength, " ans ")

//max et min de population 
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
let x = d3.scaleSqrt()
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


//dessiner l'axe X
svg.append("g")
    //translation de l'axe pour le positionner au bon endroit, en l'occurence descendre le graphe de sa taille en y 
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .call(d3.axisBottom(x).tickSize(-height).tickFormat(d3.format('~s')))

//dessiner l'axe y
svg.append("g").call(d3.axisLeft(y)).call(d3.axisLeft(y).tickSize(-width))


//apparance des lignes
svg.selectAll(".tick line").attr("stroke", "white").attr("opacity", "0.3")

//description axe X 
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", wDiv / 2 + margin.left)
    .attr("y", height + margin.top)
    .text("Log du PIB par habitant [CHF]");

//description axe Y
svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top - height / 2 + 100)
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


d3.select("body").append("h3")
    .attr('id', 'separateur')
    .text("Let's give a look of l'espérance de vie sur une map choroplète...")


d3.select("body").append("Mapdiv")
    .attr("id", "map")

const Mapmargin = { top: 20, right: 20, bottom: 30, left: 50 }
const Mapwidth = 650 - Mapmargin.left - Mapmargin.right
const Mapheight = 500 - Mapmargin.top - Mapmargin.bottom

const Mapsvg = d3.select("#map")
    .append("svg")
    .attr("width", Mapwidth + Mapmargin.left + Mapmargin.right)
    .attr("height", Mapheight + Mapmargin.top + Mapmargin.bottom + 100)
    .append("g")
    .attr("transform", "translate(" + Mapmargin.left + "," + Mapmargin.top + ")")


//Optimisation des données
let listPays = []
lifeEsper.forEach(pays => {
    let paysD = {}
    paysD[pays['country']] = pays['2021']
    listPays.push(paysD)
})


//projection
let path = d3.geoPath()
let projection = d3.geoMercator()
    .center([0, 20])
    .scale(90)
    .translate([Mapwidth / 2, Mapheight / 2])


let data = new Map()
let thresholdScale = d3.scaleThreshold()
    .domain([50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100])
    .range(d3.schemeOranges[8])


//map
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (d) {
    Mapsvg.append('g')
        .selectAll('path')
        .data(d.features)
        .join("path")
        .attr("d", path.projection(projection))
        .attr("id", function (d) { return d.properties.name; })
        .attr("fill", function (d) {
            let number = 0;
            listPays.forEach(country => {
                if (typeof country[this.id] != "undefined") {
                    number = country[this.id]
                }
            })
            return thresholdScale(number);
        })
        .attr("class", function (d) { return "Country" })
        .style("opacity", 1)
        .on("mouseover", mouseOver)
        .on("mouseleave", mouseLeave)
})


//hover
let mouseOver = function (d) {
    d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", .5)
    d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1)
}

let mouseLeave = function (d) {
    d3.selectAll(".Country")
        .transition()
        .duration(200)
        .style("opacity", 1)
    d3.select(this)
        .transition()
        .duration(200)
        .style("stroke", "transparent")
}


//string en int
function strToInt(str) {
    let number
    let onlyNumber
    if (str.slice(-1) == 'M') {
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