import { useState } from "react";
import SectionTitle from "$/components/other/SectionTitle";
import Input1 from "$/components/inputs/Input1";

function PersonalInformationSection({ data, setData }) {
    function updateField(field, value) {
        setData(prev => ({ ...prev, [field]: value }))
    }

    return (
        <div>
            <SectionTitle title="Personal Information" />
            <form className="flex flex-col gap-4">
                <Input1 
                    label="Name" 
                    isRequired={true}
                    value={data.name}
                    onChange={(e) => updateField("name", e.target.value)}
                />
                <Input1 
                    label="Location" 
                    isRequired={true}
                    value={data.location}
                    onChange={(e) => updateField("location", e.target.value)}
                />
                <Input1 
                    label="Email" 
                    isRequired={true}
                    value={data.email}
                    onChange={(e) => updateField("email", e.target.value)}
                />
                <Input1 
                    label="Phone Number" 
                    isRequired={true}
                    value={data.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                />
            </form>
        </div>
    )
}

export default PersonalInformationSection;