import{a as u,S as y,i as c}from"./assets/vendor-Qob_5Ba8.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const f={BASE_URL:"/goit-js-hw-12/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},h=document.getElementById("search-form"),i=document.getElementById("gallery"),n=document.getElementById("load-more");let d=1;const v=40,m=void 0;console.log("API Key:",m);console.log(f);let p=0;h.addEventListener("submit",async s=>{s.preventDefault(),d=1,i.innerHTML="",n.style.display="none",await g()});n.addEventListener("click",async()=>{d++,await g();const s=document.createElement("div");s.className="loader",document.body.appendChild(s);const e=document.querySelector(".gallery-item").getBoundingClientRect().height*2;window.scrollBy({left:0,top:e*2,behavior:"smooth"}),s.remove()});async function g(){const s=document.getElementById("search").value,e=`https://pixabay.com/api/?key=${m}&q=${encodeURIComponent(s)}&image_type=photo&orientation=horizontal&safesearch=true&page=${d}&per_page=${v}`;try{i.innerHTML+='<div class="loader"></div>';const a=await(await u.get(e)).data;a.hits.length>0?(document.querySelector(".loader").remove(),p=a.totalHits,w(a.hits),new y("#gallery a").refresh(),i.children.length>=p?(n.style.display="none",c.info({message:"We're sorry, but you've reached the end of search results",messageSize:14,messageColor:"#333333",position:"bottomLeft"})):n.style.display="block"):(c.error({title:"No Results",message:"No images found for your search. Please try another keyword."}),document.querySelector(".loader").remove())}catch(r){console.error("Error fetching images:",r),c.error({title:"Error",message:"Something went wrong. Please try again."})}}function w(s){s.forEach(e=>{i.innerHTML+=`
            <li class="gallery-item">
                <a class="gallery-link" href="${e.largeImageURL}">
                    <img class="gallery-image" src="${e.largeImageURL}" alt="${e.tags}" title="${e.tags}">
                </a>
                <div class="image-captions">
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Views</p>
                        <p class="img-caption-value">${e.views}</p>
                    </div>
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Downloads</p>
                        <p class="img-caption-value">${e.downloads}</p>
                    </div>
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Likes</p>
                        <p class="img-caption-value">${e.likes}</p>
                    </div>
                    <div class="image-caption-datas">
                        <p class="img-caption-head">Comments</p>
                        <p class="img-caption-value">${e.comments}</p>
                    </div>
                </div>
            </li>
        `})}
//# sourceMappingURL=index.js.map
