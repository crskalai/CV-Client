import { Dictionary } from 'lodash';
//import { ApiCallService } from '../Services/api-call.service';

export class Shared {
    FullName: string;
    MenuObj: any;
    MasterData: any [];
    AuthKey: string;
    SessionToken: string;
    SessionId: number;
    PartnerId: number;
    LanguageId: number;
    UserList: any[];
    Roles: any[];
    EditUserId: number;
    MissionsDict:Dictionary<string>= {};
    ApiURL = "http://localhost:8433/api/";
}