const responedList = {
    DBError: new Error({ err: 'DBError' }),
    InfoUnvalid: new Error({ err: 'InfoUnvalid' }),
    route: new Error({ err: 'koral | Michael you send me bad request! ' }),
    FaildSave: new Error({ err: 'FaildSave' }),
    loginFaildAlreadyConnect: new Error({ err: 'loginFaildAlreadyConnect' }),
    //error when someone try to register but using a exists email please try diffrent email
    UserIsAlreadyCreated: new Error({ err: "UserIsAlreadyCreated" }),
    // error when try to login to user but could not found email is wrong
    UserNotCreated: new Error({ err: "UserNotCreated" }),
    // when try to create a company and there is already a company with this name
    companyNameExists: new Error({ err: "companyNameExists" }),
    // error when password is unvalid   
    UnvalidPassword: new Error({ err: 'UnvalidPassword' }),
    // error when someone try to login but user not exists or wrong info
    usersNotFound: new Error({ err: 'usersNotFound' }),

    good: { valid: 'good' },
    // error when someone try to use a fake or not exists email 
    emailNotExistsL: new Error({ err: 'emailIsFake' }),
    // error when the DB cant find something
    NotExists: new Error({ err: 'NotExists' }),
    isInUse: new Error({ err: 'isInUse' }),
}

exports.responedList = responedList