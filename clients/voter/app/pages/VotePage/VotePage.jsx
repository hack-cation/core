import { ensureAbsoluteUrl } from '../../utils/absoluteUrl.js'
import {useState} from "react";

export function VotePage({ name, maxVotes, projects, onSubmitVotes }) {
    const [votes, setVotes] = useState([]);

    const toggleVote = (e, projectId) => {
        e.stopPropagation();
        if (votes.includes(projectId)) {
            setVotes(prevVotes => {
                return prevVotes.filter(vote => vote !== projectId);
            });
        } else {
            if (votes.length < maxVotes) {
                setVotes(prevVotes => {
                    return [...prevVotes, projectId]
                });
            }

        }
    };

    const handleVoteSubmission = async () => {
      if (onSubmitVotes && votes.length > 0) {
          await onSubmitVotes(votes);
      }
    };

    return (
        <main className="container mx-auto p-4 md:p-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
                Projects for {name}
            </h2>
            <h3 className="text-xl text-center text-gray-600 mb-8 md:mb-12">
                You can vote for a maximum of {maxVotes} projects.
            </h3>
            {projects && projects.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className={`${votes.includes(project.id) ? 'bg-green-200' : 'bg-slate-200'} rounded-lg 
                            shadow-lg p-4 hover:scale-105 transition-all duration-300 ease-in-out flex cursor-pointer
                            flex-col justify-between`}
                                onClick={(e) => toggleVote(e, project.id)}
                            >
                                <div>
                                    <h4 className="text-xl font-semibold text-gray-800 mb-3 truncate">
                                        {project.name}
                                    </h4>
                                    <div className="text-sm text-gray-600 mb-2">
                                        Submitted by: <span className="font-medium text-gray-700">{project.author || 'N/A'}</span>
                                    </div>
                                    {project.gitUrl && (
                                        <div className="mt-10 flex justify-center">
                                            <a
                                                href={ensureAbsoluteUrl(project.gitUrl)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-block text-sm font-semibold leading-none
                                            text-white bg-slate-500 hover:bg-slate-600 rounded-lg shadow
                                             hover:shadow-md transition-all duration-300 ease-in-out focus:outline-none
                                             focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                View Project Source
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {onSubmitVotes && (
                        <div className="mt-10 flex justify-center">
                            <button
                                type="button"
                                onClick={handleVoteSubmission}
                                disabled={votes.length === 0}
                                className={`
                                    px-10 py-5 w-64 text-base font-semibold text-white rounded-lg shadow-md
                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100
                                    transition-all duration-250 ease-in-out hover:scale-105
                                    ${votes.length === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-600' 
                                    }
                                `}
                            >
                                Submit {votes.length > 0 ? `${votes.length} Vote${votes.length !== 1 ? 's' : ''}` :
                                'Your Votes'}
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p className="text-center text-gray-500 mt-10">
                    No projects available for voting in this campaign yet.
                </p>
            )}
        </main>
    );
}