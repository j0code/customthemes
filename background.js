// Relevant apis: contentSettings, contextMenu, cookies, declarativeContent, declarativeNetRequest, devtools.network, i18n, identity, idle, loginState, management, notifications, omnibox, permissions, platformKeys, power, privacy, proxy, scripting, storage, system, webNavigation

/*chrome.runtime.onInstalled.addListener(async () => {
	let url = chrome.runtime.getURL("installed.html")
	//let tab = await chrome.tabs.create({ url })
	//console.log(`Created tab ${tab.id}`)
})*/

import browser from "./compat.js"
import Logger from "./logger.js"

const logger = new Logger("ext", "teal")

let themes = [
	{
		"name": "theme 1",
		"author": "fretlet",
		"css": "www.google.com",
		"urls": [],
		"enabled": false
	}, {
		"name": "dark theme",
		"author": "dark themer",
		"css": "www.darktheme.com",
		"urls": ["google.com"],
		"enabled": true
	}
]

let activeTab = null
browser.tabs.query({active: true, currentWindow: true}).then(tabs => {
	[activeTab] = tabs
})

browser.tabs.onActivated.addListener(o => {
	browser.tabs.get(o.tabId, tab => {
		activeTab = tab
		logger.log("activetab::change", tab)
	})
})

browser.runtime.onMessage.addListener((req, sender, res) => {
	logger.debug(req, sender)

	let url = new URL(sender.url)
	if(url.protocol == "chrome-extension:" && url.host == browser.runtime.id) { // popup or settings page
		if(url.pathname == "/popup.html") {
			url = new URL(activeTab.url)
		} else if(url.pathname == "/options.html") {
			return themes
		}
	}

	switch(req.action) {
		case "get themes":
		res({themes: getThemes(url), url}) // only send url-matching themes that are enabled
	}
})

function getThemes(url) {
	let list = []

	for(let t of themes) {
		for(let p of t.urls) {
			let match = matchUrl(p, url)
			logger.debug(p, url)
			logger.debug("match?", match)
			if(match) {
				logger.debug(p, url, "match")
				list.push(t)
				break
			}
		}
	}

	logger.debug(url, list)
	return list
}

function matchUrl(pattern, url) {
	let pUrl
	try {
		pUrl = new URL(pattern)
	} catch(e1) {
		try {
			pUrl = new URL("http://" + pattern)
		} catch(e2) {
			return false
		}
	}
	logger.debug(pUrl, url)

	let pHostlist = pUrl.host.split(".")
	let hostlist = url.host.split(".")
	logger.debug(pHostlist, hostlist, "sees")
	for(let i = 0; i < pHostlist.length; i++) {
		let pIndex = pHostlist.length -1 -i
		let index = hostlist.length -1 -i
		logger.debug(0, pHostlist[pIndex], hostlist[index])
		if(pHostlist[pIndex] != hostlist[index] && pHostlist[pIndex] != "%2A") return false // %2A is *
	}

	if(pUrl.port && pUrl.port != url.port) return false

	logger.debug("0")
	let pPath = pUrl.pathname
	if(pPath == "/") return true
	logger.debug("1")
	if(pPath.endsWith("*")) {
		pPath = pPath.subst(0, pPath.length -1)
		return url.pathname.startsWith(pPath)
	}
	logger.debug("2")
	return url.pathname == pPath
}

logger.log("load", "thank you for using Custom Themes! <3")
