import { emptySkill } from "$/models/resume";
import SectionTitle from "$/components/other/SectionTitle";
import Button1 from "$/components/buttons/Button1";
import DeleteButton from "$/components/buttons/DeleteButton";
import Input1 from "$/components/inputs/Input1";
import Input2 from "$/components/inputs/Input2";


function SkillsSection({ data, setData }) {
    function addSkill() {
        setData([...data, emptySkill])
    }

    function deleteSkill(index) {
        setData(data.filter((_, i) => i !== index))
    }

    function updateField(index, field, value) {
        const updated = [...data]
        updated[index][field] = value
        setData(updated)
    }

    function addSkillItem(index, newSkill) {
        const updated = [...data];
        updated[index].skillsList.push(newSkill);
        setData(updated);
    }

    function deleteSkillItem(index, skillIndex) {
        const updated = [...data];
        updated[index].skillsList = updated[index].skillsList.filter((_, i) => i !== skillIndex);
        setData(updated);
    }

    return (
        <div>
            <SectionTitle title="Skills" />

            {data.length == 0 && (
                <Button1 text="Add" onClick={addSkill} />
            )}

            {data.length != 0 && (
                <div className="flex flex-col gap-4">
                    {data.map((skill, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <h2 className="text-lg font-semibold">Skill {i + 1}</h2>
                                <DeleteButton onClick={() => deleteSkill(i)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input1 
                                    label="Title (e.g., Technologies, Soft Skills)" 
                                    value={skill.title}
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "title", e.target.value)}
                                />
                                <Input2 
                                    label="Skills List" 
                                    isRequired={true} 
                                    values={skill.skillsList} 
                                    onAdd={(skill) => addSkillItem(i, skill)} 
                                    onDelete={(skillIndex) => deleteSkillItem(i, skillIndex)} 
                                />
                            </div>
                        </div>
                    ))}
                    <Button1 text="Add Another" onClick={addSkill} />
                </div>
            )}

        </div>
    )
};

export default SkillsSection;