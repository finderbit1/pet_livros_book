import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Trash2, 
  CheckCircle, 
  Circle, 
  Filter, 
  BookOpen, 
  Heart, 
  Sparkles,
  Calendar,
  Star
} from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: 'book' | 'pet' | 'general' | 'premium';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Carregar TODOs do localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('pet-book-todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Salvar TODOs no localStorage
  useEffect(() => {
    localStorage.setItem('pet-book-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        category: 'general',
        priority: 'medium',
        createdAt: new Date()
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'book': return <BookOpen className="w-4 h-4" />;
      case 'pet': return <Heart className="w-4 h-4" />;
      case 'premium': return <Sparkles className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-500 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const filteredTodos = todos.filter(todo => {
    const categoryMatch = selectedCategory === "all" || todo.category === selectedCategory;
    const priorityMatch = filterPriority === "all" || todo.priority === filterPriority;
    return categoryMatch && priorityMatch;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-effect">
                <CheckCircle className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-accent-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold hero-gradient">Lista de Tarefas</span>
              <span className="text-sm text-muted-foreground -mt-1">Organize seu projeto</span>
            </div>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Suas Tarefas
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Organize e acompanhe o progresso do seu livro de pet
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Add Todo Section */}
          <div className="lg:col-span-1">
            <Card className="card-gradient sticky top-24">
              <CardHeader>
                <h2 className="text-2xl font-bold">Nova Tarefa</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Ex: Escolher fotos do pet..."
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                  />
                </div>
                
                <Button 
                  onClick={addTodo}
                  className="w-full glow-effect"
                  disabled={!newTodo.trim()}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Tarefa
                </Button>

                {/* Quick Add Templates */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-muted-foreground">Templates Rápidos:</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setNewTodo("Escolher fotos do pet")}
                    >
                      <Heart className="w-3 h-3 mr-1" />
                      Fotos
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setNewTodo("Escrever história")}
                    >
                      <BookOpen className="w-3 h-3 mr-1" />
                      História
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setNewTodo("Escolher template")}
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Template
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setNewTodo("Revisar conteúdo")}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Revisar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Todo List Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="card-gradient text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold hero-gradient">{totalCount}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </CardContent>
              </Card>
              <Card className="card-gradient text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-500">{completedCount}</div>
                  <div className="text-sm text-muted-foreground">Concluídas</div>
                </CardContent>
              </Card>
              <Card className="card-gradient text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">
                    {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Progresso</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="card-gradient">
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Filtros:</span>
                  </div>
                  
                  <Button
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("all")}
                  >
                    Todas
                  </Button>
                  <Button
                    variant={selectedCategory === "book" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("book")}
                  >
                    <BookOpen className="w-3 h-3 mr-1" />
                    Livro
                  </Button>
                  <Button
                    variant={selectedCategory === "pet" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("pet")}
                  >
                    <Heart className="w-3 h-3 mr-1" />
                    Pet
                  </Button>
                  <Button
                    variant={selectedCategory === "premium" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("premium")}
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    Premium
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Todo List */}
            <div className="space-y-3">
              {filteredTodos.length === 0 ? (
                <Card className="card-gradient">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma tarefa encontrada</h3>
                    <p className="text-muted-foreground">
                      {selectedCategory === "all" 
                        ? "Adicione sua primeira tarefa para começar!" 
                        : "Nenhuma tarefa nesta categoria."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredTodos.map((todo) => (
                  <Card 
                    key={todo.id} 
                    className={`card-gradient smooth-transition hover:scale-[1.02] ${
                      todo.completed ? 'opacity-60' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                          className="flex-shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium ${
                            todo.completed ? 'line-through text-muted-foreground' : ''
                          }`}>
                            {todo.text}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getPriorityColor(todo.priority)}`}
                            >
                              {todo.priority}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              {getCategoryIcon(todo.category)}
                              <span>{todo.category}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              <span>{todo.createdAt.toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTodo(todo.id)}
                          className="flex-shrink-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

