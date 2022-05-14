import browser from "./compat.js"

export default class Logger {

	constructor(scope, color) {
		this.scope = scope || "ext"
		this.color = color || "teal"
	}

	log(a, ...args) {
		let b = a.name || a || "info"
		let c = a.color || "lightgray"
		console.log(`%c[%c${browser.i18n.getMessage("extname")}%c] [%c${this.scope}%c] [%c${b}%c]:`, "", "color: violet", "", `color: ${this.color}`, "", `color: ${c}`, "", ...args)
	}

	info(...args) {
		this.log({name: "info", color: "lightgray"}, ...args)
	}

	debug(...args) {
		console.debug(`%c[%c${browser.i18n.getMessage("extname")}%c] [%c${this.scope}%c] [%c${"debug"}%c]:`, "", "color: violet", "", `color: ${this.color}`, "", `color: ${""}`, "", ...args)
	}

	trace(a, ...args) {
		let b = a.name || a || "trace"
		let c = a.color || "lightgray"
		console.trace(`%c[%c${browser.i18n.getMessage("extname")}%c] [%c${this.scope}%c] [%c${b}%c]:`, "", "color: violet", "", `color: ${this.color}`, "", `color: ${c}`, "", ...args)
	}

	warn(a, ...args) {
		let b = a.name || a || "warn"
		let c = a.color || ""
		console.warn(`%c[%c${browser.i18n.getMessage("extname")}%c] [%c${this.scope}%c] [%c${b}%c]:`, "", "color: violet", "", `color: ${this.color}`, "", `color: ${c}`, "", ...args)
	}

	error(a, ...args) {
		let b = a.name || a || "error"
		let c = a.color || ""
		console.error(`%c[%c${browser.i18n.getMessage("extname")}%c] [%c${this.scope}%c] [%c${b}%c]:`, "", "color: violet", "", `color: ${this.color}`, "", `color: ${c}`, "", ...args)
	}

}
