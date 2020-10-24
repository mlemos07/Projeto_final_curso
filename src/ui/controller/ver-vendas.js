window.addEventListener('load', ()=>{
    let tbody = document.querySelector('tbody');
    let t = '';
    for(let i=0; i<15; i++){
        t+=tbody.innerHTML 
    }
    tbody.innerHTML = t;
})