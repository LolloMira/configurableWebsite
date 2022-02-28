function loadSettings() {
fetch("./assets/settings/setting.json")
    .then(resp => resp.json())
    .then(generateSettings)
    .catch(error => console.log(error));
}

function loadPages() {
    fetch("./assets/settings/pages.json")
        .then(resp_pages => resp_pages.json())
        .then(generatePageContent)
        .catch(error => console.log(error));
    }

function generateSettings(data){ 
    const header = document.getElementById('head');
    header.style.backgroundImage = "url("+ data.headerImage + ")";
    const body = document.getElementsByTagName('body')[0];
    if (data.theme === "light") {
        body.style.backgroundColor = "white"
    }

    if (data.theme === "dark") {
        body.style.backgroundColor = "black"
    }

    document.title = data.title; 

    const pageTitle = document.getElementsByClassName('main-title')[0];
    const titleNode = document.createTextNode(data.title);
    pageTitle.appendChild(titleNode);

    for (const link of data.footerLinks) {
        const footerDiv = document.getElementsByClassName('link-container')[0];
        const footerLink1 = document.createElement('a');
        footerLink1.href = link.url;
        footerLink1.text = link.text;
        footerDiv.appendChild(footerLink1)
    }

    
}

function generatePageContent(data){
    const pageContentDiv = document.getElementsByClassName('page-content')[0];
    const pageContent = data[0];
    for (const element of pageContent.content) {
        const newElement = document.createElement(element.tag);
        if (element.text) {
            const node = document.createTextNode(element.text);
            newElement.appendChild(node);
        }
        
        if (element.url) {
            newElement.src = element.url;
        }
        pageContentDiv.appendChild(newElement);
    }
}
