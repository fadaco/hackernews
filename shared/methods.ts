export const getPageName = (param: string) => {
    switch (param) {
        case 'setup_name':
            return 'name';
        case 'setup_date_of_birth':
            return 'dob';
        case 'set_up_identify_as':
            return 'identifyAs';
        case 'describe_yourself':
            return 'race';
        case 'intention':
            return 'intention';
        case 'interested':
            return 'interestedIn';
        case 'set_up_image':
            return 'photo';
        case 'set_up_interest':
        case 'set_up_sports':
            return 'likes';
        case 'set_up_height':
            return 'height';
        case 'dashboard':
            return 'dashboard';
        default:
            return 'name';
    }
}