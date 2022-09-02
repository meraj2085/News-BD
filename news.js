const loadCatagories = async () =>{
     url = `https://openapi.programming-hero.com/api/news/categories`;
     try{
          const res = await fetch(url);
          const data = await res.json()
          displayData(data.data.news_category)
     }
     catch(error){
          console.log(error);
     }
}

const displayData = (catagories) =>{
     const catagoriesContainer = document.getElementById('catagories-container');
     catagories.forEach(category => {
          const categoryList = document.createElement('h5');
          categoryList.innerHTML = `${category.category_name}`
          catagoriesContainer.appendChild(categoryList)
     });
}

loadCatagories()