let button = document.getElementById('button');
let list = document.getElementById('emailist');

chrome.runtime.onMessage.addListener((request,sender,sendresponse)=>{
    let emails = request.emailCheck;
   if((emails!=null||emails.length!=0))
   {
    emails.forEach((emailing) => {
        let li = document.createElement('li');
        li.innerText = emailing;
        //list.appendChild('li');
        list.appendChild(li);
    });
   }
})

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
    chrome.runtime.sendMessage({emailCheck})
}
}