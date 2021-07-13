import logo from './logo.svg';
import React, { useState,useRef, useMemo,useCallback,useReducer } from 'react';
import './App.css';

import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};
function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      };
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const { username, email } = state.inputs;

  const onChange = useCallback(e => {
    const { name, value } = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email
      }
    });
    nextId.current += 1;
  }, [username, email]);
  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    });
  }, []);

  const onRemove = useCallback(id => {
    dispatch({
      type: 'REMOVE_USER',
      id
    });
  }, []);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}/>
      <UserList users={users} onToggle={onToggle} onRemove={onRemove}/>
      <div>활성사용자 수 : 0</div>
    </>
  );
  // const [inputs, setInputs] = useState({
  //   username: '',
  //   email: ''
  // });
  // const { username, email } = inputs;
  // const onChange = e => { //ㅁ모르겟
  //   const { name, value } = e.target;
  //   setInputs({
  //     ...inputs,
  //     [name]: value
  //   });
  // };
  //
  //
  // const [users, setUsers] = useState([
  //   {
  //     id: 1,
  //     username: 'velopert',
  //     email: 'public.velopert@gmail.com',
  //     active: true
  //   },
  //   {
  //     id: 2,
  //     username: 'tester',
  //     email: 'tester@example.com',
  //     active: false
  //   },
  //   {
  //     id: 3,
  //     username: 'liz',
  //     email: 'liz@example.com',
  //     active: false
  //   }
  // ]);
  // const nextId = useRef(4);
  // const onCreate = useCallback(() => {
  //   const user = {
  //     id: nextId.current,
  //     username,
  //     email
  //   };
  //   setUsers(users.concat(user));
  //
  //   setInputs({
  //     username: '',
  //     email: ''
  //   });
  //   nextId.current += 1;
  // }, [users, username, email]);
  //
  // const onRemove = useCallback(
  //   id => {
  //     // user.id 가 파라미터로 일치하지 않는 원소만 추출해서 새로운 배열을 만듬
  //     // = user.id 가 id 인 것을 제거함
  //     setUsers(users.filter(user => user.id !== id));
  //   },
  //   [users]
  // );
  // const onToggle = useCallback(
  //   id => {
  //     setUsers(
  //       users.map(user =>
  //         user.id === id ? { ...user, active: !user.active } : user
  //       )
  //     );
  //   },
  //   [users]
  // );
  // const count = useMemo(() => countActiveUsers(users), [users]);
  //
  //
  // return (
  //   <>
  //
  //     <CreateUser
  //       username={username}
  //       email={email}
  //       onChange={onChange}
  //       onCreate={onCreate}
  //     />
  //     <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
  //     <div>활성사용자 수 : {count}</div>
  //   </>
  // );

}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
