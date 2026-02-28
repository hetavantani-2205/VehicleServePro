export default function Team() {
  const members = [
    {
      name: "Hetav Antani",
      role: "Lead Full Stack Architect",
      initial: "H",
      bio: "Specializing in automotive cloud infrastructure, real-time diagnostics, frontend architecture, and AI-driven vehicle assistance systems."
    },
    {
      name: "Kaushal Babariya",
      role: "Backend Systems Engineer",
      initial: "K",
      bio: "Focused on scalable backend architecture, secure authentication, REST API development, database optimization, and payment integration systems."
    }
  ];

  return (
    <section className="team-bento-section">
      <div className="container">
        <div className="section-header-v2">
          <span className="platform-tag">Architects</span>
          <h2 className="main-title-clean">
            The <span>Expert</span> Team
          </h2>
        </div>

        <div className="team-bento-grid">
          {members.map((member, index) => (
            <div className="team-bento-card" key={index}>
              <div className="member-avatar-wrapper">
                <div className="member-gradient-circle">
                  {member.initial}
                </div>
              </div>

              <div className="member-details-v2">
                <h3>{member.name}</h3>
                <span className="member-role-tag">
                  {member.role}
                </span>

                {/* ✅ Dynamic Bio */}
                <p className="member-bio">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}