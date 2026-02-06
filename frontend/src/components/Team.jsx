export default function Team() {
  const members = [
    { name: "Hetav Antani", role: "Full Stack Developer", initial: "H" },
    { name: "Kaushal Babariya", role: "Backend Developer", initial: "K" }
  ];

  return (
    <section id="team">
      <div className="section-content">
        <h2>Our Expert Team</h2>
        <div className="team-grid">
          {members.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-photo">{member.initial}</div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}