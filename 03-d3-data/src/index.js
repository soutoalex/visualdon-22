import * as d3 from 'd3';
import { csv, json } from 'd3-fetch'

const body = d3.select("body");
const arrayUserPost = []

console.log("Test");
Promise.all([
  json('https://jsonplaceholder.typicode.com/users'),
  json('https://jsonplaceholder.typicode.com/posts')
])
.then(([users, posts]) =>  {
//     const tabUsers = new Array();
//   users.forEach((user, index, array) => {
//     let userposts = new Array()
//     posts.forEach(post => {
//         if (post.userId == user.id) userposts.push(post.title);
//     })

//     tabUsers.push({
//         nom_utilisateur: user.name,
//         ville: user.address.city,
//         nom_companie: user.company.name,
//         titres_posts: userposts
//     });
//   })
//   console.log(tabUsers);

// Création tableau utilisateurs avec leurs posts
for (let i = 0; i < users.length; i++) {
    let arrayCurrentUser = {};
    arrayCurrentUser["nom_utilisateur"] = users[i].username;
    arrayCurrentUser["ville"] = users[i].address.city;
    arrayCurrentUser["nom_companie"] = users[i].company.name;
    
    let userPosts = [];
    posts.forEach(post => {
        if (post.userId == users[i].id) {
            userPosts.push(post.title)
        }
    });
    arrayCurrentUser["posts"] = userPosts;

    arrayUserPost.push(arrayCurrentUser);
}

  // Calculer le nombre de posts par utilisateur
  users.forEach(user => {
    let cpt = 0

    posts.forEach(post => {
        // console.log(post.userId);
        if (post.userId == user.id) {
            cpt++;
        }
    })

    d3.select("body")
        .append("div")
        .attr('id', `div-user${user.id}`)
    d3.select(`#div-user${user.id}`)
        .append('p')
        .text(`${user.name} a écrit ${cpt} article(s).`)
});


// Trouvez l'utilisateur avec le plus long post
d3.select("body")
        .append("div")
        .append('p')

        let longestPost = ''
        let longestPostId = 0
        posts.forEach(post => {
            if (longestPost.length < post.body.length) {
                longestPost = post.body
                longestPostId = post.userId
            }
        })
        
        let userLongestPost = users[longestPostId-1].name

        d3.select("body")
            .append("div")
            .attr('id', 'longestPost')
            d3.select('#longestPost')
            .append('p')
            .text(`${userLongestPost} a écrit le plus long post`)


// Graphique bâton

var margin = {top: 20, right: 10, bottom: 60, left: 60};
var width = 1500 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

d3.select("body")
    .append("div")
    .attr('id', 'graph')
let svg = d3.select("#graph")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

let x = d3.scaleBand()
    .domain(arrayUserPost.map(function(d) { return d["nom_utilisateur"]; }))
    .range([ 1000, 0]);
    

let y = d3.scaleLinear()
    .domain(arrayUserPost.map(function(d) { return d["posts"].length; }))
    .range([ height, 0]);



svg.append("g")
    .call(d3.axisLeft(y));

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
.attr("transform", "translate(-2,10)")

svg.selectAll("bars")
    .data(arrayUserPost)
    .enter()
    .append("rect")
        .attr("x", function(d) { return x(d["nom_utilisateur"])+40; })
        .attr("y", function(d) { return y(d["posts"].length); })
        .attr("width", "20px")
        .attr("height", function(d) { return height - y(d["posts"].length); })
        .attr("fill", "#69b3a2")
});

