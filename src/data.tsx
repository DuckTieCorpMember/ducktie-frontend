const otp_code = 1234;

export enum OTPStatus{
    INPUT = "input",
    CHECKING = "checking",
    SUCCESS = "success",
}

export default class Service{
    getOTP() : number{
        return otp_code;
    }
}