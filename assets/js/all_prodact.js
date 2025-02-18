
const getData = async(page)=>{
    try {
      

        let skip=(page-1)*10;
        const urlprams = new URLSearchParams(window.location.search);
       
        const catgry = urlprams.get('category');
     
        const {data} = await axios.get(`https://dummyjson.com/products?limit=10&&skip=${skip}`);
      
      return data
        
    }
    catch (error) {
        console.error(error);
    }
    
}



const  displayProdact  = async (page=1 )=>{
    try {
        const data = await getData(page);
      
        const pageNumber = Math.ceil(data.total/10);
       const products = data.products;
    
        if(products.length>=1){
            const dataHtml =   products.map((e)=>{
                return `
                       <div class="prodact">
                                
                                <div class="image">
                                    <img src="${e.images[0]}"class="img-proda"/>
                                </div>
                                <p>${e.title}</p>
                        
                                
                       </div>
                
                `
               }).join(" ");
            //   document.querySelector(".main ").innerHTML = `<h1>${data[0].category}</h1>`
             
               document.querySelector('.main .pp').innerHTML = dataHtml;
               custom()
             

               let linkPagination =``;
               if(page>1){
                linkPagination = ` <li><button onclick="displayProdact(${parseInt(page)-1})" class="button">&lt;</button></li>`;
               
               }
               else {
                linkPagination = ` <li><button disabled>&lt;</button></li>`;
               }
               
               for(let i=page;i<=pageNumber&&i<=page+4;i++){
                linkPagination+=`<li><button onclick="displayProdact(${i})" class="button">${i}</button></li>`
               }
            
              console.log(page+"page is")
        if(page <pageNumber)
               linkPagination+=`<li><button onclick="displayProdact(${parseInt(page)+1})" class="button">&gt;</button></li>`
            else
            linkPagination+=`<li><button disabled >&gt;</button></li>`;
             
               document.querySelector(".pagination ul").innerHTML = linkPagination;
           const buttons = Array.from(document.querySelectorAll(".pagination button"));
           buttons.forEach(btn => btn.classList.remove("active")); // إزالة active من جميع الأزرار
           const activeButton = buttons.find(btn => btn.innerText == page);
           console.log(buttons[1].innerHTML)
           if (activeButton) {
               activeButton.classList.add("active"); // إضافة active للزر الصحيح
           }
            
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

  displayProdact();

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
          
            if(current_index<0){
                current_index=image.length-1;
            }
            
            modal.querySelector(".modal img").setAttribute("src",image[current_index].src);
            console.log(current_index)

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
   
