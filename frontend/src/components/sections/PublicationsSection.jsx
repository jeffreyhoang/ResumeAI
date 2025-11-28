import { emptyPublication } from "$/models/resume";
import SectionTitle from "$/components/other/SectionTitle";
import Button1 from "$/components/buttons/Button1";
import DeleteButton from "$/components/buttons/DeleteButton";
import Input1 from "$/components/inputs/Input1";
import Input2 from "$/components/inputs/Input2";

function PublicationsSection({ data, setData }) {
    function addPublication() {
        setData([...data, emptyPublication()])
    }

    function deletePublication(index) {
        setData(data.filter((_, i) => i !==  index));
    }

    function updateField(index, field, value) {
        const updated = [...data]
        updated[index][field] = value
        setData(updated)
    }

    function addAuthor(index, newAuthor) {
        const updated = [...data];
        updated[index].authors.push(newAuthor);
        setData(updated);
    }

    function deleteAuthor(index, authorIndex) {
        const updated = [...data]
        updated[index].authors = updated[index].authors.filter((_, i) => i !== authorIndex);
        setData(updated);
    }

    return (
        <div>
            <SectionTitle title="Publications" />

            {data.length == 0 && (
                <Button1 text="Add" onClick={addPublication} />
            )}

            {data.length != 0 && (
                <div className="flex flex-col gap-4">
                    {data.map((publication, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <h2 className="text-lg font-semibold">Publication {i + 1}</h2>
                                <DeleteButton onClick={() => deletePublication(i)} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Input1 
                                    label="Title" 
                                    value={publication.title}
                                    isRequired={true}
                                    onChange={(e) => updateField(i, "title", e.target.value)}
                                />
                                <div className="flex flex-col gap-1 w-40">
                                    <label className="text-sm">
                                        Date
                                        <span className="text-red-500 text-sm">*</span>
                                    </label>
                                    <input 
                                        type="month" 
                                        required={true}
                                        value={publication.date}
                                        onChange={(e) => updateField(i, "date", e.target.value)}
                                        className="text-sm border-1 border-black rounded-sm px-2 py-2 focus:bg-border-800 hover:cursor-pointer" 
                                    />
                                </div>
                                <Input2 
                                    label="Authors" 
                                    isRequired={true} 
                                    values={publication.authors} 
                                    onAdd={(author) => addAuthor(i, author)} 
                                    onDelete={(authorIndex) => deleteAuthor(i, authorIndex)} 
                                />
                                <Input1 
                                    label="DOI"
                                    value={publication.doi} 
                                    isRequired={true} 
                                    onChange={(e) => updateField(i, "doi", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    <Button1 text="Add Another" onClick={addPublication} />
                </div>
            )}
        </div>
    )
};

export default PublicationsSection;