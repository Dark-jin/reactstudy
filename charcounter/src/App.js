import React from 'react';
import './App.css';
import {RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from 'recoil';

const textState = atom({
  key: 'textState',
  default: '',
})
const charCountState = selector({
  key: 'charCountState',
  get : ({get}) => {
    const text = get(textState);

    return text.length;
  },
});

function CharacterCounter() {
  const count = useRecoilValue(charCountState);
  return(
    <>
    Character Count : {count}
    </>
  )
}

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  }

  return(
    <div>
      <input type="text" value={text} onChange={onChange}/>
      <br/>
      TEXT: {text}
    </div>
  )
}

function App() {
  return (
    <RecoilRoot>
      <TextInput/>
      <CharacterCounter/>
    </RecoilRoot>
  );
}

export default App;
