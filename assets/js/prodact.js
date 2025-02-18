
const getData = async()=>{
    try {
        const urlprams = new URLSearchParams(window.location.search);
       
        const catgry = urlprams.get('category');
     
        const {data} = await axios.get(`https://fakestoreapi.com/products/category/${catgry}`);
      

        return data;
    }
    catch (error) {
        console.error(error);
    }
    
}



const  displayProdact  = async ()=>{
    try {
        const data = await getData();
        if(data.length>=1){
            const dataHtml =   data.map((e)=>{
                return `
                       <div class="prodact">
                                
                                <div class="image">
                                    <img src="${e.image}"class="img-proda"/>
                                </div>
                                <p>${e.title}</p>
                        
                                <a href="/detalsProdact.html?id=${e.id}">details</a>
                       </div>
                
                `
               }).join(" ");
            //   document.querySelector(".main ").innerHTML = `<h1>${data[0].category}</h1>`
             
               document.querySelector('.main .pp').innerHTML = dataHtml;
               custom()
               
        }
        else {
            console.error("not found");
        }
    }
    catch (error) {
        console.error(error);
    }
    finally {
        document.querySelector(".loading").classList.add("d-none");
    }
    
   
  
}

 await displayProdact();

function  custom(){
    const modal = document.querySelector(".modal");
    const rightBtn = document.querySelector(".right-btn");
    const leftBtn = document.querySelector(".left-btn");
    const closeBtn = document.querySelector(".close-btn");
    const image = Array.from(document.querySelectorAll(".img-proda"));
    let current_index=0;

    image.forEach(el => {
        el.addEventListener("click", (e) => 
            {
                modal.classList.remove("d-none")
                modal.querySelector(".modal img").setAttribute("src",e.target.src);
                current_index = image.indexOf(e.target);
            });
            
           
           
           
        });
        closeBtn.addEventListener("click", (e) =>{
            modal.classList.add("d-none")
        });
        rightBtn.addEventListener("click", (e) => {
            current_index++;
          
            if(current_index >= image.length){
                current_index=0;
            }
            
            modal.querySelector(".modal img").setAttribute("src",image[current_index].src);
            console.log(current_index)

        });
        leftBtn.addEventListener("click", (e) => {
            current_index--;
          
            if(current_index<0>0){
                current_index=image.length-1;
            }
            
            modal.querySelector(".modal img").setAttribute("src",image[current_index].src);
         

        });
        document.addEventListener("keydown",(e) => {
            console.log(e)
            if(e.key=="ArrowRight"){
                rightBtn.click();
            }
            else if(e.key=="ArrowLeft"){
                leftBtn.click();
            }
            else if(e.key=="Escape"){
                closeBtn.click();
            }
          

        });
    }
   
