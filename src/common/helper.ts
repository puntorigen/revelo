const root = (require('find-root'))(__dirname)
const pkg = require(root+'/package.json')
const fs = require('fs').promises

export default class helper {
    x_console: any

    constructor() {
        this.x_console = new (require('@concepto/console'))()
    }

    copyright() {
        this.x_console.out({
            message: `\nCrafted with passion @ 2022 by ${pkg.author}.`,
            color: 'dim'
        })
    }

    async fileExists(file) {
        let resp = false
        try {
            resp = await fs.access(file)
            resp = true
        } catch (f_err) {}
        return resp
    }

    async readFile(file, json: Boolean = true) {
        let resp = await fs.readFile(file, 'utf-8')
        if (json) return JSON.parse(resp)
        return resp
    }

    async writeFile(file, data: String) {
        try {
            await fs.writeFile(file, data, 'utf-8', {
                encoding: 'utf8',
                flag: 'w'
            })
            return true
        } catch (err_fs) {
            return false
        }
    }

    isObjEmpty(obj) {
        //fastest algorithm
        for (let x in obj) return false;
        return true;
    }
}
