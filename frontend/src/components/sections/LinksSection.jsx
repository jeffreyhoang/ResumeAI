import SectionTitle from "$/components/other/SectionTitle";
import Input1 from "$/components/inputs/Input1";
import Button1 from "$/components/buttons/Button1";
import DeleteButton from "$/components/buttons/DeleteButton";


function LinksSection({ data, setData }) {
    function addLink() {
        setData([...data, ""]);
    }

    function updateLink(index, value) {
        const updated = [...data];
        updated[index] = value;
        setData(updated)
    }

    function deleteLink(index) {
        const updated = data.filter((_, i) => i !== index);
        setData(updated);
    }

    return (
        <div>
            <SectionTitle title="Links" />

            {data.length == 0 && (
                <Button1 text="Add" onClick={addLink} />
            )}

            {data.length != 0 && (
                <div className="flex flex-col gap-4">
                    {data.map((link, i) => (
                        <div key={i}>
                            <div className="flex justify-between mb-2">
                                <h2 className="text-lg font-semibold">Link {i + 1}</h2>
                                <DeleteButton onClick={() => deleteLink(i)} />
                            </div>
                            <Input1 label="URL" value={link} isRequired={true} onChange={(e) => updateLink(i, e.target.value)} />
                        </div>
                    ))}
                    <Button1 text="Add Another" onClick={addLink} />
                </div>
            )}

        </div>
    )
};

export default LinksSection;