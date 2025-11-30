import { useState } from "react";

function AIRecommendationPanel({ rec }) {
    const [expanded, setExpanded] = useState(false);

    if (!rec) return null;

    const introduction = rec.introduction || null;
    const experiences = rec.experiences || [];
    const projects = rec.projects || [];
    const skills = rec.skills || null;

    return (
        <div className={"rounded-sm border-1 border-blue-200 bg-blue-50 text-blue-800 shadow-sm p-2"}>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-800 flex items-center justify-center text-sm font-semibold text-white">
                        AI
                    </div>
                    <span className="font-semibold text-lg">AI Resume Feedback</span>
                </div>

                <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="text-[10px] px-2 py-1 rounded-full border-1 border-blue-200 shadow-sm bg-white text-blue-800 hover:bg-blue-50 hover:cursor-pointer active:scale-95 transition"
                >
                {expanded ? "Hide details" : "Show details"}
                </button>
            </div>

            {/* Always show overall feedback */}
            {rec.overall_feedback && (
                <p className={`text-sm`}>
                    {rec.overall_feedback}
                </p>
            )}

            {/* Show only when expanded */}
            {expanded && (introduction || experiences.length > 0 || projects.length > 0 || skills) && (
                <div className="mt-4 flex flex-col gap-4">
                    {/* Introduction */}
                    {introduction && (
                        <div>
                            <p className={"text-lg font-semibold mb-1"}>
                                Introduction
                            </p>
                            <div className="space-y-2">
                                <div className="bg-white border border-blue-100 rounded-lg px-2 py-2">
                                    <span className="text-md font-semibold">Recommendation</span>
                                    <p className="text-sm text-blue-800">{introduction.comment}</p>
                                </div>
                                <div className="bg-white border border-blue-100 rounded-lg px-2 py-2">
                                    <span className="text-md font-semibold">Example</span>
                                    <p className="text-sm text-blue-800">{introduction.suggested_text}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Experiences */}
                    {experiences.length > 0 && (
                        <div>
                            <p className={"text-lg font-semibold mb-1"}>
                                Experiences
                            </p>
                            <div className="space-y-2">
                                {experiences.map((exp) => (
                                    <div
                                        key={exp.index}
                                        className="bg-white border border-blue-100 rounded-lg px-2 py-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`text-md font-semibold`}>
                                                {exp.original_title}
                                            </span>
                                            <span className="text-[10px] text-blue-800">
                                                #{exp.index + 1}
                                            </span>
                                        </div>

                                        {exp.comment && (
                                            <p className={"text-sm text-blue-800"}>
                                                {exp.comment}
                                            </p>
                                        )}

                                        {Array.isArray(exp.suggested_bullets) && exp.suggested_bullets.length > 0 && (
                                            <ul className={"list-disc list-inside text-sm text-blue-800"}>
                                                {exp.suggested_bullets.map((b, i) => (
                                                    <li key={i}>{b}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <div>
                            <p className={"text-lg font-semibold mb-1"}>
                                Projects
                            </p>
                            <div className="space-y-2">
                                {projects.map((project) => (
                                    <div
                                        key={project.index}
                                        className="bg-white border border-blue-100 rounded-lg px-2 py-2"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className={`text-md font-semibold`}>
                                                {project.original_title}
                                            </span>
                                            <span className="text-[10px] text-blue-800">
                                                #{project.index + 1}
                                            </span>
                                        </div>

                                        {project.comment && (
                                            <p className={"text-sm text-blue-800"}>
                                                {project.comment}
                                            </p>
                                        )}

                                        {Array.isArray(project.suggested_bullets) && project.suggested_bullets.length > 0 && (
                                            <ul className={"list-disc list-inside text-sm text-blue-800"}>
                                                {project.suggested_bullets.map((b, i) => (
                                                    <li key={i}>{b}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skills */}
                    {skills && (
                        <div>
                            <p className={"text-lg font-semibold mb-1"}>
                                Skills
                            </p>
                            <div className="bg-white border border-blue-100 rounded-lg px-2 py-2">
                                {skills.comment && (
                                    <p className={"text-sm text-blue-800 mb-1"}>
                                        {skills.comment}
                                    </p>
                                )}
                                {Array.isArray(skills.possible_groupings) && skills.possible_groupings.length > 0 && (
                                    <div className="space-y-2">
                                        {skills.possible_groupings.map((group, i) => {
                                            if (typeof group === "string") {
                                                return (
                                                    <p key={i}>{group}</p>
                                                );
                                            }
                                            return (
                                                <div key={i}>
                                                    <p className={"text-md font-semibold"}>
                                                        {group.group_name}
                                                    </p>
                                                    <p className="text-sm">
                                                        {Array.isArray(group.items) ? group.items.join(", ") : ""}
                                                    </p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default AIRecommendationPanel;
