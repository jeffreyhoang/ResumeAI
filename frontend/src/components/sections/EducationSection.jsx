import { emptyEducation } from "$/models/resume";
import SectionTitle from "$/components/other/SectionTitle";
import Input1 from "$/components/inputs/Input1";
import DateInput from "$/components/inputs/DateInput";
import Input2 from "$/components/inputs/Input2";
import Button1 from "$/components/buttons/Button1";
import DeleteButton from "$/components/buttons/DeleteButton";

function EducationSection({ data, setData }) {
    function addEducation() {
        setData([...data, emptyEducation()])
    }

    function deleteEducation(index) {
        setData(data.filter((_, i) => i !== index));
    }

    function updateField(index, field, value) {
        const updated = [...data]
        updated[index][field] = value
        setData(updated)
    }

    function addCoursework(index, newCourse) {
        const updated = [...data];
        updated[index].coursework.push(newCourse);
        setData(updated)
    }

    function deleteCoursework(index, courseIndex) {
        const updated = [...data];
        updated[index].coursework = updated[index].coursework.filter((_, i) => i !== courseIndex);
        setData(updated);
    }

    function addAward(index, newAward) {
        const updated = [...data];
        updated[index].awards.push(newAward);
        setData(updated);
    }

    function deleteAward(index, awardIndex) {
        const updated = [...data];
        updated[index].awards = updated[index].awards.filter((_, i) => i !== awardIndex);
        setData(updated);
    }

    return (
        <div>
            <SectionTitle title="Education" />

            {data.length == 0 && (
                <Button1 text="Add" onClick={addEducation} />
            )}

            {data.length != 0 && (
                <div className="flex flex-col gap-4">
                    {data.map((education, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <h2 className="text-lg font-semibold">Education {i + 1}</h2>
                                <DeleteButton onClick={() => deleteEducation(i)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input1 
                                    label="School or University" 
                                    value={education.school} 
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "school", e.target.value)} 
                                />
                                <Input1 
                                    label="Degree" 
                                    value={education.degree} 
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "degree", e.target.value)} 
                                />
                                <Input1 
                                    label="Major" 
                                    value={education.major} 
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "major", e.target.value)} 
                                />
                                <Input1 
                                    label="GPA (4.0 Scale)" 
                                    value={education.gpa} 
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "gpa", e.target.value)} 
                                />
                                <DateInput 
                                    isCurrent={false} 
                                    fromValue={education.from} 
                                    toValue={education.to} 
                                    onFromChange={(e) => updateField(i, "from", e.target.value)}
                                    onToChange={(e) => updateField(i, "to", e.target.value)}
                                />
                                <Input2 
                                    label="Coursework" 
                                    values={education.coursework} 
                                    onAdd={(coursework) => addCoursework(i, coursework)} 
                                    onDelete={(courseIndex) => deleteCoursework(i, courseIndex)} 
                                />
                                <Input2 
                                    label="Awards" 
                                    values={education.awards} 
                                    onAdd={(award) => addAward(i, award)} 
                                    onDelete={(awardIndex) => deleteAward(i, awardIndex)} 
                                />
                            </div>
                        </div>
                    ))}
                    <Button1 text="Add Another" onClick={addEducation} />
                </div>
            )}

        </div>
    )
};

export default EducationSection;