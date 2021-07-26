var date = document.getElementById('date');
date.innerHTML = new Date().toLocaleDateString();

var content = document.querySelector('body');
var darkMode = document.getElementById('dark-change');
darkMode.addEventListener('click', function(){
    darkMode.classList.toggle('active');
    content.classList.toggle('night');
})

const loading = document.querySelector('.loading');

let orgPosts = [];
let newsArr = [];
let randomData = [];
let ran = [];
let lastItem = [];
getPost();


window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	// console.log( { scrollTop, scrollHeight, clientHeight });
	if(clientHeight + scrollTop >= scrollHeight - 10) {
		showLoading();

	}
});



function showLoading() {
	loading.classList.add('show');
	setTimeout(getTopPosts, 1000);
    setTimeout(getTopPosts, 1000);
    
}

async function getPost() {
	const postResponse = await fetch(`https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=MtedJN6g0y3f0nsDVjCHieZLfUsHtYKH`);
	const postData = await postResponse.json();
    console.log(postData.results);
    orgPosts.push(postData);
    getTopPosts(postData);
   
    
    
   
}

function getTopPosts(topPosts){
    if (newsArr.length === 0){
        newsArr.push(topPosts.results[0], topPosts.results[1], topPosts.results[2]);
        createCards(newsArr)
    } else {
     randomData.push(orgPosts[0].results[getRandomNr(orgPosts[0].results.length)]);
     createCards(randomData);
    
}
}

function getRandomNr(length) {
    return Math.floor(Math.random() * length);
}


function createCards(nyData){
    let row = document.getElementById("cards");
    nyData.forEach((element) => { 
      
      let newsElement = `
      <div class="jumbotron " id="jumbo">
            <div class="row">
            <div class="col-lg-10">
                <div class="row">
                    <div class="col-lg-8">
                        <div class = news-img>
                        <img src="${element.multimedia[0].url}" class="img-fluid def-img" alt="news-img">
                        </div>
                    </div>
                    <div class="col-lg-4 titles">
                        <h3>${element.title}</h3>
                        <p>${element.abstract}</p>
                        <div class= last>
                        <div class = row>
                            <div class = "col-lg-8 col-md-8 abstract">
                                <p>${element.byline}</p>
                            </div>
                            <div class = "col-lg-4 col-md-4 lt view-post">
                                <a href=${element.url} target="_blank">View Post</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-2">
            <div class="share-btn-container">
                    <a href="https://www.facebook.com/sharer.php?u=${element.url}" class="facebook-btn" target="_blank">
                    <i class="fab fa-facebook"></i>
                    </a>
            
                    <a href="https://twitter.com/share?url=${element.url}&text=${element.title}" class="twitter-btn" target="_blank">
                    <i class="fab fa-twitter"></i>
                    </a>
            
                    <a href="https://pinterest.com/pin/create/bookmarklet/?media=${element.multimedia[0].url}&url=${element.url}&description=${element.title}" class="pinterest-btn" target="_blank">
                    <i class="fab fa-pinterest"></i>
                    </a>
            
                    <a href="https://www.linkedin.com/shareArticle?url=${element.url}&title=${element.title}" class="linkedin-btn" target="_blank">
                    <i class="fab fa-linkedin"></i>
                    </a>
            
                    <a href="https://wa.me/?text=${element.title} ${element.url}" class="whatsapp-btn" target="_blank">
                    <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
                    </div>
                    
                    
        </div>  
            
      </div>
        `;
      let temp = document.createElement("div");
      temp.innerHTML = newsElement;
      row.appendChild(temp);
    });
    document.getElementById("main-container").append(row);
    loading.classList.remove('show');
    randomData = [];
}