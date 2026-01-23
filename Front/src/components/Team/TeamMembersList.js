import React from "react";
import "./Team.css";

export default function TeamMembersList({ team, allResearchers = [], teamResearchers }) {
  // Fallback au cas où teamResearchers n’est pas fourni ou vide :
  const getMembersFromAll = (team, allResearchers) => {
    if (!team || !Array.isArray(allResearchers)) return [];

    return allResearchers.filter(r =>
      Array.isArray(r?.belongsTeamList) &&
      r.belongsTeamList.some(bt =>
        bt.team && bt.team.teamId === team.teamId   // adapte si ton champ est différent
      )
    );
  };

  const members =
    Array.isArray(teamResearchers) && teamResearchers.length > 0
      ? teamResearchers
      : getMembersFromAll(team, allResearchers);

  if (!team) return <div>No team selected.</div>;
  if (!members.length) {
    return (
      <div className="card">
        <div className="card-header">
          Membres de « {team.teamName} »
        </div>
        <div className="card-body">
          No Members found for this team.
        </div>
      </div>
    );
  }

  return (
    <div className="card team-list-table">
      <div className="card-header">
        Member of « {team.teamName} » ({members.length})
      </div>
      <ul className="list-group list-group-flush">
        {members.map(m => (
          <li
            key={m.researcherId}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span className="member-name">
              {[m.researcherName, m.researcherSurname].filter(Boolean).join(" ")}
            </span>
            <small className="text-muted member-email" title={m.researcherEmail}>
              {m.researcherEmail}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}