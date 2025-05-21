import {ensureAbsoluteUrl} from "../../utils/absoluteUrl.js";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function RankingsPage({id, name, maxVotes, eventDate, isActive, projects}) {
    const [animationParent] = useAutoAnimate();

    return (
        <main className="container mx-auto p-4 md:p-8">
            {
                isActive ? (
                    <h1 className="text-3xl md:text-4xl text-center transition-all duration-300 ease-in-out">
                        {name} Is
                        <span
                            className="mx-3 text-green-600 animate-pulse text-shadow-lg
                            filter-[drop-shadow(0_0_10px_rgba(16,185,129,0.8))_drop-shadow(0_0_25px_rgba(16,185,129,0.5))]"
                        >
                            LIVE
                        </span>
                        For Voting
                    </h1>
                ) : (
                    <div>
                        <h1 className="text-3xl md:text-4xl text-center transition-all duration-300 ease-in-out">
                            {name} -
                            <span
                                className="mx-3 text-blue-700 font-semibold
                        filter-[drop-shadow(0_0_7px_rgba(29,78,216,0.5))_drop-shadow(0_0_15px_rgba(29,78,216,0.3))]"
                            >
                        Final
                    </span>
                            Results
                        </h1>
                    </div>
                )
            }
            <div>
                {projects && projects.length > 0 ? (
                    <div ref={animationParent} className="mt-8 md:mt-12">
                        {projects.map((project, index) => {
                            const rank = index + 1;

                            const cardContent = (
                                <div key={project.id} className="bg-white rounded-xl shadow-lg p-6 flex items-center
                                 space-x-4 sm:space-x-6 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
                                    <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex
                                     items-center justify-center text-xl sm:text-2xl font-bold
                    ${rank === 1 && project.votes !== 0 ? 'bg-gold text-gold-contrast ring-2 ring-gold-contrast' :
                                        rank === 2 && project.votes !== 0 ? 'bg-silver text-silver-contrast ring-2 ring-silver-contrast' :
                                            rank === 3 && project.votes !== 0 ? 'bg-bronze text-bronze-contrast ring-2 ring-bronze-contrast' :
                                                'bg-slate-200 text-slate-700'
                                    }`}>
                                        {(rank === 1 && project.votes !== 0) && <span role="img" aria-label="trophy"
                                                                                      className="mr-1 sm:mr-1.5">
                                            🏆
                                        </span>}
                                        {rank}
                                    </div>

                                    <div
                                        className="flex-grow min-w-0">
                                        <h4 className="text-lg sm:text-xl font-bold text-slate-800 truncate mb-1"
                                            title={project.name}>
                                            {project.name}
                                        </h4>
                                        <p className="text-xs sm:text-sm text-gray-500 mb-2">
                                            Submitted by: <span
                                            className="font-medium text-gray-700">{project.author || 'N/A'}</span>
                                        </p>
                                    </div>

                                    <div className="flex-shrink-0 text-center pl-2 sm:pl-4">
                                        <p className="text-2xl sm:text-3xl font-bold text-slate-800">
                                            {project.votes}
                                        </p>
                                        <p className="text-xxs sm:text-xs text-gray-500 uppercase tracking-wider">
                                            Votes
                                        </p>
                                    </div>
                                </div>
                            )

                            return (
                                <a
                                    key={project.id}
                                    href={ensureAbsoluteUrl(project.gitUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block"
                                >
                                    {cardContent}
                                </a>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">
                        Wow! There's somehow no projects for this campaign yet.
                    </p>
                )}
            </div>
        </main>
    );
}
