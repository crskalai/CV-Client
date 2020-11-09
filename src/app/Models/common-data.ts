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
    Visa: any[];
    Roles: any[];
    CheckType: any[];
    Missions: any[];
    Country: any[];
    VAC: any[];
    EditUserId: number;
    MissionsDict:Dictionary<string>= {};
    LoginStatus: number;
    StatusValue: string;
    UserMenu: 20;
    ApiURL = "http://localhost:8433/api/";//"https://cv2o.mioot.com:3001/api/";//
}