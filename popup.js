let button = document.getElementById('button');

button.addEventListener("click",async ()=>{
    let [tabs] = await chrome.tabs.query({active : true,currentWindow: true});
    
    chrome.scripting.executeScript(
       { target : {tabId : tabs.id} ,
        func : scrapeEmailsFromPage }
    )
})

function scrapeEmailsFromPage()
{
    const email = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;

    let emailCheck = document.body.innerHTML.match(email)

    if (emailCheck==null)
    {
        alert("no emails found")
    }
    else
    {
    alert(emailCheck)
}
}