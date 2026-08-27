function IdeaCard({ idea, onEdit, onDelete, onApprove }) {
  return (
    <div className="idea-card">
      <h3>{idea.name}</h3>

      <p>{idea.description}</p>

      <p className="idea-status">
        Status: <strong>{idea.status}</strong>
      </p>

      <div className="idea-actions">
        <button
          className="edit-btn"
          onClick={() => onEdit(idea)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(idea.id)}
        >
          Delete
        </button>

        {idea.status === "draft" && (
          <button
            className="approve-btn"
            onClick={() => onApprove(idea.id)}
          >
            Approve
          </button>
        )}
      </div>
    </div>
  );
}

export default IdeaCard;