// import _ from "lodash";

let Cookie = {
    /**
     * Set/Overwrite a cookie value
     *
     * @param name
     * @param value
     * @param days      OPTIONAL Days till this cookie will stay valid. Default is current session
     * @param path      OPTIONAL domain root will be used by default
     */
    set: function (name: string, value: string, days?: number, path?: string) {
        let expires : any // eslint-disable-line
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        } else expires = "";

        let dir = path || '/';
        document.cookie = name + "=" + value + expires + "; path=" + dir;
    },

    /**
     * Retrieve a cookie value
     *
     * @param name
     * @return String|null
     */
    get: function (name: string) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return ;
    },

    /**
     * Remove a cookie
     *
     * @param name
     */
    delete: function (name: string) {
        this.set(name, "", -1);
    }
};

export default Cookie