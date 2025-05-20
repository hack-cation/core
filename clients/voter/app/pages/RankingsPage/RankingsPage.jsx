
export function RankingsPage({ id, name, maxVotes, eventDate, projects }) {
  return (
    <main className="">
        <h1>Welcome To {name}</h1>
        {projects && projects.length > 0 ? (
            <>
                {projects.map((project) => (
                    <div key={project.id} className="flex">
                        <p>{project.name}</p>
                        <p>Votes: {project.votes}</p>
                    </div>
                ))}
            </>
        ) : (
            <p className="text-center text-gray-500 mt-10">
                Wow! There's somehow no projects for this campaign yet.
            </p>
        )}
    </main>
  );
}
