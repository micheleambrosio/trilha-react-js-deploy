# React.JS | Axios

## Objetivo

O objetivo do curso é explorar a possibilidade de realizar requisições HTTP com a biblioteca Axios, muito utilizada em aplicações React devido a sua simplicidade, flexibilidade e recursos avançados.

## Pré-requisitos

- Requisições HTTP, APIs, Rest e Restfull
- Introdução ao React
- Componentes, propriedades e estados
- Introdução aos hooks
- Hook `useState`
- Hook `useEffect`

## Executando o projeto

Instale as dependências do projeto

```
yarn
```

Execute o projeto em um servidor de desenvolvimento

```
yarn dev
```

# Introdução ao Axios

Axios é uma biblioteca JavaScript popular usada para fazer requisições HTTP a partir do navegador ou Node.js. Ele é amplamente utilizado em aplicações React devido à sua simplicidade, flexibilidade e recursos avançados, como: 

- Interceptors;
- Cancelamento de requisições;
- Tratamento de erros.

Dentre os benefícios de se utilizar o Axios, destaca-se:

1. **Sintaxe mais simples e intuitiva**: Axios tem uma API mais amigável e fácil de usar em comparação com a Fetch API, que requer mais código para tarefas comuns, como enviar dados JSON.
2. **Transformação automática de dados**: Axios automaticamente transforma os dados de resposta em JSON, enquanto com a Fetch API você precisa fazer isso manualmente.
3. **Interceptores**: Axios permite interceptar requisições e respostas, o que é útil para adicionar headers, autenticação, ou tratar erros globalmente.
4. **Cancelamento de requisições**: Axios suporta cancelamento de requisições, o que é útil para evitar requisições desnecessárias quando o usuário navega para outra página ou cancela uma ação.
5. **Tratamento de erros mais robusto**: Axios fornece uma maneira mais consistente de tratar erros, incluindo erros de rede e respostas HTTP com status de erro.
6. **Suporte a navegadores antigos**: Axios tem melhor suporte para navegadores antigos em comparação com a Fetch API.

## Instalação do Axios

Para começar a usar o Axios em um projeto React, você precisa instalá-lo via npm, yarn ou com o gerenciador de dependências que preferir:

```bash
npm install axios
```

```bash
yarn add axios
```

# Requisições HTTP

## Requisição GET

A requisição GET é usada para **obter dados** de um servidor. É o método mais comum para buscar informações, como listar posts, usuários, ou qualquer outro recurso.

```jsx
import axios from 'axios';

const fetchPosts = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(response.data); // Dados retornados pela API
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
  }
};

fetchPosts();
```

## Requisição POST

A requisição POST é usada para **enviar dados** ao servidor, geralmente para criar um novo recurso. Por exemplo, ao criar um novo post, usuário ou enviar um formulário.

```jsx
import axios from 'axios';

const createPost = async () => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1,
    });
    console.log(response.data); // Resposta do servidor com o novo recurso criado
  } catch (error) {
    console.error('Erro ao criar o post:', error);
  }
};

createPost();
```

## Requisição PUT

A requisição PUT é usada para **atualizar um recurso existente** no servidor. Ela substitui completamente o recurso no endereço especificado. Por exemplo, ao editar um post ou atualizar informações de um usuário.

```jsx
import axios from 'axios';

const updatePost = async () => {
  try {
    const response = await axios.put('https://jsonplaceholder.typicode.com/posts/1', {
      id: 1,
      title: 'foo atualizado',
      body: 'bar atualizado',
      userId: 1,
    });
    console.log(response.data); // Resposta do servidor com o recurso atualizado
  } catch (error) {
    console.error('Erro ao atualizar o post:', error);
  }
};

updatePost();
```

## Requisição PATCH

Caso precise modificar apenas um campo, utilize `axios.patch()`.

```jsx
const partialUpdate = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { title: 'Título atualizado' });
    console.log('Post atualizado parcialmente:', response.data);
  } catch (error) {
    console.error('Erro ao atualizar parcialmente:', error);
  }
};

partialUpdate();

```

## Requisição DELETE

A requisição DELETE é usada para **remover um recurso** do servidor. Por exemplo, ao deletar um post, usuário ou qualquer outro recurso.

```jsx
import axios from 'axios';

const deletePost = async () => {
  try {
    await axios.delete('https://jsonplaceholder.typicode.com/posts/1');
    console.log('Post deletado com sucesso');
  } catch (error) {
    console.error('Erro ao deletar o post:', error);
  }
};

deletePost();
```

# Tratamento de erros

Axios facilita o tratamento de erros, fornecendo uma resposta de erro consistente. Você pode capturar erros de rede, erros de timeout e erros de resposta HTTP.

```jsx
import axios from 'axios';

async function fetchData() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/invalid-url');
    console.log(response.data);
  } catch (error) {
    if (error.response) {
      console.error('Erro de resposta:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      return;
    }

    if (error.request) {
      console.error('Erro de requisição:', error.request);
      return;
    }

    console.error('Erro:', error.message);
  }
}

fetchData();
```

- **`error.response`** – O servidor respondeu com status de erro (400, 404, 500, etc.).
- **`error.request`** – O pedido foi feito, mas não houve resposta.
- **`error.message`** – Algum outro erro ocorreu.

# Cancelamento de requisições

Axios permite cancelar requisições usando o `AbortController`. Isso é útil para evitar requisições desnecessárias quando o usuário navega para outra página ou cancela uma ação.

```jsx
useEffect(() => {
  const controller = new AbortController();

  axios.get('https://jsonplaceholder.typicode.com/posts', {
    signal: controller.signal,
  })
  .then(response => {
    setPosts(response.data);
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error fetching posts:', error);
    }
  });

  return () => {
    controller.abort();
  };
}, []);
```

# Boas práticas ao implementar o Axios com React

## Criar uma instância do Axios

Criar uma instância de Axios com configurações padrão é uma boa prática para reutilizar configurações comuns, como a URL base, headers, e timeout.

```jsx
// services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export const getPosts = async () => {
  const res = await api.get("/posts");
  return res.data.posts;
};

export const addPost = async (title: string, body: string) => {
  const res = await api.post("/posts", { title, body });
  return res.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};

export const editPost = async (id: number, title: string, body: string) => {
  const res = await api.put(`/posts/${id}`, { id, title, body });
  return res.data;
};

```

## Separar a lógica de API em um arquivo ou hook

Separar a lógica de API em um arquivo ou Hook específico ajuda a manter o código organizado e facilita a manutenção.

```jsx
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Post {
  id: number;
  title: string;
  body: string;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/posts`);
        setPosts(res.data.posts);
      } catch (err) {
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const addPost = async (title: string, body: string) => {
    try {
      const res = await axios.post(`${API_URL}/posts`, { title, body });
      setPosts((prev) => [res.data, ...prev]);
    } catch {
      setError("Error adding post");
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch {
      setError(`Error deleting post ${id}`);
    }
  };

  const editPost = async (id: number, title: string, body: string) => {
    if (!confirm("Are you sure you want to edit this post?")) return;

    try {
      const res = await axios.put(`${API_URL}/posts/${id}`, { id, title, body });
      setPosts((prev) => prev.map((post) => (post.id === id ? res.data : post)));
    } catch {
      setError(`Error editing post ${id}`);
    }
  };

  return { posts, loading, error, addPost, deletePost, editPost };
};
```

Agora podemos usar o hook em qualquer componente:

```jsx
const { posts, loading, error, addPost, deletePost, editPost } = usePosts();
```