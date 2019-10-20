

class Logs {
    checkError(err, where, action, cause) {
        if (err)
            this.error(where, action, cause, err)
        else
            this.info(where, action, cause)
    }

    info(where, action, cause) {
        let whereToken = `messgae from [${where}]`,
            actionToken = action ? `action: [${action}]` : '',
            causeToken = cause ? `cause: [${this._parseCause(cause)}]` : ''

        console.info(`--INFO-- ${whereToken} ${actionToken} ${causeToken} ${this._getTimestamp()}`)
    }

    warning(where, action, cause) {
        let whereToken = `messgae from [${where}]`,
            actionToken = action ? `action: [${action}]` : '',
            causeToken = cause ? `cause: [${this._parseCause(cause)}]` : ''

        console.warn(`--WARN-- ${whereToken} ${actionToken} ${causeToken} ${this._getTimestamp()}`)
    }

    error(where, action, cause, err) {
        let whereToken = `messgae from [${where}]`,
            actionToken = action ? `action: [${action}]` : '',
            causeToken = cause ? `cause: [${this._parseCause(cause)}]` : ''

        let errorInfo = ''
        if (err) {
            errorInfo = `ERRMESSAGE:[${err.message}]ERRSTACK:[${err.stack}]`
        }

        console.error(`--ERROR-- ${whereToken} ${actionToken} ${causeToken} ${errorInfo} ${this._getTimestamp()}`)
    }

    err(where, action, cause, err) {
        return this.error(where, action, cause, err)
    }

    warn(where, action, cause) {
        return this.warning(where, action, cause)
    }

    _parseCause(cause) {
        try {
            let json = JSON.stringify(cause)
            return json
        }
        catch (e) {
            return ''
        }
    }

    _getTimestamp() {
        return `${new Date().toLocaleTimeString()}`
    }
}

export default new Logs()