const loadCatagories = async () =>{
     url = `https://openapi.programming-hero.com/api/news/categories`;
     const res = await fetch(url);
     const data = await res.json()
     displayData(data.data.news_category)
}

const displayData = (catagories) =>{
     console.log(catagories)
}

loadCatagories()