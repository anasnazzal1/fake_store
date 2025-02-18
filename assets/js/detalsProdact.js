const getdetais = async()=>{
    try {
        const urlprams = new URLSearchParams(window.location.search);
        const prams = urlprams.get('id');
        const {data} = await axios.get(`https://fakestoreapi.com/products/${prams}`)
  
        return data;
    }
    catch (error) {
        console.error("Error fetching product details:", error);
    }
   
}
const displayData = async ()=>{
    try {
        const d = await getdetais();
       
        if(d.id>0){
            const dataHtml = 
            `
             <div class = "ditals">
             <p>${d.id}</p>
             <h1>${d.title}</h1>
             <h2>${d.category}</h2>
             <p>${d.description}</p>
             <address>${d.price}</address>
             <img src="${d.image}" alt="${d.title}">
             <p>rate:${d.rating.rate}</p>
             <p>count: ${d.rating.count}</p>
     
     
             </div>
             `
     
       
     
         document.querySelector(".section-1").innerHTML = dataHtml;
        }
        else {
            console.log("eror")
        }
       
    }
    catch (error) {
        console.error("Error displaying product details:", error);
    }
    finally {
        document.querySelector(".loading").classList.add("d-none");
    }

    
}

displayData()