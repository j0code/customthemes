console.log("Injected content script!")

console.log(document.location)

chrome.runtime.sendMessage({action: "get themes"}, (res) => {
  console.log(res)
})
