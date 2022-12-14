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
          const categoryList = document.createElement('div');
          categoryList.innerHTML = `
               <h5 onclick="loadNews('${category.category_id}'), spinner(true)">${category.category_name}</h5>
          `
          catagoriesContainer.appendChild(categoryList)
     });
}

loadCatagories()

//========================================//======================================//

const loadNews = async (id) =>{
     const url = `https://openapi.programming-hero.com/api/news/category/${id}`
     try{
          const res = await fetch(url);
          const data = await res.json();
          displayNews(data.data)
     }
     catch(error){
          console.log(error);
     }
}

const displayNews = (newses) =>{
     const resultContainer = document.getElementById('result-numbers');
     if(newses.length > 0){
          resultContainer.innerHTML = `
          <h5>${newses.length} items found for this category.</h5>
          `
     }
     else{
          resultContainer.innerHTML = `
          <h5>Sorry no news found</h5>
          `
     }

          const newsContainer = document.getElementById('news-card-container');
          newsContainer.textContent = '';

          newses.sort((a, b) => b.total_view - a.total_view)
          
          newses.forEach(news => {
               const {author,rating, thumbnail_url, image_url, details, title, total_view} = news;
               const {name, img, published_date} = author;

               const cardDiv = document.createElement('div');
               cardDiv.classList.add('col');
               cardDiv.innerHTML = `
               <div data-bs-toggle="modal" data-bs-target="#newsModal" onclick="loadDetails('${news._id}')" class="card mb-3" style="box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;">
               <div class="row g-0">
               <div class="col-md-4">
               <img id="lg-screes" src="${thumbnail_url}" class="img-fluid rounded-start" alt="...">
               <img id="md-screen" src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p style="color: #000000dd;" class="card-text">${details.length > 150 ? details.slice(0,150) + '...' : details}</p>
                <div class="d-flex justify-content-between mt-4">
                <div class="d-flex">
                <div class="me-2" style="width: 30px;">
                <img class="img-fluid rounded-circle" src="${img}" alt="">
                         </div>
                         <p class="mb-0">${name ? name : 'No data available'}</p>
                         </div>
               <div class="fs-6 d-flex">
               <p class="me-2"><i class="fa-sharp fa-solid fa-eye"></i></p>
               <p>${total_view ? total_view : 'No data available'}</p>
               </div>
               <div>
               <i onclick="loadDetails('${news._id}')" style="color: #5D5FEF; font-size: 25px; " class="fa-solid fa-arrow-right" data-bs-toggle="modal" data-bs-target="#newsModal"></i>
               </div>
               </div>
               </div>
            </div> 
            </div>
            </div>
            `
            newsContainer.appendChild(cardDiv)
          });
          spinner(false)
     }
     
     loadNews('08');

//========================================//======================================//

const spinner = (isLoading) =>{
     const toggleSpinner = document.getElementById('spinner');
     if(isLoading === true){
          toggleSpinner.classList.remove('d-none')
     }
     else{
          toggleSpinner.classList.add('d-none');
     }
}

//========================================//======================================//

const loadDetails = async(news_id) =>{
     const url = `https://openapi.programming-hero.com/api/news/${news_id}`
     try{
          const res = await fetch(url);
          const data = await res.json();
          displayDetails(data.data[0])
     }
     catch(error){
          console.log(error);
     }
}

const displayDetails = (newsDetails)=>{
     const {image_url, details, title, total_view, rating} = newsDetails;
     const modalBody = document.getElementById('modal-body-card');
     modalBody.innerHTML = `
     <div class="card">
     <img src="${image_url}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">${title}</h5>
       <h6 class="card-text"><i class="fa-solid fa-star"></i> ${rating.number ? rating.number : 'No data found'}</h6>
       <p class="card-text">${details}</p>
       </div>
       </div>
       `
}