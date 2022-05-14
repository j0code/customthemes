import browser from "./compat.js"
import Logger from "./logger.js"

const logger = new Logger("popup", "gold")

browser.runtime.sendMessage({action: "get themes"}, (res) => {
  logger.debug(res)
	render(res.themes, res.url)
})

function render(themes, url) {
	let list = $("#theme-list")
	list.innerHTML = ""
	for(let t of themes) {
		let div = e("div.theme")

		let info = e("div.theme-info")
		let name = e("span.theme-name")
		name.innerText = t.name || "Unnamed theme"
		let author = e("span.theme-author")
		author.innerText = t.author || "Unknown author"
		info.appendChild(name)
		info.appendChild(author)

		let button = e("input.theme-button[type=button]")
		button.value = t.enabled ? "Disable" : "Enable"
		button.addEventListener("click", () => {
			t.enabled = !t.enabled
			button.value = t.enabled ? "Disable" : "Enable"
			logger.debug(t.enabled)
		})

		div.appendChild(info)
		div.appendChild(button)
		list.appendChild(div)
	}
}
