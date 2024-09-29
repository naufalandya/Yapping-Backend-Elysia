import { ValueError } from '../types/types';
import { InvalidData } from './error.handler';

export const stringValidation = (propertyName : string, minLength : number, maxLength : number, errors : ValueError[]) => {
    if (errors[0].type == 45){
        throw new InvalidData(`property ${propertyName} is required !`)
    }

    if (errors[0].type == 54){
        throw new InvalidData(`property  ${propertyName} must be a string !`)
    }

    if (errors[0].type == 51){
        throw new InvalidData(`the length character of ${propertyName} should not above  ${maxLength} !`)
    }

    if (errors[0].type == 52){
        throw new InvalidData(`the length character of ${propertyName} should not below ${minLength} !`)
    }

    if (errors[0].type == 53){
        throw new InvalidData(`only 1 or 0 is allowed !`)
    }
}

export const stringValidationOptional = (propertyName : string, minLength : number, maxLength : number, errors : ValueError[]) => {

    if (errors[0].type == 54){
        throw new InvalidData(`property  ${propertyName} must be a string !`)
    }

    if (errors[0].type == 51){
        throw new InvalidData(`the length character of ${propertyName} should not above  ${maxLength} !`)
    }

    if (errors[0].type == 52){
        throw new InvalidData(`the length character of ${propertyName} should not below ${minLength} !`)
    }

    if (errors[0].type == 53){
        throw new InvalidData(`only 1 or 0 is allowed !`)
    }

}


export const booleanValidation = (propertyName : string, errors : ValueError[]) => {
    if (errors[0].type == 45){
        throw new InvalidData(`property ${propertyName} is required !`)
    }


    if (errors[0].type == 14){
        throw new InvalidData(`property  ${propertyName} must be a boolean !`)
    }
}

export const booleanValidationOptional = (propertyName : string, errors : ValueError[]) => {

    if (errors[0].type == 14){
        throw new InvalidData(`property ${propertyName} must be a boolean !`)
    }
}

export const numberValidation = (propertyName : string, minLength : number, maxLength : number, errors : ValueError[]) => {
    if (errors[0].type == 45){
        throw new InvalidData(`property ${propertyName} is required !`)
    }

    if (errors[0].type == 41){
        throw new InvalidData(`property  ${propertyName} must be a number !`)
    }

    if (errors[0].type == 24){
        throw new InvalidData(`the value number of ${propertyName}  should not above  ${maxLength} !`)
    }

    if (errors[0].type == 25){
        throw new InvalidData(`the value number of ${propertyName} should not below ${minLength} !`)
    }
}

export const numberOptional = (propertyName : string, minLength : number, maxLength : number, errors : ValueError[]) => {

    if (errors[0].type == 41){
        throw new InvalidData(`property  ${propertyName} must be a number !`)
    }

    if (errors[0].type == 24){
        throw new InvalidData(`the value number of ${propertyName}  should not above  ${maxLength} !`)
    }

    if (errors[0].type == 25){
        throw new InvalidData(`the value number of ${propertyName}  should not below ${minLength} !`)
    }

}