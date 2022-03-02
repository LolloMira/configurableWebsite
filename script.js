function initWebsite() {
    loadSettings();
    loadPages();
}



function loadSettings() {
fetch("./assets/settings/setting.json")
    .then(resp => resp.json())
    .then(generateSettings)
    .catch(error => console.log(error));
}

function loadPages() {
    fetch("./assets/settings/pages_new_new_new.json")
        .then(resp_pages => resp_pages.json())
        .then(configurePages)
        .catch(error => console.log(error));
}

function setDocumentTitle(title) {
    document.title = title; 
}

function setTheme(theme) {
    const body = document.getElementsByTagName('body')[0];
    
    const styleLink = document.getElementById('style');
    styleLink.setAttribute('href', (theme + ".css"))
}


function setHeaderTitle(title) {
    const pageTitle = document.getElementsByClassName('main-title')[0];
    const titleNode = document.createTextNode(title);
    pageTitle.appendChild(titleNode);
}

function setHeaderBackground(imgUrl) {
    const header = document.getElementById('head');
    header.style.backgroundImage = "url("+ imgUrl + ")";
}

function setFooterLinks(linkArray) {
    for (const link of linkArray) {
        const footerDiv = document.getElementsByClassName('link-container')[0];
        const footerLink1 = document.createElement('a');
        footerLink1.href = link.url;
        footerLink1.text = link.text;
        footerDiv.appendChild(footerLink1)
    }
}

function generateSettings(data){ 
    setDocumentTitle(data.title)
    setTheme(data.theme)
    setHeaderTitle(data.title)
    setHeaderBackground(data.headerImage)
    setFooterLinks(data.footerLinks)
}

function configurePages(pageSetting) {
    setNavMenu(pageSetting)


    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    let id = params.get('id');
    if(!id){
        id = "p1"
    }
    const page = pageSetting.filter(p => p.id === id)[0];
    createPage(page);
}

function createPage(page){
    //const container = document.getElementById('page-container');
    // for (const element of page.content) {
    //     const htmlElement = createHtmlElement(element);
    //     container.appendChild(htmlElement);
    // }
    //container.innerHTML = marked.parse(page.content);
    fetch(page.contentUrl).then(res => res.text()).then(content)
}

function content(text) {
    console.log(text);
    const container = document.getElementById('page-container');
    container.innerHTML = marked.parse(text);
}

function setNavMenu(pageSetting) {
    const navMenu = document.getElementById('nav-menu');
    for (const page of pageSetting) {
        const a = document.createElement('a');
        const node = document.createTextNode(page.name);
        a.appendChild(node);
        //const baseUrl = window.location.toString().split("=")[0];
        //const url = baseUrl + "=" + page.id;
        const url = "/?id=" + page.id;
        console.log(url);
        a.href = url;
        navMenu.appendChild(a); 
    }
}

function createHtmlElement(elementSetting){
    switch (elementSetting.tag) {
        case "h2":
            return createH2(elementSetting)
        case "p":
            return createP(elementSetting)
        case "img":
            return createIMG(elementSetting)
        case "div":
            return createDIV(elementSetting)
        default:
            break;
    }
}

function createH2(elementSetting){
    const h2 = document.createElement("h2");
    const node = document.createTextNode(elementSetting.text);
    h2.appendChild(node);
    return h2;
}

function createP(elementSetting){
    const p = document.createElement("p");
    p.className="single-par";
    const node = document.createTextNode(elementSetting.text);
    p.appendChild(node);
    return p;
}

function createIMG(elementSetting){
    const img = document.createElement("img");
    img.src = elementSetting.url;
    return img;
}

function createDIV(elementSetting){
    const div = document.createElement("div");
    for (const element of elementSetting.children) {
        const htmlElement = createHtmlElement(element);
        div.appendChild(htmlElement);
    }
    return div;
}
