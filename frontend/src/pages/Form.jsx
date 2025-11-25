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

function Form() {
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

    const formData = {
        personalInfo,
        introduction,
        links,
        educations,
        experiences,
        publications,
        projects,
        skills
    };

    async function onSubmit() {
        try {
            const response = await fetch("http://localhost:5000/api/test", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            console.log("Backend responded:", result);

        } catch (error) {
            console.error("Error sending data:", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-200 flex items-start justify-center py-10">
            <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-10 flex flex-col gap-8">
                <div className="flex justify-center">
                    <PageTitle title="ResumeAI" />
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

                <div className="flex justify-center">
                    <Button1 text="Generate" onClick={onSubmit} />
                </div>

            </div>
        </div>

    )
};

export default Form;