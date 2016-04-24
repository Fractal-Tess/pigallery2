///<reference path="../../browser.d.ts"/>

import {Http, Headers, RequestOptions, Response} from "angular2/http";
import {Message} from "../../../common/entities/Message";
import "rxjs/Rx";

export class NetworkService{

    _baseUrl = "/api";

    constructor(protected _http:Http){
    }

    private callJson<T>(method:string, url:string, data:any = {}): Promise<T>{
        let body = JSON.stringify( data );
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        if(method == "get"){
            return this._http[method](this._baseUrl+url, options)
                .toPromise()
                .then(res => <Message<any>> res.json())
                .catch(NetworkService.handleError);
        }
        
        return this._http[method](this._baseUrl+url, body, options)
            .toPromise()
            .then(res => <Message<any>> res.json())
            .catch(NetworkService.handleError);
    }

    protected postJson<T>(url:string, data:any  = {}): Promise<T>{
        return this.callJson("post",url,data);
    }

    protected putJson<T>(url:string, data:any  = {}): Promise<T>{
        return this.callJson("put",url,data);
    }
    protected getJson<T>(url:string): Promise<T>{
        return this.callJson("get",url);
    }


    protected deleteJson<T>(url:string, data:any  = {}): Promise<T>{
        return this.callJson("delete",url,data);
    }

    private static handleError (error: any) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Promise.reject(error.message || error.json().error || 'Server error');
    }
}