function IdeaCard({ idea, onEdit, onDelete }) {
  return (
    <div className="idea-card">
      <h3>{idea.name}</h3>

      <p>{idea.description}</p>
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
</div>
    </div>
  );
}

export default IdeaCard;