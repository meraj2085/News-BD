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
          const cardDiv = document.createElement('div');
          cardDiv.classList.add('col');
          cardDiv.innerHTML = `
          <div class="card mb-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p style="color: #000000dd;" class="card-text">${details.length > 200 ? details.slice(0,200) + '...' : details}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
          </div>
          `
          newsContainer.appendChild(cardDiv)
     });
}

loadNews()