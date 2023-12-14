"use client"
import React, { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { getText } from '@/service/gbt';

const Input = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const data = await getText(text);
      setMessages((prevMessages) => [...prevMessages, { type: 'user', content: text }, { type: 'bot', content: data.data }]);
    } catch (error) {
      console.error('Bir hata oluştu:', error);
    } finally {
      setLoading(false);
      setText('');
    }
  };

  return (
    <div className="flex flex-col mt-20 container mx-auto">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-10 p-2 border border-gray-400 outline-none rounded-2xl mb-2"
          placeholder="Enter your subject..."
        />
        <button type='submit' disabled={!text} onClick={handleClick} className="disabled:text-gray-500 absolute right-2 top-1.5">
          <AiOutlineSend size={25} />
        </button>
      </div>
      <div className=" flex flex-col-reverse container mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            {messages.map((message, index) => (
              <div key={index} className={message.type === 'user' ? 'text-blue-600 flex justify-center mt-2' : 'text-green-600'}>
                {message.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
