import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Send, Trash2 } from 'lucide-react';

const Index = () => {
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [interfaces, setInterfaces] = useState([1, 2]); // Start with 2 interfaces
  const [masterInput, setMasterInput] = useState('');

  const handleMessageSend = (message: string) => {
    // TODO: Implement backend communication
    console.log('Sending message:', message);
  };

  const handleSync = () => {
    setSyncEnabled(!syncEnabled);
  };

  const addInterface = () => {
    setInterfaces(prev => [...prev, prev.length + 1]);
  };

  const handleMasterInputSend = () => {
    if (!masterInput.trim()) return;
    
    // Send the master input to all chat interfaces
    const event = new CustomEvent('masterInput', { detail: masterInput });
    window.dispatchEvent(event);
    setMasterInput('');
  };

  const handleMasterClear = () => {
    // Send the master clear event to all chat interfaces
    const event = new CustomEvent('masterClear');
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mb-4 space-y-4">
        <div className="flex justify-end gap-2">
          <Button 
            variant="destructive" 
            onClick={handleMasterClear} 
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Chats
          </Button>
          <Button onClick={addInterface} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Chat Interface
          </Button>
        </div>
        <div className="flex gap-2">
          <Input
            value={masterInput}
            onChange={(e) => setMasterInput(e.target.value)}
            placeholder="Type a message to send to all chats..."
            onKeyPress={(e) => e.key === 'Enter' && handleMasterInputSend()}
            className="flex-1"
          />
          <Button onClick={handleMasterInputSend}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
        {interfaces.map((id) => (
          <ChatInterface
            key={id}
            onMessageSend={handleMessageSend}
            onSync={handleSync}
            synced={syncEnabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;