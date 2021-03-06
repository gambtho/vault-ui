import {Http} from "angular2/http";
import {Injectable} from "angular2/core";

@Injectable()
export class AuthFactory {
    token:string;
    url:string;

    constructor(public http:Http) {
        this.url = 'http://tg23qo-prod.apigee.net/v1';
    }

    login(username, password) {
        return this.http.post(this.url + '/v1/auth/app-id/login', 
            `{ "app_id": "${username}","user_id":"${password}"}`
            )
            .map((res) => {
                return res.json().auth.client_token;
            })
    };

    setToken(string) {
        this.token = string;
    };
    
    getToken() {
        return this.token;
    }
}
