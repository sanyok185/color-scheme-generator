var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);

//=====================================================================================================


const colorBody = document.querySelector('.form__body');
let colors;
let colorChoosed=document.getElementById("color").value.slice(1);
let mode = document.getElementById("select").value.toLowerCase();
let colorItems = document.querySelectorAll('.form__color');

fetch(`https://www.thecolorapi.com/scheme?hex=${colorChoosed}&mode=${mode}`)
    .then(res => res.json())
    .then(scheme => {
        colors = scheme.colors
        colorBody.innerHTML=''
        let html='';
        for (let i=0; i<colors.length; i++) {
            html = html + `<div class="form__color">
                                <div class="color" style="background-color: ${colors[i].hex.value}"></div>
                                <div class="color__hex">${colors[i].hex.value}</div>
                            </div>`
        }
        colorBody.innerHTML = html

        colorItems = document.querySelectorAll('.form__color');
        for (let item of colorItems) {   
            item.addEventListener('click', () => {
                let hex = item.querySelector('.color__hex').textContent;
                navigator.clipboard.writeText(hex);
                document.querySelector('.popup__message').style.opacity='1'
                setTimeout(() => {document.querySelector('.popup__message').style.opacity='0'}, 1500)
            });
        }
    })
document.getElementById("form").addEventListener("submit", function(e) {
    e.preventDefault();
    colorChoosed = document.getElementById("color").value.slice(1);
    mode = document.getElementById("select").value.toLowerCase();
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorChoosed}&mode=${mode}`)
        .then(res => res.json())
        .then(scheme => {
            colors = scheme.colors
            colorBody.innerHTML=''
            let html='';
            for (let i=0; i<colors.length; i++) {
                html = html + `<div class="form__color">
                    <div class="color" style="background-color: ${colors[i].hex.value}">
        
                    </div>
                    <div class="color__hex">
                        ${colors[i].hex.value}
                    </div>
                </div>`
            }
            colorBody.innerHTML = html;
            colorItems = document.querySelectorAll('.form__color');
            for (let item of colorItems) {   
                item.addEventListener('click', () => {
                    let hex = item.querySelector('.color__hex').textContent;
                    navigator.clipboard.writeText(hex);
                    document.querySelector('.popup__message').style.opacity='1'
                    setTimeout(() => {document.querySelector('.popup__message').style.opacity='0'}, 1500)
                });
            }
        })
})

