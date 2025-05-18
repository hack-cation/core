import './VotePage.css';
import { ensureAbsoluteUrl } from '../../utils/absoluteUrl.js'



export function VotePage({ id, name, maxVotes, eventDate, projects }) {
    return (
        <main className="vote-page">
            <h2 className="text-center">Projects for {name}</h2>
            <h3 className="text-center">You can vote for a maximum of {maxVotes} projects</h3>
            {projects && projects.length > 0 ? (
                <ul className="projects-list">
                    {projects.map((project) => (
                        <li key={project.id} className="project-item">
                            <div className="project-item__details">
                                <span className="project-item__name">{project.name}</span>
                                <div className="project-item__meta">
                                    Submitted by: {project.author || 'N/A'}
                                </div>
                                <div className="project-item__meta">
                                    Git URL: <a href={ensureAbsoluteUrl(project.gitUrl)} target="_blank" rel="noopener noreferrer">{project.gitUrl || 'N/A'}</a>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No projects available for voting in this campaign yet.</p>
            )}
        </main>
    );
}