from datetime import datetime, date
import json

def format_date(date_str):
    if not date_str:
        return ""
    if date_str == "Current":
        return "Current"
    dt = datetime.strptime(date_str, "%Y-%m")
    return dt.strftime("%b %Y")


def format_phone(phone_str):
    if len(phone_str) != 10:
        return phone_str
    return f"({phone_str[0:3]}) {phone_str[3:6]}-{phone_str[6:]}"
    

def clean_whitespace(str):
    return " ".join(str.split())


def is_future_date(date_str):
    if not date_str:
        return False

    dt = datetime.strptime(date_str, "%Y-%m").date()
    return dt > date.today()


def set_is_current(data):
    for edu in data["educations"]:
        edu["expected"] = edu["to"]
        if is_future_date(edu["to"]):
            edu["to"] = "Current"

    for exp in data["experiences"]:
        if exp["isCurrent"]:
            exp["to"] = "Current"

    for proj in data["projects"]:
        if proj["isCurrent"]:
            proj["to"] = "Current"
    
    return data

def format_data(data):
    # Clean all whitespace
    data["personalInfo"]["name"] = clean_whitespace(data["personalInfo"]["name"])
    data["personalInfo"]["location"] = clean_whitespace(data["personalInfo"]["location"])
    data["personalInfo"]["email"] = clean_whitespace(data["personalInfo"]["email"])
    data["personalInfo"]["phone"] = clean_whitespace(data["personalInfo"]["phone"])
    data["introduction"]["text"] = clean_whitespace(data["introduction"]["text"])

    for link in data["links"]:
        link = clean_whitespace(link)

    for edu in data["educations"]:
        edu["school"] = clean_whitespace(edu["school"])
        edu["degree"] = clean_whitespace(edu["degree"])
        edu["major"] = clean_whitespace(edu["major"])
        edu["gpa"] = clean_whitespace(edu["gpa"])
        for c in edu["coursework"]:
            c = clean_whitespace(c)
        for a in edu["awards"]:
            a = clean_whitespace(a)

    for exp in data["experiences"]:
        exp["title"] = clean_whitespace(exp["title"])
        exp["company"] = clean_whitespace(exp["company"])
        exp["location"] = clean_whitespace(exp["location"])
        exp["supervisorName"] = clean_whitespace(exp["supervisorName"])
        exp["supervisorTitle"] = clean_whitespace(exp["supervisorTitle"])
        exp["supervisorDegree"] = clean_whitespace(exp["supervisorDegree"])
        for d in exp["description"]:
            d = clean_whitespace(d)

    for pub in data["publications"]:
        pub["title"] = clean_whitespace(pub["title"])
        pub["date"] = clean_whitespace(pub["date"])
        pub["doi"] = clean_whitespace(pub["doi"])
        for a in pub["authors"]:
            a = clean_whitespace(a)

    for proj in data["projects"]:
        proj["title"] = clean_whitespace(proj["title"])
        proj["organization"] = clean_whitespace(proj["organization"])
        proj["location"] = clean_whitespace(proj["location"])
        for d in proj["description"]:
            d = clean_whitespace(d)

    for skill in data["skills"]:
        skill["title"] = clean_whitespace(skill["title"])
        for s in skill["skillsList"]:
            s = clean_whitespace(s)

    # Set isCurrent
    data = set_is_current(data)

    # Format phone number
    data["personalInfo"]["phone"] = format_phone(data["personalInfo"]["phone"])

    # Format date strings
    for edu in data["educations"]:
        edu["from"] = format_date(edu["from"])
        edu["to"] = format_date(edu["to"])
        edu["expected"] = format_date(edu["expected"])

    for exp in data["experiences"]:
        exp["from"] = format_date(exp["from"])
        exp["to"] = format_date(exp["to"])

    for pub in data["publications"]:
        pub["date"] = format_date(pub["date"])

    for proj in data["projects"]:
        proj["from"] = format_date(proj["from"])
        proj["to"] = format_date(proj["to"])

    return data