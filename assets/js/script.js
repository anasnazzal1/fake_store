const getCatgry = async ()=> {
    // fetch data from the API
    try {
        const {data }= await axios.get("https://fakestoreapi.com/products/categories");
       
       return data
    }
    catch(error) {
        return [];
        console.error('Error:', error);
    }
   
   
}

const displayCatgry =async ()=>{
    try {
        const catgry = await getCatgry();
        if (catgry.length>=1){
            const catgryHtml = catgry.map((ca) => {
                const encodedCategory = encodeURIComponent(ca);  // Make sure the category is URL-safe
                return ` 
                    <a href="//prodact.html?category=${encodedCategory}">${ca}</a>
                `;
            }).join(' ');
            
        
        document.querySelector(".section-2 .top .butons").innerHTML = catgryHtml;
        document.querySelector(".header .sec-2 .categoris").innerHTML = catgryHtml
       
        }
        else {
            console.log("No categories found");
            document.querySelector(".section-2 .top .butons").innerHTML = "No categories found";
        }
        
    }
    catch(error) {
        console.error('Error:', error);
    }
    finally {
        document.querySelector(".loading").classList.add("d-none");
    }
   
}


const barButton = document.querySelector('.bar');
const linksBar = document.querySelector('.links-bar');
console.log(barButton)

barButton.addEventListener('click', () => {
    linksBar.classList.toggle('active'); // إضافة أو إزالة الـ active
});


displayCatgry();
