import { useState } from 'react';
import './Popup.css';

export default function Popup() {
  const [querySelector, setQuerySelector] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id!, { type: 'ADD_ELEMENT', querySelector });
      }
    });
  };

  return (
    <div className="app" style={{ width: '800px', height: '600px', padding: '10px' }}>
      <h3>Add Element to DOM</h3>
      <form action="" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder='Enter querySelector' value={querySelector} onChange={(e) => setQuerySelector(e.target.value)}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
} 