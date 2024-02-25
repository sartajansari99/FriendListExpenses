import React, { useState } from "react";
import "./App.css";
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
function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showfriend, setShowfriend] = useState(false);
  const [selectedfriend, setSelectedfriend] = useState("");
  function handleClick() {
    setShowfriend((show) => !show);
  }
  function handleAddFriends(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowfriend(false);
  }
  function handleSelection(friend) {
    // setSelectedfriend(friend);
    setSelectedfriend((selected) => (selected.id === friend.id ? "" : friend));
    setShowfriend(false);
  }
  function handleSplitbill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedfriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedfriend("");
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedfriend={selectedfriend}
        />
        {showfriend && <FormAddFriend onAddfriends={handleAddFriends} />}
        <Button onClick={handleClick}>
          {showfriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedfriend && (
        <FormSplitBill
          selectedfriend={selectedfriend}
          onHandlesplit={handleSplitbill}
          key={selectedfriend.id}
        />
      )}
    </div>
  );
}
function FriendsList({ friends, onSelection, selectedfriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedfriend={selectedfriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedfriend }) {
  const isSelected = selectedfriend.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owe you {Math.abs(friend.balance)} $
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button
        onClick={() => {
          onSelection(friend);
        }}
      >
        {selectedfriend ? "Close" : "Select"}
      </Button>
    </li>
  );
}
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ onAddfriends }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddfriends(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <lebel>🧑‍🤝‍🧑friend name</lebel>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <lebel>❤️friend img</lebel>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>ADD</Button>
    </form>
  );
}
function FormSplitBill({ selectedfriend, onHandlesplit }) {
  const [bill, setBill] = useState("");
  const [payedbyuser, setPayedbyuser] = useState("");
  const [whoispaying, setWhoispaying] = useState("you");
  const payedbyfriend = bill ? bill - payedbyuser : "";
  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !payedbyuser) return;
    onHandlesplit(whoispaying === "you" ? payedbyfriend : -payedbyuser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>SPLIT A BILL WITH {selectedfriend.name} </h2>
      <lebel>Bill value</lebel>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <lebel>your Expences</lebel>
      <input
        type="text"
        value={payedbyuser}
        onChange={(e) =>
          setPayedbyuser(
            Number(e.target.value) > bill ? payedbyuser : Number(e.target.value)
          )
        }
      />
      <lebel>{selectedfriend.name} Expences</lebel>
      <input type="text" disabled value={payedbyfriend} />
      <lebel>Who is paying the bill?</lebel>
      <select
        value={whoispaying}
        onChange={(e) => setWhoispaying(e.target.value)}
      >
        <option value="you">you</option>
        <option value="x">{selectedfriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
export default App;
