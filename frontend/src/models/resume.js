export function emptyEducation() {
    return {
        school: "",
        degree: "",
        major: "",
        gpa: "",
        from: "",
        to: "",
        coursework: [],
        awards: [],
    }
};

export function emptyExperience() {
    return {
        title: "",
        company: "",
        location: "",
        supervisorName: "",
        supervisorTitle: "",
        supervisorDegree: "",
        isCurrent: false,
        from: "",
        to: "",
        description: [],
    }
};

export function emptyPublication() {
    return {
        title: "",
        date: "",
        authors: [],
        doi: ""
    }
};

export function emptyProject() {
    return {
        title: "",
        organization: "",
        location: "",
        isCurrent: false,
        from: "",
        to: "",
        description: [],
    }
};

export function emptySkill() {
    return {
        title: "",
        skillsList: []
    }
};