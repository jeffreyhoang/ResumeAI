import { useState } from "react";
import IntroductionSection from "$/components/sections/IntroductionSection";
import PersonalInformationSection from "$/components/sections/PersonalInformationSection";
import LinksSection from "$/components/sections/LinksSection";
import EducationSection from "$/components/sections/EducationSection";
import ExperienceSection from "$/components/sections/ExperienceSection";
import PublicationsSection from "$/components/sections/PublicationsSection";
import ProjectsSection from "$/components/sections/ProjectsSection";
import SkillsSection from "$/components/sections/SkillsSection";
import Divider from "$/components/other/Divider";
import PageTitle from "$/components/other/PageTitle";
import Button1 from "$/components/buttons/Button1"
import Error from "$/components/other/Error";
import Slider from "$/components/other/Slider";

function Form() {
    const [size, setSize] = useState(5);

    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        location: "",
        email: "",
        phone: ""
    });

    const [introduction, setIntroduction] = useState({
        isAdded: false,
        text: ""
    });

    const [links, setLinks] = useState([]);

    const [educations, setEducations] = useState([]);

    const [experiences, setExperiences] = useState([]);

    const [publications, setPublications] = useState([]);

    const [projects, setProjects] = useState([]);

    const [skills, setSkills] = useState([]);

    const [errors, setErrors] = useState([]);

    const [value, setValue] = useState();

    const formData = {
        personalInfo,
        introduction,
        links,
        educations,
        experiences,
        publications,
        projects,
        skills,
        size
    };

    function validateForm() {
        const newErrors = [];

        if (!personalInfo.name.trim()) newErrors.push("Name is required.");
        if (!personalInfo.email.trim()) newErrors.push("Email is required.");
        if (!personalInfo.location.trim()) newErrors.push("Location is required.");
        if (!personalInfo.phone.trim()) newErrors.push("Phone number is required.");

        if (introduction.isAdded && !introduction.text.trim()) {
            newErrors.push("Introduction text cannot be empty.");
        }

        links.forEach((link, i) => {
            if (!link.trim()) newErrors.push(`Link ${i + 1} cannot be empty.`);            
        });

        educations.forEach((education, i) => {
            if (!education.school.trim()) newErrors.push(`Education ${i + 1}: School required`);
            if (!education.degree.trim()) newErrors.push(`Education ${i + 1}: Degree required.`);
            if (!education.major.trim()) newErrors.push(`Education ${i + 1}: Major required.`);
            if (!education.gpa.trim()) newErrors.push(`Education ${i + 1}: GPA required.`);
            if (!education.from.trim()) newErrors.push(`Education ${i + 1}: Start date required.`);
            if (!education.to.trim()) newErrors.push(`Education ${i + 1}: End date required.`);
        });

        experiences.forEach((experience, i) => {
            if (!experience.title.trim()) newErrors.push(`Experience ${i + 1}: Job title required.`);
            if (!experience.company.trim()) newErrors.push(`Experience ${i + 1}: Company / Organization required.`);
            if (!experience.location.trim()) newErrors.push(`Experience ${i + 1}: Location required.`);
            if (!experience.from.trim()) newErrors.push(`Experience ${i + 1}: Start date required.`);
            if (!experience.to.trim() && !experience.isCurrent) newErrors.push(`Experience ${i + 1}: End date required.`);
        })

        publications.forEach((publication, i) => {
            if (!publication.title.trim()) newErrors.push(`Publication ${i + 1}: Title required.`);
            if (!publication.date.trim()) newErrors.push(`Publication ${i + 1}: Date required.`);
            if (!publication.doi.trim()) newErrors.push(`Publication ${i + 1}: DOI required.`);
            if (publication.authors.length == 0) newErrors.push(`Publication ${i + 1}: Authors required.`);
        });

        projects.forEach((project, i) => {
            if (!project.title.trim()) newErrors.push(`Project ${i + 1}: Title required.`);
            if (!project.organization.trim()) newErrors.push(`Project ${i + 1}: Organization required.`);
            if (!project.location.trim()) newErrors.push(`Project ${i + 1}: Location required.`);
            if (!project.from.trim()) newErrors.push(`Project ${i + 1}: Start date required.`);
            if (!project.to.trim() && !project.isCurrent) newErrors.push(`Project ${i + 1}: End date required.`);
        });

        skills.forEach((skill, i) => {
            if (!skill.title.trim()) newErrors.push(`Skill ${i + 1}: Title required.`);
            if (skill.skillsList.length == 0) newErrors.push(`Skill ${i + 1}: Skills required.`);
        });

        setErrors(newErrors);
        return newErrors;
    }

    async function onSubmit() {
        const validationErrors = validateForm();

        if (validationErrors.length == 0) {
            try {
                const response = await fetch("http://localhost:5000/api/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)   // this sends your data
                });

                const blob = await response.blob();   // get back PDF data
                const url = URL.createObjectURL(blob);

                window.open(url, "_blank");   // opens PDF in a new tab

            } catch (error) {
                console.error("Error sending data:", error);
            }
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });   // scrolls to top to show
        }
    }

    return (
        <div className="min-h-screen bg-gray-200 flex items-start justify-center py-10">
            <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-10 flex flex-col gap-8">

                <div className="flex justify-center">
                    <PageTitle title="ResumeAI" />
                </div>

                <div className="flex flex-col gap-2">
                    {errors.map((error, i) => (
                        <div key={i}>                        
                            <Error text={error} />
                        </div>
                    ))}
                </div>

                <div>
                    <PersonalInformationSection data={personalInfo} setData={setPersonalInfo} />
                </div>

                <Divider />

                <div>
                    <IntroductionSection data={introduction} setData={setIntroduction} />
                </div>

                <Divider />

                <div>
                    <LinksSection data={links} setData={setLinks} />
                </div>

                <Divider />

                <div>
                    <EducationSection data={educations} setData={setEducations} />
                </div>

                <Divider />
                
                <div>
                    <ExperienceSection data={experiences} setData={setExperiences} />
                </div>

                <Divider />

                <div>
                    <PublicationsSection data={publications} setData={setPublications} />
                </div>

                <Divider />
                                
                <div>
                    <ProjectsSection data={projects} setData={setProjects} />
                </div>

                <Divider />

                <div>
                    <SkillsSection data={skills} setData={setSkills} />
                </div>

                <Divider />

                <Slider value={size} setValue={setSize} />

                <Divider />

                <div className="flex justify-center">
                    <Button1 text="Generate" onClick={onSubmit} />
                </div>

            </div>
        </div>

    )
};

export default Form;