import SectionTitle from "$/components/other/SectionTitle";
import Button1 from "$/components/buttons/Button1";
import DeleteButton from "$/components/buttons/DeleteButton";

function IntroductionSection({ data, setData }) {
    const isEmpty = !data.isAdded;

    function updateField(field, value) {
        setData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div>
            <SectionTitle title="Introduction" />

            {isEmpty && (
                <Button1 text="Add" onClick={() => updateField("isAdded", isEmpty)} />
            )}

            {!isEmpty && (
                <div className="flex flex-col">
                    <div className="flex justify-between items-end">
                        <label className="text-sm">Introduction<span className="text-red-500 text-sm">*</span></label>
                        <DeleteButton onClick={() => updateField("isAdded", isEmpty)} />
                    </div>
                    <textarea className="text-sm border-1 border-black rounded-sm px-2 py-2 focus:bg-border-800 max-w-104" onChange={(e) => updateField("text", e.target.value)} />
                </div>
            )}
        </div>
    )
};

export default IntroductionSection;