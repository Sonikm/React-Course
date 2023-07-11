import {useState} from 'react';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

// || ADD FRIEND COMPONENT
function Button({children, onClick}) {
  return <button className="button" onClick={onClick}>{children}</button>;
}

// || APP COMPONENTS
export default function App() {
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [showSelect, setShowSelect] = useState(null);

  function handleOnClick(){
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(newFriend){
      setFriends((friendList)=> [...friendList, newFriend])
      setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList onShowSelect={setShowSelect}  friends={friends} />
        { showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleOnClick}> {showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>
      {showSelect && ( <FormSplitBill/>) }
     
    </div>
  );
}

// || FRIEND LIST COMPONENTS
function FriendList({onShowSelect, friends}) {

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} onShowSelect={onShowSelect} />
      ))}
    </ul>
  );
}

// || FRIEND LIST CHILD COMPONENTS
function Friend({ friend, onShowSelect }) {

  function handleOnShowSelect(id){
    onShowSelect((select) => select === id ? null : id)
  }


  return (
    <li>
      <img src={friend.image} alt={friend.name}></img> <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">{friend.name} owes you {friend.balance}$</p>
      )}
      {friend.balance < 0 && (
        <p className="red">You owes {friend.name} {Math.abs(friend.balance)}$</p>
      )}
      {friend.balance === 0 && (
        <p>You and Anthony are even</p>
      )}

      <Button onClick={()=>handleOnShowSelect(friend.id)}>Select</Button>
    </li>

  );
}

// || ADD FRIEND COMPONENTS
function FormAddFriend({onAddFriend}) {
const [name, setName] = useState('');
const [image, setImage] = useState('https://i.pravatar.cc/48');

function handleSubmit(e){
  e.preventDefault();

  const id = crypto.randomUUID;
 if(!name || !image) return; 
 const newFriend = {name, image: `${image}?=${id}`, balance:0, id};
 onAddFriend(newFriend);
  setImage('https://i.pravatar.cc/48')
setName('');
 console.log(newFriend)
}


  return (
      <form className='form-add-friend' onSubmit={handleSubmit}>
        <label>
          <span>👩🏻‍🤝‍👨</span>Friend name
        </label>
        <input type="text" value={name} onChange={(e)=> setName(e.target.value)}  />
        <label>
          <span>🌄</span>Image URL
        </label>
        <input
          type="text" onChange={(e)=> setImage(e.target.value)}
          value={image}
        />

        <Button>Add</Button>
      </form>
  )
}

function FormSplitBill() {
   return <form className='form-split-bill'>
       <h2>SPLIT A BILL WITH X's</h2>

       <label>💰 Bill value</label>
       <input type='text'></input>

       <label>🧍‍♀️ Your expense</label>
       <input type='text'></input>

       <label>👫 X's expense</label>
       <input type='text' disabled ></input>

       <label>🤑 Who is paying the bill</label>
       <select>
        <option value='you'>You</option>
        <option>X</option>
       </select>

       <Button>Split bill</Button>
   </form>
}