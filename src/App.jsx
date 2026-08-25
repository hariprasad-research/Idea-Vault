import { useEffect, useState } from "react";
import IdeaForm from "./components/IdeaForm";
import IdeaCard from "./components/IdeaCard";
import EmptyState from "./components/EmptyState";
import "./App.css";

function App() {
  const [ideas, setIdeas] = useState(() => {
    const savedIdeas = localStorage.getItem("appIdeas");

    return savedIdeas ? JSON.parse(savedIdeas) : [];
  });

  const [editingIdea, setEditingIdea] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Save ideas whenever ideas change
  useEffect(() => {
    localStorage.setItem("appIdeas", JSON.stringify(ideas));
  }, [ideas]);

  // Add new idea
  const addIdea = (name, description) => {
    const newIdea = {
      id: Date.now(),
      name,
      description,
      createdAt: new Date().toLocaleDateString(),
    };

    setIdeas((previousIdeas) => [
      newIdea,
      ...previousIdeas,
    ]);
  };

  // Delete idea
  const deleteIdea = (id) => {
    setIdeas((previousIdeas) =>
      previousIdeas.filter((idea) => idea.id !== id)
    );
  };

  // Start editing
  const startEdit = (idea) => {
    setEditingIdea(idea);
  };

  // Update idea
  const updateIdea = (name, description) => {
    setIdeas((previousIdeas) =>
      previousIdeas.map((idea) =>
        idea.id === editingIdea.id
          ? {
              ...idea,
              name,
              description,
            }
          : idea
      )
    );

    setEditingIdea(null);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingIdea(null);
  };

  // Search
  const filteredIdeas = ideas.filter((idea) => {
    const search = searchTerm.toLowerCase();

    return (
      idea.name.toLowerCase().includes(search) ||
      idea.description.toLowerCase().includes(search)
    );
  });

  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div className="header-content">

          <div>
            <div className="logo">
              <span className="logo-icon">💡</span>
              <span>IdeaVault</span>
            </div>

            <p className="subtitle">
              Capture your ideas. Build something amazing.
            </p>
          </div>

          <div className="idea-count">
            <span>{ideas.length}</span>
            <small>
              {ideas.length === 1 ? "Idea" : "Ideas"}
            </small>
          </div>

        </div>
      </header>


      {/* Main */}
      <main className="container">

        {/* Form section */}
        <section className="form-section">

          <div className="section-heading">
            <div>
              <h2>
                {editingIdea ? "Edit Idea" : "Create a New Idea"}
              </h2>

              <p>
                {editingIdea
                  ? "Update your idea details below."
                  : "Turn your thoughts into your next great project."}
              </p>
            </div>
          </div>

          <IdeaForm
            onAdd={addIdea}
            onUpdate={updateIdea}
            editingIdea={editingIdea}
            onCancel={cancelEdit}
          />

        </section>


        {/* Ideas section */}
        <section className="ideas-section">

          <div className="ideas-header">

            <div>
              <h2>My Ideas</h2>

              <p>
                {ideas.length === 0
                  ? "Your ideas will appear here."
                  : `${ideas.length} ${
                      ideas.length === 1 ? "idea" : "ideas"
                    } saved`}
              </p>
            </div>


            {/* Search */}
            {ideas.length > 0 && (
              <div className="search-box">

                <span>🔍</span>

                <input
                  type="text"
                  placeholder="Search ideas..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />

              </div>
            )}

          </div>


          {/* Ideas */}
          {filteredIdeas.length === 0 ? (

            <EmptyState
              hasIdeas={ideas.length > 0}
            />

          ) : (

            <div className="ideas-grid">

              {filteredIdeas.map((idea) => (

                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onEdit={startEdit}
                  onDelete={deleteIdea}
                />

              ))}

            </div>

          )}

        </section>

      </main>


      {/* Footer */}
      <footer className="footer">
        <p>
          IdeaVault • Built with React
        </p>
      </footer>

    </div>
  );
}

export default App;