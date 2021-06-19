import * as $ from "jquery";

export const setCookie = (c_name: string, value: any, exhours: number) => {
    var exdate = new Date();
    exdate.setHours(exdate.getHours() + exhours);
    var c_value = escape(value) + ((exhours == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value + "; path=/";
}

export const readCookie = (name: string): string => {
    var cookies = document.cookie.split(';');
    for (let c of cookies) {
        let cs = c.split('=')
        if (cs[0].trim() == name)
            return cs[1]
    }

    return ''
}


export const nameValueListToObj = (list: any): any[] => {
    return list.entry_list.map((cl: any) => cl.name_value_list).map((c: any) => {
        let obj: any = {}
        for (let key in c)
            obj[key] = c[key].value
        return obj
    });
}


export const nameValueToObj = (nameValueObj: any): any => {
    let obj: any = {}
    for (let key in nameValueObj)
        obj[key] = nameValueObj[key].value
    return obj
}




export const objToNameValueList = (obj: any) => {
    let nameValueList = []
    for (let key in obj) {
        nameValueList.push({ name: key, value: obj[key] })
    }

    return nameValueList
}

export const encodeHtml = (str: string) => {
    return str.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#' + i.charCodeAt(0) + ';')
}
export const decodeHtml = (html: string) => {
    return $('<textarea />').html(html).text();
}