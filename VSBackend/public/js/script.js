function imgSlider(anything){
    document.querySelector('.frutas').src = anything;
    document.getElementById("textBox").innerHTML = "Praticar atividades físicas e ter uma boa noite de sono não é o suficiente para ter uma vida saudável. Para alcançar esse objetivo é necessário realizar escolhas que resultem em uma mente e um corpo saudáveis. E para conquistar isso é importante se alimentar bem.  ";
}
function imgSlider2(anything){
    document.querySelector('.frutas').src = anything;
    document.getElementById("textBox").innerHTML = "A nossa empresa surgiu da necessidade de um dos nossos clientes em receber diariamente lanches rápidos e saudáveis no ambiente de trabalho. Nesta ocasião, já realizávamos o fornecimento de shake no horário do almoço e decidimos investir no fornecimento de frutas selecionadas para complementar a alimentação de todos aqueles que buscam por uma vida mais saudável  ";
}
function imgSlider3(anything){
    document.querySelector('.frutas').src = anything;
    document.getElementById("textBox").innerHTML = "Nossa missão é proporcionar alimentação rápida e saudável. Especializados no delivery de frutas frescas selecionadas e higienizadas diariamente, prontas para o consumo. Para pessoas que buscam uma vida mais saudável com alimentos práticos otimizando tempo e facilitando o cotidiano. ";
}

function CircleCor(color){
    const Circle = document.querySelector('.circle');
    Circle.style.background = color;
}

function textocor(color){
    const texto = document.getElementsByTagName('span')[0];
    texto.style.color = color;

}
function footercor(color){
    const logos = document.querySelector('footer');
    logos.style.background = color;
}
function button(color){
    const button = document.querySelector('button');
    button.style.background = color;

}
function nav(color){
    const nav = document.querySelector('.active');
    nav.style.background = color;

}
function act(color){
    const act = document.querySelector('.act');
    act.style.background = color;

}

//vini
const faq = document.querySelectorAll(".faq");
faq.forEach(faq =>{
    faq.addEventListener("click", () =>{
        faq.classList.toggle("active");
    })
})



function toggleMenu(){
    var Menutoggle = document.querySelector('.toggle');
    var navigation = document.querySelector('.navigation')
    Menutoggle.classList.toggle('active')
    navigation.classList.toggle('active')
}

let themeswitch = document.querySelector('.themeswitch');
let body = document.querySelector('body');
themeswitch.classList.toggle('active');


function funcao(imgSlider) {
    document.getElementById("textBox").innerHTML = "Lorem ipsum dolor sit amet consectetur adipisicing elit.  Officia, deleniti accusamus nam dolorum quod labore  dignissimos sapiente pariatur assumenda culpa nobis commodi. Modi impedit laborum aperiam tempora autem praesentium veniam.";
}
function funcao2(imgSlider) {
    document.getElementById("textBox").innerHTML = "muda o texto chefe. ";
}

function funcao3(imgSlider) {
    document.getElementById("textBox").innerHTML = "Loremzinho.";
}

