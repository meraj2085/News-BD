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

//========================================//======================================//

const loadNews = async () =>{
     const url = `https://openapi.programming-hero.com/api/news/category/01`
     const res = await fetch(url);
     const data = await res.json();
     displayNews(data.data)
}

const displayNews = (newses) =>{
     const newsContainer = document.getElementById('news-card-container');
     newses.forEach(news => {
          const {author, thumbnail_url, image_url, details, title} = news;

          console.log(news)
          const cardCol = document.createElement('div');
          cardCol.classList.add('col');
          cardCol.innerHTML = `
          <div class="card h-100">
          <img src="${image_url}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details.length > 100 ? details.slice(0,100) + '...' : details}</p>
          </div>
          </div>
          `
          newsContainer.appendChild(cardCol);
     });
}

loadNews()