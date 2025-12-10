const firebaseConfig = {
      apiKey: "AIzaSyCbLKuJsZ9du9hHBTUU5gfzN0Jxe7EQiXE",
      authDomain: "live-cricket-47611.firebaseapp.com",
      databaseURL: "https://live-cricket-47611-default-rtdb.firebaseio.com",
      projectId: "live-cricket-47611",
      storageBucket: "live-cricket-47611.firebasestorage.app",
      messagingSenderId: "20357197788",
      appId: "1:20357197788:web:e62f1d7d59b0129446e919",
      measurementId: "G-R0P9EJ1KDJ"
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let allpost = document.querySelector(".items-head");

//on page function
function oneValue(){
  const addminTitle = location.href.replace(/[/]/g, '');
  const herf = addminTitle.replace(/\./g, "");
  db.ref('News/' + herf).on('value', function(snapshot){
    var posts = snapshot.val();
    

    allpost.innerHTML = '';
  
    //posts list
    allpost.innerHTML += `
                  <a href="https://my-sports.live/News/"><img id="back-icone"; src="./back.webp" alt=""></a>
                  <div class="post-news postViwe">
                    <input type="text" id="" hidden>
                    <div class="profile">
                        <div class="profile1">
                            <img src="../img/icon2.png" alt="">
                            <div class="title">
                                <span>MY Sports</span>
                                <span>${posts.NewsDate}</span>
                            </div>
                        </div>
                        <input type="text" value="${posts.NewsTitle}" hidden />
                        <div class="title2">${posts.NewsTitle}</div>
                    </div>

                    <div class="border"></div>

                    <div class="newsPost">
                        <div class="newsIMG">
                            <iframe src="${posts.Newslink}" frameborder="0"></iframe>
                        </div>
                        <div class="newsDescription">
                            <span class="newsDes">${posts.NewsDescription}</span>
                        </div>
                    </div>
                    <div class="share"><img src="../img/share.png" alt=""></div>
                </div>`;

              document.querySelector('.share img').addEventListener('click', function() {
                const shareUrl = encodeURIComponent(location.href);
                const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                window.open(facebookShareUrl,'width=600,height=400');
              });
    
    })
}

//home page function

function homePage() {
  db.ref('News/').on('value', function (snapshot) {
    const posts = snapshot.val();
    allpost.innerHTML = '';

    if (!posts) return;

    // Convert object to array and sort by date (latest first)
    const postArray = Object.entries(posts).sort((a, b) => {
      const dateA = new Date(a[1].NewsDate);
      const dateB = new Date(b[1].NewsDate);
      return dateB - dateA; // newest first
    });

    postArray.forEach(([key, post]) => {
      const postHTML = `
        <div class="post-news" data-id="${post.NewsTitleE}">
          <div class="profile">
            <div class="profile1">
              <img src="../img/icon2.png" alt="">
              <div class="title">
                <span>MY Sports</span>
                <span>${post.NewsDate}</span>
              </div>
            </div>
            <div class="title2">${post.NewsTitle}</div>
          </div>

          <div class="border"></div>

          <div class="newsPost">
            <div class="newsIMG">
              <iframe src="${post.Newslink}" frameborder="0"></iframe>
            </div>
            <div class="newsDescription">
              <span class="newsDes">${post.NewsDescription}</span>
            </div>
          </div>
        </div>
      `;

      allpost.innerHTML += postHTML;
    });

    // Add click event to all posts
    document.querySelectorAll(".post-news").forEach(el => {
      el.addEventListener("click", function () {
        const postId = el.dataset.id;
        location.href = `${window.location.href}?/${postId}`;
      });
    });

  });
}




// function homePage() {
//   db.ref('News/').on('value', function(snapshot) {
//     const posts = snapshot.val();
//     allpost.innerHTML = '';

//     if (!posts) return;

//     // Convert object to array and reverse (latest first)
//     const postArray = Object.entries(posts).reverse();

//     postArray.forEach(([key, post]) => {
//       const postHTML = `
//         <div class="post-news" data-id="${key}">
//           <input id="hiddenID" type="text" hidden value="${post.NewsTitleE}">
//           <div class="profile">
//             <div class="profile1">
//               <img src="../img/icon2.png" alt="">
//               <div class="title">
//                 <span>MY Sports</span>
//                 <span>${post.NewsDate}</span>
//               </div>
//             </div>
//             <div class="title2">${post.NewsTitle}</div>
//           </div>

//           <div class="border"></div>

//           <div class="newsPost">
//             <div class="newsIMG">
//               <iframe src="${post.Newslink}" frameborder="0"></iframe>
//             </div>
//             <div class="newsDescription">
//               <span class="newsDes">${post.NewsDescription}</span>
//             </div>
//           </div>
//         </div>
//       `;

//       allpost.innerHTML += postHTML;
//     });

//     // Add click event once after all posts are rendered
//     document.querySelectorAll(".post-news").forEach(e => {
//       e.addEventListener("click", function() {
//         const postId = e.querySelector("#hiddenID").value;
//         location.href = window.location.href + "?/" + postId;
//       });
//     });
//   });
// }

//condition
let herf = location.href;
if(herf !== 'https://my-sports.live/News/'){
  oneValue()
}else{
  homePage()
}

function clickFunktion(){
  document.querySelector("span.logo").addEventListener('click', function(){
    window.location.href = "https://my-sports.live/News";
  });
  document.querySelector("span.liveNews").addEventListener('click', function(){
    window.location.href = "https://my-sports.live/News";
  });
  document.querySelector("span.liveMatch").addEventListener('click', function(){
    window.open("https://my-sports.live");
  });

}clickFunktion();







