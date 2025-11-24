import { useState } from "react";
import SectionTitle from "$/components/other/SectionTitle";
import Input1 from "$/components/inputs/Input1";
import DateInput from "$/components/inputs/DateInput";
import Input2 from "$/components/inputs/Input2";
import Button1 from "$/components/buttons/Button1";
import DeleteButton from "$/components/buttons/DeleteButton";

function ExperienceSection({ data, setData }) {
    function addExperience() {
        setData([
            ...data,
            {
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
        ])
    }

    function deleteExperience(index) {
        setData(data.filter((_, i) => i !==  index));
    }

    function updateField(index, field, value) {
        const updated = [...data]
        updated[index][field] = value
        setData(updated)
    }

    function setIsCurrent(index) {
        const updated = [...data];
        updated[index].isCurrent = !updated[index].isCurrent;
        setData(updated);
    }

    function addDescription(index, newDescription) {
        const updated = [...data];
        updated[index].description.push(newDescription);
        setData(updated);
    }

    function deleteDescription(index, descriptionIndex) {
        const updated = [...data];
        updated[index].description = updated[index].description.filter((_, i) => i !== descriptionIndex);
        setData(updated);
    }

    return (
        <div>
            <SectionTitle title="Experience" />

            {data.length == 0 && (
                <Button1 text="Add" onClick={addExperience} />
            )}

            {data.length != 0 && (
                <div className="flex flex-col gap-4">
                    {data.map((experience, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <h2 className="text-lg font-semibold">Experience {i + 1}</h2>
                                <DeleteButton onClick={() => deleteExperience(i)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input1 
                                    label="Job Title" 
                                    value={experience.title}
                                    isRequired={true}
                                    onChange={(e) => updateField(i, "title", e.target.value)} 
                                />
                                <Input1 
                                    label="Company / Organization" 
                                    value={experience.company}
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "company", e.target.value)} 
                                />
                                <Input1 
                                    label="Location" 
                                    value={experience.location}
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "location", e.target.value)} 
                                />  
                                <Input1 
                                    label="Supervisor Name"
                                    value={experience.supervisorName}
                                    isRequired={false} 
                                    onChange={(e) => updateField(i, "supervisorName", e.target.value)} 
                                />
                                <Input1 
                                    label="Supervisor Title"
                                    value={experience.supervisorTitle}
                                    isRequired={false} 
                                    onChange={(e) => updateField(i, "supervisorTitle", e.target.value)} 
                                />
                                <Input1 
                                    label="Supervisor Degree"
                                    value={experience.supervisorDegree}
                                    isRequired={false} 
                                    onChange={(e) => updateField(i, "supervisorDegree", e.target.value)} 
                                />
                                <div className="flex flex-col gap-1">
                                    <label className="">I currently work here<span className="text-red-500 text-sm">*</span></label>
                                    <button className="border-1 border-black rounded-sm h-8 w-8 hover:cursor-pointer" onClick={() => setIsCurrent(i)}>
                                        {experience.isCurrent && "✓"}
                                    </button>
                                </div>    
                                <DateInput 
                                    isCurrent={experience.isCurrent}
                                    fromValue={experience.from}
                                    toValue={experience.to}
                                    onFromChange={(e) => updateField(i, "from", e.target.value)}
                                    onToChange={(e) => updateField(i, "to", e.target.value)}
                                />  
                                <Input2 
                                    label="Job Description" 
                                    values={experience.description} 
                                    onAdd={(experience) => addDescription(i, experience)} 
                                    onDelete={(descriptionIndex) => deleteDescription(i, descriptionIndex)} 
                                />                        
                            </div>
                        </div>
                    ))}
                    <Button1 text="Add Another" onClick={addExperience} />
                </div>
            )}
        </div>
    )
};

export default ExperienceSection;