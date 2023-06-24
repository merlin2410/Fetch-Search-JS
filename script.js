let resultData = [];
let currentResult = [];

/* Fetching using .then */
/* This is commented out */

/*
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
.then(res=> res.json())
.then((data)=>{

    let results = [];

    for(let i in data){
        
        let coin = {
            id: data[i].id,
            name: data[i].name,
            image: data[i].image,
            symbol: data[i].symbol,
            currentPrice: data[i].current_price,
            totalVolume: data[i].total_volume,
            marketCap: data[i].market_cap,
            percentage: data[i].price_change_percentage_24h


        }
        results.push(coin);    
        
    }
    resultData = results;
    addToTable(results)
    console.log(results);
    
}).catch((error)=>{
    console.log("Error is",error)
});

*/

/* Fetching using async await */
 async function fetchData(){
    let resultSet = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    let data = await resultSet.json();
    let results = [];

    for(let i in data){
        
        let coin = {
            id: data[i].id,
            name: data[i].name,
            image: data[i].image,
            symbol: data[i].symbol,
            currentPrice: data[i].current_price,
            totalVolume: data[i].total_volume,
            marketCap: data[i].market_cap,
            percentage: data[i].price_change_percentage_24h


        }
        results.push(coin);    
        
    }
    console.log(results)
    resultData = results;
    addToTable(results);
    
 }

 //Calling the fetchData function
 fetchData();


/* This function is used to add data to the table */
let addToTable = function(results){
    
    currentResult = results;
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML='';
    let i=0;
    for(let coin of results){
        
        let row = document.createElement("tr");
        
        row.innerHTML = `
        <td class="logo"><img src="${coin.image}"></td>
        <td>${coin.name}</td>
        <td>${coin.symbol.toUpperCase()}</td>
        <td>$${coin.currentPrice}</td>
        <td>$${coin.totalVolume}</td>
        <td class="percent">${coin.percentage}%</td>
        <td>Mkt Cap: $${coin.marketCap}</td>
      `;

        
        tableBody.appendChild(row);
        if(coin.percentage<0){
            document.getElementsByClassName("percent")[i].style="color:red";
        }
        else{
            document.getElementsByClassName("percent")[i].style="color:green";
        } 
        i++;
    }  
     
}



/* This function is used to search the table using name or symbol and returns the resultant array  */
let search = function(searchedString){
    let filteredResults = [];
    searchedString = searchedString.toLowerCase();
    if(searchedString.length==0){
        return resultData;
    }
    for(let coin of resultData){
        if(coin.name.toLowerCase().includes(searchedString) || coin.symbol.toLowerCase().includes(searchedString)){
            filteredResults.push(coin);
        }
    }
    return filteredResults;
}

// Search by name or symbol
const searchField = document.getElementById("search-field");
searchField.addEventListener("input",(e)=>{
    let searchedValue = e.target.value;
    
    let filteredResults = search(searchedValue);
    
    addToTable(filteredResults);
    
});


/* Sorting the data available according to market cap in ascending order */
const sortMarketCap = document.getElementById("sort-mkt");
sortMarketCap.addEventListener("click",(e)=>{
    currentResult.sort((a,b)=>{
        return a.marketCap-b.marketCap;
    });
    addToTable(currentResult);
});


/* Sorting the data available according to percentage in ascending order */
const sortPercent = document.getElementById("sort-percent");
sortPercent.addEventListener("click",(e)=>{
    currentResult.sort((a,b)=>{
        return a.percentage-b.percentage;
    });
    addToTable(currentResult);
});

