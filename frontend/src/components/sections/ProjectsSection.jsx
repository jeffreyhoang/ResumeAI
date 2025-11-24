import SectionTitle from "$/components/other/SectionTitle";
import Input1 from "$/components/inputs/Input1";
import DateInput from "$/components/inputs/DateInput";
import Input2 from "$/components/inputs/Input2";
import Button1 from "$/components/buttons/Button1";
import DeleteButton from "$/components/buttons/DeleteButton";

function ProjectsSection({ data, setData }) {
    function addProject() {
        setData([
            ...data,
            {
                title: "",
                organization: "",
                location: "",
                isCurrent: false,
                from: "",
                to: "",
                description: [],
            }
        ])
    }

    function deleteProject(index) {
        setData(data.filter((_, i) => i !== index));
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
            <SectionTitle title="Projects" />

            {data.length == 0 && (
                <Button1 text="Add" onClick={addProject} />
            )}

            {data.length != 0 && (
                <div className="flex flex-col gap-4">
                    {data.map((project, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <h2 className="text-lg font-semibold">Project {i + 1}</h2>
                                <DeleteButton onClick={() => deleteProject(i)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input1 
                                    label="Title" 
                                    value={project.title}
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "title", e.target.value)}
                                />
                                <Input1 
                                    label="Organization Name"
                                    value={project.organization} 
                                    isRequired={false} 
                                    onChange={(e) => updateField(i, "organization", e.target.value)}
                                />
                                <Input1 
                                    label="Organization Location" 
                                    value={project.location}
                                    isRequired={false} 
                                    onChange={(e) => updateField(i, "location", e.target.value)}
                                />
                                <div className="flex flex-col gap-1">
                                    <label className="">I am currently working on this<span className="text-red-500 text-sm">*</span></label>
                                    <button className="border-1 border-black rounded-sm h-8 w-8 hover:cursor-pointer" onClick={() => setIsCurrent(i)}>
                                        {project.isCurrent && "✓"}
                                    </button>
                                </div>    
                                <DateInput 
                                    isCurrent={project.isCurrent}
                                    fromValue={project.from}
                                    toValue={project.to}
                                    onFromChange={(e) => updateField(i, "from", e.target.value)}
                                    onToChange={(e) => updateField(i, "to", e.target.value)}
                                />  
                                <Input2 
                                    label="Project Description" 
                                    values={project.description} 
                                    onAdd={(experience) => addDescription(i, experience)} 
                                    onDelete={(descriptionIndex) => deleteDescription(i, descriptionIndex)} 
                                />                        
                            </div>
                        </div>
                    ))}
                    <Button1 text="Add Another" onClick={addProject} />
                </div>
            )}

        </div>
    )
};

export default ProjectsSection;