import { useState, useEffect } from 'react';
import { db } from './lib/supabase';
import { useAuth } from './contexts/AuthContext';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  user_id: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchTodos() {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await db.select<Todo[]>('todos', {
          filter: [{ column: 'user_id', value: user.id }],
          order: { column: 'created_at', ascending: false }
        });

        if (error) throw error;
        
        if (data) {
          setTodos(data);
        }
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to load todos. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your todos</h1>
        {/* You could add login/signup buttons here */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Todos</h1>
      
      {loading && <p>Loading todos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <>
          {todos.length === 0 ? (
            <p>No todos found. Add your first todo!</p>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li key={todo.id} className="p-3 border rounded">
                  <span className={todo.completed ? 'line-through' : ''}>
                    {todo.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
          
          {/* Add Todo form would go here */}
        </>
      )}
    </div>
  );
}

export default App;
