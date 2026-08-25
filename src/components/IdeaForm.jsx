import { useEffect, useState } from "react";

function IdeaForm({
  onAdd,
  onUpdate,
  editingIdea,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Load selected idea into form
  useEffect(() => {
    if (editingIdea) {
      setName(editingIdea.name);
      setDescription(editingIdea.description);
    } else {
      setName("");
      setDescription("");
    }

    setError("");
  }, [editingIdea]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter an idea name.");
      return;
    }

    if (!description.trim()) {
      setError("Please enter a description.");
      return;
    }

    if (editingIdea) {
      onUpdate(
        name.trim(),
        description.trim()
      );
    } else {
      onAdd(
        name.trim(),
        description.trim()
      );
    }

    setName("");
    setDescription("");
    setError("");
  };

  return (
    <form
      className="idea-form"
      onSubmit={handleSubmit}
    >

      <div className="form-group">

        <label htmlFor="idea-name">
          Idea Name
        </label>

        <input
          id="idea-name"
          type="text"
          placeholder="e.g. Personal Finance App"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
        />

      </div>


      <div className="form-group">

        <label htmlFor="idea-description">
          Description
        </label>

        <textarea
          id="idea-description"
          placeholder="Describe your idea..."
          rows="4"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
        />

      </div>


      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}


      <div className="form-actions">

        <button
          type="submit"
          className="primary-button"
        >
          {editingIdea ? "✓ Update Idea" : "+ Add Idea"}
        </button>


        {editingIdea && (
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

      </div>

    </form>
  );
}

export default IdeaForm;