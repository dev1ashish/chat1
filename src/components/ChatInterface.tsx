import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Card } from './ui/card';
import { RefreshCw, Send, Trash2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onMessageSend: (message: string) => void;
  onSync?: () => void;
  onClear?: () => void;
  synced?: boolean;
}

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'palm-2', name: 'PaLM 2' },
];

export const ChatInterface = ({ onMessageSend, onSync, onClear, synced }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1000);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: Message = {
      role: 'user',
      content: input,
    };
    
    setMessages([...messages, newMessage]);
    onMessageSend(input);
    setInput('');
  };

  const handleClear = () => {
    setMessages([]);
    onClear?.();
  };

  return (
    <Card className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            {onSync && (
              <Button
                variant="outline"
                size="icon"
                onClick={onSync}
                className={synced ? 'text-primary' : 'text-muted-foreground'}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={handleClear}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <label className="text-sm text-gray-400">Temperature</label>
            <Slider
              value={[temperature]}
              onValueChange={([value]) => setTemperature(value)}
              max={1}
              step={0.1}
              className="my-2"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-400">Max Tokens</label>
            <Input
              type="number"
              value={maxTokens}
              onChange={(e) => setMaxTokens(Number(e.target.value))}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message-bubble ${
              message.role === 'user' ? 'user-message' : 'assistant-message'
            }`}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-800">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};